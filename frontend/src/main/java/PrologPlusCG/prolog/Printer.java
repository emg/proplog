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
import PrologPlusCG.cg.Relation;



public class Printer implements DataTypes {
	int indVar = 0;
	private String printedString = "";
	public String alternatePrintString = "";
	
	private PPCGEnv env;
	
	public Printer(PPCGEnv myenv) {
		env = myenv;
	}
	
	void flush() {
		String printedString = getPrintedString();
		env.io.appendToConsole(printedString);
		clearPrintedString();
	}
	
	/** afin d'eviter l'impression + fois d'une meme relation, on
	 maintient une liste des relations dont on prevoit leur
	 impression. Si on les rencontres par apres lors de l'impression
	 imbriquee, ses relations ne seront pas considerees.  Par ailleurs
	 et lors de l'impression d'un concept C, si une de ses relations
	 est a ignorer car son impression est deja prevue par rapport a un
	 autre concept, alors C sera reimprime et il faut donc lui associer
	 un referent s'il n'en a pas ***/
	
	public void printCG(CG aCG, int level, Vector<Concept> vctConcsVisite,
			Vector<Relation> vctImprPrevuRels) {
		// 1. Chercher s'il y a un concept qui n'a pas d'entrees
		boolean bFound = false;
		Concept conc = null;
		
		for (int listIndex1 = 0;
				listIndex1 < aCG.m_vctConcepts.size() && !bFound;
				++listIndex1) {
			conc = aCG.m_vctConcepts.get(listIndex1);
			
			if (conc.m_vctIncomingRelations.isEmpty()) {
				bFound = true;
			}
		}
		
		// 2. S'il n'y en a pas, on commence avec n'importe quel concept; le premier
		if (bFound) {
			printCGRelations(conc, aCG, level, vctConcsVisite, vctImprPrevuRels);
		} else {
			printCGRelations((Concept) aCG.m_vctConcepts.get(0), aCG,
					level, vctConcsVisite, vctImprPrevuRels);
		}
		
		aCG.removeSpecialIdent();
	}
	
	public void printCGRelations(Concept conc, CG aCG, int level,
			Vector<Concept> vctConcsVisite, Vector<Relation> vctImprPrevuRels) {
		vctConcsVisite.addElement(conc);
		
		int numberOfChars = printConcept(conc, true, level, vctImprPrevuRels);
		
		if ((conc.m_vctIncomingRelations.size() + conc.m_vctOutgoingRelations.size()) > 1) {
			printToConsole(" -\n");
			copyRelations(conc.m_vctOutgoingRelations, vctImprPrevuRels); // On prevoit l'impression de ses relations
			copyRelations(conc.m_vctIncomingRelations, vctImprPrevuRels); // ... les entrs/sorts
			
			// true == relSorts
			printRelations(conc.m_vctOutgoingRelations, 
					true, aCG, level, numberOfChars,
					vctConcsVisite, vctImprPrevuRels);
			
			if ((conc.m_vctOutgoingRelations.size() > 0) && (conc.m_vctIncomingRelations.size() > 0)) {
				printToConsole(",\n");
			}
			
			// false == relEntrs
			printRelations(conc.m_vctIncomingRelations, false, 
					aCG, level, numberOfChars,
					vctConcsVisite, vctImprPrevuRels);
		} else if (!conc.m_vctIncomingRelations.isEmpty()) {
			printRelation(conc.m_vctIncomingRelations.get(0), 
					false, aCG,
					level, vctConcsVisite, vctImprPrevuRels);
		} else if (!conc.m_vctOutgoingRelations.isEmpty()) {
			printRelation(conc.m_vctOutgoingRelations.get(0), 
					true, aCG,
					level, vctConcsVisite, vctImprPrevuRels);
		}
	}
	
	public void copyRelations(Vector<Relation> vctRels, Vector<Relation> vctImprPrevuRels) {
		if (vctRels.isEmpty()) {
			return;
		}
		
		Relation rel;
		
		for (int listIndex1 = 0;
				listIndex1 < vctRels.size(); 
				listIndex1++) {
			rel = vctRels.get(listIndex1);
			vctImprPrevuRels.addElement(rel);
		}
	}
	
