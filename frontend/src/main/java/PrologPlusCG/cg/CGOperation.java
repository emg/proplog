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


package PrologPlusCG.cg;

import java.util.Enumeration;
import java.util.Vector;

import PrologPlusCG.prolog.PPCGEnv;
import PrologPlusCG.prolog.DataTypes;
import PrologPlusCG.prolog.ExecException;
import PrologPlusCG.prolog.PrologData;
import PrologPlusCG.prolog.PrologDataIndexPair;
import PrologPlusCG.prolog.PrologList;
import PrologPlusCG.prolog.UnifyCG;


public class CGOperation implements DataTypes {
	final byte e_inComeBranch = 0;
	final byte e_outComeBranch = 1;

	UnifyCG aUnifyCG = null;
	
	// corefMatchVec est commune aux instances de OperCG qui ont ete
	// instancie suite aux appels recursifs a OperCG
	Vector<CoreferenceMatch> corefMatchVec = new Vector<CoreferenceMatch>();
	byte[] setOpersId = {
		e_completeContract, e_partialContract, e_subsumeWithoutResult
	};
	Vector<ConceptMatch> concMatchVec;
	Vector<RelationMatch> relMatchVec;
	
	private PPCGEnv env = null;
	
	public CGOperation(PPCGEnv myenv) {
		env = myenv;
		aUnifyCG = new UnifyCG(env);	
		// Created for each instance/call of CGOperation
		// Cree pour chaque instance/appel a CGOperation
		concMatchVec = new Vector<ConceptMatch>();
		relMatchVec = new Vector<RelationMatch>();
	}
	
	private void concMatchVec_MakeEmpty(Vector<ConceptMatch> lst) {
		ConceptMatch aCMatch;
		
		for (Enumeration<ConceptMatch> e = lst.elements(); e.hasMoreElements();) {
			aCMatch = (ConceptMatch) e.nextElement();
			aCMatch.myDestroy();
		}
		lst.clear();
	}
	
	private void relMatchVec_MakeEmpty(Vector<RelationMatch> lst) {
		RelationMatch aRMatch;
		
		for (Enumeration<RelationMatch> e = lst.elements(); e.hasMoreElements();) {
			aRMatch = (RelationMatch) e.nextElement();
			aRMatch.myDestroy();
		}
		lst.clear();
	}
	
	public void corefMatchVec_MakeEmpty() {
		CoreferenceMatch aCorefMatch;
		
		for (Enumeration<CoreferenceMatch> e = corefMatchVec.elements(); e.hasMoreElements();) {
			aCorefMatch = (CoreferenceMatch) e.nextElement();
			aCorefMatch.myDestroy();
		}
		corefMatchVec.clear();
	}
	
	// ------------------------------------------------------------------
	boolean sameNameRel(PrologData rla1, int niv1, PrologData rla2,
			int niv2) throws ExecException {
		PrologDataIndexPair valIndLeft = env.unification.valueFromUnifStack(rla1, niv1);
		PrologDataIndexPair valIndRight = env.unification.valueFromUnifStack(rla2, niv2);
		
		if ((valIndLeft.pData == null) || (valIndRight.pData == null)) {
			throw new ExecException(
			"Error: for CG operations, relations should have specific values\nand not be free variables.");
		}
		
		// The two PrologData are particular relations
		// Les deux donn?es sont des relations particuliers
		Object pData1Left;
		Object pData1Right;
		pData1Left = valIndLeft.pData.data;
		pData1Right = valIndRight.pData.data;
		
		String sDon1 = (String) pData1Left;
		String sDon2 = (String) pData1Right;
		
		return (sDon1.equals(sDon2));
	}
	
	public static byte convertToByte(String IdOperGC, CG G3) {
		byte result = 0;
		
		if (IdOperGC.equals("maximalJoin")) {
			result = e_maximalJoin;
		} else if (IdOperGC.equals("generalize")) {
			result = e_generalize;
		} else if (IdOperGC.equals("subsume") && (G3 == null)) {
			result = e_subsumeWithoutResult;
		} else if (IdOperGC.equals("subsume") && (G3 != null)) {
			result = e_subsume;
		}
		
		return result;
	}
	
	// --------------------------------------------------------------
	// ATTENTION ::::
	// CorefMatchL_MakeEmpty(); C'est celui qui appelle pour la 1ere fois matchCG
	// qui devrait executer : CorefMatchL_MakeEmpty();
	public boolean matchCG(byte OperCG, Concept E1, CG G1, int level1, Concept E2,
			CG G2, int level2, CGMatchResult resMatchCG) throws ExecException {
		boolean bResult = false;
		
		// subsume(G1, G2) : tester si G1 est plus generale que G2 et retourner
		//                    la partie de G2 qui est isomorphe ? G1
		// subsumeSRes(G1, G2) : tester si G1 est plus generale que G2 sans retourner
		//                     la partie de G2 qui est isomorphe ? G1
		// project(G1, G2) : projeter un GC G1 sur un autre G2;
		//        G1 doit etre isomorphe a un sous-graphe de G2.
		
		// subsume(G1, G2) : Tests if CG1 is more general than G2
		//                   and returns the part of G2 which is 
		//                   isomorphic to G1.
		// subsumeWithoutResult(G1, G2) : Tests if G1 is more 
		//                   general than G2 without returning the part
		//                   of G2 which is isomorphic to G1.
		// project(G1, G2) : project a CG G1 on top of another CG G2;
		//                   G1 must be isomorphic to a sub-graph of G2.
		if (((OperCG == e_project) || (OperCG == e_subsume) ||
				(OperCG == e_subsumeWithoutResult) || (OperCG == e_completeContract)) &&
				((G1.m_vctRelations.size() > G2.m_vctRelations.size()) ||
						!bagInclusion(G1.m_vctRelations, level1, G2.m_vctRelations, level2))) {
			bResult = false;
		} else {
			bResult = computeEntryPointsAndMatch(OperCG, E1, G1, level1, 
					E2, G2,	level2, resMatchCG);
			
			// CorefMatchL_MakeEmpty(); C'est celui qui appelle pour la 1ere fois matchCG
			// qui devrait executer : CorefMatchL_MakeEmpty();
		}
		
		return bResult;
	}
	
