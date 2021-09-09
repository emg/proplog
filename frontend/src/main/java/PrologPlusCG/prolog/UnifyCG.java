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

import java.util.Vector;

import PrologPlusCG.cg.CG;
import PrologPlusCG.cg.Concept;
import PrologPlusCG.cg.Relation;
import PrologPlusCG.prolog.PPCGEnv;


public class UnifyCG implements DataTypes {
    final byte e_inComeBranch = 0;
    final byte e_outComeBranch = 1;
    Vector<ConceptUnification> CMatchL;
    Vector<RelationUnification> RMatchL;

    private PPCGEnv env = null;
    
    public UnifyCG(PPCGEnv myenv) {
    	env = myenv;
        CMatchL = new Vector<ConceptUnification>();
        RMatchL = new Vector<RelationUnification>();
    }

    void CMatchL_MakeEmpty() {
        ConceptUnification aCMatch;

        for (int listIndex1 = 0;
        		listIndex1 < CMatchL.size(); 
        		listIndex1++) {
            aCMatch = CMatchL.get(listIndex1);
            aCMatch.myDestroy();
        }
		CMatchL.clear();
    }

    void RMatchL_MakeEmpty() {
        RelationUnification aRMatch;

        for (int listIndex1 = 0;
        		listIndex1 < RMatchL.size(); 
        		++listIndex1) {
            aRMatch = RMatchL.get(listIndex1);
            aRMatch.myDestroy();
        }
		RMatchL.clear();
    }

    // ------------------------------------------------------------------
    boolean sameNameRel(PrologData pDataLeft, PrologData pDataRight,
        int indexLeft, int indexRight) throws ExecException {
        // Traitement similaire a UnifyType
        // Considerer en premier le cas ou un des types est une variable
        PrologDataIndexPair valIndexLeft = env.unification.valueFromUnifStack(pDataLeft, indexLeft);
        PrologDataIndexPair valIndexRight = env.unification.valueFromUnifStack(pDataRight, indexRight);
        boolean bResult = true;

        if ((valIndexLeft.pData == null) && (valIndexRight.pData != null)) {
			// pDataLeft is a free variable and pDataRight is a value
            env.unification.addConstraint2(valIndexRight.pData, valIndexRight.index,
                (String) pDataLeft.data, indexLeft);
        } else if ((valIndexLeft.pData != null) && (valIndexRight.pData == null)) {
			// pDataLeft is a value and pDataRight is a free variable
            env.unification.addConstraint2(valIndexLeft.pData, valIndexLeft.index,
                (String) pDataRight.data, indexRight);
        } else if ((valIndexLeft.pData == null) && (valIndexRight.pData == null)) {
			// Both are free variables
            env.unification.addConstraint3((String) pDataLeft.data, indexLeft,
                (String) pDataRight.data, indexRight);
        } else {
			// Both data objects are particular types (values) 

            Object pData1Left;
            Object pData1Right;
            pData1Left = valIndexLeft.pData.data;
            pData1Right = valIndexRight.pData.data;

            String strData1 = (String) pData1Left;
            String strData2 = (String) pData1Right;
            bResult = strData1.equals(strData2);
        }
        return bResult;
    }

    // --------------------------------------------------------------
    // G1 represente soit le but courant ou un arg du predicat-but courant
    // G2 represente soit la tete , soit un arg de la tete
    boolean UnifyGC(CG G1, int nivG1, CG G2, int nivG2)
        throws ExecException {
        boolean BRes = false;

        if ((G1.m_vctRelations.size() > G2.m_vctRelations.size()) ||
                !bagInclusion(G1.m_vctRelations, G2.m_vctRelations, nivG1, nivG2)) {
            BRes = false;
        } else {
            BRes = computeEntryPointsAndUnify(G1, nivG1, G2, nivG2);
        }

        env.unification.makeEmpty_vctContstraints();

        return BRes;
    }

