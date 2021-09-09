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


//******* Classe utilise par la resolution
class TermToBeResolved {
	// A term to be resolved (an element of 
	// Resolution.Exec_Stack or Resolution.Return_Stack)
	PrologTerm pTerm;
	int index;
	int pos;
	int indexInExecStack; // utiliser en principe pour les buts definis
	String Cle;
	PrologList lstMember;
	int indLstMember;
	
	TermToBeResolved() {
		lstMember = null;
		indLstMember = 0;
	}
	
	TermToBeResolved(PrologTerm paramTerm, int paramIndex, int paramPos) {
		lstMember = null;
		indLstMember = 0;
		pTerm = paramTerm;
		index = paramIndex;
		pos = paramPos;
		// par defaut, indiquant qu'il faut l'ignorer. Il sera
		// modifier dans le cas d'un but defini et aussi dans 
		// le cas d'un but-var
		
		// By default, indicates that it will be ignored.  
		// It will be modifed in the case of a defined goal, and also
		// in the case of a variable-goal.
		indexInExecStack = -1; 
	}
}
