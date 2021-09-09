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

import java.util.Hashtable;
import java.util.Vector;


public class TypeHierarchy implements DataTypes {
	Vector<IdentifierIndexPair> vctAscDescTyp1 = new Vector<IdentifierIndexPair>();
	Vector<String> vctAscDescTyp2 = new Vector<String>();
	int FirstSonFatherList1 = 0;
	int LastSonFatherList1 = 0;
	int FirstSonFatherList2 = 0;
	int LastSonFatherList2 = 0;
	boolean descendant = true;
	Hashtable<String, DataTypeVectorPair> hierarchy;
	
	private PPCGEnv env = null;
	
	// entree : <IdentType, (Vector d'Ident des types fils, Vector .. des peres)>
	public TypeHierarchy(PPCGEnv myenv) {
		hierarchy = new Hashtable<String, DataTypeVectorPair>();
		env = myenv;
	}
	
	public void createTypeHierarchy() {
		RuleVector pRules = (RuleVector) env.program.get(env.compile.valSysSP);
		PrologRule aRule;
		PrologTerm aTerm;
		PrologTerm headTerm;
		PrologData aPrologData;
		String idTypeHead;
		String identType;
		Vector<String> vctIdents;
		DataTypeVectorPair cpleVct2;
		
		// 1. Identifier les fils de tout type
		for (int listElement = 0;
				listElement < pRules.size();
				++listElement) {
			aRule = pRules.get(listElement);
			headTerm = (PrologTerm) aRule.firstElement();
			aPrologData = headTerm.get(0);
			idTypeHead = (String) aPrologData.data;
			vctIdents = new Vector<String>();
			
			for (int listIndex = 0;
				listIndex < aRule.size();
				++listIndex) {
				aTerm = (PrologTerm) aRule.get(listIndex);
				aPrologData = aTerm.get(0);
				identType = (String) aPrologData.data;
				vctIdents.addElement(identType);
				
				cpleVct2 = (DataTypeVectorPair) this.get(identType);
				
				if (cpleVct2 == null) {
					cpleVct2 = new DataTypeVectorPair(null, new Vector<String>());
					put(identType, cpleVct2);
				}
				cpleVct2.vectFathers.addElement(idTypeHead);
			}
			
			cpleVct2 = (DataTypeVectorPair) this.get(idTypeHead);
			
			if (cpleVct2 != null) {
				cpleVct2.vctSons = vctIdents;
			} else {
				put(idTypeHead, new DataTypeVectorPair(vctIdents, new Vector<String>()));
			}
		}
		
		// 2. Identifier les peres de chaque type
		
		/**
		 String unType, typeFils;
		 DataTypeVectorPair unCpleVctTypes, cpleVct2;
		 for (Enumeration eTypes = this.keys(); eTypes.hasMoreElements(); ) {
		 unType = (String) eTypes.nextElement();
		 unCpleVctTypes = (DataTypeVectorPair) this.get(unType);
		 
		 for (Enumeration e2 = unCpleVctTypes.vctFils.elements(); e2.hasMoreElements(); ) {
		 typeFils = (String) e2.nextElement();
		 cpleVct2 = (DataTypeVectorPair) this.get(typeFils);
		 if (cpleVct2 == null) {
		 cpleVct2 = new DataTypeVectorPair(null, new Vector());
		 put(typeFils, cpleVct2);
		 };
		 cpleVct2.vctPeres.addElement(unType);
		 };
		 };  *******/
	}
	
	private void put(String idTypeHead, DataTypeVectorPair dataTypeVectorPair) {
		hierarchy.put(idTypeHead,  dataTypeVectorPair);
	}

	private DataTypeVectorPair get(String identType) {
		return hierarchy.get(identType);
	}