	// ImprimeRels recoit la liste des relations a imprimer, les relations a ignorer
	// ont ete deja enleve de la liste ...
	public void printRelations(Vector<Relation> vctRels, 
			boolean Direction,
			CG aCG, int level, int Decalage, Vector<Concept> vctConcsVisite,
			Vector<Relation> vctImprPrevuRels) {
		if (vctRels.isEmpty()) {
			return;
		}
		
		Relation rel = vctRels.get(0);
		printSpaces(Decalage);
		printRelation(rel, Direction, aCG, level, vctConcsVisite, vctImprPrevuRels);
		
		
		for (int listIndex = 0;
				listIndex < vctRels.size();
				++listIndex) {
			rel = vctRels.get(listIndex);
			printToConsole(",\n");
			printSpaces(Decalage);
			printRelation(rel, Direction, aCG, level, vctConcsVisite,
					vctImprPrevuRels);
		}
	}
	
	public void printRelation(Relation rel, boolean estRelSort, CG unGC, int niv,
			Vector<Concept> vctConcsVisite, Vector<Relation> vctImprPrevuRels) {
		String DelOuv = null;
		String DelFerm = null;
		Concept conc = null;
		
		if (estRelSort) {
			DelOuv = "-";
			DelFerm = "->";
			conc = rel.m_concDestination;
		} else {
			DelOuv = "<-";
			DelFerm = "-";
			conc = rel.m_concSource;
		}
		
		printToConsole(DelOuv);
		printPrologData(rel.m_pdRelationName, niv);
		printToConsole(DelFerm);
		
		if (vctConcsVisite.contains(conc)) {
			printConcept(conc, false, niv, vctImprPrevuRels);
		} else {
			printCGConcept(rel, estRelSort, conc, unGC, niv, vctConcsVisite,
					vctImprPrevuRels);
		}
	}
	
	public void printCGConcept(Relation rel, boolean estRelSort, Concept conc,
			CG unGC, int niv, Vector<Concept> vctConcsVisite, Vector<Relation> vctImprPrevuRels) {
		vctConcsVisite.addElement(conc);
		
		if (!estRelSort) { // rel est donc une relation en sortie pour conc
			
			// On enleve rel de m_vctOutgoingRelations (on le remettra apres)
			conc.m_vctOutgoingRelations.removeElement(rel);
		} else {
			conc.m_vctIncomingRelations.removeElement(rel);
		}
		
		// true == impression complete; tous les champs
		int nbreCars = printConcept(conc, true, niv, vctImprPrevuRels);
		
		Vector<Relation> vctRelEntrsAImpr = new Vector<Relation>();
		relationsToPrint(conc.m_vctIncomingRelations, vctRelEntrsAImpr, vctImprPrevuRels);
		
		Vector<Relation> vctRelSortsAImpr = new Vector<Relation>();
		relationsToPrint(conc.m_vctOutgoingRelations, vctRelSortsAImpr, vctImprPrevuRels);
		
		if ((vctRelEntrsAImpr.size() + vctRelSortsAImpr.size()) > 1) {
			printToConsole(" -\n");
			printRelations(vctRelSortsAImpr, true, unGC, niv, nbreCars,
					vctConcsVisite, vctImprPrevuRels);
			
			if ((vctRelSortsAImpr.size() > 0) && (vctRelEntrsAImpr.size() > 0)) {
				printToConsole(",\n");
			}
			
			printRelations(vctRelEntrsAImpr, false, unGC, niv, nbreCars,
					vctConcsVisite, vctImprPrevuRels);
			printToConsole(";");
		} else if (!vctRelEntrsAImpr.isEmpty()) {
			printRelation(vctRelEntrsAImpr.get(0), false, unGC,
					niv, vctConcsVisite, vctImprPrevuRels);
		} else if (!vctRelSortsAImpr.isEmpty()) {
			printRelation(vctRelSortsAImpr.get(0), true, unGC,
					niv, vctConcsVisite, vctImprPrevuRels);
		}
		
		vctRelEntrsAImpr.clear();
		vctRelSortsAImpr.clear();
		
		if (!estRelSort) {
			conc.m_vctOutgoingRelations.addElement(rel); // On remet rel dans m_vctOutgoingRelations
		} else {
			conc.m_vctIncomingRelations.addElement(rel);
		}
	}
	
