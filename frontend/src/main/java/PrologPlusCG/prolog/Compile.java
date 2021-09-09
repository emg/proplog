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

import java.util.Hashtable;
import java.util.Set;
import java.util.Vector;

import PrologPlusCG.cg.CG;
import PrologPlusCG.cg.Concept;
import PrologPlusCG.cg.Relation;


public class Compile implements DataTypes {
	/*** Variables globales pour la compilation  **********/
	/**** Variables globales pour readChar()  *****/
	public String CompileTxt;
	public int textEndIndex;
	char curChar = ' ';
	public int curCharIndex = 0;
	public int curLineNumber = 1;
	StringBuffer token;
	byte nTokenType;
	public final String valSysSP = "#$SP$#";
	public final String valSysINST = "#$INST$#";
	public final String valSysGEN = "#$GEN$#";
	public final String valSysIdVar = "#$VAR1$#";
	public final String valSysCleCG = "#$CG$#";
	public final String valSysCleBtCp = "#$BtCp$#";
	public Vector<UnitType> vctUnitTyp = new Vector<UnitType>(50, 10);
	int currElem = 0;
	Vector<String> vctVariableIdentifiersInQuery = new Vector<String>(7, 2);
	
	private PPCGEnv env = null;
	
	Compile(PPCGEnv myenv) {
		env = myenv;
	}
	
	// Returns true on ident is a variable.
	// Note that you must be sure that it is an identifier
	boolean identifierIsVar(String ident) {
		boolean bIsVar;
		if (ident.length() >= 2) {
			bIsVar = (Character.isDigit(ident.charAt(1)) ||
					(ident.charAt(1) == '_')
					|| (ident.charAt(0) == '_'));
		} else {
			bIsVar = true;
		}
		return bIsVar;
	}
	
	/******************************************************************/
	/********************** a) Lexical analysis ***********************/
	char nextChar() {
		return CompileTxt.charAt(curCharIndex);
	}
	
	public void readChar() throws CompileException {
		if (curCharIndex == textEndIndex) {
			// Force in the case where CompileTxt doesn't
			// end in \n
			curChar = '\n'; 
			
			// de terminer la lecture des unites (Lire_unite)
			throw new CompileException("End Of Text");
		}
		
		curChar = CompileTxt.charAt(curCharIndex);
		curCharIndex++;
		
		boolean ignorer = true;
		
		while (ignorer) {
			try {
				while (((curChar == '\n') || (curChar == '\r'))
				       && (curCharIndex < textEndIndex)) {
					if (curChar == '\n')
						curLineNumber++;
					curChar = CompileTxt.charAt(curCharIndex);
					curCharIndex++;
				}
			} catch (java.lang.StringIndexOutOfBoundsException sioobe) {
				throw new CompileException("StringIndexOutOfBoundsException");
			}
			
			if ((curChar == '/') && (curCharIndex < textEndIndex) &&
					(CompileTxt.charAt(curCharIndex) == '/')) {
				// Lire et ignorer la ligne commentaire
				try {
					while ((curChar != '\n') && (curCharIndex < textEndIndex)) {
						curChar = CompileTxt.charAt(curCharIndex);
						curCharIndex++;
					}
					curLineNumber++;
				} catch (java.lang.StringIndexOutOfBoundsException sioobe) {
					throw new CompileException(
					"StringIndexOutOfBoundsException");
				}
			}
			
			if (curCharIndex == textEndIndex) {
				ignorer = false;
			} else if ((curChar == '\r'
				|| (curChar == '\n'))) {
				ignorer = true;
			} else if ((curChar == '/')
					&& (CompileTxt.charAt(curCharIndex) == '/')) {
				ignorer = true;
			} else {
				ignorer = false;
			}
		}  // fin de while (ignorer)
	}
	
	void eatWhiteSpace() throws CompileException {
		// retourner le premier car non espace
		readChar();
		
		while ((curChar == ' ') 
				|| (curChar == '\n')
				|| (curChar == '\t')
				|| (curChar == '\r'))
			readChar();
	}
	
	static boolean isSpaceChar(char c) {
		return (c == ' ')
				|| (c == '\n')
				|| (c == '\r')
				|| (c == '\t');
	}
	
	boolean isIdVar() {
		// une lettre suivi de rien ou d'un chiffre ou d'un underscore et
		// ensuite elle peut etre suivi d'une sequence de caracteres.
		// On sait que le premier car. est une lettre. Il suffit de
		// tester sur le second s'il existe
		if (token.length() >= 2) {
			return (Character.isDigit(token.charAt(1)) ||
					(token.charAt(1) == '_')
					|| (token.charAt(0) == '_'));
		} else {
			return true;
		}
	}
	
