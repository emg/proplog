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




public class PrologList extends PrologDataVector  {
	PrologList() {
		super(5, 2);
	}
	
	public void myDestroy() {
		if (this.size() == 0) {
			return;
		} else {
			PrologData uneDon;
			
			for (int index = 0; index < this.size(); ++index) {
				uneDon = (PrologData) this.get(index);
				uneDon.myDestroy();
			}
			this.clear();
		}
	}
	
	public PrologList myCopy() {
		PrologList newList = null;
		
		if (size() != 0) {
			newList = new PrologList();
			
			PrologData aPrologData;
			
			for (int index = 0;
					index < this.size();
					++index) {
				aPrologData = this.get(index);
				newList.addData(aPrologData.myCopy());
			}
		}
		return newList;
	}
	
	public PrologData getAt(int i) {
		return (PrologData) elementAt(i);
	}
	
	public void addData(PrologData don) {
		addElement(don);
	}
}