    // ---------------------------------------------------------------
    boolean bagInclusion(Vector<Relation> lr1, Vector<Relation> lr2, int nivG1, int nivG2)
        throws ExecException {
        Vector<Relation> lst = new Vector<Relation>();
        Relation rla1 = null;
        Relation rla2 = null;
        boolean bFound;

        for (int listIndex1 = 0;
        		listIndex1 < lr1.size(); 
        		++listIndex1) {
            rla1 = lr1.get(listIndex1);
            bFound = false;

            for (int listIndex2 = 0;
            		listIndex2 < lr2.size() && !bFound;
            		++listIndex2) {
                rla2 = lr2.get(listIndex2);

                if (sameNameRel(rla1.m_pdRelationName, rla2.m_pdRelationName, nivG1, nivG2) &&
                        !lst.contains(rla2)) {
                    bFound = true;
                }
            }

            if (bFound) {
                lst.addElement(rla2);
            } else {
                lst.clear();
                lst = null;

                return false;
            }
        }

        lst.clear();
        lst = null;

        return true;
    }

    // ------------------------------------------------------------------
    boolean computeEntryPointsAndUnify(CG G1, int levelG1, CG G2, int levelG2)
        throws ExecException {
        boolean bResult = false;
        Concept C1;
        Concept C2;

        if ((G1.m_vctConcepts.size() == 1) && G1.m_vctRelations.isEmpty()) {
            C1 = (Concept) G1.m_vctConcepts.get(0);

            for (int listIndex = 0;
            		listIndex < G2.m_vctConcepts.size()  && !bResult;
            		listIndex++) {
                C2 = G2.m_vctConcepts.get(listIndex);
                bResult = UnifyConcept(C1, C2, levelG1, levelG2);

                if (!bResult) {
                    env.unification.removeConstraints();
                }
            }
        } else {
            Vector<Concept> vConcs = new Vector<Concept>(2);

            if (identRef(G1, levelG1, G2, levelG2, vConcs)) {
                C1 = (Concept) vConcs.get(0);
                C2 = (Concept) vConcs.elementAt(1);
                bResult = unifyWithBack(C1, C2, null, null, G1, levelG1, levelG2);
                vConcs.clear();
                vConcs = null;
            } else {
                vConcs.clear(); // a cause de la creation inutile ici de vConcs

                Relation rl1 = (Relation) G1.m_vctRelations.get(0);
                Relation rl2;

                for (int listIndex2 = 0;
                		listIndex2 < G2.m_vctRelations.size()  && !bResult;
                        listIndex2++) {
                    rl2 = G2.m_vctRelations.get(listIndex2);

                    if (sameNameRel(rl1.m_pdRelationName, rl2.m_pdRelationName, levelG1, levelG2)) {
                        bResult = unifyWithBack(rl1.m_concSource, rl2.m_concSource,
                                rl1.m_concDestination, rl2.m_concDestination, 
                                G1, levelG1, levelG2);
                    }
                }
            }
        }

        CMatchL_MakeEmpty();
        RMatchL_MakeEmpty();

        return bResult;
    }

    // ------------------------------------------------------------------
    // ---- determine points d'entree par identite des referents ////
    public boolean identRef(CG G1, int nivG1, CG G2, int nivG2, Vector<Concept> vConcs) {
        Concept C1 = null;
        Concept C2 = null;
        String sRef1;
        Object sRef2;
        boolean bResult = false;

        // Premiere passe pour identifier un referent de G1 avec un ref de G2 ou
        // ... comme elem appartenant a un ensemble
        for (int listIndex1 = 0;
        		listIndex1 < G1.m_vctConcepts.size() && !bResult;
        		++listIndex1) {
            C1 = G1.m_vctConcepts.get(listIndex1);
            sRef1 = individu(C1.m_pdReferent, nivG1);

            if (sRef1 != null) {
                for (int listIndex2 = 0;
                		listIndex2 < G2.m_vctConcepts.size() && !bResult;
                		++listIndex2) {
                    C2 = G2.m_vctConcepts.get(listIndex2);
                    sRef2 = individu2(C2.m_pdReferent, nivG2);

                    if ((sRef2 != null) && (sRef2 instanceof String)) {
                        bResult = sRef1.equals(sRef2);
                    } else if (sRef2 != null && sRef2 instanceof PrologList) {
                        bResult = env.compile.hasString(sRef1, (PrologList) sRef2);
                    }
                }
            }
        }

        if (!bResult) {
            // Seconde passe : on tentera de cherchera un referent-ensemble qui pourrait
            // s'unifier avec un ensemble correspondant
            PrologList ensRef1;

            // Seconde passe : on tentera de cherchera un referent-ensemble qui pourrait
            // s'unifier avec un ensemble correspondant
            PrologList ensRef2 = null;

            for (int listIndex3 = 0;
            		listIndex3 < G1.m_vctConcepts.size() && !bResult;
            		++listIndex3) {
                C1 = G1.m_vctConcepts.get(listIndex3);

                // individu3 cherche uniquement les referents-ensemble
                ensRef1 = individu3(C1.m_pdReferent, nivG1);

                if (ensRef1 != null) {
                    for (int listIndex4 = 0;
                    		listIndex4 < G2.m_vctConcepts.size()  && !bResult;
                         ++listIndex4) {
                        C2 = G2.m_vctConcepts.get(listIndex4);
                        ensRef2 = individu3(C2.m_pdReferent, nivG2);

                        if (ensRef2 != null) {
                            bResult = env.compile.setsAreEqual(ensRef1, ensRef2);
                        }
                    }
                }
            }
        }

        if (bResult) {
            vConcs.addElement(C1);
            vConcs.addElement(C2);
        }

        return bResult;
    }