	void readToken(boolean bGenerateCode) throws CompileException {
		// Lit une token et garde dans curChar le prochain car
		// non inclu dans l'token lue.
		if (bGenerateCode) {
			if (currElem == vctUnitTyp.size()) {
				throw new CompileException("End Of Text");
			}
			
			token = ((UnitType) vctUnitTyp.elementAt(currElem)).unit;
			nTokenType = ((UnitType) vctUnitTyp.elementAt(currElem)).typUnit;
			currElem++;
			
			return;
		}
		
		token = new StringBuffer("");
		
		/* Lire_unite commence avec le fait qu'il y a deja le premier
		 car. de l'token a lire dans curChar.
		 La prochaine instr tient compte du cas ou le car est un espace ****/
		if (isSpaceChar(curChar) || (curChar == '\t')
				|| (curChar == '\r')) {
			eatWhiteSpace();
		}
		
		if (Character.isLetter(curChar)) {
			token.append(curChar);
			
			try {
				readChar();
				
				while (Character.isLetterOrDigit(curChar) || (curChar == '_')) {
					token.append(curChar);
					readChar();
				}
			} catch (CompileException e1) {
				if (!e1.getMessage().equals("End Of Text")) {
					throw new CompileException(
							"Error during the reading of an identifier " +
							token.toString() + " at line " + curLineNumber);
				}
			}
			
			if (isIdVar()) {
				nTokenType = uVariable;
			} else {
				String uniteStr = new String(token);
				uniteStr = uniteStr.toLowerCase();
				
				if (uniteStr.equals("true") || uniteStr.equals("false")) {
					nTokenType = uBoolean;
					token = new StringBuffer(uniteStr);
				} else {
					nTokenType = uIdentifier;
				}
				
				uniteStr = null;
			}
		} else if (((curChar == '-') 
				&& Character.isDigit(nextChar())) ||
				Character.isDigit(curChar)) {
			token.append(curChar);
			
			try {
				readChar();
				
				while (Character.isDigit(curChar)) {
					token.append(curChar);
					readChar();
				}
				
				if (curChar == '.') {
					token.append(curChar);
					readChar();
					
					while (Character.isDigit(curChar)) {
						token.append(curChar);
						readChar();
					}
				}
			} catch (CompileException e1) {
				if (!e1.getMessage().equals("End Of Text")) {
					throw new CompileException(
							"Error during the reading of a number " +
							token.toString() + " at line " + curLineNumber);
				}
			}
			nTokenType = uNumber;
		} else {
			switch (curChar) {
			case '"': {
				try {
					// We must include the " in the string.
					token.append('"'); 
					
					try {
						readChar();
					} catch (CompileException e1) {
						if (!e1.getMessage().equals("End Of Text")) {
							throw new CompileException(
									"Error during the reading of a string " +
									token.toString() + " at line " + curLineNumber);
						}
					}
					
					while (curChar != '"') {
						token.append(curChar);
						
						try {
							readChar();
						} catch (CompileException e1a) {
							if (!e1a.getMessage().equals("End Of Text")) {
								throw new CompileException(
										"Error during the reading of a string " +
										token.toString() + " at line " +
										curLineNumber);
							}
						}
					}
					token.append('"');
					readChar();
				} catch (CompileException e1b) {
					if (!e1b.getMessage().equals("End Of Text")) {
						throw new CompileException("Error in reading a string " +
								token.toString() + " at line " + curLineNumber);
					}
				}
				nTokenType = uString;
			}
			break;
			
			case ':': {
				try {
					token.append(curChar);
					readChar();
					
					if (curChar == '-') {
						token.append(curChar);
						nTokenType = uEntails;
						readChar();
					} else if (curChar == ':') {
						token.append(curChar);
						nTokenType = uDoubleColon;
						readChar();
					} else {
						nTokenType = uColon;
					}
				} catch (CompileException e1) {
					throw new CompileException(e1.getMessage() +
							"\n Error in reading the :- symbol at line " +
							curLineNumber);
				}
			}
			break;
			
			case '-': {
				try {
					token.append(curChar);
					readChar();
					
					if (curChar == '>') {
						token.append(curChar);
						nTokenType = uRightArrow;
						readChar();
					} else {
						nTokenType = uMinus;
					}
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the , symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case '<': {
				try {
					token.append(curChar);
					readChar();
					
					if (curChar == '-') {
						token.append(curChar);
						nTokenType = uLeftArrow;
						readChar();
					} else {
						throw new CompileException(
								"Error in reading the < symbol at line " +
								curLineNumber);
					}
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the < symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case ',': {
				try {
					token.append(curChar);
					nTokenType = uComma;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the , symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case ';': {
				try {
					token.append(curChar);
					nTokenType = uSemicolon;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the ; symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case '!': {
				try {
					token.append(curChar);
					nTokenType = uExclamationMark;
					readChar();
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error in reading the ! symbol at line " +
								curLineNumber);
					}
				}
			}
			
			break;
			
			case '?': {
				try {
					token.append(curChar);
					nTokenType = uQuestionMark;
					readChar();
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error in reading the ? symbol at line " +
								curLineNumber);
					}
				}
			}
			
			break;
			
			case '=': {
				try {
					token.append(curChar);
					nTokenType = uEqualsSign;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the = symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case '[': {
				try {
					token.append(curChar);
					nTokenType = uOpenBracket;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the [ symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case ']': {
				token.append(curChar);
				nTokenType = uCloseBracket;
				
				try {
					readChar();
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error after reading the character ] at line " +
								curLineNumber);
					}
				}
			}
			
			break;
			
			case '{': {
				try {
					token.append(curChar);
					nTokenType = uOpenBrace;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the { symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case '}': {
				token.append(curChar);
				nTokenType = uCloseBrace;
				
				try {
					readChar();
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error after reading the character } at line " +
								curLineNumber);
					}
				}
			}
			
			break;
			
			case '&': {
				try {
					token.append(curChar);
					nTokenType = uAmpersAnd;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the & symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case '>': {
				try {
					token.append(curChar);
					nTokenType = uGreaterThan;
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the > symbol at line " +
							curLineNumber);
				}
			}
			
			break;
			
			case '_': {
				try {
					token.append(curChar);
					readChar();
					
					while (Character.isLetterOrDigit(curChar) ||
							(curChar == '_')) {
						token.append(curChar);
						readChar();
					}
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error in reading a variable identifier " +
								token.toString() + " at line " + curLineNumber);
					}
				}
				nTokenType = uVariable;
			}
			
			break;
			
			case '*': {
				try {
					token.append(curChar);
					readChar();
					
					while (Character.isLetterOrDigit(curChar) ||
							(curChar == '_')) {
						token.append(curChar);
						readChar();
					}
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error in reading a special identifier " +
								token.toString() + " at line " + curLineNumber);
					}
				}
				nTokenType = uIdentSpecial;
			}
			
			break;
			
			case '(': {
				token.append(curChar);
				nTokenType = uOpenParens;
				
				try {
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the character ( at line " +
							curLineNumber);
				}
			}
			break;
			
			case ')': {
				token.append(curChar);
				nTokenType = uCloseParens;
				
				try {
					readChar();
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(
								"Error in reading the character ) at line " +
								curLineNumber);
					}
				}
			}
			
			break;
			
			case '|': {
				token.append(curChar);
				nTokenType = uPipe;
				
				try {
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the character | at line " +
							curLineNumber);
				}
			}
			break;
			
			case '/': {
				token.append(curChar);
				nTokenType = uIdentifier; // Le cut, considere comme un ident de .. predicat
				
				try {
					readChar();
				} catch (CompileException e1) {
					throw new CompileException(
							"Error in reading the character / at line " +
							curLineNumber);
				}
			}
			break;
			
			case '.': {
				token.append(curChar);
				nTokenType = uPeriod;
				
				try {
					readChar();
				} catch (CompileException e2) {
					if (e2.getMessage().equals("End Of Text")) {
						UnitType aUnitTyp = new UnitType(token, nTokenType);
						vctUnitTyp.addElement(aUnitTyp);
						throw new CompileException("End Of Text");
					} else {
						throw new CompileException(e2.getMessage());
					}
				}
			}
			
			break;
			
			case '\n':
				throw new CompileException("End Of Text");
				
			default:
				throw new CompileException("Illegal Character at line " +
						curLineNumber);
			}
		}
		
		UnitType aUnitTyp = new UnitType(token, nTokenType);
		vctUnitTyp.addElement(aUnitTyp);
	}
	
	void recognizeToken(String param_token) throws CompileException {
		// elle ne lit pas une nouvelle token, mais teste seulement
		// l'token courante.
		String str = new String(token);
		
		if (!str.equals(param_token)) {
			throw new CompileException("Error: The string " + param_token +
					" is expected at line " + curLineNumber);
		}
		
		str = null;
	}
	
	void recognizeToken(String param_token, byte param_token_type)
	throws CompileException {
		// elle ne lit pas une nouvelle token, mais teste seulement
		// l'token courante.
		if (param_token != null) {
			String str = new String(token);
			
			if (!str.equals(param_token)) {
				throw new CompileException("Error: The string " + param_token +
						" is expected at line " + curLineNumber);
			}
			
			str = null;
		} else if (param_token_type != nTokenType) {
			throw new CompileException("Error: A " + param_token_type +
					" is expected at line " + curLineNumber);
		}
	}
	
	/******************************************************************/
	/********************** b) Syntactic analysis *********************/
	public void doCompile(boolean bGenerateCode) throws CompileException {
		// Initialiser les variables en cause
		if (bGenerateCode) {
			currElem = 0; // La lecture des unites se fera a partir du vecteur vctUnitTyp
			
			//ClePaqCour = "";  // Variable globale pour tRegle
		} else {
			CompileTxt = env.getProgramText();
			textEndIndex = CompileTxt.length();
			
			if (textEndIndex == 0) { // Cas particulier
				throw new CompileException("Error : Empty prolog program");
			}
			
			curLineNumber = 1;
			curCharIndex = 0;
			readChar();
			vctUnitTyp.clear(); // MakeEmpty le vecteur pour recevoir de
			
			// nouvelles unites
		}
		
		if (bGenerateCode) {
			env.program = new Hashtable<String, RuleVector>(20);
		}
		
		try { // on arrete la boucle lors d'une exception, 'bonne' si
			
			// il s'agit de End Of Text ...
			while (true)
				tRule(bGenerateCode); // Translation of a rule ;
		} catch (CompileException e2) {
			if (!e2.getMessage().equals("End Of Text")) {
				throw new CompileException(e2.getMessage() +
						"\nError in the rule at line " + curLineNumber);
			}
		}
				
		if (bGenerateCode) {
			RuleVector paqRgles = null;
			
			Set<String> keys = env.program.keySet();
			for (String key : keys) {
				paqRgles = env.program.get(key);
				paqRgles.trimToSize();
			}
		}
	}
	
	void checkThatRuleOnlyHasAtoms() throws CompileException {
		PrologRule myRule = env.pCurRule;
		if (!myRule.hasOnlyAtoms(env)) {
			throw new CompileException("Error: rule at line " + curLineNumber + " does not consist solely of atoms.\nPerhaps you used a variable name, like 'T'?\n");
		}
	}
	
	void tRule(boolean bGenerateCode) throws CompileException {
		// Elle lit (et compile) toute la regle y compris le point
		// Mais elle ne lit pas la prochaine token qui suivrait le point
		//  car c'est le role d'une autre regle
		if (bGenerateCode && (currElem != vctUnitTyp.size())) {
			env.pCurRule = new PrologRule();
		}
		
		try {
			tGoal(bGenerateCode);
		} catch (CompileException eBt) {
			if (!eBt.getMessage().equals("End Of Text")) {
				throw new CompileException(eBt.getMessage() +
						"\n Error in the rule head, at line " + curLineNumber);
			} else {
				throw new CompileException("End Of Text");
			}
		}
		
		byte TypeRegle = 0; // Par defaut, 0 => regle Prolog
		
		try {
			if ((nTokenType == uEntails) || (nTokenType == uGreaterThan) ||
					(nTokenType == uEqualsSign) || (nTokenType == uLeftArrow)) {
				switch (nTokenType) {
				case uGreaterThan:
					TypeRegle = 1;
					
					break; // Analyse de la queue d'une regle definissant la hierarchie des types
					
					/*** eme si la regle est composee uniquement d'une
					 suite d'ident, nous la considerons comme une
					 regle normale (a ce niveau) afin d'avoir une
					 representation uniforme et faciliter la
					 compilation et l'impression.  Par contre, pour un
					 traitement plus efficace durant l'execution, on
					 associera a cette formulation une codification
					 plus concise (une hashtable d'ident)  ****/
					
					
				case uEqualsSign:
					TypeRegle = 2;
					
					break; // Analyse de la queue d'une regle definissant les instances d'un type
					
				case uLeftArrow:
					TypeRegle = 3;
					
					break; // Analyse d'une regle de generalisation
				}
				
				// Analyse de la queue de la regle
				tGoal(bGenerateCode); // La prochaine token est lue par tBut
				
				while (nTokenType == uComma)
					tGoal(bGenerateCode);
			}
			
			recognizeToken(".");
			
			if (bGenerateCode) {
				env.pCurRule.trimToSize();
			}
		} catch (CompileException e3) {
			throw new CompileException(e3.getMessage() +
					"\n Error in the rule tail, at line " + curLineNumber);
		}
		
		String ClePaquet = null;
		
		// If this is a > or a = rule, check that it 
		// only consists of atoms
		if (bGenerateCode 
				&& (TypeRegle == 1
						|| TypeRegle == 2)) {
			checkThatRuleOnlyHasAtoms();
		}
		
		if (bGenerateCode) {
			if (TypeRegle == 0) { // cas d'une regle Prolog
				// NomArg returns the name and the number of arguments
				// of the first term of the rule
				ClePaquet = nameOfArgument(env.pCurRule.getAt(0), -1); 
			}
			else if (TypeRegle == 1) {
				ClePaquet = valSysSP;
			} else if (TypeRegle == 2) { 
				ClePaquet = valSysINST;
			} else if (TypeRegle == 3) { // chaque regle de generalisation est stockee dans un paquet de regles
				
				// On peut avoir + regles de gener. pour un meme type dans le cas d'un heritage multiple
				// avec comme cle :
				ClePaquet = valSysGEN +
				nameOfArgument(env.pCurRule.getAt(0), -1); // ceci nous permet de chercher directement la(les) regle(s) de generalisation pour le type/term concerne
				
				// Par ailleurs, la regle t1 <- t2 sera transformee en : t1::valSysIdVar <- t2::valSysIdVar,
				// l'ajout de la variable des deux cotes va nous permettre de resoudre correctement l'heritage...
				// a. remplacer dans pCurRule t1 par t1::valSysIdVar; valSysCleBtCp(t1, valSysIdVar)
				PrologTerm aCple = new PrologTerm();
				PrologData aDataObjectId = new PrologData(uIdentifier, valSysCleBtCp);
				aCple.addData(aDataObjectId); // construction de valSysCleBtCp(
				aCple.addData(new PrologData(uTerm,
						env.pCurRule.getAt(0))); // construction de valSysCleBtCp(t1,
				
				PrologData aDataObjectVr = new PrologData(uVariable, valSysIdVar);
				aCple.addData(aDataObjectVr); // construction de valSysCleBtCp(t1, valSysIdVar)
				env.pCurRule.set(0, aCple);
				
				// b. remplacer dans pCurRule t2 par t2::valSysIdVar; valSysCleBtCp(t2, valSysIdVar)
				aCple = new PrologTerm();
				aCple.addData(aDataObjectId);
				aCple.addData(new PrologData(uTerm,
						env.pCurRule.getAt(1)));
				aCple.addData(aDataObjectVr);
				env.pCurRule.set(1, aCple);
			}
			
			if (env.program.containsKey(ClePaquet)) { // la premiere partie de la condition est eliminee; ClePaquet.equals(ClePaqCour) ||
				
				// on permet donc des paquets disperses
				// Ajout de la r?gle dans le paquet courant
				RuleVector regles = (RuleVector) env.program.get(ClePaquet);
				regles.addRule(env.pCurRule);
				regles = null;
			} else { // ajout d'un nouveau paquet
				
				RuleVector Regles = new RuleVector();
				Regles.addRule(env.pCurRule);
				env.program.put(ClePaquet, Regles);
				
				//ClePaqCour = ClePaquet ;
				Regles = null;
			}
		} else if (curCharIndex == textEndIndex) {
			throw new CompileException("End Of Text");
		}
		
		ClePaquet = null;
	}
	
	void tGoal(boolean bGenerateCode) throws CompileException {
		// Un but c'est un term simple ou une variable ou un CG
		// ou un couple (B1::B2) de ce qui precede.
		// En terminant, tBut (via tTerme) lit la prochaine token
		PrologTerm but1 = tSimpleGoal(bGenerateCode);
		PrologTerm but2 = null;
		
		if (nTokenType == uDoubleColon) {
			but2 = tSimpleGoal(bGenerateCode);
		}
		
		if (bGenerateCode) {
			if (but2 == null) {
				env.pCurRule.addTerm(but1);
			} else { // Creer le term  valSysCleBtCp(But1, But2)
				
				PrologTerm aTerm = new PrologTerm();
				PrologData aDataObject = new PrologData(uIdentifier, valSysCleBtCp);
				aTerm.addData(aDataObject);
				
				if ((but1.getAt(0).typeOfData == uVariable) ||
						(but1.getAt(0).typeOfData == uCG)) {
					aTerm.addData(but1.getAt(0)); // le term n'etait qu'une enveloppe
				} else {
					aTerm.addData(new PrologData(uTerm, but1)); // but1 est un term
				}
				
				if ((but2.getAt(0).typeOfData == uVariable) ||
						(but2.getAt(0).typeOfData == uCG)) {
					aTerm.addData(but2.getAt(0)); // le term n'etait qu'une enveloppe
				} else {
					aTerm.addData(new PrologData(uTerm, but2)); // but2 est un term
				}
				
				env.pCurRule.addTerm(aTerm);
				aTerm = null;
				aDataObject = null;
			}
		}
	}
	
	PrologTerm tSimpleGoal(boolean bGenerateCode) throws CompileException {
		// Un but simple c'est un term ou une variable ou un CG.
		PrologTerm aTerm = null;
		
		try {
			PrologData pDon = tIdent(bGenerateCode);
			
			// Le cas d'un term simple ou d'un but-var
			aTerm = tTerm(pDon, bGenerateCode);
		} catch (CompileException e) {
			if (e.getMessage().equals("End Of Text")) {
				throw new CompileException("End Of Text");
			} else if (e.getMessage().startsWith("Error: instead of ") &&
					((nTokenType == uOpenBracket) || (nTokenType == uOpenBrace) ||
							(nTokenType == uVariable))) { // ca devrait etre un CG
				
				CG aCG = null;
				
				if (bGenerateCode) {
					aCG = new CG();
				}
				
				try {
					if ((nTokenType == uOpenBracket) || (nTokenType == uVariable)) {
						tGC(bGenerateCode, aCG);
					} else {
						tGCPlus(bGenerateCode, aCG);
					}
				} catch (CompileException ceGC) {
					if (ceGC.getMessage().equals("End Of Text")) {
						throw new CompileException("End Of Text");
					} else {
						throw new CompileException("Error in the CG at line " +
								curLineNumber);
					}
				}
				
				if (bGenerateCode) {
					aCG.removeSpecialIdent();
					
					PrologData pDataCG = new PrologData(uCG, aCG);
					aTerm = new PrologTerm();
					aTerm.addData(pDataCG);
					aCG = null;
				}
			} else {
				throw new CompileException(e.getMessage() +
						"\n Error : A correct goal is expected at line " +
						curLineNumber);
			}
		}
		return aTerm;
	}
	
	// Used by tConcept
	PrologData tReferent(boolean bGenerateCode) throws CompileException {
		
		// Un referent peut etre un ident, une chaine, une variable, un multi-referent ou une liste
		// representant un ensemble de referents specifiques
		PrologData Ref = null;
		PrologTerm pTermTmp = null;
		
		if (bGenerateCode) {
			pTermTmp = new PrologTerm();
		}
		
		int indTmp = vctUnitTyp.size(); // afin de localiser l'emplacement de la prochaine token
		tPrologData(bGenerateCode, pTermTmp); // tDonnee lit la prochaine token
		
		if (bGenerateCode) {
			Ref = pTermTmp.getAt(0);
			pTermTmp.clear();
			pTermTmp = null;
			
			if (Ref.typeOfData == uString) {
				Ref.typeOfData = uIdentifier;
			}
		} else {
			// On retourne a la premiere token reconnue au niveau du referent et on teste son type
			byte typeUnite = ((UnitType) vctUnitTyp.elementAt(indTmp)).typUnit;
			
			if ((typeUnite != uString) && (typeUnite != uIdentifier) &&
					(typeUnite != uVariable) && (typeUnite != uIdentSpecial) &&
					(typeUnite != uOpenBrace)) {
				throw new CompileException(
						"Error: a referent is expected at line " + curLineNumber);
			}
		}
		return Ref;
	}
	
	PrologData tIdent(boolean bGenerateCode) throws CompileException { // utiliser dans tRegle
		
		// le nom d'un term doit ?tre un ident, ou alors le term repr?sente
		//  un but qui est une var.
		readToken(bGenerateCode);
		
		if (nTokenType == uString) {
			nTokenType = uIdentifier;
		}
		
		if ((nTokenType != uIdentifier) &&
				((nTokenType != uVariable) || test1CarCour(bGenerateCode))) {
			throw new CompileException("Error: instead of " + token.toString() +
					", a (term) identifier is expected at line " + curLineNumber);
		}
		
		PrologData pDon = null;
		
		if (bGenerateCode) {
			pDon = new PrologData();
			pDon.typeOfData = nTokenType;
			pDon.data = new String(token);
		}
		return pDon;
	}
	
	PrologTerm tTerm(PrologData pIdent, boolean bGenerateCode)
	throws CompileException {
		// L'ident du term est deja lu ;  il est pass? en argument
		PrologTerm pTerme = null;
		
		if (bGenerateCode) {
			pTerme = new PrologTerm();
			pTerme.addData(pIdent);
		}
		
		try {
			readToken(bGenerateCode);
			
			if (nTokenType == uOpenParens) {
				tPrologData(bGenerateCode, pTerme);
				
				while (nTokenType == uComma)
					tPrologData(bGenerateCode, pTerme);
				
				recognizeToken(")");
				
				try {
					readToken(bGenerateCode); // POUR LIRE LA PROCHAINE UNITE
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")) {
						throw new CompileException(e1.getMessage());
					}
				}
			}
		} catch (CompileException e) {
			if (!e.getMessage().equals("End Of Text")) {
				throw new CompileException(e.getMessage() +
						"\n Error in the argument list of a term at line " +
						curLineNumber);
			}
		}
		
		if (bGenerateCode) {
			pTerme.trimToSize();
		}
		
		return pTerme;
	}
	