	public void relationsToPrint(Vector<Relation> vctInitRels, Vector<Relation> vctRelsAImpr,
			Vector<Relation> vctImprPrevuRels) {
		Relation rel;
		
		for (int listIndex1 = 0;
				listIndex1 < vctInitRels.size(); 
				++listIndex1) {
			rel = vctInitRels.get(listIndex1);
			
			if (!vctImprPrevuRels.contains(rel)) {
				vctRelsAImpr.addElement(rel);
				vctImprPrevuRels.addElement(rel);
			}
		}
	}
	
	String createReferenceSpecification() {
		indVar++;
		
		return "*" + String.valueOf(indVar);
	}
	
	public int printConcept(Concept conc, boolean premiereFois, int niv,
			Vector<Relation> vctImprPrevuRels) {
		if (conc.m_pdType == null) {
			printPrologData(conc.m_pdReferent, niv);
		} else {
			printToConsole("[");
			printPrologData(conc.m_pdType, niv);
			
			boolean trouve = false;
			
			if (premiereFois && (conc.m_pdReferent == null) &&
					(vctImprPrevuRels != null)) {
				Relation rel;
				
				for (int listIndex1 = 0;
						listIndex1 < conc.m_vctIncomingRelations.size() && !trouve;
						++listIndex1) {
					rel = conc.m_vctIncomingRelations.get(listIndex1);
					
					if (vctImprPrevuRels.contains(rel)) {
						trouve = true;
					}
				}
				
				for (int listIndex2 = 0;
						listIndex2 < conc.m_vctOutgoingRelations.size() && !trouve;
						++listIndex2) {
					rel = conc.m_vctOutgoingRelations.get(listIndex2);
					
					if (vctImprPrevuRels.contains(rel)) {
						trouve = true;
					}
				}
				
				if (trouve) { // Creer un referent pour ce concept
					conc.m_pdReferent = new PrologData(uIdentSpecial, createReferenceSpecification());
				}
			}
			
			if (conc.m_pdReferent != null) {
				printToConsole(" : ");
				printPrologData(conc.m_pdReferent, niv);
			}
			
			if (premiereFois && (conc.m_pdValue != null)) {
				printToConsole(" = ");
				printPrologData(conc.m_pdValue, niv);
			}
			
			printToConsole("]");
		}
		
		return numberOfCharsOnCurrentLine(); // On determine le nbre de car de la ligne courante
	}
	
	 void printSpaces(int nbreBlancs) {
		StringBuffer s = new StringBuffer("");
		
		for (int i = 0; i <= nbreBlancs; i++)
			s.append(' ');
		
		printToConsole(s.toString());
	}
	
	/*********
	 Universal > Person, Action.
	 Person > Man, Woman.
	 Action > Eat, Work.
	 
	 [Man]-agnt->[Work].
	 [Woman]-agnt->[Work].
	 ******************************/
	 int numberOfCharsOnCurrentLine() {
		String myString;
		if (env.bWriteToDebugTree || env.bWriteToToolTip) {
			System.out.println("UP100: env.bWriteToDebugTree || env.bWriteToToolTip");
			myString = alternatePrintString;
		} else {
			myString = printedString;
		}
		int nLastIndexOfNewline = myString.lastIndexOf('\n');
		if (nLastIndexOfNewline == -1) {
			return myString.length();
		} else {
			return myString.length() - nLastIndexOfNewline;
		}
	}
	
	public void printTerm(PrologTerm pTerme) {
		printTerm(pTerme, -1);
	}
	
	public void printTerm(PrologTerm pTerm, int level) {
		printPrologData((PrologData) pTerm.get(0), level);
		
		int IndDernier = pTerm.size() - 1;
		
		if (IndDernier >= 1) {
			printToConsole("(");
			printPrologData((PrologData) pTerm.elementAt(1), level);
			
			for (int i = 2; i <= IndDernier; i++) {
				printToConsole(", ");
				printPrologData((PrologData) pTerm.elementAt(i), level);
			}
			printToConsole(")");
		}
	}
	
