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


package PrologPlusCG.prolog;

import java.util.*;



public class UnificationStack {
	 Vector<UnificationRecord> vec; 
	
	// Dans un RecUnif (un elem de la pile), chaque variable et chaque constante
	// qui partie dans une association (autre que cste = cste) auront des entrees
	UnificationStack() {
		vec = new Vector<UnificationRecord>(10, 2);
	}
	
	public int indexOfTop() {
		return (vec.size() - 1);
	}
	
	public void push(UnificationRecord recUnif) {
		vec.add(recUnif);
	}
	
	public void pushEmptyRecord() {
		push(new UnificationRecord());
	}
	
	public UnificationRecord pop() {
		UnificationRecord recUnif = getTop();
		
		// Avant de depiler et puisqu'il y avait propagation des associations,
		// il faut les defaire : defaire la propagation de la valeur et les assoc
		// entre variables.
		VariableIndexPairList pCLContr;
		String strVar;
		
		Vector<String> recUnifKeys = recUnif.keys();

		for (int listIndex = 0;
				listIndex < recUnifKeys.size();
				++listIndex) {
			strVar = recUnifKeys.get(listIndex);
			pCLContr = (VariableIndexPairList) recUnif.get(strVar);
			
			// Pour defaire la propagation de la valeur, il suffit de :
			if (pCLContr.ValInd != null) {
				pCLContr.ValInd.pData = null; // .. le mettre a null car les autres variables
			}
			
			// partagent la meme reference a l'objet pCLContr.ValInd
			// Il suffit donc de verifier si pCLContr.ValInd.pDonnee == null
			//  Pour defaire les assoc entre variables, il suffit de parcourir la liste des contr
			//   de la variable courante sVar et d'aller a l'entree de chaque variable associee
			//  pour enlever logiquement l'association avec la variable courante
			VariableIndexPair VarInd;
			
			for (int listIndex2 = 0;
					listIndex2 < pCLContr.size(); 
					++listIndex2) {
				VarInd = pCLContr.get(listIndex2);
				removeVariable(VarInd.idVariable, VarInd.index, strVar, indexOfTop());
				VarInd.idVariable = null;
			}
			VarInd = null;
			pCLContr.clear();
		}

		pCLContr = null;
		strVar = null;
		recUnif.clear();

		vec.remove(vec.size() - 1);
		
		return recUnif;
	}

	public UnificationRecord lastElement() {
		return vec.get(vec.size()-1);
	}
	
	public UnificationRecord getTop() {
		return (UnificationRecord) lastElement();
	}
	
	public void makeEmpty() {
		vec.clear();
	}
	
	public UnificationRecord get(int index) {
		return vec.get(index);
	}

	public UnificationRecord elementAt(int index) {
		return vec.get(index);
	}
	
	public void removeVariable(String sVar, int niv, String sVarAtr, int nivVarAtr) {
		if (sVar == null) {
			return;
		}
		
		UnificationRecord recUnif = vec.get(niv);
		VariableIndexPairList pCLContr = (VariableIndexPairList) recUnif.get(sVar);
		boolean bFound = false;
		VariableIndexPair VarInd;
		
		for (int listIndex2 = 0;
				listIndex2 < pCLContr.size() && !bFound; 
				++listIndex2) {
			VarInd = pCLContr.get(listIndex2);
			
			if (VarInd.idVariable.equals(sVarAtr) && (VarInd.index == nivVarAtr)) {
				bFound = true;
				VarInd.idVariable = null;
			}
		}
	}
}