	Concept tConcept(boolean bGenerateCode, CG unGC)
	throws CompileException {
		// le symbole '[' est deja lu ... ? moins que le concept soit une variable
		PrologData Type = null;
		PrologData Ref = null;
		PrologData Val = null;
		
		if (nTokenType == uVariable) {
			if (bGenerateCode) {
				Ref = new PrologData();
				Ref.typeOfData = nTokenType;
				Ref.data = new String(token);
			}
		} else {
			try {
				Type = tIdent(bGenerateCode);
				readToken(bGenerateCode);
				
				if (nTokenType == uColon) {
					Ref = tReferent(bGenerateCode); // ancien : tIdent(bGenerateCode);
					
					// Lire_unite(bGenerateCode);
				}
				
				if (nTokenType == uEqualsSign) {
					PrologTerm pTermTmp = null;
					
					if (bGenerateCode) {
						pTermTmp = new PrologTerm();
					}
					
					tPrologData(bGenerateCode, pTermTmp); // tDonnee lit la prochaine token
					
					if (bGenerateCode) {
						Val = pTermTmp.getAt(0);
						pTermTmp.clear();
						pTermTmp = null;
					}
				}
				
				recognizeToken(null, uCloseBracket);
			} catch (CompileException ce) {
				throw new CompileException("Error in the concept at line " +
						curLineNumber);
			}
		}
		
		Concept conc = null;
		
		if (bGenerateCode) {
			boolean trouve = false;
			
			for (int listIndex2 = 0;
					listIndex2 < unGC.m_vctConcepts.size() && !trouve;
					++listIndex2) {
				conc = unGC.m_vctConcepts.get(listIndex2);
				
				if ((conc.m_pdReferent != null) && (Ref != null) &&
						(conc.m_pdReferent.data instanceof String) &&
						(Ref.data instanceof String) &&
						Ref.valString().equals(conc.m_pdReferent.valString())) {
					trouve = true;
				} else if ((conc.m_pdReferent != null) && (Ref != null) &&
						(conc.m_pdReferent.typeOfData == Ref.typeOfData) &&
						(conc.m_pdReferent.typeOfData == uSet) &&
						setsAreEqual((PrologList) conc.m_pdReferent.data,
								(PrologList) Ref.data)) {
					trouve = true;
				}
			}
			
			if (!trouve) {
			    conc = new Concept(Type, Ref, Val, env);
				unGC.addConcept(conc);
			}
		}
		
		return conc;
	}
	