	// ---------------------------------------------------------------
	boolean bagInclusion(Vector<Relation> lr1, int niv1, Vector<Relation> lr2, int niv2)
	throws ExecException {
		Vector<Relation> lst = new Vector<Relation>();
		Relation rla1 = null;
		Relation rla2 = null;
		boolean bFound;
		
		for (Enumeration<Relation> e = lr1.elements(); e.hasMoreElements();) {
			rla1 = (Relation) e.nextElement();
			bFound = false;
			
			for (Enumeration<Relation> e1 = lr2.elements();
			e1.hasMoreElements() && !bFound;) {
				rla2 = (Relation) e1.nextElement();
				
				if (sameNameRel(rla1.m_pdRelationName, niv1, rla2.m_pdRelationName, niv2) &&
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
	boolean computeEntryPointsAndMatch(byte OperCG, Concept E1, CG G1,
			int level1, Concept E2, CG G2, int level2, CGMatchResult resMatchCG)
	throws ExecException {
		Concept C1;
		Concept C2;
		boolean bResult = false;
		
		if ((E1 != null) && (E2 != null)) {
			/** Inutil a present puisque E1 et E2 referent aux concepts eux-memes
			 Concept CEE1 = LocConcEq(E1, G1);
			 Concept CEE2 = LocConcEq(E2, G2);
			 if (CEE1 == null || CEE2 == null)
			 throw new ExecException("Error: the entry concepts are not in the CG.");
			 ********/
			if (!G1.m_vctConcepts.contains(E1)) {
				throw new ExecException(
				"Error: the first entry concept is not in the corresponding CG.");
			}
			
			if (!G2.m_vctConcepts.contains(E2)) {
				throw new ExecException(
				"Error: the second entry concept is not in the corresponding CG.");
			}
			
			bResult = matchWithBack(OperCG, E1, E2, null, null, G1, level1, G2,
					level2, resMatchCG.G3);
			
			if (bResult) {
				ConceptMatch eMatchL = inCMatchL(E1, E2);
				resMatchCG.E3 = eMatchL.m_ResultOfMatch;
			}
		} else if ((G1.m_vctConcepts.size() == 1) && G1.m_vctRelations.isEmpty()) {
			C1 = (Concept) G1.m_vctConcepts.get(0);
			
			for (Enumeration<Concept> e = G2.m_vctConcepts.elements();
			e.hasMoreElements() && !bResult;) {
				C2 = (Concept) e.nextElement();
				bResult = matchConcept(OperCG, C1, level1, C2, level2, resMatchCG.G3);
				
				// if (!BRes) env.unification.EnleverContraintes();
			}
			
			bResult = bResult &&
			postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
		} else if ((G2.m_vctConcepts.size() == 1) && G2.m_vctRelations.isEmpty()) {
			C2 = (Concept) G2.m_vctConcepts.get(0);
			
			for (Enumeration<Concept> e = G1.m_vctConcepts.elements();
			e.hasMoreElements() && !bResult;) {
				C1 = (Concept) e.nextElement();
				bResult = matchConcept(OperCG, C1, level1, C2, level2, resMatchCG.G3);
				
				// if (!BRes) env.unification.EnleverContraintes();
			}
			
			bResult = bResult &&
			postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
		} else {
			Vector<Concept> vConcs = new Vector<Concept>(2);
			
			if ((OperCG != e_generalize) &&
					(aUnifyCG.identRef(G1, level1, G2, level2, vConcs) ||
							varCoref(G1, G2, vConcs))) {
				C1 = (Concept) vConcs.get(0);
				C2 = (Concept) vConcs.elementAt(1);
				bResult = matchWithBack(OperCG, C1, C2, null, null, G1, level1, G2,
						level2, resMatchCG.G3);
				vConcs.clear();
				vConcs = null;
			} else if ((OperCG == e_project) || (OperCG == e_subsume) ||
					(OperCG == e_subsumeWithoutResult) || (OperCG == e_completeContract)) {
				vConcs.clear();
				
				/*
				Relation rl1 = (Relation) G1.m_vctRelations.firstElement();
				Relation rl2;
				
				for (Enumeration e = G2.m_vctRelations.elements();
				e.hasMoreElements() && !bResult;) {
					rl2 = (Relation) e.nextElement();
					
					if (sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)) {
						bResult = matchWithBack(OperCG, rl1.m_concSource,
								rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination,
								G1, level1, G2, level2, resMatchCG.G3);
					}
				}
				*/

				Relation rl1;
				Relation rl2;

				for (Enumeration<Relation> e1 = G1.m_vctRelations.elements();
				e1.hasMoreElements() && !bResult;) {
					rl1 = (Relation) e1.nextElement();

					for (Enumeration<Relation> e = G2.m_vctRelations.elements();
					e.hasMoreElements() && !bResult;) {
						rl2 = (Relation) e.nextElement();
						
						if (sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)) {
							bResult = matchWithBack(OperCG, rl1.m_concSource,
									rl2.m_concSource, rl1.m_concDestination, rl2.m_concDestination,
									G1, level1, G2, level2, resMatchCG.G3);
						}
					}
				}
			} else {
				vConcs.clear();
				
				Relation rl1;
				boolean bRelationFound = false;
				
				for (Enumeration<Relation> e = G1.m_vctRelations.elements();
				e.hasMoreElements() && !bResult;) {
					rl1 = (Relation) e.nextElement();
					
					Relation rl2;
					
					for (Enumeration<Relation> e1 = G2.m_vctRelations.elements();
						 e1.hasMoreElements() && !bResult;) {
						rl2 = (Relation) e1.nextElement();
						
						if (sameNameRel(rl1.m_pdRelationName, level1, rl2.m_pdRelationName, level2)) {
							bResult = matchWithBack(OperCG, rl1.m_concSource,
									rl2.m_concSource, rl1.m_concDestination,
									rl2.m_concDestination, G1, level1, G2, level2,
									resMatchCG.G3);
							bRelationFound = true;
						}
					}
				}
				
				// si on n'a pas trouve de relation, alors necessairement bResult = false.
				// If we didn't find any relation, then by necessity bResult = false.
				if (!bRelationFound) {
					Concept conc1;
					
					for (Enumeration<Concept> e = G1.m_vctConcepts.elements();
					e.hasMoreElements() && !bResult;) {
						conc1 = (Concept) e.nextElement();
						
						Concept conc2;
						
						for (Enumeration<Concept> e1 = G2.m_vctConcepts.elements();
						e1.hasMoreElements() && !bResult;) {
							conc2 = (Concept) e1.nextElement();
							bResult = matchConcept(OperCG, conc1, level1, conc2,
									level2, resMatchCG.G3);
						}
					}
					bResult = bResult &&
							  postMatch(OperCG, G1, level1, G2, level2, resMatchCG.G3);
				}
			}
		}
		
		if ((OperCG != e_partialContract) && (OperCG != e_completeContract)) {
			// Pour l'instant, on ne travaille qu'avec une contraction sur des GC simples
			// IMPORTANT :: Dans le cas d'une contraction, il faudrait ensuite appeler
			// de l'exterieur (de resolution) les deux instructions suivantes
			concMatchVec_MakeEmpty(concMatchVec);
			relMatchVec_MakeEmpty(relMatchVec);
		}
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	// ---- Determiner points d'entree par matching des coreferents ///
	// Determine points of entry for matching of coreferents
	boolean varCoref(CG G1, CG G2, Vector<Concept> vConcs) {
		boolean bResult = false;
		Concept C1 = null;
		Concept C2 = null;
		
		for (Enumeration<Concept> e = G1.m_vctConcepts.elements();
		e.hasMoreElements() && !bResult;) {
			C1 = (Concept) e.nextElement();
			
			String sRef1 = null;
			
			if ((C1.m_pdReferent != null) && (C1.m_pdReferent.data instanceof String)) {
				sRef1 = (String) C1.m_pdReferent.data;
			}
			
			if ((sRef1 != null) && isCoreferent(C1.m_pdReferent)) {
				CoreferenceMatch CM;
				boolean trouve = false;
				
				for (Enumeration<CoreferenceMatch> e1 = corefMatchVec.elements();
				e1.hasMoreElements() && !bResult && !trouve;) {
					CM = (CoreferenceMatch) e1.nextElement();
					
					if ((CM.Var1 != null) && CM.Var1.equals(sRef1)) {
						trouve = true;
						
						for (Enumeration<Concept> e2 = G2.m_vctConcepts.elements();
						e2.hasMoreElements() && !bResult;) {
							C2 = (Concept) e2.nextElement();
							bResult = ((C2.m_pdReferent != null) && (CM.Var2 != null) &&
									(C2.m_pdReferent.data instanceof String) &&
									CM.Var2.equals(C2.m_pdReferent.data));
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
	
	boolean isCoreferent(PrologData Ref) {
		// ancien : if (Ref.startsWith("coref") || Ref.startsWith("Coref")) return true;
		if ((Ref != null) && (Ref.typeOfData == uVariable)) {
			return true;
		} else {
			return false;
		}
	}
	
	// ------------------------------------------------------------------
	boolean matchWithBack(byte OperCG, Concept Cs1, Concept Cs2, Concept Ct1,
			Concept Ct2, CG G1, int level1, CG G2, int level2, CG G3)
	throws ExecException {
		boolean bResult = false;
		Vector<CoreferenceMatch> AncCorefL = new Vector<CoreferenceMatch>();
		
		// ----- copy of corefMatchVec in AncCorefL
		CoreferenceMatch elm;
		
		// ----- copy of corefMatchVec in AncCorefL
		CoreferenceMatch Nelm;
		
		for (Enumeration<CoreferenceMatch> e = corefMatchVec.elements(); e.hasMoreElements();) {
			elm = (CoreferenceMatch) e.nextElement();
			
			String s1 = null;
			
			if (elm.Var1 != null) {
				s1 = elm.Var1;
			}
			
			String s2 = null;
			
			if (elm.Var2 != null) {
				s2 = elm.Var2;
			}
			
			String s3 = null;
			
			if (elm.Var3 != null) {
				s3 = elm.Var3;
			}
			
			Nelm = new CoreferenceMatch(s1, s2, s3);
			AncCorefL.addElement(Nelm);
		}
		
		if (matchConcept(OperCG, Cs1, level1, Cs2, level2, G3) &&
				((Ct1 == null) ||
						matchConcept(OperCG, Ct1, level1, Ct2, level2, G3)) &&
						propagateMatchCG(OperCG, G1, level1, G2, level2, G3)) {
			bResult = true;
		} else {
			// On recopie AncCorefL dans corefMatchVec
			// env.unification.EnleverContraintes();
			
			// We recopy AncCorefL into corefMatchVec
			// env.unification.EnleverContraintes(); // FIXME: Use correct method name!
			corefMatchVec_MakeEmpty();
			
			CoreferenceMatch CorefMTmp;
			
			for (Enumeration<CoreferenceMatch> ex = AncCorefL.elements(); ex.hasMoreElements();) {
				CorefMTmp = (CoreferenceMatch) ex.nextElement();
				corefMatchVec.addElement(CorefMTmp);
			}
			
			AncCorefL.clear();
			concMatchVec_MakeEmpty(concMatchVec);
			relMatchVec_MakeEmpty(relMatchVec);
			
			if (G3 != null) {
				G3.makeEmpty();
			}
			
			bResult = false;
		}
		
		CoreferenceMatch aCorefMatch;
		
		for (Enumeration<CoreferenceMatch> ex = AncCorefL.elements(); ex.hasMoreElements();) {
			aCorefMatch = (CoreferenceMatch) ex.nextElement();
			aCorefMatch.myDestroy();
		}
		
		AncCorefL.clear();
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	boolean propagateMatchCG(byte OperCG, CG G1, int niv1, CG G2, int niv2,
			CG G3) throws ExecException {
		boolean bResult = true;
		boolean suite = true;
		
		while (bResult && suite) {
			ConceptMatch E = null;
			suite = false;
			
			// On cherche d'abord un couple de concepts deja matche qui
			// doivent etre match? localement ...
			for (Enumeration<ConceptMatch> e = concMatchVec.elements();
			e.hasMoreElements() && !suite;) {
				E = (ConceptMatch) e.nextElement();
				suite = (E.m_IsConcMatched && !E.m_IsMatchedLocally);
			}
			
			// sinon, on cherche deux couples de concepts ? matcher et ensuite
			// ? matcher localement
			if (!suite) {
				for (Enumeration<ConceptMatch> e1 = concMatchVec.elements();
				e1.hasMoreElements() && !suite;) {
					E = (ConceptMatch) e1.nextElement();
					suite = !E.m_IsConcMatched;
				}
			}
			
			if (suite) {
				if (!E.m_IsConcMatched) {
					bResult = matchConceptS(OperCG, E.m_ConcMatched1, niv1, E.m_ConcMatched2, niv2);
				}
				
				if (bResult) {
					bResult = matchBranches(e_outComeBranch, OperCG,
							E.m_ConcMatched1, niv1, E.m_ConcMatched2, 
							niv2, E.m_ResultOfMatch, G3) &&
							matchBranches(e_inComeBranch, OperCG, E.m_ConcMatched1,
									niv1, E.m_ConcMatched2, niv2,
									E.m_ResultOfMatch, G3);
					
					if (bResult) {
						E.m_IsMatchedLocally = true;
					}
				}
			}
		}
		
		return (bResult && postMatch(OperCG, G1, niv1, G2, niv2, G3));
	}
	
	// ------------------------------------------------------------------
	boolean matchBranches(byte BranchDirection, byte OperCG, Concept C1, 
			int level1, Concept C2, int level2, Concept C3, CG G3)
	throws ExecException {
		boolean bResult = true;
		Relation rel1;
		boolean bAlreadyMatched;
		Vector<Relation> vctRels1 = null;
		
		if (BranchDirection == e_inComeBranch) {
			vctRels1 = C1.m_vctIncomingRelations;
		} else {
			vctRels1 = C1.m_vctOutgoingRelations;
		}
		
		// Matcher (traiter) toute branche de vctRels1
		for (Enumeration<Relation> e = vctRels1.elements(); e.hasMoreElements() && bResult;) {
			rel1 = (Relation) e.nextElement();
			bAlreadyMatched = false;
			
			RelationMatch E = null;
			
			for (Enumeration<RelationMatch> e1 = relMatchVec.elements();
			e1.hasMoreElements() && !bAlreadyMatched;) {
				E = (RelationMatch) e1.nextElement();
				bAlreadyMatched = (rel1 == E.m_RelMatched1);
			}
			
			if (!bAlreadyMatched) {
				bResult = matchTheBranch(BranchDirection, OperCG, rel1, C2,
						C3, G3, level1, level2);
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
			ConceptMatch E = inCMatchL(Ca1, Ca2);
			
			/*   if (E != null) bResult = (E.m_ConcMatched1 == Ca1 && E.m_ConcMatched2 == Ca2);
			 else bResult = false;    *******/
			if (E == null) {
				bResult = false;
			}
		}
		
		return bResult;
	}
	
	/***  Verify that the pair (Ca1, Ca2) exists in concMatchVec *****/
	ConceptMatch inCMatchL(Concept Ca1, Concept Ca2) {
		boolean bResult = false;
		ConceptMatch E = null;
		
		for (Enumeration<ConceptMatch> e = concMatchVec.elements(); e.hasMoreElements() && !bResult;) {
			E = (ConceptMatch) e.nextElement();
			
			if ((E.m_ConcMatched1 == Ca1) && (E.m_ConcMatched2 == Ca2)) {
				bResult = true;
			}
			
			/*{
			 BRes = E.m_ConcMatched1 == Ca1 && E.m_ConcMatched2 == Ca2;
			 break;
			 }; ***/
		}
		
		if (bResult) {
			return E;
		} else {
			return null;
		}
	}
	
	// ------------------------------------------------------------------
	boolean matchTheBranch(byte BranchDirection, byte OperCG, Relation rel1,
			Concept C2, Concept C3, CG G3, int niv1, int niv2)
	throws ExecException {
		// 1. Chercher une branche de G2 ayant meme ident de relation
		boolean bResult = false;
		Relation rel2 = null;
		Vector<Relation> vRels;
		
		if (BranchDirection == e_inComeBranch) {
			vRels = C2.m_vctIncomingRelations;
		} else {
			vRels = C2.m_vctOutgoingRelations;
		}
		
		for (Enumeration<Relation> e = vRels.elements(); !bResult && e.hasMoreElements();) {
			rel2 = (Relation) e.nextElement();
			
			if (sameNameRel(rel1.m_pdRelationName, niv1, rel2.m_pdRelationName, niv2)) {
				bResult = true;
			}
			
			if (bResult) {
				// 2. Test that rel2 hasn't already been matched.
				boolean bAlreadyMatched = false;
				RelationMatch Er;
			
				for (Enumeration<RelationMatch> e1 = relMatchVec.elements();
					e1.hasMoreElements() && !bAlreadyMatched;) {
					Er = (RelationMatch) e1.nextElement();
					bAlreadyMatched = (rel2 == Er.m_RelMatched2);
				}
			
				// So try one more...
				if (bAlreadyMatched) {
					bResult = false;
				}
			}
		
			if (bResult) {
				/*
				// 2. Tester que rel2 n'a pas encore ete matchee
				boolean dejaMatchee = false;
				RelationMatch Er;
				
				for (Enumeration e1 = relMatchVec.elements();
				e1.hasMoreElements() && !dejaMatchee;) {
					Er = (RelationMatch) e1.nextElement();
					dejaMatchee = (rel2 == Er.m_RelMatched2);
				}
				
				// Already unified with another branch, situation is
				// impossible for functional CGs.  Therefore, return false.
				if (dejaMatchee) {
					return false;
				}
				*/
				
				// On a localise une branche qu'on pourrait considerer pour le matching
				Concept Ca1;
				
				// On a localise une branche qu'on pourrait considerer pour le matching
				Concept Ca2;
				
				// On a localise une branche qu'on pourrait considerer pour le matching
				Concept Ca3;
				Ca1 = Ca2 = Ca3 = null;
				
				if (BranchDirection == e_inComeBranch) {
					Ca1 = rel1.m_concSource;
					Ca2 = rel2.m_concSource;
				} else {
					Ca1 = rel1.m_concDestination;
					Ca2 = rel2.m_concDestination;
				}
				
				ConceptMatch E = inCMatchL(Ca1, Ca2);
				
				/***  Verify that the pair (Ca1, Ca2) exists in concMatchVec *****/
				if (E != null) {
					bResult = ((E.m_ConcMatched1 == Ca1) && (E.m_ConcMatched2 == Ca2));
				} else {
					bResult = matchConcept(OperCG, Ca1, niv1, Ca2, niv2, G3);
				}
				
				if (bResult) {
					relMatchVec.addElement(new RelationMatch(rel1, rel2));
					
					if (!in(OperCG, setOpersId, 2)) {
						// On doit construire la branche resultante du matching
						ConceptMatch El;
						
						for (Enumeration<ConceptMatch> e4 = concMatchVec.elements();
						e4.hasMoreElements() && (Ca3 == null);) {
							El = (ConceptMatch) e4.nextElement();
							
							if ((Ca1 == El.m_ConcMatched1) &&
									(Ca2 == El.m_ConcMatched2)) {
								Ca3 = El.m_ResultOfMatch;
							}
						}
						
						Relation Rp = new Relation();
						
						PrologDataIndexPair ValRel1 = env.unification.valueFromUnifStack(rel1.m_pdRelationName, niv1);
						Rp.m_pdRelationName = new PrologData(uIdentifier,ValRel1.pData.data);
						ValRel1 = null;
						
						if (BranchDirection == e_inComeBranch) {
							Rp.m_concSource = Ca3;
							Rp.m_concDestination = C3;
							Ca3.m_vctOutgoingRelations.addElement(Rp);
							C3.m_vctIncomingRelations.addElement(Rp);
						} else {
							Rp.m_concSource = C3;
							Rp.m_concDestination = Ca3;
							C3.m_vctOutgoingRelations.addElement(Rp);
							Ca3.m_vctIncomingRelations.addElement(Rp);
						}
						
						//infoGRel(Rp);
						G3.m_vctRelations.addElement(Rp);
					}
				}
			} 
		}				
		if (!bResult) {
			// pas de branche correspondante dans G2
			// None of the branches correspond in G2.
			//if ((OperCG == e_maximalJoin) || (OperCG == e_generalize)) {
			if ((OperCG == e_maximalJoin)) {
				bResult = true;
			}
		}
		return bResult;
	}
	
	// ------------------------------------------------------------------
	boolean postMatch(byte OperCG, CG G1, int niv1, CG G2, int niv2, CG G3)
	throws ExecException {
		boolean bResult = true;
		
		switch (OperCG) {
		case e_maximalJoin:
			addBranches(e_maximalJoin, G1, niv1, G2, niv2, G3);
			
			break;
			
		case e_project:
		case e_subsume:
		case e_subsumeWithoutResult:
		case e_completeContract: { // verifier que toutes les relations de G1
			
			// ont ete matchees
			Relation R;
			
			for (Enumeration<Relation> e = G1.m_vctRelations.elements();
			e.hasMoreElements() && bResult;) {
				R = (Relation) e.nextElement();
				bResult = false;
				
				RelationMatch er;
				
				for (Enumeration<RelationMatch> e1 = relMatchVec.elements();
				e1.hasMoreElements() && !bResult;) {
					er = (RelationMatch) e1.nextElement();
					bResult = (R == er.m_RelMatched1);
				}
			}
		}
		
		break;
		}
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	void addBranches(byte m, CG G1, int niv1, CG G2, int niv2, CG G3)
	throws ExecException {
		if (m == e_maximalJoin) {
			addBranchsOfCG(G1, niv1, 1, G3);
			addBranchsOfCG(G2, niv2, 2, G3);
		}
	}
	
	// ------------------------------------------------------------------
	void addBranchsOfCG(CG G, int niv, int N, CG Gt) throws ExecException {
		Concept C;
		
		for (Enumeration<Concept> e = G.m_vctConcepts.elements(); e.hasMoreElements();) {
			// 1. Localiser tout concept de G (G1 ou G2)
			C = (Concept) e.nextElement();
			
			Concept Cc;
			Concept Cck;
			
			// 2. Chercher son correspondant (retourner C3 s'il y a eu matching ou
			//       le concept C lui-meme sinon
			Cc = matchedConc(C, niv, N, Gt);
			
			// 3. Considerer toute relation en entree de C
			Relation R;
			
			for (Enumeration<Relation> e1 = C.m_vctIncomingRelations.elements();
			e1.hasMoreElements();) {
				R = (Relation) e1.nextElement();
				
				if (!matchedRel(R, N)) {
					Concept Ck = R.m_concSource;
					Cck = matchedConc(Ck, niv, N, Gt);
					addRel(N, Cck, R, niv, Cc, Gt);
				}
			}
			
			// 4. Considerer toute relation en sortie de C
			for (Enumeration<Relation> e2 = C.m_vctOutgoingRelations.elements();
			e2.hasMoreElements();) {
				R = (Relation) e2.nextElement();
				
				if (!matchedRel(R, N)) {
					Concept Ck = R.m_concDestination;
					Cck = matchedConc(Ck, niv, N, Gt);
					addRel(N, Cc, R, niv, Cck, Gt);
				}
			}
		}
	}
	
	// ------------------------------------------------------------------
	boolean matchedRel(Relation R, int N) {
		RelationMatch r;
		
		for (Enumeration<RelationMatch> e = relMatchVec.elements(); e.hasMoreElements();) {
			r = (RelationMatch) e.nextElement();
			
			if (((N == 1) && (r.m_RelMatched1 == R)) ||
					((N == 2) && (r.m_RelMatched2 == R))) {
				return true;
			}
		}
		
		return false;
	}
	
	// ------------------------------------------------------------------
	// Appeler uniquement au sein de AddBranhsOfCG
	Concept matchedConc(Concept C, int niv, int N, CG Gt)
	throws ExecException {
		ConceptMatch ec;
		
		for (Enumeration<ConceptMatch> e = concMatchVec.elements(); e.hasMoreElements();) {
			ec = (ConceptMatch) e.nextElement();
			
			if ((N == 1) && (ec.m_ConcMatched1 == C)) {
				// on travaille sur G1 et le concept a ete match?
				return ec.m_ResultOfMatch;
			} else if ((N == 2) && (ec.m_ConcMatched2 == C)) {
				// on travaille sur G2 et le concept a ete match?
				return ec.m_ResultOfMatch;
			}
		}
		
		return addConc(N, C, niv, Gt);
	}
	
	// ------------------------------------------------------------------
	Concept addConc(int N, Concept C, int niv, CG Gt) throws ExecException {
		//Concept Cp = C.Copie();
		Concept Cp = null;
		
		if (C.m_pdType == null) {
			PrologDataIndexPair ValRef = env.unification.valueFromUnifStack(C.m_pdReferent, niv);
			
			if (ValRef.pData == null) {
				throw new ExecException(
				"Error: The concept to be added should be a specific concept, not a free variable.");
			} else {
				Concept cTmp = (Concept) ValRef.pData.data;
				Cp = cTmp.copyValue(niv);
			}
		} else {
			Cp = C.copyValue(niv);
		}
		
		Gt.m_vctConcepts.addElement(Cp);
		
		ConceptMatch M = null;
		
		if (N == 1) {
			M = new ConceptMatch(C, Cp, Cp, true, false);
		} else {
			M = new ConceptMatch(Cp, C, Cp, true, false);
		}
		
		concMatchVec.addElement(M);
		
		return Cp;
	}
	
	// ------------------------------------------------------------------
	void addRel(int N, Concept CP, Relation R, int niv, Concept CF, CG Gt) {
		Relation Rp = new Relation();
		PrologDataIndexPair ValRel = env.unification.valueFromUnifStack(R.m_pdRelationName, niv);
		String sRel = (String) ValRel.pData.data;
		Rp.m_pdRelationName = new PrologData(uIdentifier, sRel);
		
		Rp.m_concSource = CP;
		Rp.m_concDestination = CF;
		
		CP.m_vctOutgoingRelations.addElement(Rp);
		CF.m_vctIncomingRelations.addElement(Rp);
		Gt.m_vctRelations.addElement(Rp);
		
		RelationMatch M = null;
		
		if (N == 1) {
			M = new RelationMatch(R, null);
		} else {
			M = new RelationMatch(null, R);
		}
		
		relMatchVec.addElement(M);
	}
	
	// ------------------------------------------------------------
	// cette operation matche totalement les concepts simples
	//   et partiellement les concepts composes.
	boolean matchConcept(byte OperCG, Concept C1, int niv1, Concept C2,
			int niv2, CG G3) throws ExecException {
		boolean bResult = true;
		Concept C3 = null;
		
		if ((C1.m_pdValue != null) && (C1.m_pdValue.typeOfData == uCG) &&
				(C2.m_pdValue != null) && (C2.m_pdValue.typeOfData == uCG)) {
			if (!in(OperCG, setOpersId, 2)) {
				C3 = new Concept(env);
			}
			
			if (matchType(OperCG, C1.m_pdType, niv1, C2.m_pdType, niv2, C3)) {
				ConceptMatch M = new ConceptMatch(C1, C2, C3, false, false);
				concMatchVec.addElement(M);
				
				if (C3 != null) {
					G3.m_vctConcepts.addElement(C3);
				}
			} else {
				bResult = false;
			}
		} else {
			ConceptMatchResult resMatch = matchConc(OperCG, C1, niv1, C2, niv2);
			
			if (resMatch.bRes) {
				C3 = resMatch.C3;
				
				ConceptMatch M = new ConceptMatch(C1, C2, C3, true, false);
				
				concMatchVec.addElement(M);
				
				if (C3 != null) {
					G3.m_vctConcepts.addElement(C3);
				}
			} else {
				bResult = false;
			}
			
			resMatch = null;
		}
		
		C3 = null;
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	// similaire a matchConcept sauf qu'ici on matche meme les
	// concepts composes.
	boolean matchConceptS(byte OperCG, Concept C1, int level1, Concept C2, int level2) throws ExecException {
		boolean bResult = true;
		ConceptMatchResult resMatch = matchConc(OperCG, C1, level1, C2, level2);
		Concept C3 = resMatch.C3;
		
		if (resMatch.bRes) {
			// 1. Localiser la structure qui enregistre le matching
			//   de C1/C2 
			ConceptMatch E = null;
			ConceptMatch ec;
			
			for (Enumeration<ConceptMatch> e1 = concMatchVec.elements();
			e1.hasMoreElements() && (E == null);) {
				ec = (ConceptMatch) e1.nextElement();
				
				if ((ec.m_ConcMatched1 == C1) && (ec.m_ConcMatched2 == C2)) {
					E = ec;
				}
			}
			
			// 2. Noter que les concepts C1/C2 ont ete match? ? pr?sent
			E.m_IsConcMatched = true;
			
			// 3. maj l'ancien vctResult du matching par le nouveau vctResult; C3
			if (C3 != null) {
				copyDataCept(C3, E.m_ResultOfMatch);
			}
		} else {
			bResult = false;
		}
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	// Une variante de la methode Copie de Concept;
	// ici, on copie-ecrase dans un concept qui existe deja
	void copyDataCept(Concept C1, Concept C2) {
		C2.m_pdType = C1.m_pdType.myCopy();
		
		if (C1.m_pdReferent != null) {
			C2.m_pdReferent = C1.m_pdReferent.myCopy();
		}
		
		if (C1.m_pdValue != null) {
			C2.m_pdValue = C1.m_pdValue.myCopy();
		}
	}
	
	// --------Concept----------------------------------------------------------
	ConceptMatchResult matchConc(byte OperCG, Concept C1, int niv1, Concept C2,
			int niv2) throws ExecException {
		Concept C3 = null;
		boolean bResult = true;
		
		if (!in(OperCG, setOpersId, 2)) {
			C3 = new Concept(env);
		}
		
		switch (OperCG) {
		case e_maximalJoin:
		case e_generalize:
		case e_subsume:
		case e_subsumeWithoutResult:
		case e_partialContract:
		case e_completeContract:
			bResult = matchType(OperCG, C1.m_pdType, niv1, C2.m_pdType, niv2, C3) &&
					  matchRef(OperCG, C1.m_pdReferent, niv1, C2.m_pdReferent, niv2, C3) &&
					  matchValue(OperCG, C1.m_pdValue, niv1, C2.m_pdValue, niv2, C3);
			break;
			
		case e_match:
		case e_project: {
			C3 = new Concept(env);
			
			String Typ1 = (String) C1.m_pdType.data;
			String Typ2 = (String) C2.m_pdType.data;
			C3.m_pdType = new PrologData(uIdentifier,
					"match(" + Typ1 + "," + Typ2 + ")");
			C3.m_pdReferent = new PrologData(uIdentifier, "matchedReferent"); //(" + C1.GetRef() + "," + C2.GetRef() + ")";
		}
		
		break;
		}
		
		return new ConceptMatchResult(bResult, C3);
	}
	
	// ------------------------------------------------------------------
	boolean matchType(byte OperCG, PrologData Type1, int level1,
			PrologData Type2, int level2, Concept C3) throws ExecException {
		String Type3 = null;
		boolean bResult = false;
		PrologDataIndexPair valIndLeft = env.unification.valueFromUnifStack(Type1, level1);
		PrologDataIndexPair valIndRight = env.unification.valueFromUnifStack(Type2, level2);
		
		if ((valIndLeft.pData == null) || (valIndRight.pData == null)) {
			throw new ExecException(
			"Error: for CG operations, types shoud have specific values.");
		} else { 
			// The two PrologData are particular types (not free variables)
			
			Object pData1Left;
			Object pData1Right;
			pData1Left = valIndLeft.pData.data;
			pData1Right = valIndRight.pData.data;
			
			String sData1 = (String) pData1Left;
			String sData2 = (String) pData1Right;
			
			if (env.typeHierarchy == null) {
				throw new ExecException(
				"Error : No type hierarchy is specified (a CG operation needs it).");
			}
			
			switch (OperCG) {
			case e_maximalJoin: {
				if (sData1.equals(sData2)) {
					Type3 = sData1;
				} else {
					Type3 = env.typeHierarchy.maxComSubType(sData1,
							sData2);
				}
				
				bResult = (!Type3.equals("Absurd"));
			}
			
			break;
			
			case e_subsume: {
				bResult = env.typeHierarchy.isSubType(sData2, sData1);
				Type3 = sData2;
			}
			
			break;
			
			case e_subsumeWithoutResult:
			case e_partialContract:
			case e_completeContract:
				bResult = env.typeHierarchy.isSubType(sData2, sData1);
				
				break;
				
			case e_generalize: {
				if (sData1.equals(sData2)) {
					Type3 = sData1;
				} else {
					Type3 = env.typeHierarchy.minComSuperType(sData1,
							sData2);
				}
				
				bResult = (!Type3.equals("Universal") &&
						!Type3.equals("UNIVERSAL"));
			}
			
			break;
			
			default:
				throw new ExecException("Error : CG Operation not predefined.");
			}
			
			if (bResult && (Type3 != null)) {
				C3.m_pdType = new PrologData(uIdentifier, Type3);
			}
		}
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	boolean matchRef(byte OperCG, PrologData Ref1, int niv1, PrologData Ref2,
			int niv2, Concept C3) throws ExecException {
		// Pour l'instant, on ne considere pas les niv des variables, ...
		// ON SUPPOSE POUR LE MOMENT QUE LES VARIABLES UTILISEES POUR LES COREF sont free 
		boolean bResult = LocaliseOrAdd(OperCG, Ref1, Ref2, C3);
		
		if (!bResult) {
			return bResult;
		}
		
		PrologDataIndexPair valIndLeft;
		
		if (Ref1 != null) {
			valIndLeft = env.unification.valueFromUnifStack(Ref1, niv1);
		} else {
			valIndLeft = null;
		}
		
		PrologDataIndexPair valIndRight;
		
		if (Ref2 != null) {
			valIndRight = env.unification.valueFromUnifStack(Ref2, niv2);
		} else {
			valIndRight = null;
		}
		
		if (((Ref1 == null) || (valIndLeft.pData == null) ||
				((Ref1.data instanceof String) &&
						((String) Ref1.data).equals("super"))) &&
						((Ref2 == null) || (valIndRight.pData == null) ||
								((Ref2.data instanceof String) &&
										((String) Ref2.data).equals("super")))) {
			bResult = true;
		} else {
			if ((valIndLeft != null) && (valIndLeft.pData != null) &&
					(valIndRight != null) && (valIndRight.pData != null)) {
				if (((valIndLeft.pData.typeOfData != uIdentifier) &&
						(valIndLeft.pData.typeOfData != uString) &&
						(valIndLeft.pData.typeOfData != uSet)) ||
						((valIndRight.pData.typeOfData != uIdentifier) &&
								(valIndRight.pData.typeOfData != uString) &&
								(valIndRight.pData.typeOfData != uSet))) {
					throw new ExecException("Error: the referent " +
							Ref1.data.toString() + " or " + Ref2.data.toString() +
					" is not an identifier or a string or a set.");
				} else if ((valIndLeft.pData.data instanceof String) &&
						(valIndRight.pData.data instanceof String)) {
					String sval1 = (String) valIndLeft.pData.data;
					String sval2 = (String) valIndRight.pData.data;
					
					if (sval1.equals(sval2)) {
						if ((OperCG == e_maximalJoin) || (OperCG == e_subsume) ||
								(OperCG == e_generalize)) {
							C3.m_pdReferent = valIndLeft.pData.myCopy();
						}
					} else if (OperCG == e_generalize) {
						C3.m_pdReferent = null;
					} else {
						bResult = false;
					}
				} else if ((valIndLeft.pData.data instanceof PrologList) &&
						(valIndRight.pData.data instanceof PrologList)) {
					// Ttraiter le cas des referents-ensembles
					PrologList setVal1 = (PrologList) valIndLeft.pData.data;
					PrologList setVal2 = (PrologList) valIndRight.pData.data;
					PrologList setVal3 = null;
					
					if (OperCG == e_maximalJoin) { // Determiner l'union
						setVal3 = env.compile.union(setVal1, setVal2);
						C3.m_pdReferent = new PrologData(uSet, setVal3);
						bResult = aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index,
								(String) C3.m_pdType.data); // et si le type est une variable qui a une valeur..?		   
					} else if (OperCG == e_generalize) { // Determiner l'intersection
						setVal3 = env.compile.intersection(setVal1, setVal2);
						C3.m_pdReferent = new PrologData(uSet, setVal3);
					} else if ((OperCG == e_subsume) ||
							(OperCG == e_subsumeWithoutResult) ||
							(OperCG == e_partialContract) ||
							(OperCG == e_completeContract)) { // Determiner inclusion
						
						if (env.compile.set1IsSubsetOfSet2(setVal1, setVal2)) {
							if (OperCG == e_subsume) {
								C3.m_pdReferent = valIndRight.pData.myCopy();
							}
						} else {
							bResult = false;
						}
					}
				} else if ((valIndLeft.pData.data instanceof String) &&
						(valIndRight.pData.data instanceof PrologList)) {
					// Traiter le cas ou l'un est un ref et l'autre un ensemble
					String sVal1 = (String) valIndLeft.pData.data;
					PrologList setVal2 = (PrologList) valIndRight.pData.data;
					PrologList setVal3 = null;
					
					if (OperCG == e_maximalJoin) {
						setVal3 = env.compile.union(valIndLeft.pData, setVal2);
						C3.m_pdReferent = new PrologData(uSet, setVal3);
						bResult = aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index,
								(String) C3.m_pdType.data); // et si le type est une variable qui a une valeur..?		   	 
					} else if (OperCG == e_generalize) { // Determiner l'intersection
						
						if (env.compile.hasString(sVal1, setVal2)) {
							C3.m_pdReferent = valIndLeft.pData.myCopy();
						} else {
							C3.m_pdReferent = null;
						}
					} else if ((OperCG == e_subsume) ||
							(OperCG == e_subsumeWithoutResult) ||
							(OperCG == e_partialContract) ||
							(OperCG == e_completeContract)) { // Determiner inclusion
						
						if (env.compile.hasString(sVal1, setVal2)) {
							if (OperCG == e_subsume) {
								C3.m_pdReferent = valIndRight.pData.myCopy();
							}
						} else {
							bResult = false;
						}
					}
				} else if ((valIndLeft.pData.data instanceof PrologList) &&
						(valIndRight.pData.data instanceof String)) {
					// Traiter le cas ou l'un est un ref et l'autre un ensemble
					PrologList setVal1 = (PrologList) valIndLeft.pData.data;
					String sVal2 = (String) valIndRight.pData.data;
					PrologList setVal3 = null;
					
					if (OperCG == e_maximalJoin) {
						setVal3 = env.compile.union(valIndRight.pData, setVal1);
						C3.m_pdReferent = new PrologData(uSet, setVal3);
						bResult = aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index,
								(String) C3.m_pdType.data); // et si le type est une variable qui a une valeur..?		   		   
					} else if (OperCG == e_generalize) { // Determiner l'intersection
						
						if (env.compile.hasString(sVal2, setVal1)) {
							C3.m_pdReferent = valIndRight.pData.myCopy();
						} else {
							C3.m_pdReferent = null;
						}
					} else if ((OperCG == e_subsume) ||
							(OperCG == e_subsumeWithoutResult) ||
							(OperCG == e_partialContract) ||
							(OperCG == e_completeContract)) { // Determiner inclusion
						
						if ((setVal1.size() == 1) &&
								env.compile.hasString(sVal2, setVal1)) {
							if (OperCG == e_subsume) {
								C3.m_pdReferent = valIndRight.pData.myCopy();
							}
						} else {
							bResult = false;
						}
					}
				}
			} else {
				switch (OperCG) {
				case e_maximalJoin: {
					if ((valIndLeft != null) && (valIndLeft.pData != null)) {
						C3.m_pdReferent = valIndLeft.pData.myCopy();
						bResult = aUnifyCG.conform(C3.m_pdReferent, valIndLeft.index,
								(String) C3.m_pdType.data);
					} else if ((valIndRight != null) &&
							(valIndRight.pData != null)) {
						//  TRAITEMENT A COMPLETER : dans LocaliseOrAdd, si un des referents est une variable et lautre ******
						// un identifiant alors on prend la variable (consideree comme un coref) comme referent pour C3 ********
						// et ici, on ecrase l'ancien referent avec nouveau et de ce fait la coreference disparait, IL FAU REVOIR *********
						C3.m_pdReferent = valIndRight.pData.myCopy();
						bResult = aUnifyCG.conform(C3.m_pdReferent, valIndRight.index,
								(String) C3.m_pdType.data);
					}
				}
				
				break;
				
				case e_subsume: {
					if ((Ref1 == null) ||
							((Ref1.data instanceof String) &&
									((String) Ref1.data).equals("super")) ||
									(valIndLeft.pData == null)) {
						C3.m_pdReferent = valIndRight.pData.myCopy();
					} else {
						bResult = false;
					}
				}
				
				break;
				
				case e_subsumeWithoutResult:
				case e_partialContract:
				case e_completeContract:
					bResult = ((Ref1 == null) ||
							((Ref1.data instanceof String) &&
									((String) Ref1.data).equals("super")) ||
									(valIndLeft.pData == null));
					
					break;
					
				case e_generalize:
					bResult = true;
					break;
				}
			}
		}
		
		return bResult;
	}
	
	// ------------------------------------------------------------------
	boolean matchValue(byte OperCG, PrologData Val1, int level1,
			PrologData Val2, int level2, Concept C3) throws ExecException {
		boolean bResult = true;
		PrologDataIndexPair valIndLeft;
		
		if (Val1 != null) {
			valIndLeft = env.unification.valueFromUnifStack(Val1, level1);
		} else {
			valIndLeft = null;
		}
		
		PrologDataIndexPair valIndRight;
		
		if (Val2 != null) {
			valIndRight = env.unification.valueFromUnifStack(Val2, level2);
		} else {
			valIndRight = null;
		}
		
		if (((Val1 == null) || (valIndLeft.pData == null)) &&
				((Val2 == null) || (valIndRight.pData == null))) {
			bResult = true;
		} else {
			if ((valIndLeft != null) && (valIndLeft.pData != null) &&
					(valIndRight != null) && (valIndRight.pData != null)) {
				if ((valIndLeft.pData.typeOfData == uCG) &&
						(valIndRight.pData.typeOfData == uCG)) {
					CG sval1 = (CG) valIndLeft.pData.data;
					CG sval2 = (CG) valIndRight.pData.data;
					CGMatchResult resMatchCG = new CGMatchResult(new CG(), null);
					
					//GC gcImb = new GC();
					CGOperation operCGImb = new CGOperation(env);
					bResult = operCGImb.matchCG(OperCG, null, sval1, level1, null,
							sval2, level2, resMatchCG);
					operCGImb = null;
					
					if (bResult &&
							((OperCG == e_maximalJoin) ||
									(OperCG == e_subsume) || (OperCG == e_generalize))) {
						C3.m_pdValue = new PrologData(uCG, resMatchCG.G3);
					}
					
					resMatchCG = null;
				} else if (valuesAreEqual(valIndLeft.pData, valIndRight.pData)) {
					if ((OperCG == e_maximalJoin) || (OperCG == e_subsume) ||
							(OperCG == e_generalize)) {
						C3.m_pdValue = new PrologData(valIndLeft.pData.typeOfData,
								valIndRight.pData.data);
					}
				} else if (OperCG == e_generalize) {
					C3.m_pdValue = null;
				} else {
					bResult = false;
				}
			} else {
				switch (OperCG) {
				case e_maximalJoin: {
					if ((valIndLeft != null) && (valIndLeft.pData != null)) {
						C3.m_pdValue = new PrologData(valIndLeft.pData.typeOfData,
								valIndLeft.pData.data);
					} else if ((valIndRight != null) &&
							(valIndRight.pData != null)) {
						C3.m_pdValue = new PrologData(valIndRight.pData.typeOfData,
								valIndRight.pData.data);
					}
				}
				break;
				
				case e_subsume: {
					bResult = ((Val1 == null) || (valIndLeft.pData == null));
					C3.m_pdValue = new PrologData(valIndRight.pData.typeOfData,
							valIndRight.pData.data);
				}
				break;
				
				case e_subsumeWithoutResult:
				case e_partialContract:
				case e_completeContract:
					bResult = ((Val1 == null) || (valIndLeft.pData == null));
					
					break;
					
				case e_generalize:
					bResult = true;
					break;
				}
			}
		}
		
		return bResult;
	}
	
	boolean valuesAreEqual(PrologData Val1, PrologData Val2) {
		if ((Val1.typeOfData != Val2.typeOfData) || !Val1.data.equals(Val2.data)) {
			return false;
		} else {
			return true;
		}
	}
	
	// ------------------------------------------------------------------
	
	// ------------------------------------------------------------------
	// Localiser un couple de variables qui joueraient le role
	// de coreferent. En fait, toute variable est considere par defaut comme
	// un coreferent. Cela se confirmera si on la retrouve a nouveau comme referent
	// dun concept imbrique 
	boolean LocaliseOrAdd(byte OperCG, PrologData Ref1, PrologData Ref2,
			Concept C3) {
		boolean BRes = true;
		boolean existe = false;
		String sRef1 = null;
		String sRef2 = null;
		
		if ((Ref1 != null) && (Ref1.data instanceof String)) {
			sRef1 = (String) Ref1.data;
		}
		
		if ((Ref2 != null) && (Ref2.data instanceof String)) {
			sRef2 = (String) Ref2.data;
		}
		
		if ((sRef1 == null) && (sRef2 == null)) {
			return true;
		}
		
		CoreferenceMatch E = null;
		
		for (Enumeration<CoreferenceMatch> e = corefMatchVec.elements();
		e.hasMoreElements() && !existe;) {
			E = (CoreferenceMatch) e.nextElement();
			existe = ((sRef1 != null) && (E.Var1 != null) &&
					E.Var1.equals(sRef1)) ||
					((sRef2 != null) && (E.Var2 != null) && E.Var2.equals(sRef2));
		}
		
		if (existe) { //  Le couple est localis?; une des variables a ete deja utilise..
			
			if ((sRef1 != null) && (E.Var1 != null)) {
				BRes = E.Var1.equals(sRef1);
			}
			
			if (BRes && (sRef2 != null) && (E.Var2 != null)) {
				BRes = E.Var2.equals(sRef2);
			}
			
			if (BRes) {
				if ((E.Var3 != null) && !in(OperCG, setOpersId, 2)) {
					C3.m_pdReferent = new PrologData(uVariable, E.Var3);
				}
			}
		} else if (isCoreferent(Ref1) || isCoreferent(Ref2)) { // Il n'est pas localis?; il faut ajouter le couple, si au moins un des referents est une variable
			if (OperCG == e_subsume) {
				if ((sRef1 != null) && (sRef2 == null)) {
					BRes = false;
				} else {
					C3.m_pdReferent = Ref2.myCopy();
					corefMatchVec.addElement(new CoreferenceMatch(sRef1, sRef2,
							(String) C3.m_pdReferent.data));
				}
			} else if (OperCG == e_maximalJoin) {
				// || (OperCG == e_generalize && EstCoref(sRef1) && EstCoref(sRef2)) )  {
				// Le cas des oper. de jointure ou generalisation
				// on presume que les referents sont des variables representant des coreferents.
				// NOTE IMPRT: un element d un CoreferenceMatch peut etre null
				if (isCoreferent(Ref1)) {
					C3.m_pdReferent = Ref1.myCopy();
				} else {
					C3.m_pdReferent = Ref2.myCopy();
				}
				
				corefMatchVec.addElement(new CoreferenceMatch(sRef1, sRef2,
						(String) C3.m_pdReferent.data));
			}
			
			//corefMatchVec.addElement(new CoreferenceMatch(sRef1, sRef2, nouvCoref));
		}
		return BRes;
	}
	
	boolean in(byte v, byte[] vctByte, int indLastElem) {
		boolean bFound = false;
		
		for (int i = 0; (i <= indLastElem) && !bFound; i++) {
			bFound = (vctByte[i] == v);
		}
		return bFound;
	}
}
