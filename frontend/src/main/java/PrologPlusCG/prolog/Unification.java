/**********************************************************************
 *
 * Prolog+CG : Prolog with conceptual graphs
 *
 * Copyright (C) 2000-2005  Adil Kabbaj
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * version 2.1 as published by the Free Software Foundation.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 *
 *
 * Website
 * =======
 *
 * Prolog+CG has a website here:
 * 
 * http://prologpluscg.sourceforge.net/
 *
 *
 * Contact
 * =======
 * 
 * Please DO NOT send email to Prof. Kabbaj.  Instead, all
 * correspondence regarding Prolog+CG should be sent to the current
 * maintainter:
 *
 * Ulrik Petersen  <ulrikp{t-a}users{dot}sourceforge{|dot|}net
 *
 * (Email obfuscated to foil spammers).
 *
 *
 * NO SUPPORT
 * ==========
 *
 * Note that NEITHER Prof. KABBAJ NOR ULRIK PETERSEN WILL GIVE
 * SUPPORT!  No support is available.
 *
 * If you need help in using Prolog+CG, please check out the resources
 * available at:
 *
 * http://prologpluscg.sourceforge.net/docs.html
 *
 * That page points to ample resources for learning Prolog+CG.
 * 
 *
 * Bugreports
 * ==========
 *
 * Notwithstanding the lack of support, the maintainer will gladly
 * receive bugreports and bugfixes.  Please feel free to send such
 * bulletins to the address given above.
 *
 * 
 */


package PrologPlusCG.prolog;

import java.util.*;

import PrologPlusCG.cg.CG;
import PrologPlusCG.cg.Concept;

public class Unification implements DataTypes {
	public final UnificationStack Unif_Stack = new UnificationStack();
	boolean bUnifyCurCG = false;
	Vector<Constraint> vctConstraints = new Vector<Constraint>();
	private int indexList1;
	
	private PPCGEnv env; 
	
	public Unification(PPCGEnv myenv) {
		env = myenv;
	}
	
	void makeEmpty_vctContstraints() {
		Constraint aConstraint;
		
		for (int listIndex = 0;
				listIndex < vctConstraints.size();
				++listIndex) {
			aConstraint = vctConstraints.get(listIndex);
			aConstraint.myDestroy();
		}
		vctConstraints.clear();
	}
	
	void removeConstraints() {
		Constraint aConstraint;
		
		for (int listIndex = 0;
				listIndex < vctConstraints.size();
				++listIndex) {
			aConstraint = vctConstraints.get(listIndex);

			if (aConstraint.m_LeftData == null) {
				// On ne peut acceder directement a l'entree ou est stocke la valeur car la cle
				// est l'ident. de la variable (dans ce cas une variable anonyme).
				// On va donc localiser la variable a laquelle la valeur a ete associee et a partir
				// d'elle, on mettra la valeur a null (comme on le fait dans depiler Unif_Stack
				removeConstraintValue((String) aConstraint.m_RightData, aConstraint.m_levelOfRightData);
			} else if (aConstraint.m_RightData == null) {
				removeConstraintValue((String) aConstraint.m_LeftData, aConstraint.m_levelOfLeftData);
			} else {
				// La contrainte etant X = Y; deux variables libres
				// 1. on l'enleve en tant que contrainte pour X
				Unif_Stack.removeVariable((String) aConstraint.m_LeftData,
						aConstraint.m_levelOfLeftData, (String) aConstraint.m_RightData,
						aConstraint.m_levelOfRightData);
				
				// 2. et on l'enleve en tant que contrainte pour Y
				Unif_Stack.removeVariable((String) aConstraint.m_RightData,
						aConstraint.m_levelOfRightData, (String) aConstraint.m_LeftData,
						aConstraint.m_levelOfLeftData);
			}
			aConstraint.myDestroy();
		}
		
		vctConstraints.clear();
	}
	