	void tGCPlus(boolean bGenerateCode, CG unGC) throws CompileException {
		// IL existe deux syntaxes pour un CG : un CG avec des relations in et out
		// et un CG qui est un ensemble d'arbres : {....}
		boolean encore = true;
		
		while (encore) {
			readToken(bGenerateCode);
			
			if ((nTokenType != uOpenBracket) && (nTokenType != uVariable)) {
				throw new CompileException("Error: A CG is expected at line " +
						curLineNumber);
			}
			
			tGC(bGenerateCode, unGC);
			
			if (nTokenType != uAmpersAnd) {
				encore = false;
			}
		}
		
		recognizeToken(null, uCloseBrace);
		readToken(bGenerateCode);
	}
	
	Concept tGC(boolean bGenerateCode, CG unGC) throws CompileException {
		// L'token qui suit un CG est lu par ce dernier
		Concept conc = tConcept(bGenerateCode, unGC);
		
		try {
			readToken(bGenerateCode);
		} catch (CompileException ceGC) {
			if (!ceGC.getMessage().equals("End Of Text")) {
				throw new CompileException("Error in the CG at line " +
						curLineNumber);
			}
		}
		
		if (nTokenType == uLeftArrow) {
			tRelEntr(bGenerateCode, unGC, conc);
		} else if (nTokenType == uMinus) {
			tRelSortOuRels(bGenerateCode, unGC, conc);
		}
		
		return conc;
	}
	