	void addInstance(String Ref, String identType) throws ExecException {
		if (this.get(identType) == null) {
			throw new ExecException("Error: " + identType +
			" is not a declared type.\n");
		}
		
		RuleVector pRules = (RuleVector) env.program.get(env.compile.valSysINST);
		PrologRule aRule = null;
		
		if (pRules == null) { // Aucune regle d'instantiation n'existe,
			
			// .. on cree un paquet pour
			pRules = new RuleVector();
			env.program.put(env.compile.valSysINST, pRules);
		}
		
		// On parcourt le paquet des regles-instances a la recherche de la regle
		// pour le type en argument
		boolean bFound = false;
		PrologTerm aTerm = null;
		String id = null;
		
		for (int listIndex = 0;
				listIndex < pRules.size() && !bFound;
				++listIndex) {
			aRule = pRules.get(listIndex);
			aTerm = aRule.firstElement();
			id = (String) aTerm.getAt(0).data;
			
			if (id.equals(identType)) {
				bFound = true;
			}
		}
		
		// Preparer l'ajout de l'instance
		byte typRef = 0;
		
		if (Ref.startsWith("\"")) {
			typRef = uString;
		} else {
			typRef = uIdentifier;
		}
		
		PrologData aPrologData = new PrologData(typRef, Ref);
		aTerm = new PrologTerm();
		aTerm.addData(aPrologData);
		
		if (!bFound) { // Le type n'a pas de regle d'instantiation,
			
			// .. on lui cree une
			aRule = new PrologRule();
			
			PrologTerm unTermTyp = new PrologTerm();
			unTermTyp.addData(new PrologData(uIdentifier, identType));
			aRule.addTerm(unTermTyp);
			pRules.addRule(aRule);
		}
		
		aRule.addTerm(aTerm);
	}
	
	//---------- Operations sur la hierarchie des types ----------
	boolean isInstanceOf(String Ref, String Typ) throws ExecException {
		RuleVector pRules = (RuleVector) env.program.get(env.compile.valSysINST);
		
		if (pRules == null) {
			throw new ExecException(
			"Error, instance rules are not specified.\n");
		}
		
		String typeRef = null;
		PrologRule aRule;
		
		// Cherche le type dont Ref est declaree comme instance
		// On parcourt le paquet des regles-instances
		for (int listIndex = 0;
				listIndex < pRules.size() && (typeRef == null);
				++listIndex) {
			aRule = pRules.get(listIndex);
			
			PrologTerm unTerme;
			
			for (int listIndex2 = 0;
					listIndex2 < aRule.size();
					++listIndex2) {
			
				unTerme = aRule.get(listIndex2);
				
				String id = (String) unTerme.getAt(0).data;
				
				if (Ref.equals(id)) {
					PrologTerm trmTmp = (PrologTerm) aRule.firstElement();
					typeRef = (String) trmTmp.getAt(0).data;
				}
			}
		}
		
		if (typeRef == null) {
			throw new ExecException("Error : " + Ref +
			" is not declared as an instance of any type.\n");
		} else {
			return isSubType(typeRef, Typ);
		}
	}
	
	public boolean isSubType(String Type1, String Type2) throws ExecException { // Type1 isSubType of Type2 ?
		
		// Cette definition utilise maxComSubType
		// Elle ne permet pas de generer tous subtypes du type au cas ou le type n'est pas fourni
		String Type3 = maxComSubType(Type1, Type2);
		
		return Type3.equals(Type1);
	}
	
	public boolean isSuperType(String Type1, String Type2) throws ExecException { // Type1 isSuperType of Type2 ? 
		
		String Type3 = minComSuperType(Type1, Type2);
		
		return Type3.equals(Type1);
	}
	
	PrologData immediateSubTypes(String Type) throws ExecException {
		return immediateSuccessors(Type, true);
	}
	
	PrologData immediateSuperTypes(String Type) throws ExecException {
		return immediateSuccessors(Type, false);
	}
	