	// pDonGch represente la tete (ou est un arg. du but tete) de la regle choisie
	// pDonDrt represente le but courant a satisfaire (ou est un arg. du but courant)
	boolean unify(PrologData pLeftData, int indexOfLeftData,
			PrologData pRightData, int indexOfRightData) throws ExecException {
		if (isAnonymousVariable(pLeftData) || isAnonymousVariable(pRightData)) {
			return true;
		}
		
		boolean unifiable = true;
		
		// D?terminer si les deux donn?es ont des valeurs ou sont-elles des
		// variables libres.
		// Determine whether the two values have values or whether they are
		// free variables.
		PrologDataIndexPair valueIndexLeft = valueFromUnifStack(pLeftData, indexOfLeftData);
		PrologDataIndexPair valueIndexRight = valueFromUnifStack(pRightData, indexOfRightData);
		
		if ((valueIndexLeft.pData == null) && (valueIndexRight.pData != null)) {
			// pDonGch une variable_free et pDonDrt une valeur
			addConstraint2(valueIndexRight.pData, valueIndexRight.index,
					(String) pLeftData.data, indexOfLeftData);
		} else if ((valueIndexLeft.pData != null) && (valueIndexRight.pData == null)) {
			// pDonGch une valeur et pDonDrt une variable_free
			addConstraint2(valueIndexLeft.pData, valueIndexLeft.index,
					(String) pRightData.data, indexOfRightData);
		} else if ((valueIndexLeft.pData == null) && (valueIndexRight.pData == null)) {
			// les deux sont des variable_free
			addConstraint3((String) pLeftData.data, indexOfLeftData,
					(String) pRightData.data, indexOfRightData);
		} else if ((valueIndexLeft.pData.typeOfData != valueIndexRight.pData.typeOfData) &&
				(((valueIndexLeft.pData.typeOfData != uCG) &&
						(valueIndexLeft.pData.typeOfData != uConcept)) ||
						((valueIndexRight.pData.typeOfData != uCG) &&
								(valueIndexRight.pData.typeOfData != uConcept)))) {
			// unifier des donn?es, selon leurs types
			// les donn?es de types diff?rents sont non unifiable
			unifiable = false;
		} else { // Les deux donn?es ont m?me type
			// The two pieces of data have the same type
			
			Object pData1Left;
			Object pData1Right;
			pData1Left = valueIndexLeft.pData.data;
			pData1Right = valueIndexRight.pData.data;
			
			if (pData1Left == pData1Right) {
				return true; // deux variables unifiees auparavant
			}
			
			// et partageant la meme valeur
			switch (valueIndexLeft.pData.typeOfData) {
			case uNumber: {
				Number tmp1Left = (Number) pData1Left;
				Number tmp1Right = (Number) pData1Right;
				unifiable = (tmp1Left.doubleValue() == tmp1Right.doubleValue());
				tmp1Left = tmp1Right = null;
			}
			break;
			
			case uBoolean: {
				Boolean tmp1Left = (Boolean) pData1Left;
				Boolean tmp1Right = (Boolean) pData1Right;
				unifiable = (tmp1Left.booleanValue() == tmp1Right.booleanValue());
				tmp1Left = tmp1Right = null;
			}
			break;
			
			case uIdentifier:
			case uString: {
				String strData1 = (String) pData1Left;
				String strData2 = (String) pData1Right;
				unifiable = strData1.equals(strData2);
				strData1 = strData2 = null;
			}
			break;
			
			case uSet: {
				PrologList pList1 = (PrologList) pData1Left;
				PrologList pList2 = (PrologList) pData1Right;
				unifiable = env.compile.set1IsSubsetOfSet2(pList1, pList2);
				pList1 = pList2 = null;
			}
			
			break;
			
			case uList: {
				PrologList pList1 = (PrologList) pData1Left;
				PrologList pList2 = (PrologList) pData1Right;
				indexList1 = 0;
				int indexList2 = 0;
				int indexLastElemList1 = pList1.size() - 1;
				int indexLastElemList2 = pList2.size() - 1;
				boolean bStop = false;
				
				// unifier les ?l?ments des deux listes un ? un ;
				// cas particulier : dernier ?l?ment d'une liste est une
				// var_liste. Si elle est libre, elle sera unifi?e au reste
				// de l'autre liste.
				while (unifiable && (!bStop) && (indexList1 <= indexLastElemList1) &&
						(indexList2 <= indexLastElemList2)) {
					if ((((((PrologData) pList1.elementAt(indexList1)).typeOfData) != uVarList) &&
							((((PrologData) pList2.elementAt(indexList2)).typeOfData) != uVarList)) ||
							(((((PrologData) pList1.elementAt(indexList1)).typeOfData) == uVarList) &&
									((((PrologData) pList2.elementAt(indexList2)).typeOfData) == uVarList))) {
						// les deux ?l?ments courants ne sont pas des var_liste
						// ou les deux le sont => unifier les deux ?l?ments
						unifiable = unify(((PrologData) pList1.elementAt(
								indexList1)), valueIndexLeft.index,
								((PrologData) pList2.elementAt(indexList2)),
								valueIndexRight.index);
						indexList1++;
						indexList2++;
					} else if ((((PrologData) pList1.elementAt(indexList1)).typeOfData) == uVarList) {
						// un des deux ?l?ments courants est une var_liste : la
						// valeur associ?e serait une copie du reste de l'autre
						// liste.
						PrologData data1Left = (PrologData) pList1.elementAt(indexList1);
						PrologList listCopy = copyList(pList2, indexList2);
						PrologData data1Right = new PrologData(uList, listCopy);
						unifiable = unify(data1Left, valueIndexLeft.index, data1Right,
								valueIndexRight.index);
						data1Left = data1Right = null;
						listCopy = null;
						bStop = true;
					} else { // idem. mais inversement
						
						PrologList listCopy = copyList(pList1, indexList1);
						PrologData data1Left = new PrologData(uList, listCopy);
						PrologData data1Right = (PrologData) pList2.elementAt(indexList2);
						unifiable = unify(data1Left, valueIndexLeft.index, data1Right,
								valueIndexRight.index);
						data1Left = data1Right = null;
						bStop = true;
					}
				} // Fin de While (unifiable && (!arret)..
				
				if (unifiable && (!bStop)) {
					if (indexList1 <= indexLastElemList1) { // (IndLst2 > indDerElmLst2)
						
						if ((((PrologData) pList1.elementAt(indexList1)).typeOfData) == uVarList) {
							// Le cas (..|x) avec (..) ; x s'unifiera a la liste vide
							PrologData data1Left = (PrologData) pList1.elementAt(indexList1);
							PrologList listCopy = new PrologList();
							PrologData data1Right = new PrologData(uList,
									listCopy);
							unifiable = unify(data1Left, valueIndexLeft.index,
									data1Right, valueIndexRight.index);
							data1Left = data1Right = null;
							listCopy = null;
							bStop = true;
						} else {
							unifiable = false;
						}
					} else if (indexList2 <= indexLastElemList2) { // (IndLst1 > indDerElmLst1)
						
						if ((((PrologData) pList2.elementAt(indexList2)).typeOfData) == uVarList) {
							// Le cas ou (..) avec (..|x)
							PrologList listCopy = new PrologList();
							PrologData data1Left = new PrologData(uList,listCopy);
							PrologData data1Right = (PrologData) pList2.elementAt(indexList2);
							unifiable = unify(data1Left, valueIndexLeft.index,
									data1Right, valueIndexRight.index);
							data1Left = data1Right = null;
							bStop = true;
						} else {
							unifiable = false;
						}
					}
				}
				if (!unifiable ||
						!(bStop ||
								((indexList1 > indexLastElemList1) &&
										(indexList2 > indexLastElemList2)))) {
					// conditions pour conclure que les deux listes sont unif.
					unifiable = false;
				}

				pList1 = pList2 = null;
			}
			break;
			
			case uTerm: {
				PrologTerm pTerm1 = (PrologTerm) pData1Left;
				PrologTerm pTerm2 = (PrologTerm) pData1Right;
				int tailleTerm1 = pTerm1.size();
				int tailleTerm2 = pTerm2.size();
				
				// les deux termes sont unifiables s'ils ont m?me nombre
				// d'arguments ..
				
				// The two terms are unifiable if they have the same number
				// of arguments
				unifiable = (tailleTerm1 == tailleTerm2);
				
				// .. et si les arguments des deux termes sont unifiables
				// 2 ? 2.
				// ... and if the arguments of the two terms are unifiable
				// pairwise.
				for (int i = 0; (unifiable && (i < tailleTerm1)); i++) {
					unifiable = unify((PrologData) pTerm1.elementAt(i),
							valueIndexLeft.index, (PrologData) pTerm2.elementAt(i),
							valueIndexRight.index);
				}
				pTerm1 = pTerm2 = null;
			}
			break;
			
			case uConcept: {
				if (valueIndexRight.pData.typeOfData == uCG) {
					CG gTmp = new CG();
					gTmp.addConcept((Concept) pData1Left);
					bUnifyCurCG = true;
					
					UnifyCG uneUnifCG = new UnifyCG(env);
					
					try {
						unifiable = uneUnifCG.UnifyGC((CG) pData1Right,
								valueIndexRight.index, gTmp, valueIndexLeft.index);
					} catch (ExecException excConform) {
						env.recordErrorMessage(excConform.getMessage());
						unifiable = false;
					}
					bUnifyCurCG = false;
				} else {
					UnifyCG aUnifyCG = new UnifyCG(env);
					
					try {
						unifiable = aUnifyCG.UnifyConc((Concept) pData1Left,
								(Concept) pData1Right, valueIndexLeft.index, valueIndexRight.index);
					} catch (ExecException excConform) {
						env.recordErrorMessage(excConform.getMessage());
						unifiable = false;
					}
				}
			}
			break;
			
			case uCG: {
				if (valueIndexRight.pData.typeOfData == uConcept) {
					CG gTmp = new CG();
					gTmp.addConcept((Concept) pData1Right);
					bUnifyCurCG = true;
					
					UnifyCG uneUnifCG = new UnifyCG(env);
					
					try {
						unifiable = uneUnifCG.UnifyGC(gTmp, valueIndexRight.index,
								(CG) pData1Left, valueIndexLeft.index);
					} catch (ExecException excConform) {
						env.recordErrorMessage(excConform.getMessage());
						unifiable = false;
					}
					
					bUnifyCurCG = false;
				} else {
					bUnifyCurCG = true;
					
					UnifyCG uneUnifCG = new UnifyCG(env);
					
					try {
						unifiable = uneUnifCG.UnifyGC((CG) pData1Right,
								valueIndexRight.index, (CG) pData1Left, valueIndexLeft.index);
					} catch (ExecException excConform) {
						env.recordErrorMessage(excConform.getMessage());
						unifiable = false;
					}
					
					bUnifyCurCG = false;
				}
			}
			break;
			
			default:
				throw new ExecException(
				"Error : an attempt to unify no pure Prolog+CG data; like Java objects. ");
			} // fin du switch
			
			pData1Left = pData1Right = null;
		} // fin du if-else imbrique
		
		valueIndexLeft = valueIndexRight = null;
		
		return (unifiable);
	}
	