	void tRelSort(boolean bGenerateCode, CG unGC, Concept concSrce)
	throws CompileException {
		// Le nom de la relation est deja lue
		String idRel = token.toString();
		byte typIdRel = nTokenType;
		
		readToken(bGenerateCode);
		recognizeToken(null, uRightArrow);
		readToken(bGenerateCode);
		
		if ((nTokenType != uOpenBracket) && (nTokenType != uVariable)) {
			throw new CompileException("Error: A CG is expected at line " +
					curLineNumber);
		}
		
		Concept concCble = tGC(bGenerateCode, unGC);
		
		if (bGenerateCode) {
			Relation nouvRel = new Relation(new PrologData(typIdRel, idRel),
					concSrce, concCble);
			unGC.addRelation(nouvRel);
		}
	}
	
	void tRelEntr(boolean bGenerateCode, CG unGC, Concept concCble)
	throws CompileException {
		readToken(bGenerateCode); // ReaderThread de l'ident de la relation
		
		String idRel = token.toString();
		byte typIdRel = nTokenType;
		
		readToken(bGenerateCode);
		recognizeToken(null, uMinus);
		readToken(bGenerateCode);
		
		if ((nTokenType != uOpenBracket) && (nTokenType != uVariable)) {
			throw new CompileException("Error: A CG is expected at line " +
					curLineNumber);
		}
		
		Concept concSrce = tGC(bGenerateCode, unGC);
		
		if (bGenerateCode) {
			Relation nouvRel = new Relation(new PrologData(typIdRel, idRel),
					concSrce, concCble);
			unGC.addRelation(nouvRel);
		}
	}
	
	void tRelSortOuRels(boolean bGenerateCode, CG unGC, Concept conc)
	throws CompileException {
		// Le tiret est deja lue, il pourrait etre le debut d'1 relSort ou de + rels
		readToken(bGenerateCode);
		
		// ATTENTION : OK pour reconnaitre C -x-> ...
		// Mais si on permet que tout le concept soit represente par une variable :
		// PROBLEME :  Conc - x ... serait-il une variable pour une relation ou une variable  ?
		// si la variable est suivi d'une fleche "->" alors c'est une variable/rela sinon c'est
		// c'est une variable/conc
		if ((nTokenType == uIdentifier) || (nTokenType == uVariable)) {
			tRelSort(bGenerateCode, unGC, conc); // LE CAS d'UNE REL en SORTIE....
		} else {
			tRels(bGenerateCode, unGC, conc); // sinon il s'agit de + relations en entr/sort
		}
	}
	