	PrologData immediateSuccessors(String Type, boolean isFilsDir)
	throws ExecException {
		Vector<String> vctTypeSonsFathers;
		DataTypeVectorPair cpleVctTypes;
		cpleVctTypes = (DataTypeVectorPair) get(Type); // chercher de la hierarchie des types les FsPr immediat du type arg.
		
		if (cpleVctTypes == null) {
			throw new ExecException("Error : The concept type " + Type +
			" is not specified in the type hierarchy.\n");
		}
		
		if (isFilsDir) {
			vctTypeSonsFathers = cpleVctTypes.vctSons;
		} else {
			vctTypeSonsFathers = cpleVctTypes.vectFathers;
		}
		
		PrologList uneListe = new PrologList();
		
		if (vctTypeSonsFathers != null) {
			String T = null;
			
			for (int listIndex3 = 0;
					listIndex3 < vctTypeSonsFathers.size(); 
					++listIndex3) {
				T = vctTypeSonsFathers.get(listIndex3);
				uneListe.addData(new PrologData(uIdentifier, T));
			}
		}
		
		return new PrologData(uList, uneListe);
	}
	
	PrologData subTypes(String Type) throws ExecException {
		return successor(Type, true);
	}
	
	PrologData superTypes(String Type) throws ExecException {
		return successor(Type, false);
	}
	
	PrologData successor(String Type, boolean isSonsDirection)
	throws ExecException {
		Vector<String> vctTypeDscds = new Vector<String>();
		
		if (get(Type) == null) {
			throw new ExecException("Error : The concept type " + Type +
			" is not specified in the type hierarchy.\n");
		}
		
		vctTypeDscds.addElement(Type); // initialiser la file vctTypeDscds
		
		// Parcourir en largeur du vecteur, element par element,
		// pour l'element courant, ajouter ses fils (sans redondance)
		// dans le vecteur ...
		DataTypeVectorPair cpleVctTypes;
		Vector<String> vctTypeSonsFathers;
		String currType;
		String type2;
		int tailleVctFsPr;
		
		for (int ind = 0; ind < vctTypeDscds.size(); ind++) {
			currType = (String) vctTypeDscds.elementAt(ind);
			cpleVctTypes = (DataTypeVectorPair) get(currType); // chercher de la hierarchie des types les FsPr immediat du type courant
			
			if (isSonsDirection) {
				vctTypeSonsFathers = cpleVctTypes.vctSons;
			} else {
				vctTypeSonsFathers = cpleVctTypes.vectFathers;
			}
			
			if (vctTypeSonsFathers != null) {
				tailleVctFsPr = vctTypeSonsFathers.size();
				
				for (int ind2 = 0; ind2 < tailleVctFsPr; ind2++) {
					type2 = (String) vctTypeSonsFathers.elementAt(ind2);
					
					// Verifier si le fils courant type2 de l'element courant currType existe deja dans la file vctTypeDscds
					boolean elemExist = false;
					String T = null;
					
					for (int listIndex4 = 0;
							listIndex4 < vctTypeDscds.size() && !elemExist;
							++listIndex4) {
						T = vctTypeDscds.get(listIndex4);
						elemExist = T.equals(type2);
					}
					
					if (!elemExist) {
						vctTypeDscds.addElement(type2);
					}
				}
			}
		}
		
		vctTypeDscds.removeElementAt(0);
		
		// a partir du vecteur de String, former une liste de DonneePrlg/string
		// et retourner la liste une DonneePrlg
		PrologList uneListe = new PrologList();
		
		if (vctTypeDscds != null) {
			String T = null;
			
			for (int listIndex5 = 0;
					listIndex5 < vctTypeDscds.size();
					++listIndex5) {
				T = vctTypeDscds.get(listIndex5);
				uneListe.addData(new PrologData(uIdentifier, T));
			}
		}
		
		return new PrologData(uList, uneListe);
	}
	
	//------- Operations sur la hierarchie des types ----
	public String minComSuperType(String Type1, String Type2)
	throws ExecException {
		if (!containsKey(Type1)) {
			throw new ExecException("Error : The concept type " + Type1 +
			" is not specified in the type hierarchy.\n");
		}
		
		if (!containsKey(Type2)) {
			throw new ExecException("Error : The concept type " + Type2 +
			" is not specified in the type hierarchy.\n");
		}
		
		descendant = false;
		vctAscDescTyp1.clear();
		vctAscDescTyp1.addElement(new IdentifierIndexPair(Type1, 0));
		vctAscDescTyp2.clear();
		vctAscDescTyp2.addElement(Type2);
		
		// FsPr dans PremFsPrCou1 designe Fils/Peres selon le parcours
		// descendant ou ascendant qu'on effectue, concernant maxComSubType / minComSuperType
		// cela est determin?e par la variable globale booleenne "descendant"
		FirstSonFatherList1 = LastSonFatherList1 = FirstSonFatherList2 = LastSonFatherList2 = 0;
		
		boolean bStop = false;
		String Type3 = getTypeInCommon();
		
		while (!bStop && (Type3 == null)) {
			if (!addNewSonsFathers1() && !addNewSonsFathers2()) {
				bStop = true;
			} else {
				Type3 = getTypeInCommon();
			}
		}
		
		if ((Type3 == null) || Type3.equals("Universal") ||
				Type3.equals("UNIVERSAL")) {
			return "Universal";
		} else {
			return Type3;
		}
	}
	