	PrologList copyList(PrologList pList, int startIndex) {
		// retourner une liste qui soit une copie d'une partie de la liste
		// pLst ; du IndLst ?l?ment ? la fin.
		PrologList newList = new PrologList();
		int numberOfElementsToRead = pList.size() - startIndex;
		
		for (int Ind = 0; Ind < numberOfElementsToRead; Ind++) {
			newList.addElement(pList.elementAt(startIndex + Ind));
		}
		
		return newList;
	}
	
	// valeur : elle cherche dans Unif_Stack la valeur de pDon et elle la
	// retourne.
	public PrologDataIndexPair valueFromUnifStack(PrologData pData, int level) {
		if ((pData.typeOfData != uVariable) && (pData.typeOfData != uVarList)) {
			// La donn?e est une valeur particuli?re et non une variable ;
			// retourner alors la donn?e elle-m?me.
			return (new PrologDataIndexPair(pData, level));
		} else {
			UnificationRecord recUnif = (UnificationRecord) Unif_Stack.get(level);
			VariableIndexPairList lstContr = recUnif.get((String) pData.data);
			
			if ((lstContr != null) && (lstContr.ValInd != null)) {
				return lstContr.ValInd;
			} else {
				return (new PrologDataIndexPair(null, 0));
			}
		}
	}
	