	void tRels(boolean bGenerateCode, CG unGC, Concept conc)
	throws CompileException {
		if (nTokenType == uMinus) {
			readToken(bGenerateCode);
			
			if ((nTokenType != uIdentifier) && (nTokenType != uVariable)) {
				throw new CompileException(
				"Error: an identifier of a constant or of a variable is expected.");
			}
			
			tRelSort(bGenerateCode, unGC, conc);
		} else { // sinon ca ne pourrait etre qu'une relation en entree
			recognizeToken(null, uLeftArrow);
			tRelEntr(bGenerateCode, unGC, conc);
		}
		
		//Lire_unite(bGenerateCode);
		if (nTokenType == uComma) {
			//char carSuiv = regardAvant1(bGenerateCode);
			//if ((carSuiv == '-' && !Character.isDigit(nextCar())) || carSuiv == '<') {
			// Tester si la prochaine token est un Tiret ou une fleche gauche
			if (test1CarCour(bGenerateCode)) {
				readToken(bGenerateCode);
				tRels(bGenerateCode, unGC, conc);
			}
		}
		
		// Lire_unite(bGenerateCode);
		if (nTokenType == uSemicolon) {
			readToken(bGenerateCode);
		}
	}
	
	public void tSentence() throws CompileException {
		try {
			while (true)
				readToken(false);
		} catch (CompileException e) {
			if (!e.getMessage().equals("End Of Text")) {
				throw new CompileException(
						"Error while reading a sentence at line " + curLineNumber);
			}
		}
	}
	
	public void tPrologData(boolean bGenerateCode, PrologDataVector pLstPrlg2)
	throws CompileException {
		// commence par lire une token et termine aussi par la lecture
		// de la prochaine token a traiter hors tDonnee..
		PrologData pData = null;
		
		if (bGenerateCode) {
			pData = new PrologData();
		}
		
		boolean uniteDejaLue = false;
		
		readToken(bGenerateCode);
		
		if (bGenerateCode) {
			pData.typeOfData = nTokenType;
		}
		
		switch (nTokenType) {
		case uNumber:
			
			if (bGenerateCode) {
				String stUnite = token.toString();
				
				if (stUnite.indexOf(".") >= 0) {
					pData.data = new Double(stUnite);
				} else {
					try {
						pData.data = new Long(stUnite);
					} catch (java.lang.NumberFormatException e) {
						throw new CompileException(e.getMessage() +
						"\n Error in reading the number.\nProbably it was too large or too small (negative).");
					}
				}
			}
			
			break;
			
		case uBoolean:
			
			if (bGenerateCode) {
				String s = token.toString();
				boolean b = s.equals("true");
				if (b) {
					pData.data = Boolean.TRUE;
				} else {
					pData.data = Boolean.FALSE;
				}
			}
			break;
			
		case uIdentifier: {
			if (bGenerateCode) {
				pData.data = new String(token);
			}
			
			PrologTerm pTerme = tTerm(pData, bGenerateCode);
			
			if (bGenerateCode) {
				if (pTerme.size() > 1) {
					// la donn?e est reconsidere comme un term
					pTerme.trimToSize();
					pData = new PrologData(uTerm, pTerme);
				} else {
					pTerme.clear();
				}
			}
			
			pTerme = null;
			uniteDejaLue = true; // prochaine token deja lue par tTerme
		}
		break;
		
		case uIdentSpecial:
		case uString:
			
			if (bGenerateCode) {
				pData.data = new String(token);
			}
			
			break;
			
		case uVariable: {
			if (test1CarCour(bGenerateCode)) {
				// debut d'un CG : Var -Rel-> .. ou Var <-Rel- ...
				CG unGC = null;
				
				if (bGenerateCode) {
					unGC = new CG();
				}
				
				tGC(bGenerateCode, unGC);
				
				if (bGenerateCode) {
					unGC.removeSpecialIdent();
					pData.typeOfData = uCG;
					pData.data = unGC;
				}
				uniteDejaLue = true;
				unGC = null;
			} else if (bGenerateCode) {
				pData.data = new String(token);
			}
		}
		break;
		
		case uOpenParens: {
			PrologList pLstPrlg = null;
			
			// si la liste est vide, le vecteur pLstPrlg serait vide
			if (bGenerateCode) {
				pLstPrlg = new PrologList();
			}
			
			boolean bListIsEmpty = false;
			
			try {
				tPrologData(bGenerateCode, pLstPrlg);
			} catch (CompileException e1) {
				if (e1.getMessage().equals("Error: Unrecognized data")
						&& (nTokenType == uCloseParens)) {
					bListIsEmpty = true;
				} else {
					throw new CompileException(e1.getMessage() +
					"\n Error in reading data");
				}
			}
			
			if (!bListIsEmpty) {
				while (nTokenType == uComma)
					tPrologData(bGenerateCode, pLstPrlg);
				
				if (nTokenType == uPipe) {
					tPrologData(bGenerateCode, pLstPrlg);
					
					// Acceder a l'avant-derniere token lue pour verifier son type
					if (!bGenerateCode &&
							(((UnitType) vctUnitTyp.elementAt(vctUnitTyp.size() -
									2)).typUnit != uVariable)) {
						throw new CompileException(
								"A variable is expected after | at line " +
								curLineNumber);
					}
					
					// la variable lue s'agit donc d'une variable liste
					if (bGenerateCode) {
						((PrologData) pLstPrlg.lastElement()).typeOfData = uVarList;
					}
				}
				recognizeToken(")");
			}
			
			if (bGenerateCode) {
				pData.typeOfData = uList; // on sait ? pr?sent que la donn?e est une liste
				pLstPrlg.trimToSize();
				pData.data = pLstPrlg;
			}
			pLstPrlg = null;
		}
		
		break;
		
		case uOpenBrace: {
			/**** On ne traite plus les CG decrit comme un ensemble de graphes ****
			 CG unGC = null;
			 if (bGenerateCode) unGC = new CG();
			 try {
			 tGCPlus(bGenerateCode, unGC);
			 }
			 catch (CompileException ceGC) {
			 throw new CompileException("Error in the CG at line " + curLineNumber);
			 };
			 if (bGenerateCode) {
			 unGC.EnleveIdentSpecial();
			 pDon.typDon = uCG;
			 pDon.Don = unGC;
			 };
			 uniteDejaLue = true;
			 unGC = null;
			 *************/
			
			//**** Reconnaissance d'un ensemble de referents (un ref est une chaine ou un ident)
			//*** Traitement similaire a celui d'une liste
			PrologList pLstPrlg = null;
			
			if (bGenerateCode) {
				pLstPrlg = new PrologList();
			}
			
			boolean bSetIsEmpty = false;
			int indTmp = vctUnitTyp.size(); // afin de localiser l'emplacement de la prochaine token
			
			try {
				tPrologData(bGenerateCode, pLstPrlg);
				
				if (!bGenerateCode) {
					byte typeUnite = ((UnitType) vctUnitTyp.elementAt(indTmp)).typUnit;
					
					if ((typeUnite != uString) && (typeUnite != uIdentifier)) {
						throw new CompileException(
								"Error: a set of referents is expected at line " +
								curLineNumber);
					}
				}
			} catch (CompileException e1) {
				if (e1.getMessage().equals("Error: Unrecognized data") 
						&& (nTokenType == uCloseBrace)) {
					bSetIsEmpty = true;
				} else {
					throw new CompileException(e1.getMessage() +
					"\n Error in reading data");
				}
			}
			
			if (!bSetIsEmpty) {
				while (nTokenType == uComma) {
					indTmp = vctUnitTyp.size(); // afin de localiser l'emplacement du prochain referent
					tPrologData(bGenerateCode, pLstPrlg);
					
					if (!bGenerateCode) {
						byte typeUnite = ((UnitType) vctUnitTyp.elementAt(indTmp)).typUnit;
						
						if ((typeUnite != uString) && (typeUnite != uIdentifier)) {
							throw new CompileException(
									"Error: a set of referents is expected at line " +
									curLineNumber);
						}
					}
				}
				
				recognizeToken("}");
			}
			
			if (bGenerateCode) {
				pData.typeOfData = uSet;
				pLstPrlg.trimToSize();
				pData.data = pLstPrlg;
			}
			pLstPrlg = null;
		}
		break;
		
		case uOpenBracket: {
			CG unGC = null;
			
			if (bGenerateCode) {
				unGC = new CG();
			}
			
			tGC(bGenerateCode, unGC);
			
			if (bGenerateCode) {
				unGC.removeSpecialIdent();
				pData.typeOfData = uCG;
				pData.data = unGC;
			}
			uniteDejaLue = true;
			unGC = null;
		}
		break;
		
		default:
			throw new CompileException("Error: Unrecognized data");
		} // end of switch
		
		if (bGenerateCode) {
			pLstPrlg2.addElement(pData);
		}
		
		if (!uniteDejaLue) {
			readToken(bGenerateCode); // tDonnee se termine par la lecture
		}
		
		// de la prochaine token a consommer
	}
	