	public void printSet(PrologList pLstPrlg, int niv) {
		printToConsole("{");
		
		int nbreElems = pLstPrlg.size();
		int indElemCour = 0;
		
		try {
			printPrologData((PrologData) pLstPrlg.get(indElemCour), niv);
			indElemCour++;
		} catch (ArrayIndexOutOfBoundsException aiobex) {
			// This could possibly happen
		}
		
		while (indElemCour < nbreElems) {
			printToConsole(", ");
			printPrologData((PrologData) pLstPrlg.get(indElemCour), niv);
			indElemCour++;
		}
		
		printToConsole("}");
	}
	
	public void printList(PrologList pLstPrlg, int niv) {
		printToConsole("(");
		
		int nbreElems = pLstPrlg.size();
		
		//int indLstElem =  pLstPrlg.size() - 1;
		int indElemCour = 0;
		
		if (nbreElems > 0) {
			printPrologData((PrologData) pLstPrlg.elementAt(indElemCour), niv);
			indElemCour++;
		}
		
		while (indElemCour < nbreElems) {
			//ImprimeDon((PrologData) pLstPrlg.elementAt(indElemCour), niv);
			//indElemCour++;
			//if (indElemCour < nbreElems) {
			if ((((PrologData) pLstPrlg.elementAt(indElemCour)).typeOfData == uVarList) &&
					(niv != -1)) {
				PrologDataIndexPair contr = env.unification.valueFromUnifStack((PrologData) pLstPrlg.elementAt(
						indElemCour), niv);
				
				if (contr.pData == null) {
					printToConsole("|FREE");
					indElemCour = nbreElems;
				} else {
					// EcrireConsole(", ");
					pLstPrlg = (PrologList) contr.pData.data;
					nbreElems = pLstPrlg.size();
					indElemCour = 0;
					niv = contr.index;
					
					if (nbreElems > 0) {
						printToConsole(", ");
						printPrologData((PrologData) pLstPrlg.elementAt(indElemCour),
								niv);
						indElemCour++;
					}
					
				}
				contr = null;
			} else {
				if (((PrologData) pLstPrlg.elementAt(indElemCour)).typeOfData == uVarList) {
					printToConsole("|");
				} else {
					printToConsole(", ");
				}
				
				printPrologData((PrologData) pLstPrlg.elementAt(indElemCour), niv);
				indElemCour++;
			}
			
			// };
		}
		printToConsole(")");
	}
	
	public void printPrologData(PrologData pDon, int niv) {
		printPrologData(pDon, niv, false);
	}
	
	// Version that strips '"' from uString if last parameter is true.
	// Note that this does work recursively for variables and variable
	// lists, but not for terms, lists, CGs, concepts, or any other
	// type.  Thus when pDon is a variable containing a string, the
	// string will have its '"' stripped if last parameter is true.
	// However, if pDon is a term or a list, or any other
	// non-variable, non-string type, the last parameter is not
	// carried over recursively.
	public void printPrologData(PrologData pDon, int niv, boolean uChaineShouldBeStrippedOfQuotations) {
		if (pDon == null) {
			printToConsole("FREE"); // le cas ou la variable est free; aucune donnee ne lui est associee
		} else {
			switch (pDon.typeOfData) {
			case uNumber:
				printToConsole(((Number) pDon.data).toString());
				
				break;
				
			case uBoolean:
				printToConsole(((Boolean) pDon.data).toString());
				
				break;
				
			case uIdentSpecial:
			case uIdentifier:
			case uPeriod:
			case uComma:
			case uSemicolon:
			case uExclamationMark:
			case uQuestionMark:
				printToConsole((String) pDon.data);
				
				break;
				
			case uString:
				if (uChaineShouldBeStrippedOfQuotations) {
					// Get string from PrologData 
					String s = ((String) pDon.data);
					
					// Remove beginning and ending '"' and write the result
					if (s.length() >= 2
						&& s.charAt(0) == '"' && s.charAt(s.length()-1) == '"') {
						printToConsole(s.substring(1, s.length()-1));
					} else {
						printToConsole(s);
					}
					
					// Delete s;
					s = null;
				} else{
					printToConsole((String) pDon.data);
				}
				
				//if (niv == -1) EcrireConsole('"' + ((String) pDon.Don) + '"'); // Les " sont deja dans la chaine, on aurait une double
				//else EcrireConsole((String) pDon.Don);
				break;
				
			case uVariable:
			case uVarList:
				if (niv == -1) {
					printToConsole((String) pDon.data);
					/*
				} else if (env.bWriteToDebugTree) {
					String s = (String) pDon.data;
					printToConsole(s + "/" + niv);
					s = null;
					*/
				} else {
					PrologDataIndexPair contr = env.unification.valueFromUnifStack(pDon, niv);
					
					if (contr.pData != null) {
						printPrologData(contr.pData, contr.index, uChaineShouldBeStrippedOfQuotations);
					} else {
						printToConsole((String) pDon.data);
					}
					
					contr = null;
				}
				break;
				
			case uTerm:
				printTerm((PrologTerm) pDon.data, niv);
				
				break;
				
			case uConcept:
				printConcept((Concept) pDon.data, true, niv, null);
				
				break;
				
			case uCG: {
				Vector<Concept> vctConcsVisite = new Vector<Concept>();
				Vector<Relation> vctImprPrevuRels = new Vector<Relation>();
				printCG((CG) pDon.data, niv, vctConcsVisite, vctImprPrevuRels);
				vctConcsVisite.clear();
				vctConcsVisite = null;
				vctImprPrevuRels.clear();
				vctImprPrevuRels = null;
			}
			
			break;
			
			case uList:
				printList((PrologList) pDon.data, niv);
				
				break;
				
			case uSet:
				printSet((PrologList) pDon.data, niv);
				
				break;
				
			case uObject:
				printToConsole(pDon.data.toString());
			}
		}
	}
	