	void addConstraint3(String pVarGch, int indVarGch, String pVarDrt,
			int indVarDrt) {
		// La contrainte etant X = Y; deux variables libres
		// 1. on l'ajoute en tant que contrainte pour X
		addVariableConstraint(pVarGch, indVarGch, pVarDrt, indVarDrt);
		
		// 2. .. et en tant que contrainte pour Y
		addVariableConstraint(pVarDrt, indVarDrt, pVarGch, indVarGch);
		
		if (bUnifyCurCG) {
			vctConstraints.addElement(new Constraint(pVarGch, indVarGch,
					pVarDrt, indVarDrt));
		}
	}
	
	void addVariableConstraint(String pVarFcs, int indVarFcs, String pVarAtr,
			int indVarAtr) {
		UnificationRecord recUnif = (UnificationRecord) Unif_Stack.elementAt(indVarFcs);
		VariableIndexPairList pCLContr = (VariableIndexPairList) recUnif.get(pVarFcs);
		
		if (pCLContr == null) {
			pCLContr = new VariableIndexPairList();
			pCLContr.addElement(new VariableIndexPair(pVarAtr, indVarAtr));
			recUnif.put(pVarFcs, pCLContr);
			
			return;
		}
		
		boolean bFound = false;
		VariableIndexPair VarInd;
		
		// En depilant PileUnif, on peut eliminer une contr-type .. = X,
		// auquel cas, on ne l'elimine pas de CLConstr mais on met .pDonnee = null
		// C'est pour cela que lors de l'ajout, on parcourt d'abord la liste
		// pour y voir s'il y a une place ou mettre la nouvelle contrainte
		for (int listIndex = 0;
				listIndex < pCLContr.size() && !bFound;
				++listIndex) {
			VarInd = pCLContr.get(listIndex);
			
			if (VarInd.idVariable == null) {
				bFound = true;
				VarInd.idVariable = pVarAtr;
				VarInd.index = indVarAtr;
			}
		}
		
		if (!bFound) {
			pCLContr.addElement(new VariableIndexPair(pVarAtr, indVarAtr));
		}
	}
	