	private boolean containsKey(String type1) {
		return hierarchy.containsKey(type1);
	}

	public Vector<String> minComSuperTypes(String Type1, String Type2)
	throws ExecException {
		if (!containsKey(Type1)) {
			throw new ExecException("Error : The concept type " + Type1 +
			" is not specified in the type hierarchy.\n");
		}
		
		if (!containsKey(Type2)) {
			throw new ExecException("Error : The concept type " + Type2 +
			" is not specified in the type hierarchy.\n");
		}
		
		if (isSuperType(Type1, Type2)) {
			Vector<String> Types = new Vector<String>();
			Types.add(Type1);
			return Types;
		} else if (isSuperType(Type2, Type1)) {
			Vector<String> Types = new Vector<String>();
			Types.add(Type2);
			return Types;
		}
		descendant = false;
		vctAscDescTyp1.clear();
		vctAscDescTyp1.addElement(new IdentifierIndexPair(Type1, 0));
		vctAscDescTyp2.clear();
		vctAscDescTyp2.addElement(Type2);
		
		// FsPr dans PremFsPrCou1 designe Fils/Peres selon le parcours
		// descendant ou ascendant qu'on effectue, concernant maxComSubType / minComSuperType
		// cela est determin?e par la variable globale booleenne "descendant"
		FirstSonFatherList1 = LastSonFatherList1 = FirstSonFatherList2 = LastSonFatherList2 = 0;
		
		boolean bStop = false;
		while (!bStop) {
			if (!addNewSonsFathers1() && !addNewSonsFathers2()) {
				bStop = true;
			} 
		}
		
		Vector<String> Types3 = getMaxMinTypesInCommon();
		
		if ((Types3 == null) 
				|| ((String) Types3.elementAt(0)).toUpperCase().equals("UNIVERSAL")) {
			Vector<String> UniversalVector = new Vector<String>(1, 1);
			UniversalVector.add("Universal");
			return UniversalVector;
		} else {
			return Types3;
		}
	}
	
	public String maxComSubType(String Type1, String Type2) throws ExecException {
		if (!containsKey(Type1)) {
			throw new ExecException("Error : The concept type " + Type1 +
			" is not specified in the type hierarchy.\n");
		}
		
		if (!containsKey(Type2)) {
			throw new ExecException("Error : The concept type " + Type2 +
			" is not specified in the type hierarchy.\n");
		}
		
		descendant = true;
		vctAscDescTyp1.clear();
		vctAscDescTyp1.addElement(new IdentifierIndexPair(Type1, 0));
		vctAscDescTyp2.clear();
		vctAscDescTyp2.addElement(Type2);
		
		// SonFather in FirstSonFatherList1 designates Sons/Fathers 
		// according to the ascending or descending direction.
		// Concerning maxComSubType / minComSuperType: That is
		// determined by the global boolean variable "descendant".
		
		// FsPr dans FirstSonFatherList1 designe Fils/Peres selon le parcours
		// descendant ou ascendant qu'on effectue, concernant maxComSubType / minComSuperType
		// cela est determin?e par la variable globale booleenne "descendant"
		FirstSonFatherList1 = LastSonFatherList1 = FirstSonFatherList2 = LastSonFatherList2 = 0;
		
		boolean bStop = false;
		String Type3 = getTypeInCommon();
		
		while (!bStop && (Type3 == null)) {
			if (!addNewSonsFathers1() && !addNewSonsFathers2()) {
				bStop = true;
			} else {
				Type3 = getTypeInCommon();
			}
		}
		
		if ((Type3 == null) || Type3.equals("Absurd")) {
			return "Absurd";
		} else {
			return Type3;
		}
	}
	
