
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

import java.util.Vector;

import PrologPlusCG.prolog.DataTypes;
import PrologPlusCG.prolog.PrologData;
import PrologPlusCG.prolog.PrologDataIndexPair;
import PrologPlusCG.prolog.PPCGEnv;


public class Concept implements DataTypes {
	public PrologData m_pdType;
    public PrologData m_pdReferent;
	public PrologData m_pdValue;
	public Vector<Relation> m_vctIncomingRelations;
	public Vector<Relation> m_vctOutgoingRelations;

	private PPCGEnv env = null;
	
    // 1. Constructeurs
    public Concept(PPCGEnv myenv) {
	env = myenv;
        m_pdType = null;
        m_pdReferent = null;
        m_pdValue = null;
        m_vctIncomingRelations = new Vector<Relation>(4, 2);
        m_vctOutgoingRelations = new Vector<Relation>(4, 2);
    }

    public Concept(PrologData Typ, PrologData Ref, PrologData Val, PPCGEnv myenv) {
	env = myenv;
        m_pdType = Typ;
        m_pdReferent = Ref;
        m_pdValue = Val;
        m_vctIncomingRelations = new Vector<Relation>(4, 2);
        m_vctOutgoingRelations = new Vector<Relation>(4, 2);
    }

    protected void finalize() {
        m_pdType = null;
        m_pdReferent = null;
        m_pdValue = null;
        m_vctIncomingRelations.clear();
        m_vctOutgoingRelations.clear();
    }

    public Concept myCopy() {
        Concept nouvConc = new Concept(env);
        nouvConc.m_pdType = m_pdType.myCopy();

        if (m_pdReferent != null) {
            nouvConc.m_pdReferent = m_pdReferent.myCopy();
        }

        if (m_pdValue != null) {
            nouvConc.m_pdValue = m_pdValue.myCopy();
        }

        // Les relations sont copi?es lors de la copie du CG,
        // pour ne pas creer de conflit; partage des memes objets par
        // les differentes copies.
        return nouvConc;
    }

	public Concept copyValue(int level) {
        Concept newConcept = new Concept(env);
        PrologDataIndexPair ValType = env.unification.valueFromUnifStack(m_pdType, level);
        newConcept.m_pdType = ValType.pData.myCopy();

        if (m_pdReferent != null) {
            PrologDataIndexPair ValRef = env.unification.valueFromUnifStack(m_pdReferent, level);

            if (ValRef.pData != null) {
                newConcept.m_pdReferent = ValRef.pData.myCopy();
            }
        }

        if (m_pdValue != null) {
            PrologDataIndexPair ValVal = env.unification.valueFromUnifStack(m_pdValue, level);

            if (ValVal.pData != null) {
                newConcept.m_pdValue = ValVal.pData.myCopy();
            }
        }

		// Les relations sont copi?es lors de la copie du CG,
        // pour ne pas creer de conflit; partage des memes objets par
        // les differentes copies.
        return newConcept;
    }

    /** Ajouter une relation en entr?e au concept **/
	public void addIncomingRelation(Relation rel) {
        m_vctIncomingRelations.addElement(rel);
    }

    /** Ajouter une relation en entr?e au concept **/
	public void addOutgoingRelation(Relation rel) {
        m_vctOutgoingRelations.addElement(rel);
    }

    /** Enlever une relation en sortie du concept **/
	public void removeOutgoingRelation(Relation rel) {
        m_vctOutgoingRelations.removeElement(rel);
    }

    /** Enlever une relation en entr?e du concept **/
	public void removeIncomingRelation(Relation rel) {
        m_vctIncomingRelations.removeElement(rel);
    }
}