	public void printPrologProgram() {
		Set<String> keys = env.program.keySet();
		
		for (String key : keys) {
			RuleVector value = env.program.get(key);
			printRules(value, key);
			printToConsole("\n");
		}
	}
	
	public void printRules(RuleVector pRegles, String cle) {
		for (int listIndex = 0;
				listIndex < pRegles.size();
				++listIndex) {
			printRule(pRegles.get(listIndex), cle);
		}
	}
	
	public void printRule(PrologRule pRegle, String cle) {
		if (cle.startsWith(env.compile.valSysGEN)) {
			PrologTerm unTrmTmp = (PrologTerm) pRegle.getAt(0).getAt(1).data;
			printGoal(unTrmTmp);
		} else {
			printGoal((PrologTerm) pRegle.get(0));
		}
		
		if (pRegle.size() > 1) {
			if (cle.equals(env.compile.valSysSP)) {
				printToConsole(" > ");
				printTail(pRegle);
			} else if (cle.equals(env.compile.valSysINST)) {
				printToConsole(" = ");
				printTail(pRegle);
			} else if (cle.startsWith(env.compile.valSysGEN)) {
				printToConsole(" <- ");
				printGoal((PrologTerm) pRegle.getAt(1).getAt(1).data);
			} else {
				printToConsole(" :- ");
				printTail(pRegle);
			}
		}
		printToConsole(".\n");
	}
	
	public void printTail(PrologRule pRegle) {
		int AvDernier = pRegle.size() - 2;
		
		for (int i = 1; i <= AvDernier; i++) {
			printGoal((PrologTerm) pRegle.elementAt(i));
			printToConsole(", ");
		}
		printGoal((PrologTerm) pRegle.elementAt(AvDernier + 1));
	}
	
	public void printGoal(PrologTerm pTerme) {
		indVar = 0;
		
		PrologData donIdTerm = (PrologData) pTerme.get(0);
		
		if ((donIdTerm.typeOfData == uVariable) || (donIdTerm.typeOfData == uCG)) {
			printPrologData(donIdTerm, -1);
		} else if ((donIdTerm.typeOfData == uIdentifier) &&
				((String) donIdTerm.data).startsWith(env.compile.valSysCleBtCp)) {
			printPrologData((PrologData) pTerme.elementAt(1), -1);
			printToConsole("::");
			
			printPrologData((PrologData) pTerme.elementAt(2), -1);
		} else {
			printTerm(pTerme, -1);
		}
	}
	
	public void printToConsole(String s) {
		if (env.bWriteToDebugTree || env.bWriteToToolTip) {
			alternatePrintString += s;
		} else { 
			printedString += s;
		}
	}

	// new method to get what is printed	
	public String getPrintedString() {
		return printedString;
	}

	// new method to clear what was printed
	public void clearPrintedString() {
		printedString = "";
	}
	
