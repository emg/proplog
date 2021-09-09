/**********************************************************************
 *
 * Prolog+CG : Prolog with conceptual graphs
 *
 * Copyright (C) 2000-2005  Adil Kabbaj
 * Copyright (C) 2005-2014  Ulrik Sandborg-Petersen
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


public class PPCGEnv {
	private String strErrorMessage;
	public static final String PPCGVersion = "2.0.17.pre02";
	public Hashtable<String, RuleVector> program = null;
	public TypeHierarchy typeHierarchy = null;
	public PrologRule pCurRule = null;
	private String ProgramText = "";
	public Vector<Hashtable<String, String> > vctResult = null; // Used in an indirect call (Resolve) of Prolog+CG
	public boolean bConvResultToString = true; // Used in an indirect call (Resolve) of Prolog+CG
	public Resolution aResolution;
	public boolean bInReadingMode = false;
	public PPCGIO io;
	public boolean bWriteToDebugTree = false;
	public boolean bWriteToToolTip = false;
	public boolean bIsApplet = true;
	public boolean bStopExec = false;
	public Printer printer = null;
	public Compile compile = null;
	public Unification unification = null;
	public UnifyCG unifyCG = null;

	public PPCGEnv() {
		printer = new Printer(this);
		compile = new Compile(this);
		unification = new Unification(this);
		unifyCG = new UnifyCG(this);
	}

	public void recordErrorMessage(String strMessage) {
		strErrorMessage += strMessage;
	}
	
	public String getAndClearErrorMessage() {
		String result = strErrorMessage;
		strErrorMessage = "";
		return result;
	}

	/**
	 * @param programText The programText to set.
	 */
	public void setProgramText(String programText) {
		ProgramText = programText;
	}

	/**
	 * @return Returns the programText.
	 */
	public String getProgramText() {
		return ProgramText;
	}
	
	public boolean compileProgram() {
		boolean bResult = true;
		try {
			boolean bGenerateCode = false;
			this.compile.doCompile(bGenerateCode);
		} catch (CompileException e) {
			recordErrorMessage("Syntactic analysis did not succeed: \n" + e.toString());
			bResult = false;
			return bResult;
		}
		
		// Now do semantic analysis
		try {
			boolean bGenerateCode = true;
			this.compile.doCompile(bGenerateCode);
			bResult = true;
		} catch (CompileException e) {
			recordErrorMessage("Semantic analysis did not succeed" + e.toString());
			bResult = false;
		}
		return bResult;
	}
	
	// Eliminer le programme qui se trouve de la memoire active
	public void PurgeMemory() {
		setProgramText("");
		
		if (program != null) {
			program.clear();
			program = null;
		}			
		if (typeHierarchy != null) {
			typeHierarchy.clear();
		}
			
		typeHierarchy = null;
	}
		
	public Vector<Hashtable<String, String> >  Resolve(String quest) {
		return Resolve(quest, true, false); // true : convertie par defaut
	}
	
	public Vector<Hashtable<String, String> >  Resolve(String quest, boolean convertRes) {
		return Resolve(quest, convertRes, false);
	}
	
	public Vector<Hashtable<String, String> >  Resolve(String quest, boolean convertRes,
			boolean modeSystmExprt) {
		// Traiter la question : similaire au Build_Request
		// et retourner le vctResult
		// Convert results to strings (but we don't do anything with them...)
		bConvResultToString = convertRes;
		
		boolean analysisSucceeded = true;
		
		try {
			// Just to initialize reading of the question at the beginnin
			compile.curLineNumber = 1; 
			
			// Compile question
			compile.compileQuery(quest);
		} catch (CompileException e1) {
			String strMsg;
			if (e1.getMessage().equals("null request")) {
				strMsg = "Error : null request";
			} else {
				strMsg = e1.getMessage();
			}
			recordErrorMessage(strMsg);
			
			analysisSucceeded = false;
		}
		
		
		this.vctResult = new Vector<Hashtable<String, String> > (7, 2); // Creer le vecteur
		
		// qui contiendra les resultats (des hashtables) de la resolution
		if (analysisSucceeded) {
			
			aResolution = new Resolution(this, false); // false; resolution without interface
			aResolution.start();
			
			try {
				aResolution.join(); // le processus courant ( et en particulier la methode courante

				// Resolve devrait attendre que le processus aResolution ait termin? pour qu'elle
				// puisse poursuivre son traitement
			} catch (java.lang.InterruptedException iex) {
				// This could possibly happen...
			}
			
		}
		
		// Return the resolve
		// The following convention is very important:
		// If the goal did not succeed, then one must return null.
		// If the goal has been reused, but the list of responses is empty,
		// Alors on retourne un vecteur non-null mais sans composantes
		return vctResult;
	}
}
