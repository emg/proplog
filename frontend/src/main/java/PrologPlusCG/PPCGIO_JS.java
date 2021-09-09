package PrologPlusCG;

import static def.dom.Globals.alert;

import PrologPlusCG.prolog.PPCGEnv;
import PrologPlusCG.prolog.PPCGIO;
import def.dom.HTMLElement;
import static def.dom.Globals.document;


public class PPCGIO_JS extends PPCGIO {
	protected HTMLElement consoleDOMElement = null;
	
	public PPCGIO_JS(PPCGEnv myenv, String strConsoleDOMElementName) { 
		super(myenv);
		
		if (strConsoleDOMElementName != null && strConsoleDOMElementName != "") {
			consoleDOMElement = (HTMLElement) document.querySelector(strConsoleDOMElementName);
		} else {
			consoleDOMElement = null;
		}
	}
	
	public void appendToConsole(String strToPrint) {
		if (consoleDOMElement != null) {
			String realStringToPrint = strToPrint.replaceAll("\n", "<br/>");
			consoleDOMElement.innerHTML += realStringToPrint;
		}
	}
	
	public void clearConsole() {
		if (consoleDOMElement != null) {
			consoleDOMElement.innerHTML = "";
		}
	}
	
	public void setPrompt(String strToPrint) {
		// Nothing to do for JavaScript: We don't do prompts
	};
	public String getNextQuery() {
		// Nothing to do for JavaScript: We don't do this kind of input.
		return "";
	};
	
	public void showMessageDialog(String strMessage, String strTitle) {
		alert(strTitle + ":\n" + strMessage);
		// Nothing to do for JavaScript: We don't do this kind of input.		
	}
	public void showPrompt() {
		// We don't do this kind of output for JavaScript
	}
	public void setProgramText(String strProgram) {
		env.setProgramText(strProgram);
	}
	public void readSomething(byte readingMode) {
		// We don't do this for JavaScript.
	}
}