	// Returns either a vector with one element (it being 
	// the string "Absurd"), or a vector with strings that
	// are maximal common subtypes of Type1 and Type2.
	public Vector<String> maxComSubTypes(String Type1, String Type2) throws ExecException {
		if (!containsKey(Type1)) {
			throw new ExecException("Error : The concept type " + Type1 +
			" is not specified in the type hierarchy.\n");
		}
		
		if (!containsKey(Type2)) {
			throw new ExecException("Error : The concept type " + Type2 +
			" is not specified in the type hierarchy.\n");
		}
		
		if (isSubType(Type1, Type2)) {
			Vector<String> Types = new Vector<String>();
			Types.add(Type1);
			return Types;
		} else if (isSubType(Type2, Type1)) {
			Vector<String> Types = new Vector<String>();
			Types.add(Type2);
			return Types;
		}
		
		descendant = true;
		vctAscDescTyp1.clear();
		vctAscDescTyp1.addElement(new IdentifierIndexPair(Type1, 0));
		vctAscDescTyp2.clear();
		vctAscDescTyp2.addElement(Type2);
		
		// SonFather in FirstSonFatherList1 designates Sons/Fathers 
		// according to the ascending or descending direction.
		// Concerning maxComSubType / minComSuperType: That is
		// determined by the global boolean variable "descendant".
		
		// FsPr dans FirstSonFatherList1 designe Fils/Peres selon le parcours
		// descendant ou ascendant qu'on effectue, concernant maxComSubType / minComSuperType
		// cela est determin?e par la variable globale booleenne "descendant"
		FirstSonFatherList1 = LastSonFatherList1 = FirstSonFatherList2 = LastSonFatherList2 = 0;
		
		boolean bStop = false;
		while (!bStop) {
			if (!addNewSonsFathers1() && !addNewSonsFathers2()) {
				bStop = true;
			}
		}
		
		Vector<String> Types3 = getMaxMinTypesInCommon();
		
		if ((Types3 == null) 
				|| ((String) Types3.elementAt(0)).toUpperCase().equals("ABSURD")) {
			Vector<String> AbsurdVector = new Vector<String>(1, 1);
			AbsurdVector.add("Absurd");
			return AbsurdVector;
		} else {
			return Types3;
		}
	}
	
	public String getTypeInCommon() { 
		// Does there exist in vctAscDescTyp1 an element which also
		// exists in vctAscDescTyp2? In that case, return it,
		// otherwise return null.
		String Type3 = null;
		IdentifierIndexPair unIdInd;
		String id2;
		
		for (int listIndex1 = 0;
				listIndex1 < vctAscDescTyp1.size() && (Type3 == null);
				++listIndex1) {
			unIdInd = vctAscDescTyp1.get(listIndex1);
			
			while ((unIdInd.index <= LastSonFatherList2) && (Type3 == null)) {
				id2 = (String) vctAscDescTyp2.elementAt(unIdInd.index);
				
				if (id2.equals(unIdInd.idType)) {
					Type3 = id2;
				} else {
					unIdInd.index++;
				}
			}
		}
		
		return Type3;
	}
	
