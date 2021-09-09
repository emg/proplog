/**********************************************************************
 *
 * Prolog+CG : Prolog with conceptual graphs
 *
 * Copyright (C) 2000-2004  Adil Kabbaj
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

import java.util.Vector;

import PrologPlusCG.cg.Concept;
import PrologPlusCG.prolog.DataTypes;
import PrologPlusCG.prolog.PrologData;


public class CG {
	public Vector<Concept> m_vctConcepts;
	public Vector<Relation> m_vctRelations;
	
	/** CG : simple et fonctionnel; les rel. en sortie de tout concept sont
	 mutuellement disjoint. Il en est de meme pour les relations en entree
	 ********/
	public CG() {
		m_vctConcepts = new Vector<Concept>(10, 3);
		m_vctRelations = new Vector<Relation>(10, 3);
	}
	
	public CG(Vector<Concept> lstConc, Vector<Relation> lstRel) {
		m_vctConcepts = lstConc;
		m_vctRelations = lstRel;
	}
	
	protected void finalize() {
		m_vctConcepts.clear();
		m_vctRelations.clear();
		m_vctConcepts = null;
		m_vctRelations = null;
	}
	
	/** Elle retourne un CG qui est une copie du CG en question **/
	public CG myCopy() {
		CG newCG = new CG();
		
		Vector<ConceptPair> listOfConceptPairs = new Vector<ConceptPair>(5, 2);
		
		// ----- copie liste des concepts
		Concept conc;
		
		// ----- copie liste des concepts
		Concept ncept;
		
		for (int listIndex1 = 0;
				listIndex1 < m_vctConcepts.size(); 
				listIndex1++) {
			conc = m_vctConcepts.get(listIndex1);
			ncept = conc.myCopy();
			
			newCG.addConcept(ncept);
			listOfConceptPairs.addElement(new ConceptPair(conc, ncept));
		}
		conc = ncept = null;
		
		// ----- copie liste des relations
		Relation rela;
		
		// ----- copie liste des relations
		Relation nrela;
		
		for (int listIndex2 = 0;
				listIndex2 < m_vctRelations.size();
				++listIndex2) {
			rela = (Relation) m_vctRelations.get(listIndex2);
			nrela = rela.myCopy();
			
			// Determiner les concepts source et cible de nrela, en
			// utilisant la liste des couples de conc.
			// Et constituer les listes des relations en in/out de
			// chaque concept.
			ConceptPair couple;
			boolean non_trouve1 = true;
			boolean non_trouve2 = true;
			
			for (int listIndex3 = 0;
					listIndex3 < listOfConceptPairs.size() && (non_trouve1 || non_trouve2);
					++listIndex3) {
				couple = listOfConceptPairs.get(listIndex3);
				
				if (non_trouve1 && (rela.m_concSource == couple.m_initialConcept)) {
					nrela.m_concSource = couple.m_conceptCopy;
					nrela.m_concSource.addOutgoingRelation(nrela);
					non_trouve1 = false;
				}
				
				if (non_trouve2 && (rela.m_concDestination == couple.m_initialConcept)) {
					nrela.m_concDestination = couple.m_conceptCopy;
					nrela.m_concDestination.addIncomingRelation(nrela);
					non_trouve2 = false;
				}
			} // fin du for .. e1
			
			newCG.addRelation(nrela);
		}
		
		rela = nrela = null;
		listOfConceptPairs.clear();
		listOfConceptPairs = null;
		
		return newCG;
	}
	
	/** Ajouter un concept au CG  ***/
	public void addConcept(Concept conc) {
		m_vctConcepts.addElement(conc);
	}
	
	/** Ajouter une relation au CG ***/
	public void addRelation(Relation rel) {
		m_vctRelations.addElement(rel);
	}
	
	/** Enlever un concept du CG **/
	public void removeConcept(Concept conc) {
		m_vctConcepts.removeElement(conc);
	}
	
	/** Enlever une relation du CG **/
	public void removeRelation(Relation rel) {
		m_vctRelations.removeElement(rel);
	}
	
	public void removeSpecialIdent() {
		Concept conc;
		
		for (int listIndex1 = 0;
				listIndex1 < m_vctConcepts.size(); 
				++listIndex1) {
			conc = m_vctConcepts.get(listIndex1);
			
			if ((conc.m_pdReferent != null) &&
					(conc.m_pdReferent.typeOfData == DataTypes.uIdentSpecial)) {
				conc.m_pdReferent = null;
			}
		}
	}
	
	public boolean isEmpty() {
		return ((m_vctConcepts == null) || m_vctConcepts.isEmpty());
	}
	
	/** MakeEmpty les listes de concepts et relations du CG **/
	public void myDestroy() {
		m_vctConcepts.clear();
		m_vctRelations.clear();
		m_vctConcepts = null;
		m_vctRelations = null;
	}
	
	public void makeEmpty() {
		m_vctConcepts.clear();
		m_vctRelations.clear();
	}
	
	public void createRelation(PrologData sIdRel, Concept conce_source, Concept conc_destination) {
		Relation nrel = new Relation(sIdRel, conce_source, conc_destination);
		addRelation(nrel); // Ajouter la relation ainsi cr?e dans ce CG
		nrel = null;
	}
}