    // elle ne considere pas le cas d'un referent comme ensemble
    String individu(PrologData Ref, int ind) {
        if (Ref == null) {
            return null;
        }

        PrologDataIndexPair ValRef = env.unification.valueFromUnifStack(Ref, ind);

        if (ValRef.pData == null) {
            return null;
        } else if (ValRef.pData.data instanceof String) {
            return (String) ValRef.pData.data;
        } else {
            return null;
        }
    }

    // Elle tient compte aussi du cas ou le referent est un ensemble
    Object individu2(PrologData Ref, int ind) {
        if (Ref == null) {
            return null;
        }

        PrologDataIndexPair ValRef = env.unification.valueFromUnifStack(Ref, ind);

        if (ValRef.pData == null) {
            return null;
        } else {
            return ValRef.pData.data;
        }
    }

    PrologList individu3(PrologData Ref, int ind) {
        if (Ref == null) {
            return null;
        }

        PrologDataIndexPair ValRef = env.unification.valueFromUnifStack(Ref, ind);

        if (ValRef.pData == null) {
            return null;
        } else if (ValRef.pData.data instanceof PrologList) {
            return (PrologList) ValRef.pData.data;
        } else {
            return null;
        }
    }

    // ------------------------------------------------------------------
    boolean unifyWithBack(Concept Cs1, Concept Cs2, Concept Ct1, Concept Ct2,
        CG G1, int levelG1, int levelG2) throws ExecException {
        boolean bResult = UnifyConcept(Cs1, Cs2, levelG1, levelG2) &&
            ((Ct1 == null) || UnifyConcept(Ct1, Ct2, levelG1, levelG2)) &&
            propagateUnifyCG(G1, levelG1, levelG2);

        if (!bResult) {
            env.unification.removeConstraints();
        }

        CMatchL_MakeEmpty();
        RMatchL_MakeEmpty();

        return bResult;
    }

    // ------------------------------------------------------------------
    boolean propagateUnifyCG(CG G1, int nivG1, int nivG2)
        throws ExecException {
        boolean BRes = true;
        boolean trouve = true;

        while (BRes && trouve) {
            ConceptUnification E = null;
            trouve = false;

            /***  1. Trouver un couple de concepts dont l'unification locale
                             n'est pas encore effectuee      *****/
            for (int listIndex1 = 0;
            		listIndex1 < CMatchL.size() && !trouve;
            		++listIndex1) {
                E = CMatchL.get(listIndex1);
                trouve = (!E.m_MatchedLocally);
            }

            // Effectuer l'unification locale concernant le couple de concepts localise
            if (trouve) {
                BRes = UnifyBranchs(e_outComeBranch, E.m_ConcMatched1, 
                        E.m_ConcMatched2, nivG1, nivG2) &&
                    UnifyBranchs(e_inComeBranch, E.m_ConcMatched1, 
                        E.m_ConcMatched2, nivG1, nivG2);

                if (BRes) {
                    E.m_MatchedLocally = true;
                }
            }
        }

        return (BRes && postUnify(G1));
    }