	void writeOrRecordResult(boolean resolutionWithInterface) {
		clearPrintedString();
		if (resolutionWithInterface) {
			writeResult();
		} else {
			recordResult();
		}
	}
	
	 void writeResult() {
		printToConsole("{");
		
		UnificationRecord recUnif = (UnificationRecord) env.unification.Unif_Stack.get(0); // Les variables au niveau 0
		
		// il faut imprimer les variables par l'ordre inverse de leur insertion dans la table
		if (recUnif.isEmpty()) {
			printToConsole("}\n");
		} else {
			String sVar;
			String sDerVar = env.compile.vctVariableIdentifiersInQuery.lastElement();
			env.compile.vctVariableIdentifiersInQuery.removeElementAt(env.compile.vctVariableIdentifiersInQuery.size() -
					1);
			
			VariableIndexPairList pCLContr;
			
			for (int listIndex1 = 0;
					listIndex1 < env.compile.vctVariableIdentifiersInQuery.size();
					++listIndex1) {
				sVar = env.compile.vctVariableIdentifiersInQuery.get(listIndex1);
				printToConsole(sVar + "=");
				pCLContr = (VariableIndexPairList) recUnif.get(sVar);
				indVar = 0;
				
				if ((pCLContr != null) && (pCLContr.ValInd != null)) {
					printPrologData(pCLContr.ValInd.pData,
							pCLContr.ValInd.index);
				} else {
					printPrologData(null, 0);
				}
				
				printToConsole(", ");
			}
			
			// Imprimer le dernier elem a part afin de ne pas ecrire la virgule apres
			env.compile.vctVariableIdentifiersInQuery.addElement(sDerVar); // Remettre le dernier elem pour une autre impression !
			printToConsole(sDerVar + "=");
			pCLContr = (VariableIndexPairList) recUnif.get(sDerVar);
			indVar = 0;
			
			if ((pCLContr != null) && (pCLContr.ValInd != null)) {
				printPrologData(pCLContr.ValInd.pData,
						pCLContr.ValInd.index);
			} else {
				printPrologData(null, 0);
			}
			
			sVar = sDerVar = null;
			pCLContr = null;
			
			printToConsole("}\n");
		}
		
		flush();
		
		recUnif = null;
	}
	
	void recordResult() {
		UnificationRecord recUnif = (UnificationRecord) env.unification.Unif_Stack.get(0); // Les variables au niveau 0
		
		if (!recUnif.isEmpty()) {
			Hashtable<String, String > hashResult = new Hashtable<String, String>();
			String strVar;
			VariableIndexPairList pCLContr;
			
			for (int listIndex1 = 0;
					listIndex1 < env.compile.vctVariableIdentifiersInQuery.size();
					++listIndex1) {
				strVar = env.compile.vctVariableIdentifiersInQuery.get(listIndex1);
				pCLContr = (VariableIndexPairList) recUnif.get(strVar);
				indVar = 0;
				
				String sValue = null;
				
				if ((pCLContr != null) && (pCLContr.ValInd != null) &&
						env.bConvResultToString) {
					alternatePrintString = "";
					clearPrintedString();
					printPrologData(pCLContr.ValInd.pData,
							pCLContr.ValInd.index); // Ecriture dans alternatePrintString
					sValue = alternatePrintString;
					alternatePrintString = "";
					clearPrintedString();
					hashResult.put(strVar, sValue);
				} else if ((pCLContr != null) && (pCLContr.ValInd != null)) {
					// Creer une forme instanciee de la donnee, similaire a assertTerm
					alternatePrintString = "";
					clearPrintedString();
					printPrologData(pCLContr.ValInd.pData,
							pCLContr.ValInd.index); // Ecriture dans alternatePrintString
					
					Vector<String> unVct = null;
					
					try {
						unVct = env.compile.compileAlternatePrintString(alternatePrintString);
					} catch (CompileException cpExc) {
						// This could possibly happen
					}
					
					alternatePrintString = "";
					clearPrintedString();
					
					hashResult.put(strVar, unVct.toString());
				} else {
					sValue = "FREE";
					hashResult.put(strVar, sValue);
				}
			}
			
			strVar = null;
			pCLContr = null;
			
			env.vctResult.addElement(hashResult);
		}
		
		recUnif = null;
	}
}