	void removeConstraintValue(String idVar, int nivVar) {
		UnificationRecord recUnif = (UnificationRecord) Unif_Stack.elementAt(nivVar);
		VariableIndexPairList pCLContr = (VariableIndexPairList) recUnif.get(idVar);
		pCLContr.ValInd.pData = null;
	}
	
	void addConstraint2(PrologData pVal, int nivVal, String pVar,
			int nivVar) throws ExecException {
		// 0. Si la valeur est une liste, v?rifier que la liste est bien form?e
		// i.e; si elle est de la forme (X|L) alors L devrait etre libre ou une liste
		if (pVal.typeOfData == uList) {
			// Verifier si le dernier element est une VarList
			PrologList uneList = (PrologList) pVal.data;
			
			PrologData uneDonTmp = null;
			
			try {
				uneDonTmp = (PrologData) uneList.lastElement();
			} catch (NoSuchElementException nsex) {
				// This could possibly happen
			}
			
			if ((uneDonTmp != null) && (uneDonTmp.typeOfData == uVarList)) {
				PrologDataIndexPair ValVarList = valueFromUnifStack(uneDonTmp, nivVal);
				
				if ((ValVarList.pData != null) &&
						(ValVarList.pData.typeOfData != uList)) {
					throw new ExecException(
					"The value of the variable after | should be a list.\n");
				}
			}
		}
		
		// 1. Ajouter un element avec variable bidon et ValInd = (pVal, nivVal)
		UnificationRecord recUnif = Unif_Stack.getTop();
		VariableIndexPairList pCLContr = new VariableIndexPairList();
		pCLContr.ValInd = new PrologDataIndexPair(pVal, nivVal);
		recUnif.put(Integer.toString(env.aResolution.cptVarBid), pCLContr);
		env.aResolution.cptVarBid++;
		
		// 2. Localiser l'entree pour (pVar, nivVar) pour lui associer ValInd
		propagateValue(pVar, nivVar, pCLContr.ValInd);
		
		recUnif = null;
		pCLContr = null;
		
		if (bUnifyCurCG) { // null car non utilisee dans ce cas
			vctConstraints.addElement(new Constraint(null, nivVal, pVar,
					nivVar));
		}
	}
	
	void propagateValue(String pVar, int levelOfVar, PrologDataIndexPair contrVal) {
		if (pVar == null) {
			return;
		}
		
		UnificationRecord recUnif = (UnificationRecord) Unif_Stack.elementAt(levelOfVar);
		VariableIndexPairList pCLContr = (VariableIndexPairList) recUnif.get(pVar);
		
		if (pCLContr != null) {
			if ((pCLContr.ValInd == null) || (pCLContr.ValInd.pData == null)) {
				// La variable n'est donc pas encore traite; il faut lui affecter la valeur
				// et propager la valeur aux variables associees
				pCLContr.ValInd = contrVal;
				
				VariableIndexPair VarInd;
				
				for (int listIndex2 = 0;
						listIndex2 < pCLContr.size();
						++listIndex2) {
					VarInd = pCLContr.get(listIndex2);
					propagateValue(VarInd.idVariable, VarInd.index, contrVal);
				}
				
				VarInd = null;
			}
		} else {
			pCLContr = new VariableIndexPairList();
			pCLContr.ValInd = contrVal;
			
			// Une nouvelle entr?e est ajout?e dans la map pMp.
			recUnif.put(pVar, pCLContr);
		}
		
		recUnif = null;
		pCLContr = null;
	}
	
	//************ Utilitaire ********
	boolean isAnonymousVariable(PrologData pDon) {
		// variable anonyme : "_", elle peut s'unifier a n'importe quoi et ne
		// peut etre refere une autre fois; son unification est a ignorer
		if ((pDon != null) &&
				((pDon.typeOfData == uVariable) || (pDon.typeOfData == uVarList))) {
			return (((String) pDon.data).equals("_"));
		} else {
			return false;
		}
	}
}