    // ------------------------------------------------------------------
    boolean UnifyBranchs(byte BranchDirection, Concept C1, Concept C2,
        int nivG1, int nivG2) throws ExecException {
        boolean bResult = true;
        Relation rel1;
        boolean bAlreadyUnified;
        Vector<Relation> vRels1 = null;

        if (BranchDirection == e_inComeBranch) {
            vRels1 = C1.m_vctIncomingRelations;
        } else {
            vRels1 = C1.m_vctOutgoingRelations;
        }

        // Unifier toutes les branches de vRels1
        for (int listIndex1 = 0;
        		listIndex1 < vRels1.size() && bResult;
        		++listIndex1) {
            rel1 = vRels1.get(listIndex1);
            bAlreadyUnified = false;

            RelationUnification E = null;

            for (int listIndex2 = 0;
            		listIndex2 < RMatchL.size() && !bAlreadyUnified;
            		++listIndex2) {
                E = RMatchL.get(listIndex2);
                bAlreadyUnified = (rel1 == E.m_RelMatched1);
            }

            if (!bAlreadyUnified) {
                bResult = UnifyTheBranch(BranchDirection, rel1, C2, nivG1,
                        nivG2);
            } else {
                bResult = unificationIsValid(BranchDirection, C2, E.m_RelMatched1,
                        E.m_RelMatched2);
            }
        }

        return bResult;
    }

    boolean unificationIsValid(byte BranchDirection, Concept C2,
        Relation rel1, Relation rel2) {
        Concept Ca1;
        Concept Ca2;
        boolean bResult = false;

        if (BranchDirection == e_inComeBranch) {
            Ca1 = rel1.m_concSource;
            Ca2 = rel2.m_concSource;
            bResult = (C2 == rel2.m_concDestination);
        } else {
            Ca1 = rel1.m_concDestination;
            Ca2 = rel2.m_concDestination;
            bResult = (C2 == rel2.m_concSource);
        }

        if (bResult) {
            ConceptUnification E = inCMatchL(Ca1, Ca2);

            /***  Verify that the pair (Ca1, Ca2) exists in concMatchVec *****/
            if (E != null) {
                bResult = ((E.m_ConcMatched1 == Ca1) && (E.m_ConcMatched2 == Ca2));
            } else {
                bResult = false;
            }
        }

        return bResult;
    }

    /***  Verify that the pair (Ca1, Ca2) exists in concMatchVec *****/
    ConceptUnification inCMatchL(Concept Ca1, Concept Ca2) {
        boolean BRes = false;
        ConceptUnification E = null;

        for (int listIndex1 = 0;
        		listIndex1 < CMatchL.size() && !BRes;
        		++listIndex1) {
            E = CMatchL.get(listIndex1);

            if ((E.m_ConcMatched1 == Ca1) || (E.m_ConcMatched2 == Ca2)) {
                BRes = true;
            }

            /*{
                  BRes = E.m_ConcMatched1 == Ca1 && E.m_ConcMatched2 == Ca2;
                  break;
            }; ***/
        }

        if (BRes) {
            return E;
        } else {
            return null;
        }
    }

    // ------------------------------------------------------------------
    boolean UnifyTheBranch(byte BranchDirection, Relation rel1, Concept C2,
        int nivG1, int nivG2) throws ExecException {
        // Chercher une branche de G2 ayant meme ident de relation
        boolean BRes = false;
        Relation rel2 = null;
        Vector<Relation> vRels;

        if (BranchDirection == e_inComeBranch) {
            vRels = C2.m_vctIncomingRelations;
        } else {
            vRels = C2.m_vctOutgoingRelations;
        }

        for (int listIndex1 = 0;
        		listIndex1 < vRels.size() && !BRes;
        		++listIndex1) {
            rel2 = vRels.get(listIndex1);

            if (sameNameRel(rel1.m_pdRelationName, rel2.m_pdRelationName, nivG1, nivG2)) {
                BRes = true;
            }
        }

        if (BRes) {
            // Tester que rel2 n'a pas encore ete unifiee
            boolean bAlreadyUnified = false;
            RelationUnification Er;

            for (int listIndex2 = 0;
            		listIndex2 < RMatchL.size() && !bAlreadyUnified;
            		++listIndex2) {
                Er = RMatchL.get(listIndex2);
                bAlreadyUnified = (rel2 == Er.m_RelMatched2);
            }

            /** Already unified with another branch.  Situation is
             * impossible for functional CGs.  Therefore, return
             * false. **/
            if (bAlreadyUnified) {
                return false;
            }

            // On a localise une branche qu'on pourrait considerer pour l'unification
            Concept Ca1;

            // On a localise une branche qu'on pourrait considerer pour l'unification
            Concept Ca2;
            Ca1 = Ca2 = null;

            if (BranchDirection == e_inComeBranch) {
                Ca1 = rel1.m_concSource;
                Ca2 = rel2.m_concSource;
            } else {
                Ca1 = rel1.m_concDestination;
                Ca2 = rel2.m_concDestination;
            }

            ConceptUnification E = inCMatchL(Ca1, Ca2);

            /***  Verify that the pair (Ca1, Ca2) exists in concMatchVec *****/
            if (E != null) {
                BRes = ((E.m_ConcMatched1 == Ca1) && (E.m_ConcMatched2 == Ca2));
            } else {
                BRes = UnifyConcept(Ca1, Ca2, nivG1, nivG2);
            }

            if (BRes) {
                RMatchL.addElement(new RelationUnification(rel1, rel2));
            }
        }

        return BRes;
    }