	public Vector<String>  getMaxMinTypesInCommon() { 
		// MaxMinTypesInCommon
		// Finds elements that are in common between vctAscDescTyp1
		// and vctAscDescTyp2 and which do not have an ancestor/descendant
		// which is already in the vector to be returned.
		Vector<String> Types3 = null;
		IdentifierIndexPair unIdInd;
		String id2;
		
		for (int listIndex1 = 0;
				listIndex1< vctAscDescTyp1.size();
				++listIndex1) {
			unIdInd = vctAscDescTyp1.get(listIndex1);
			
			while ((unIdInd.index <= LastSonFatherList2)) {
				id2 = (String) vctAscDescTyp2.elementAt(unIdInd.index);
				
				if (id2.equals(unIdInd.idType)) {
					if (Types3 == null) {
						Types3 = new Vector<String>(10, 2);
					}
					boolean bSonOrFatherWasFound = false;
					try {
						for (int listIndex2 = 0;
								listIndex2 < Types3.size() && !bSonOrFatherWasFound;
								++listIndex2) {
							String Types3Typ = Types3.get(listIndex2);
							if (descendant) {
								// We are doing a minComSuperType...
								bSonOrFatherWasFound = isSubType(Types3Typ, id2);
							} else {
								// We are doing a maxComSubType
								bSonOrFatherWasFound = isSuperType(Types3Typ, id2);
							}
						}
					} catch (ExecException exc) {
						// That's OK, we won't get here...
					}
					if (!bSonOrFatherWasFound) {
						Types3.add(id2);
					}
				} 
				unIdInd.index++;
			}
		}
		
		return Types3;
	}
	
	private boolean addNewSonsFathers1() {
		boolean bSomeWereAdded = true;
		IdentifierIndexPair nIdIndex;
		String idSonFather;
		Vector<String> vctTypeSonsFathers;
		DataTypeVectorPair cpleVctTypes;
		
		while (FirstSonFatherList1 <= LastSonFatherList1) {
			nIdIndex = (IdentifierIndexPair) vctAscDescTyp1.elementAt(FirstSonFatherList1);
			
			
			// Fetch from the hierarchy of types the immediate sons/fathers
			// of the type argument.  Note that both are fetched.
			cpleVctTypes = (DataTypeVectorPair) get(nIdIndex.idType); 
			
			
			if (descendant) {
				vctTypeSonsFathers = cpleVctTypes.vctSons;
			} else {
				vctTypeSonsFathers = cpleVctTypes.vectFathers;
			}
			
			if (vctTypeSonsFathers != null) {
				for (int listIndex1 = 0;
						listIndex1 < vctTypeSonsFathers.size();
						++listIndex1) {
					idSonFather = vctTypeSonsFathers.get(listIndex1);
					vctAscDescTyp1.addElement(new IdentifierIndexPair(idSonFather, 0));
				}
			}
			FirstSonFatherList1++;
		}
		
		// A present, FirstSonFatherList1 designe ce qui viendra juste apres
		// l'ancien LastSonFatherList1, c-a-d le premier FsPr ajoute par cette iteration
		// Il faut aussi m-a-j LastSonFatherList1
		int Last = vctAscDescTyp1.size() - 1;
		
		if (LastSonFatherList1 == Last) {
			bSomeWereAdded = false;
		} else {
			LastSonFatherList1 = Last;
		}
		
		return bSomeWereAdded;
	}
	
	private boolean addNewSonsFathers2() {
		boolean bSomeWereAdded = true;
		String strId;
		String idSonFather;
		Vector<String> vctTypeSonsFathers;
		DataTypeVectorPair cpleVctTypes;
		
		while (FirstSonFatherList2 <= LastSonFatherList2) {
			strId = (String) vctAscDescTyp2.elementAt(FirstSonFatherList2);
			// Fetch from the hierarchy of types the immediate sons/fathers
			// of the type argument.
			cpleVctTypes = (DataTypeVectorPair) get(strId); 
			
			if (descendant) {
				vctTypeSonsFathers = cpleVctTypes.vctSons;
			} else {
				vctTypeSonsFathers = cpleVctTypes.vectFathers;
			}
			
			if (vctTypeSonsFathers != null) {
				for (int listIndex2 = 0;
						listIndex2 < vctTypeSonsFathers.size();
						++listIndex2) {
					idSonFather = vctTypeSonsFathers.get(listIndex2);
					vctAscDescTyp2.addElement(idSonFather);
				}
			}
			FirstSonFatherList2++;
		}
		
		int Last = vctAscDescTyp2.size() - 1;
		
		if (LastSonFatherList2 == Last) {
			bSomeWereAdded = false;
		} else {
			LastSonFatherList2 = Last;
		}
		
		return bSomeWereAdded;
	}

	public void clear() {
		hierarchy.clear();
	}
}
