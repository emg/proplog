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

public interface DataTypes {
	/** Set of lexical token types: Possible values of nTokenType ****/
	static final byte uNumber = 0;
	static final byte uBoolean = 1;
	static final byte uIdentifier = 2;
	static final byte uString = 3;
	static final byte uVariable = 4;
	static final byte uConcept = 37; 
	static final byte uObject = 43; 
	static final byte uSet = 44;
	static final byte uEntails = 5;
	static final byte uComma = 6;
	static final byte uOpenParens = 7;
	static final byte uCloseParens = 8;
	static final byte uPipe = 9;
	static final byte uPeriod = 10;
	static final byte uTerm = 11;
	static final byte uVarList = 12;
	static final byte uList = 13;
	static final byte uCG = 14;
	static final byte uOpenBracket = 15;
	static final byte uCloseBracket = 16;
	static final byte uColon = 17;
	static final byte uEqualsSign = 18;
	static final byte uMinus = 19;
	static final byte uRightArrow = 20;
	static final byte uLeftArrow = 21;
	static final byte uSemicolon = 22;
	static final byte uExclamationMark = 38; // 38
	static final byte uQuestionMark = 39; // 39
	static final byte uGreaterThan = 23;
	static final byte uDoubleColon = 24;
	static final byte uOpenBrace = 25;
	static final byte uCloseBrace = 26;
	static final byte uAmpersAnd = 27;
	static final byte uIdentSpecial = 28;
	
	// Set of CG operations
	static final byte e_match = 29;
	static final byte e_project = 30;
	static final byte e_maximalJoin = 31;
	static final byte e_generalize = 32;
	static final byte e_subsume = 33;
	static final byte e_subsumeWithoutResult = 34;
	static final byte e_completeContract = 35;
	static final byte e_partialContract = 36;
	
	// What should be read next?
	static final byte uReadData = 41;
	static final byte uReadSentence = 42;
}