    // ------------------------------------------------------------------
    boolean postUnify(CG G1) {
        boolean BRes = true;
        Relation R;

        for (int listIndex1 = 0;
        		listIndex1 < G1.m_vctRelations.size() && BRes;
        		++listIndex1) {
            R = G1.m_vctRelations.get(listIndex1);
            BRes = false;

            RelationUnification er;

            for (int listIndex2 = 0;
            		listIndex2 < RMatchL.size() && !BRes;
            		++listIndex2) {
                er = RMatchL.get(listIndex2);
                BRes = (R == er.m_RelMatched1);
            }
        }
        return BRes;
    }

    // ------------------------------------------------------------------
    boolean UnifyConcept(Concept C1, Concept C2, int nivG1, int nivG2)
        throws ExecException {
        boolean BRes = false;

        if (UnifyConc(C1, C2, nivG1, nivG2)) {
            CMatchL.addElement(new ConceptUnification(C1, C2, false));
            BRes = true;
        }
        return BRes;
    }

    // ------------------------------------------------------------------
    boolean UnifyConc(Concept C1, Concept C2, int nivG1, int nivG2)
        throws ExecException {
        boolean BRes = true;

        if ((C1.m_pdType == null) || (C2.m_pdType == null)) {
            PrologData Don1 = null;
            PrologData Don2 = null;

            if (C1.m_pdType == null) {
                Don1 = C1.m_pdReferent;
            } else {
                Don1 = new PrologData(uConcept, C1);
            }

            if (C2.m_pdType == null) {
                Don2 = C2.m_pdReferent;
            } else {
                Don2 = new PrologData(uConcept, C2);
            }

            BRes = env.unification.unify(Don1, nivG1, Don2, nivG2);
        } else {
            String Type3 = UnifyTyp(C1.m_pdType, C2.m_pdType, nivG1, nivG2);
            BRes = !Type3.equals("Absurd") &&
                UnifyRef(C1.m_pdReferent, C2.m_pdReferent, nivG1, nivG2) &&
                conform(C2.m_pdReferent, nivG2, Type3) &&
                UnifyValue(C1.m_pdValue, C2.m_pdValue, nivG1, nivG2);
        }
        return BRes;
    }

    // ------------------------------------------------------------------
    String UnifyTyp(PrologData pDonGch, PrologData pDonDrt,
        int indGch, int indDrt) throws ExecException {
        // Considerer en premier le cas ou un des types est une variable
        PrologDataIndexPair ValIndGch = env.unification.valueFromUnifStack(pDonGch, indGch);
        PrologDataIndexPair ValIndDrt = env.unification.valueFromUnifStack(pDonDrt, indDrt);
        String Type3 = null;

        if ((ValIndGch.pData == null) && (ValIndDrt.pData != null)) {
            // pDonGch une variable_free et pDonDrt une valeur
            env.unification.addConstraint2(ValIndDrt.pData, ValIndDrt.index,
                (String) pDonGch.data, indGch);
            Type3 = (String) ValIndDrt.pData.data;
        } else if ((ValIndGch.pData != null) && (ValIndDrt.pData == null)) {
            // pDonGch une valeur et pDonDrt une variable_free
            env.unification.addConstraint2(ValIndGch.pData, ValIndGch.index,
                (String) pDonDrt.data, indDrt);
            Type3 = (String) ValIndGch.pData.data;
        } else if ((ValIndGch.pData == null) && (ValIndDrt.pData == null)) {
            // les deux sont des variable_free
            env.unification.addConstraint3((String) pDonGch.data, indGch,
                (String) pDonDrt.data, indDrt);
        } else { // Les deux donn?es sont des types particuliers

            Object pDon1Gch;
            Object pDon1Drt;
            pDon1Gch = ValIndGch.pData.data;
            pDon1Drt = ValIndDrt.pData.data;

            String sDon1 = (String) pDon1Gch;
            String sDon2 = (String) pDon1Drt;

            if (env.typeHierarchy == null) {
                throw new ExecException(
                    "Error : No type hierarchy is specified (a CG operation needs it).");
            }

            if (sDon1.equals(sDon2)) {
                Type3 = sDon1;
            } else {
                Type3 = env.typeHierarchy.maxComSubType(sDon1,
                        sDon2);
            }
        }

        if (Type3 == null) {
            System.out.println(
                "Warning: At least one of the types should be a specific type.");
            Type3 = "Absurd";
        }
        return Type3;
    }

