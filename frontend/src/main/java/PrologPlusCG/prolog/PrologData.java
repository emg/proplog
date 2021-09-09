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

import PrologPlusCG.cg.CG;

public class PrologData implements DataTypes {
	public Object data;
	public byte typeOfData;

    public PrologData() {
		// Nothing to do in this constructor
    }

    public PrologData(byte typObj, Object ObjPrlg) {
        typeOfData = typObj;
        data = ObjPrlg;
    }

    public void myDestroy() {
        switch (typeOfData) {
        case uNumber:
        case uBoolean:
        case uIdentifier:
        case uString:
        case uVariable:
        case uVarList:
            data = null;

            break;

        case uTerm: {
            ((PrologTerm) data).myDestroy();
            data = null;
        }

        break;

        case uSet:
        case uList:((PrologList) data).myDestroy();

        break;

        case uCG:((CG) data).myDestroy();

        break;
        }
    }

	public String valString() {
        return (String) data;
    }

	public PrologData myCopy() {
        Object nouvObj = null;

        switch (typeOfData) {
        case uNumber:

            if (data instanceof Long) {
                long valLong = ((Long) data).longValue();
                nouvObj = new Long(valLong);
            } else {
                double valDble = ((Double) data).doubleValue();
                nouvObj = new Double(valDble);
            }
            break;

        case uBoolean: {
            boolean valBool = ((Boolean) data).booleanValue();
            if (valBool) {
            		nouvObj = Boolean.TRUE;
            } else {
            		nouvObj = Boolean.FALSE;
            }
        }
        break;

        case uIdentifier:
        case uString:
        case uVariable:
        case uVarList:
            nouvObj = (String) data;
            break;

        case uTerm:
            nouvObj = ((PrologTerm) data).myCopy();
            break;

        case uSet:
        case uList:
            nouvObj = ((PrologList) data).myCopy();
            break;

        case uCG:
            nouvObj = ((CG) data).myCopy();
            break;
        }

        return new PrologData(typeOfData, nouvObj);
    }
}