	private boolean test1CarCour(boolean bGenerateCode) throws CompileException {
		boolean b = false;
		
		if (bGenerateCode) {
			byte typeUnit = ((UnitType) vctUnitTyp.elementAt(currElem)).typUnit;
			
			if ((typeUnit == uMinus) || (typeUnit == uLeftArrow)) {
				b = true;
			}
		} else {
			while (isSpaceChar(curChar) || (curChar == '\t'))
				readChar();
			
			if (((curChar == '-') && !Character.isDigit(nextChar())) ||
					((curChar == '<') && (nextChar() == '-'))) {
				b = true;
			}
		}
		return b;
	}
	
	//**** Methods on sets *************
	public boolean hasString(String Ref, PrologList myset) {
		PrologData tmpData = null;
		String st = null;
		boolean bFound = false;
		
		for (int listIndex = 0;
				listIndex < myset.size() && !bFound;
				++listIndex) {
			tmpData = myset.get(listIndex);
			st = (String) tmpData.data;
			
			if (st.equals(Ref)) {
				bFound = true;
			}
		}
		return bFound;
	}
	
	public PrologList intersection(PrologList set1, PrologList set2) {
		PrologList resultSet = new PrologList();
		PrologData tmpData = null;
		
		for (int listIndex = 0;
				listIndex < set1.size();
				++listIndex)  {
			tmpData = set1.get(listIndex);
			
			if (hasString((String) tmpData.data, set2)) {
				resultSet.addData(tmpData);
			}
		}
		return resultSet;
	}
	
	public PrologList union(Object s1, PrologList set2) {
		PrologList resultSet = set2.myCopy();
		
		if (s1 instanceof PrologData) {
			PrologData DonTmp = (PrologData) s1;
			
			if (!hasString((String) DonTmp.data, set2)) {
				resultSet.addData(DonTmp);
			}
		} else {
			PrologList set1 = (PrologList) s1;
			PrologData tempData = null;
			
			for (int listIndex = 0;
					listIndex < set1.size();
					++listIndex)  {
				tempData = set1.get(listIndex);
				
				if (!hasString((String) tempData.data, set2)) {
					resultSet.addData(tempData);
				}
			}
		}
		return resultSet;
	}
	
	public boolean set1IsSubsetOfSet2(PrologList ens1, PrologList ens2) {
		return compareSets(ens1, ens2, false);
	}
	
	boolean compareSets(PrologList set1, 
			PrologList set2, 
			boolean testEquality) {
		boolean bSetsAreEqual = true;
		Vector<Object> vctCopyOfElementsInSet2 = new Vector<Object>(); // on mettra les chaines/ident
		PrologData tmpData = null;
		
		for (int listIndex = 0;
				listIndex < set2.size();
				++listIndex) {
			tmpData = set2.get(listIndex);
			vctCopyOfElementsInSet2.addElement(tmpData.data);
		}
		
		String st1;
		String st2 = null;
		int i = 0;
		boolean bFound = false;
		
		for (int listIndex = 0;
				listIndex < set1.size() && bSetsAreEqual;
				++listIndex) {
			tmpData = set1.get(listIndex);
			st1 = (String) tmpData.data;
			i = 0;
			bFound = false;
			

			for (int listIndex3 = 0;
					listIndex3 < vctCopyOfElementsInSet2.size() && !bFound;
					++listIndex3) {
					st2 = (String) vctCopyOfElementsInSet2.get(listIndex3);
				
				if (st1.equals(st2)) {
					bFound = true;
				} else {
					i++;
				}
			}
			
			if (bFound) {
				vctCopyOfElementsInSet2.removeElementAt(i);
			} else {
				bSetsAreEqual = false;
			}
		}
		
		if (testEquality) {
			bSetsAreEqual = bSetsAreEqual && vctCopyOfElementsInSet2.isEmpty();
			
			if (set1.isEmpty() || set2.isEmpty()) {
				bSetsAreEqual = (set1.isEmpty() && set2.isEmpty());
			}
		} else if (set1.isEmpty() || set2.isEmpty()) {
			bSetsAreEqual = set1.isEmpty();
		}
		
		vctCopyOfElementsInSet2.clear();
		
		return bSetsAreEqual;
	}
	
	boolean setsAreEqual(PrologList ens1, PrologList ens2) {
		return compareSets(ens1, ens2, true);
	}
	
	// CompileTerme : utiliser par assertTerme; ajout d'un fait
	// ou d'une regle
	// Il faut ajouter la version instanciee du Terme
	PrologTerm compileTerm(String strTerm) throws CompileException {
		CompileTxt = strTerm;
		textEndIndex = CompileTxt.length();
		curCharIndex = 0;
		
		int saveCurLineNumber = curLineNumber;
		
		readChar();
		vctUnitTyp.clear();
		
		// Passe 1 : Effectuer l'analyse lexico-syntaxique du term
		tGoal(false);
		
		curLineNumber = saveCurLineNumber;
		
		// Passe 2 : construire le term
		currElem = 0; // La lecture des unites va se faire a partir du vecteur vctUnitTyp
		env.pCurRule = new PrologRule();
		tGoal(true);
		
		vctUnitTyp.clear();
		
		PrologTerm trm = env.pCurRule.getAt(0);
		
		// Free the variable "env.pCurRule"
		env.pCurRule.clear();
		env.pCurRule = null;
		
		return trm;
	}
	
