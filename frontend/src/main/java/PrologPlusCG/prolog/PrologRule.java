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
import java.util.Vector;



public class PrologRule {	
	protected Vector<PrologTerm> vec;
	
	public PrologRule() {
		vec = new Vector<PrologTerm>(5, 2);
	}
	
	public PrologTerm getAt(int i) {
		return vec.get(i);
	}
	
	public PrologTerm get(int i) {
		return vec.get(i);
	}
	
	public PrologTerm elementAt(int i) {
		return vec.get(i);
	}
	
	public void set(int index, PrologTerm pt) {
		vec.set(index,  pt);
	}
	
    public void trimToSize() {
    		// Do nothing in this implementation, as Vector.trimToSize() does not work in JavaScript.
    }
    
    public int size() {
    		return vec.size();
    }
    
    public void clear() {
    		vec.clear();
    }
	
	public void myDestroy() {
		if (this.size() == 0) {
			return;
		} else {
			PrologTerm aTerm;
			
			for (int listIndex1 = 0;
					listIndex1 < this.vec.size(); 
					++listIndex1) {
				aTerm = this.vec.get(listIndex1);
				aTerm.myDestroy();
			}
			
			this.clear();
		}
	}
	
	public boolean hasOnlyAtoms(PPCGEnv env) {
		if (this.size() == 0) {
			return true;
		} else {
			PrologTerm aTerm;
			
			for (int listIndex1 = 0;
					listIndex1 < this.vec.size(); 
					++listIndex1) {
				aTerm = this.vec.get(listIndex1);
				if (!aTerm.hasOnlyAtoms(env)) {
					return false;
				}
			}
			return true;
		}
	}
	
	public PrologTerm firstElement() {
			return vec.get(0);
	} 
	
	public void addTerm(PrologTerm terme) {
		vec.addElement(terme);
	}
}