    // ------------------------------------------------------------------
    boolean UnifyRef(PrologData Ref1, PrologData Ref2, int nivG1,
        int nivG2) throws ExecException {
        if ((Ref1 == null) || (Ref2 == null)) {
            return true;
        }

        PrologDataIndexPair ValIndGch = env.unification.valueFromUnifStack(Ref1, nivG1);
        PrologDataIndexPair ValIndDrt = env.unification.valueFromUnifStack(Ref2, nivG2);

        if ((ValIndGch.pData != null) &&
                (ValIndGch.pData.typeOfData != uIdentifier) &&
                (ValIndGch.pData.typeOfData != uString) &&
                (ValIndGch.pData.typeOfData != uSet)) {
            throw new ExecException("Error: the referent " +
                Ref1.data.toString() +
                "is not a variable, an identifier, a string or a set.");
        }

        if ((ValIndDrt.pData != null) &&
                (ValIndDrt.pData.typeOfData != uIdentifier) &&
                (ValIndDrt.pData.typeOfData != uString) &&
                (ValIndDrt.pData.typeOfData != uSet)) {
            throw new ExecException("Error: the referent " +
                Ref1.data.toString() +
                "is not a variable, an identifier, a string or a set.");
        }

        if ((ValIndGch.pData != null) && (ValIndDrt.pData != null) &&
                ((ValIndGch.pData.typeOfData == uIdentifier) ||
                (ValIndGch.pData.typeOfData == uString)) &&
                (ValIndDrt.pData.typeOfData == uSet)) {
            return env.compile.hasString((String) ValIndGch.pData.data,
                (PrologList) ValIndDrt.pData.data);
        } else {
            return env.unification.unify(Ref2, nivG2, Ref1, nivG1); // unifier prend l'inverse : unifier(Tete, nivT, But, nivB)
        }
    }

    // ------------------------------------------------------------------
    boolean UnifyValue(PrologData Val1, PrologData Val2, int nivG1,
        int nivG2) throws ExecException {
        if ((Val1 == null) || (Val2 == null)) {
            return true;
        } else {
            return env.unification.unify(Val2, nivG2, Val1, nivG1); // unifier prend l'inverse : unifier(Tete, nivT, But, nivB)
        }
    }

    // ------------------------------------------------------------------
    public boolean conform(PrologData Ref, int niv, String Typ)
        throws ExecException {
        if (Ref == null) {
            return true;
        }

        boolean bResult = false;
        PrologDataIndexPair contr = env.unification.valueFromUnifStack(Ref, niv);

        if (env.typeHierarchy == null) {
            throw new ExecException(
                "Error : No type hierarchy is specified (a CG operation needs it).");
        }

        if (contr.pData == null) {
            bResult = true; // le cas d'une variable libre
        } else if (contr.pData.data instanceof String) {
            String st = (String) contr.pData.data;

            if (st.equals("super")) {
                bResult = true;
            } else {
                bResult = env.typeHierarchy.isInstanceOf((String) contr.pData.data,
                        Typ);
            }
        } else { // Traiter le cas d'un referent-ensemble

            PrologList refEns = (PrologList) contr.pData.data;

            // tester que chaque elem est conforme au type
            bResult = true;

            PrologData tmpData = null;

            for (int listIndex = 0;
            		listIndex < refEns.size() && bResult;
            		++listIndex) {
                tmpData = (PrologData) refEns.get(listIndex);
                bResult = env.typeHierarchy.isInstanceOf((String) tmpData.data,
                        Typ);
            }
        }
        return bResult;
    }
}