	Vector<String> compileAlternatePrintString(String strData) throws CompileException {
		PrologTerm unTermTmp = compileTerm(strData);
		
		return distillVectorToAlternatePrintStringVector(unTermTmp);
	}
	
	Vector<String> distillVectorToAlternatePrintStringVector(PrologDataVector v) {
		Vector<String> vctDistilled = new Vector<String>();
		PrologData aDataObject = null;
		
		for (int listIndex = 0;
				listIndex < v.size();
				++listIndex) {
			aDataObject = v.get(listIndex);
			
			// On ne considere pas le cas d'un CG comme donnee
			if ((aDataObject.typeOfData == uTerm) || (aDataObject.typeOfData == uTerm)) {
				PrologDataVector data = (PrologDataVector) aDataObject.data;
				vctDistilled.addElement(distillVectorToAlternatePrintStringVector(data).toString());
			} else {
				vctDistilled.addElement(aDataObject.data.toString());
			}
		}
		return vctDistilled;
	}
	
	public void compileQuery(String request) throws CompileException {
		CompileTxt = request;
		textEndIndex = CompileTxt.length();
		curCharIndex = 0;
		
		int sauvNumLigneCour = curLineNumber;
		readChar();
		vctUnitTyp.clear();
		
		// Passe 1 : Tester si la question est syntaxico correcte
		try {
			tGoal(false);
		} catch (CompileException exc1) {
			if (exc1.getMessage().equals("End Of Text") &&
					vctUnitTyp.isEmpty()) {
				throw new CompileException("null request");
			} else if (exc1.getMessage().equals("End Of Text")) {
				recognizeToken(".");
			} else {
				throw new CompileException(exc1.getMessage() +
				"\n Error in the request.");
			}
		}
		
		try {
			while (nTokenType == uComma)
				tGoal(false);
			
			recognizeToken(".");
		} catch (CompileException e) {
			if (e.getMessage().equals("End Of Text") && vctUnitTyp.isEmpty()) {
				throw new CompileException("null request");
			} else if (e.getMessage().equals("End Of Text")) {
				recognizeToken(".");
			} else {
				throw new CompileException(e.getMessage() +
				"\n Error in the request.");
			}
		}
		
		curLineNumber = sauvNumLigneCour;
		
		// Passe 2 : construire la question et la resoudre
		currElem = 0; // La lecture des unites va se faire a partir du vecteur vctUnitTyp
		env.pCurRule = new PrologRule();
		tGoal(true);
		
		while (nTokenType == uComma)
			tGoal(true);
		
		recognizeToken(".");
		env.pCurRule.trimToSize();
		determineQueryVariables();
		vctUnitTyp.clear();
	}
	
	void determineQueryVariables() {
		// Parcourir  vctUnitTyp a la recherche des variables; et mettre
		// ces derniers dans  vctVariableIdentifiersInQuery.
		// Aussi, exclure les variables qui sont deja citees.
		
		// Process vctUnitTyp to get the set of variable names
		// occurring in vctUnitTyp.  
		// The set has no duplicates :-P (it's a set, duh!)
		// The result is stored in vctVariableIdentifiersInQuery
		vctVariableIdentifiersInQuery.clear();
		
		UnitType unitTyp;
		
		for (int listIndex1 = 0;
				listIndex1 < vctUnitTyp.size();
				++listIndex1) {
			unitTyp = vctUnitTyp.get(listIndex1);
			if ((unitTyp.typUnit == uVariable) || (unitTyp.typUnit == uVarList)) {
				boolean bFound = false;
				String idVar;
				
				for (int listIndex2 = 0;
						listIndex2 < vctVariableIdentifiersInQuery.size() && !bFound;
						++listIndex2) {
					idVar = vctVariableIdentifiersInQuery.get(listIndex2);
					
					if (idVar.equals(unitTyp.unit.toString())) {
						bFound = true;
					}
				}
				
				if (!bFound) {
					vctVariableIdentifiersInQuery.addElement(unitTyp.unit.toString());
				}
			}
		}
	}
	
	//--------------------------------
	//-----  Utility functions -------------
	String nameOfArgument(PrologTerm UnTerme, int niv) throws CompileException {
		String strResult = null;
		PrologData aDataObject = UnTerme.getAt(0); // premiere donnee du term
		
		if (aDataObject.typeOfData == uVariable) {
			// on ne fait rien
		} else if (aDataObject.typeOfData == uCG) {
			strResult = valSysCleCG;
		} else if (aDataObject.typeOfData == uIdentifier) {
			String idTerme = (String) UnTerme.getAt(0).data;
			
			if (idTerme.equals(valSysCleBtCp)) { //but compose B1::B2 =>  valSysCleBtCp(B1, B2)
				
				PrologData Arg1 = UnTerme.getAt(1);
				
				if (Arg1.typeOfData == uCG) {
					strResult = valSysCleBtCp;
				} else if (Arg1.typeOfData == uVariable) { 
					// NomArg peut etre appele au moment de la compilation
					// ou au moment de la resolution auquel cas il faut 
					// tenir compte du cas ou B1 est une variable => 
					// determiner alors le NomArg de sa valeur
					
					if (niv >= 0) { 
						// i.e., NomArg est appele de la Resolution
						
						PrologDataIndexPair contr = env.unification.valueFromUnifStack(Arg1, niv);
						
						if (contr.pData != null) {
							if (contr.pData.typeOfData == uCG) {
								strResult = valSysCleBtCp;
							} else if (contr.pData.typeOfData == uTerm) {
								PrologTerm Cple1Term = (PrologTerm) contr.pData.data;
								String st = getTermSlashNumberOfArgumentsString((String) Cple1Term.getAt(0).data,
										Cple1Term.size() - 1);
								strResult = valSysCleBtCp + st;
							}
						} else {
							throw new CompileException(
									"Error : The goal head is a free variable at " +
									curLineNumber);
						}
					}
				} else if (Arg1.typeOfData == uTerm) {
					PrologTerm Cple1Term = (PrologTerm) Arg1.data;
					String st = getTermSlashNumberOfArgumentsString((String) Cple1Term.getAt(0).data,
							Cple1Term.size() - 1);
					strResult = valSysCleBtCp + st;
				}
			} else { // la tete est un term simple et normal !
				strResult = getTermSlashNumberOfArgumentsString(idTerme, UnTerme.size() - 1);
			}
		}
		return strResult;
	}
	
	String getTermSlashNumberOfArgumentsString(String Ident, int number) {
		String strNumber;
		strNumber = Integer.toString(number);
		return (Ident + "/" + strNumber);
	}
}
