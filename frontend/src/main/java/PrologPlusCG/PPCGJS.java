package PrologPlusCG;

import java.util.Hashtable;
import java.util.Vector;


import PrologPlusCG.prolog.PPCGEnv;

public class PPCGJS {
	PPCGEnv env = null;
	PPCGIO_JS io = null;
	
	public PPCGJS() {
		init("#console");
	}

	public PPCGJS(String strConsoleElementDOMSelector) {
		init(strConsoleElementDOMSelector);
	}
	
	private void init(String strConsoleElementDOMSelector) {
		env = new PPCGEnv();
		io = new PPCGIO_JS(env, strConsoleElementDOMSelector);
		env.io = io;
	}
	
	public String getErrorMessage() {
		return env.getAndClearErrorMessage();
	}
	
	public boolean compileProgram(String program) {
		env.PurgeMemory();
		io.setProgramText(program);
		return env.compileProgram();
	}
	
	public Vector<Hashtable<String, String> > getResolutions(String query, boolean bConvertResults) {
		return env.Resolve(query, bConvertResults);
	}
	
	/**
	 * Execute the query, and if there were any resolutions, return true, otherwise, return false.
	 * @param query The goal to execute.
	 * @return true iff there was at least one result.
	 */
	public boolean runQuery(String query) {
		Vector<Hashtable<String, String> > result = getResolutions(query, true);
		if (result != null) {
			return true;
		} else {
			return false;
		}
	}
}
