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


import static def.dom.Globals.window;
import static def.dom.Globals.alert;
import static def.dom.Globals.console;

import def.js.Function;

import java.util.*;

import PrologPlusCG.cg.CG;
import PrologPlusCG.cg.CGMatchResult;
import PrologPlusCG.cg.CGOperation;
import PrologPlusCG.cg.Concept;
import PrologPlusCG.cg.Relation;

public class Resolution implements DataTypes {
	ResolutionStack Exec_Stack = new ResolutionStack(); // Stack of
														// TermToBeResolved
	ResolutionStack Return_Stack = new ResolutionStack(); // Stack of
															// TermToBeResolved
	RuleVector pRules = null;
	// Hashtable globalPrlgPCGMM = new Hashtable(); // Not used
	Hashtable<String, PrologData> globalPrlgPCGObjs = new Hashtable<String, PrologData>();
	RandomSource rndRandom = new RandomSource();
	boolean programModified = false;
	int cptVarBid = 0;
	final String strEndOfPredefinedGoals = "$!$End%dnE$!$";
	final String[] PredefinedGoals = { "not", "findall", "/", "member",
			"length", "read", "read_sentence", "write", "writenl", "nl",
			"clearConsole", "asserta", "assertz", "retract", "suppress",
			"term_list", "free", "val", "sup", "inf", "eqv", "eq", "add",
			"sub", "mul", "dif", "div", "rnd", "seed", "concat",
			"stringToLetters", "identToLetters", "isSubType", "isSuperType",
			"subTypes", "superTypes", "minComSuperTypes", "minComSuperType",
			"maximalJoin", "generalize", "subsume", "addElemForAll",
			"createInstance", "fail", "concOfCG", "immediateSubTypes",
			"immediateSuperTypes", "external",
			"destroy", "destroyAll", "set_list", "branchOfCG",
			"isInstance", "addInstance", "maxComSubTypes", "maxComSubType",
			"objectify", "shuffle",
			strEndOfPredefinedGoals };
	boolean bResolveWithInterface = true;

	private PPCGEnv env = null;

	public Resolution(PPCGEnv myenv, boolean mode) {
		env = myenv;
		bResolveWithInterface = mode;

		// Creation de la branche cadre ; elle sert pour la primitive branchOfCG
		// comme cela, on evitera de creer un CG a chaque iteration ...
		// La meme branchCadre sera utilise pour toutes les iterations
		// A tout moment on va la remplir
	}
	
	public void start() {
		// Non-thread implementation is synchronous.
		run();
	}
	
	public void join() throws java.lang.InterruptedException {
		// Nothing to do in non-thread implementation.
	}

	public void run() {
		if (bResolveWithInterface) {
			try {
				env.io.showWaitCursor();
				executeQuery();
			} catch (CompileException cpleExc) {
				env.io.showMessageDialog(cpleExc.getMessage(), "Warning");
			} catch (ExecException eexec) {
				if (eexec.getMessage().equals("program null")) {
					env.io.showMessageDialog(
							"Please, Compile your program first.", "Warning");
				} else {
					env.io.appendToConsole(eexec.getMessage() + "\n");
				}
			}

			env.io.showNormalCursor();

			env.io.showPrompt();
		} else { // Indirect resolution; without interface
			try {
				executeQuery();
			} catch (CompileException cpleExc) {
				String strMsg = "Compiler Warning : " + cpleExc.getMessage();
				env.recordErrorMessage(strMsg);
			} catch (ExecException eexec) {
				String strMsg = "Execution Warning : " + eexec.getMessage();
				env.recordErrorMessage(strMsg);
			}
		}
	}

	// The question has been compiled and its internal representation
	// can be found in pCurRule
	public void executeQuery() throws ExecException, CompileException {
		// The procedure of resolution.
		// The heart of the interpreter.
		boolean package_is_known = false;
		boolean unifiable = false;
		PrologDataIndexPair contr = null;
		TermToBeResolved TermRes = null;
		cptVarBid = 0; // Initialiser a 0 pour chaque nouvelle question

		env.unification.Unif_Stack.makeEmpty();
		Exec_Stack.makeEmpty();
		Return_Stack.makeEmpty();

		// Le niveau 0 ou on y mettra les variables de la question
		// Level 0, where one will put the variables of the question.
		env.unification.Unif_Stack.pushEmptyRecord();

		// Push dans Exec_Stack les buts de
		// la question. -1 car rien n'est dans la pile a ce stade
		// et une resatisfaction d'un cut dans la question implique l'arret
		// de la resolution.

		// Push the goals of the question onto Exec_Stack. -1 because
		// nothing is on the stack at this stage, and a resatisfaction
		// of a cut in a question implies a stop of the resolution.
		push_tail(env.pCurRule, 0, 0, -1);

		// Free the variable "env.pCurRule"
		env.pCurRule.clear();
		env.pCurRule = null;

		boolean finished = false;
		boolean solvable = false;
		programModified = false;
		
		while (!finished && !env.bStopExec) {
			// Fetch all the possible solutions to the question
			while (!Exec_Stack.isEmpty() && !env.bStopExec) {
				// Chercher une solution : Effacer ; r?soudre tous les buts
				// empiler dans la pile d'exec.

				// Fetch a solution: Erase; solve all the goals stacked up
				// in the Exec_Stack (Stack_Exec)

				// Consult the element at the top
				TermRes = Exec_Stack.getTop();
				
				// sans l'enlever de la pile
				unifiable = false;
				package_is_known = (TermRes.pos != 0);

				String IdVar = variable_goal(TermRes.pTerm);
				
				if (IdVar != null) {
					// package_is_known => une resatisfaction ; le paquet pour
					// le but
					// a t dj identifi.
					// c'est le cas o? le but est ? satisfaire pour la 1re fois
					// ET le but est une variable.
					// traiter comme si on a la r?gle : Var :- ValVar.
					// la variable ne doit pas etre remplacee definitivement par
					// sa valeur ; un retour-arriere peut amener une autre val.
					// pour la Var.
					if (!package_is_known) {
						PrologData valButVar = new PrologData(uVariable, IdVar);
						contr = env.unification.valueFromUnifStack(valButVar,
								TermRes.index);
						valButVar = null;

						if ((contr.pData == null)
								|| ((contr.pData.typeOfData != uTerm) && (contr.pData.typeOfData != uCG))) {
							throw new ExecException("Error: The variable goal "
									+ IdVar
									+ " is free or it is not a term nor a CG. ");
						}

						if (contr.pData.typeOfData == uCG) {
							PrologTerm aTerm = new PrologTerm();
							aTerm.addData(contr.pData);
							contr.pData = new PrologData(uTerm, aTerm);
						}

						// Because the second round will pop an element
						// from Unif_Stack.
						env.unification.Unif_Stack.pushEmptyRecord();
						// The goal-variable is considered
						TermRes.indexInExecStack = Exec_Stack.indexOfTop();

						// alors comme un but defini qui sera remplace
						// par sa queue, suite a un retour arriere, tout
						// ce qui est relatif a cette queue devrait etre
						// elimine de la Exec_Stack on ne peut resatisfaire
						// un but-var, il faut poursuivre le retour-arriere

						// Then, as a definite goal which will be replaced
						// by its tail after a second round, all that
						// is relative to this tail will be eliminated
						// from Exec_Stack, one cannot resatisfy a
						// variable-goal, it is necessary to continue
						// the back-return. (BAAAD translation!)
						TermRes.pos = -1;

						// comme pour le cas de plusieurs buts primitifs
						// on depile le but var et on l'empile dans Return_Stack
						Return_Stack.push(Exec_Stack.pop());
						TermRes = new TermToBeResolved(
								(PrologTerm) contr.pData.data, contr.index, 0);
						Exec_Stack.push(TermRes); // et on empile cette valeur
													// dans Exec_Stack (voir
													// commentaire au debut de
													// ce cas)

						IdVar = null; // pour rentrer dans le prochain if (IdVar
										// == null) {..
					} else {
						TermRes.pos = 0; // suite au retour arriere, il faut
											// laisser le but dans Exec_Stack
					}

					// et on aurait unifiable = false; incitant un retour
					// arriere .. comme pour un but non satisfait
				}

				// Is it a variable?
				if (IdVar == null) {
					// No, it isn't a variable.
					String IdPred = null;

					// Check whether this is an identifier
					if (TermRes.pTerm.getAt(0).typeOfData == uIdentifier) {
						// It was. Get its name
						IdPred = (String) TermRes.pTerm.getAt(0).data;
					}
					
					// Is it an identifier AND a predefined goal?
					if ((IdPred != null) && identifierIsPredefinedGoal(IdPred)) {
						// Yes, it was both an identifier
						// and a predefined goal.
						if (!package_is_known) {
							// The predefined goal is being met
							// for the first time.
							unifiable = satisfyPredicateGoal(TermRes, IdPred);
						} else {
							// The goal is to be resatisfied:
							// Is it finished or not?
							unifiable = resatisfyPredicateGoal(TermRes, IdPred);
						}
					} else {
						// The goal is not predefined, or it was not
						// an identifier, or both
						pRules = null;

						try {
							if (!package_is_known && (TermRes.pos > -1)) {
								// It is to be satisfied for the first time.

								// Localiser un paquet pour le but courant
								TermRes.Cle = env.compile.nameOfArgument(
										TermRes.pTerm, TermRes.index);
								
								if (env.program.containsKey(TermRes.Cle)) {
									// Il existe un paquet pour le but courant
									// There exists a package
									// for the current goal
									pRules = (RuleVector) env.program
											.get(TermRes.Cle);
								} else {
									TermRes.pos = -2;

									// depiler le but qui ne peut etre
									// resolu ? :
									// Exec_Stack.Pop();
									// NON, il faut le laisser pour
									// le satisfaire de nouveau suite a une
									// resatisfaction des buts anterieurs
								}
							} else if (TermRes.pos > -1) {
								// .. il est ? resatisfaire => on
								// re-localise le paqute

								// It is to be resatisfied. That means,
								// we need to relocate the package.

								// et TermRes.Pos contient dj le pointeur
								// sur la prochaine r?gle du paquet
								// considrer.

								// And TermRes.Pos already contains the
								// pointer to the next rule to be
								// considered.
								pRules = (RuleVector) env.program
										.get(TermRes.Cle);
							}
						} catch (NullPointerException ex) {
							if (env.program == null) {
								env.io
										.showMessageDialog(
												"No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, \n retract and suppress) can be satisfied.",
												"Warning");
								TermRes.pos = -1;
								Return_Stack.makeEmpty();
							}
							String strMessage = "Null pointer exception: " + ex.getMessage();
							env.recordErrorMessage(strMessage);
						}
						IdPred = null;

						// int ancVal_TermResPos = TermRes.Pos;
						unifiable = isUnifiable(TermRes);
						
						if (!unifiable
								&& (TermRes.pos != -1)
								&& TermRes.Cle
										.startsWith(env.compile.valSysCleBtCp)
								&& (TermRes.Cle.length() != env.compile.valSysCleBtCp
										.length())) { // il s'agit donc de
														// B1::B2 et B1 est un
														// term

							// 1. Chercher la regle de generalisation, si elle
							// existe,
							// pour cela, il faut determiner la cle de la regle
							// : valSysGEN + la signature
							// du but-term en question (voir la classe Compile)
							String ClePaquet = env.compile.valSysGEN
									+ TermRes.Cle
											.substring(env.compile.valSysCleBtCp
													.length());

							if (env.program.containsKey(ClePaquet)) {
								// localiser la regle de generalisation t1::x <-
								// t2::x, en tenant compte de la cle calculee
								RuleVector regles = (RuleVector) env.program
										.get(ClePaquet);

								// 2. Unifier le but B1::B2 avec la tete t1::x
								// de la regle de generalisation
								env.unification.Unif_Stack.pushEmptyRecord(); // Push
																				// la
																				// structure
																				// qui

								int TopOfUnification_Stack = env.unification.Unif_Stack
										.indexOfTop();
								PrologData DonCple1 = new PrologData(uTerm,
										TermRes.pTerm);
								PrologData DonCple2 = new PrologData(uTerm,
										regles.getAt(0).getAt(0));
								unifiable = env.unification.unify(DonCple2,
										TopOfUnification_Stack, DonCple1,
										TermRes.index);

								if (unifiable) {
									TermRes.indexInExecStack = Exec_Stack
											.indexOfTop();
									TermRes.pos = -1;
									Return_Stack.push(Exec_Stack.pop());

									// Push dans Exec_Stack un nouveau TermRes
									// avec comme term t2::x; le membre droit de
									// la regle de generalisation
									Exec_Stack.push(new TermToBeResolved(regles
											.getAt(0).getAt(1),
											TopOfUnification_Stack, 0));
								} else {
									env.unification.Unif_Stack.pop();
									TermRes.pos = 0;
								}
							} else {
								TermRes.pos = 0; // dans le cas ou il n'y a pas
													// de regle de
													// generalisation
							}
						} else if (!unifiable) {
							// The current goal, including an unknown goal,
							// is left in Exec_Stack.

							// The goal is left in Exec_Stack with
							// TermRes.Pos = 0
							TermRes.pos = 0;
						}

						// Hoping that a resatisfaction of the preceding goal
						// could imply a satisfaction of the goal.
					} // end of else : The goal is not predefined, or
					// it is not an identifier, or both
				}

				if (!unifiable && theGoalBelowOnTheStackIsNot()) {
					Exec_Stack.pop(); // Depiler But de not(But) qui se trouvera
										// alors au sommet de Exec_Stack

					TermToBeResolved unTermRes = Exec_Stack.getTop(); // unTermRes
																		// contient
																		// not(But)
					unTermRes.pos = -2;
					unTermRes.indexInExecStack = -1;
					env.unification.Unif_Stack.pushEmptyRecord(); // juste pour
																	// garder
																	// l'equilibre
																	// car elle
																	// sera
																	// depile
																	// lors d'un
																	// retour-arriere
					Return_Stack.push(Exec_Stack.pop());
					unifiable = true;
				}

				if (!unifiable && Return_Stack.isEmpty()) {
					// rsolution du but courant
					// a chou et pile_retour_arriere est vide
					// => resolution terminee

					// Resolution of current goal failed, and
					// Return_Stack is empty.
					// => Resoultion has finished.
					Exec_Stack.makeEmpty(); // MakeEmpty le Exec_Stack
					env.unification.Unif_Stack.makeEmpty();

					if (!solvable) {
						if (bResolveWithInterface) {
							env.io.appendToConsole(" no.\n"); // on n'imprime
																// pas no. s'il
																// y avait des
																// solutions
						} else {
							env.vctResult = null;
						}
					}

					env.compile.vctVariableIdentifiersInQuery
							.clear();
					finished = true;
				} else if (!unifiable) {
					// We could not unify, but Return_Stack was
					// NOT empty.

					// Le but courant B n'est pas satisfait,
					// The current goal B isn't satisfied
					backTrack();
				}
			} // fin de : while (! Exec_Stack.IsEmpty() ...)

			if (!Return_Stack.isEmpty() && !env.bStopExec) {
				// Print the result of the found answer and initialize
				// things for doing one more round, to fetch
				// another solution.
				solvable = true;
				env.printer.writeOrRecordResult(!env.bIsApplet);
				backTrack();
				if (!Exec_Stack.isEmpty()) {
					TermRes = Exec_Stack.getTop();
				}
			} else {
				finished = true;
			}
		} // fin de while (!finished) {...}

		env.unification.Unif_Stack.makeEmpty();

		if (env.bStopExec) {
			Exec_Stack.makeEmpty();
			Return_Stack.makeEmpty();
			env.bStopExec = false;
		}

		if (programModified) {
			env.bWriteToDebugTree = true;
			env.printer.alternatePrintString = "";
			env.printer.printPrologProgram(); // Ecriture dans
												// alternatePrintString
			env.io.setProgramText(env.printer.alternatePrintString);
			env.printer.alternatePrintString = "";
			env.bWriteToDebugTree = false;
		}
	} // fin de ExecQuest ; l'interpreteur

	boolean isUnifiable(TermToBeResolved TermRes) throws ExecException {
		boolean unifiable = false;
		// Initialize to -3
		int taillePaq = -3;
		PrologData Donnee1 = null;

		if (TermRes.pos > -1) {
			taillePaq = pRules.size();
			Donnee1 = new PrologData(uTerm, TermRes.pTerm);
		}

		PrologRule pRegleLocal;

		while ((TermRes.pos < taillePaq) && (!unifiable)) {
			// parcourir le paquet courant pour localiser une r?gle
			// dont la t?te puisse s'unifier avec le but courant
			pRegleLocal = pRules.getAt(TermRes.pos);
			TermRes.pos++;

			// Preparer l'unification du but courant avec la tete
			// de la rgle courante pRegleLocal

			// Push la structure qui
			// recevra le vctResult de l'unification.

			// Prepare the unification of the current goal with the
			// head of the current rule pRegleLocal.

			// Push the structure which will receive the vctResult
			// of the unification.
			env.unification.Unif_Stack.pushEmptyRecord();
			int TopOfUnification_Stack = env.unification.Unif_Stack
					.indexOfTop();
			PrologData Donnee2 = new PrologData(uTerm, pRegleLocal.getAt(0));

			// unifier la tete de la regle choisie avec le term de la pileExec
			// unifier tient compte des indices de chaque term
			unifiable = env.unification.unify(Donnee2, TopOfUnification_Stack,
					Donnee1, TermRes.index);
			Donnee2 = null;

			if (unifiable) {
				// La tte de la rgle courante est unifiable :
				// Effectuer les trois actions de base de l'interp. :

				// memoriser la place du but dans Exec_Stack, pour qu'apres
				// un retour-arriere, on elimine de Exec_Stack tout ce
				// qui est relatif a la queue de la regle qui avait servie
				// pour la derniere satisfaction. On se retrouve ainsi
				// juste a l'etat avant la satisfaction du but.

				// Store the place of the goal in Exec_Stack, so that,
				// after a return-back, one can eliminate from Exec_Stack
				// all that which is relative to the tail of the rule
				// which had been useful for the last satisfaction.
				// One thus finds oneself just at the state before
				// the satisfaction of the goal.
				TermRes.indexInExecStack = Exec_Stack.indexOfTop();

				// The element popped off Exec_Stack is pushed onto
				// Return_Stack.
				Return_Stack.push(Exec_Stack.pop());
				push_tail(pRegleLocal, 1, TopOfUnification_Stack, Return_Stack
						.indexOfTop());

				// indice pour la tte de la regle vaut aussi pour sa queue
				// le 3 arg. sert a grer le cas du cut "/"
			} else {
				env.unification.Unif_Stack.pop(); // Eliminer de la pile
			}

			// d'unification la structure qui a ?t? utilis?e pour cet essai
			// ?chou?.
		} // fin de : while ((TermRes.Pos <= taillePaq) && (!unifiable))...

		pRegleLocal = null;
		Donnee1 = null;

		return unifiable;
	}

	public void backTrack() {
		TermToBeResolved TermRes = Return_Stack.getTop();
		String idPred = null;
		
		// If it is an identifier, get its identifier string in idPred
		if (TermRes.pTerm.getAt(0).typeOfData == uIdentifier) {
			idPred = (String) TermRes.pTerm.getAt(0).data;
		}
		
		// Is it a cut?
		if ((idPred != null) && idPred.equals("/")) {
			// Yes, it is a cut.
			// .. couper le retour-arri?re.

			// Cut the return-back (retour-arriere)

			// TermRes.Index represente dans ce cas l'indice
			// ds Return_Stack pour le term Tr
			// dont la regle empilee contient le cut.

			// TermRes.Index represents, in this case, the index
			// into Return_Stack for the term Tr,
			// whose pushed rule contains the cut.
			for (int i = Return_Stack.indexOfTop(); ((i > TermRes.index) && (i >= 0)); i--) {
				Return_Stack.pop(); // en depilant (afin de ne plus les
									// considerer) les TermRes de PileRetour
				env.unification.Unif_Stack.pop(); // Implies that we must do the
													// same with their
													// UnificationRecord
			}

			// Il nous faut traiter a present le TermeRes Tr dont
			// la regle empilee contient le cut.
			// il faut le depiler de Pile_retour et l'empiler dans
			// Exec_Stack mais avec TermRes.Pos = taille du paquet
			// ainsi, sa resatisfaction serait impossible, impliquant
			// l'initialisation de TermRes.Pos a 0 et donc forcer un
			// retour arriere.
			if (TermRes.index != -1) { // TermRes.Index == -1 ; le cas de la
										// question initiale qui contient le
										// cut...
				TermRes = Return_Stack.getTop();

				while (Exec_Stack.indexOfTop() >= TermRes.indexInExecStack)
					// Depiler de Exec_Stack la queue de la regle
					// qui a ete utilise auparavant pour satisfaire le but.
					Exec_Stack.pop();

				// ainsi; il ne peut etre (re)satisfait
				// Thus; it cannot be (re)satisfied
				TermRes.pos = -1;
				Exec_Stack.push(Return_Stack.pop());

				env.unification.Unif_Stack.pop();
			} else {
				Exec_Stack.makeEmpty();
			}
		} else { // Is it a cut?
			// No, it is not a cut.
			if (TermRes.indexInExecStack >= 0) {
				// TermRes represente un but defini ou un but-var

				// TermRes represents a definite goal, or a
				// variable-goal.
				while (Exec_Stack.indexOfTop() >= TermRes.indexInExecStack) {
					// Depiler de Exec_Stack la queue de la regle
					// qui a ete utilise auparavant pour satisfaire le but.
					// On s'apprete a une nouvelle resatisfaction;
					// l'ancienne regle n'a plus d'utilite

					// Pop off of Exec_Stack the tail of the rule,
					// which was used before to satisfy the goal.
					// We will prepare ourselves for a new resatisfaction;
					// The old rule has no more utility.
					Exec_Stack.pop();
				}
			}

			// Pop something off the Return_Stack and
			// push it onto the Exec_Stack.
			Exec_Stack.push(Return_Stack.pop());

			// Pop something off of the unification stack.
			env.unification.Unif_Stack.pop();			
		}

		idPred = null;
		TermRes = null;
	}

	public void push_tail(PrologRule pRegleLocal, int LimitIndex, int Niv,
			int TopOfReturnStack) {
		for (int i = (pRegleLocal.size() - 1); i >= LimitIndex; i--) {
			if ((pRegleLocal.getAt(i).getAt(0).typeOfData == uIdentifier)
					&& ((String) pRegleLocal.getAt(i).getAt(0).data)
							.equals("/")) {
				// pour g?rer le cut lors d'un retour-arri?re

				// For managing the cut at the time of a
				// back-return (retour arrre).
				Exec_Stack.push(new TermToBeResolved(pRegleLocal.getAt(i),
						TopOfReturnStack, 0));
			} else {
				Exec_Stack.push(new TermToBeResolved(pRegleLocal.getAt(i), Niv,
						0));
			}
		}
	}

	// Helper methods
	public String variable_goal(PrologTerm pTerme) {
		// Does the goal correspond to a variable?
		if (pTerme.getAt(0).typeOfData == uVariable) {
			return ((String) pTerme.getAt(0).data);
		} else {
			return null;
		}
	}

	public boolean identifierIsPredefinedGoal(String IdPred) {
		for (int i = 0; true; i++) {
			if (PredefinedGoals[i].equals(IdPred)) {
				return true;
			} else if (PredefinedGoals[i].equals(strEndOfPredefinedGoals)) {
				break;
			}
		}

		return false;
	}

	boolean theGoalBelowOnTheStackIsNot() {
		boolean bFound = false;

		if (Exec_Stack.size() > 1) {
			TermToBeResolved unTermRes = (TermToBeResolved) Exec_Stack
					.get(Exec_Stack.indexOfTop() - 1);

			if ((unTermRes.pTerm.getAt(0).typeOfData == uIdentifier)
					&& ((String) unTermRes.pTerm.getAt(0).data).equals("not")
					&& (unTermRes.pos == -1)) {
				bFound = true;
			}
		}

		return bFound;
	}

	void ASSERT(boolean cond, String msg) throws ExecException {
		if (!cond) {
			alert("ASSERT(false, '" + msg + "'");
			throw new ExecException(msg);
		}
	}

	boolean satisfyPredicateGoal(TermToBeResolved pTermRes, String IdPred)
			throws ExecException, CompileException {
		boolean resultat = false;
		PrologDataIndexPair Arg1;
		PrologDataIndexPair Arg2;
		RuleVector pRules;
		PrologList pLstPrlg;
		PrologTerm pTerme;
		

		if (IdPred.equals("/")) {
			env.unification.Unif_Stack.pushEmptyRecord(); // juste pour garder
															// l'equilibre
			pTermRes.indexInExecStack = Exec_Stack.indexOfTop();

			Return_Stack.push(Exec_Stack.pop());

			// pTermRes.Pos = -1; // on n'a pas besoin car sa resatisfaction est
			// speciale
			resultat = true;
		} else if (IdPred.equals("maximalJoin") || IdPred.equals("generalize")
				|| IdPred.equals("subsume")) {
			// CGOper(G1, C1, G2, C2, G3, C3) or subsume(G1, C1, G2, C2)
			// CGOper(G1, G2, G3) or subsume(G1, G2)
			CG G1;

			// CGOper(G1, C1, G2, C2, G3, C3) or subsume(G1, C1, G2, C2)
			// CGOper(G1, G2, G3) or subsume(G1, G2)
			CG G2;

			// CGOper(G1, C1, G2, C2, G3, C3) or subsume(G1, C1, G2, C2)
			// CGOper(G1, G2, G3) or subsume(G1, G2)
			CG G3 = null;
			int nivG1 = 0;
			int nivG2 = 0;
			Concept C1 = null;
			Concept C2 = null;
			PrologData DonRes = null;
			PrologData DonResBis = null;

			ASSERT(
					((pTermRes.pTerm.size() == 7)
							|| (pTermRes.pTerm.size() == 4)
							|| ((pTermRes.pTerm.size() == 5) && IdPred
									.equals("subsume")) || ((pTermRes.pTerm
							.size() == 3) && IdPred.equals("subsume"))),
					"Error: Wrong number of arguments for the CG operation.\n");

			if ((pTermRes.pTerm.size() == 7) || (pTermRes.pTerm.size() == 5)) {
				// presence des points d'entree
				Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(1), pTermRes.index);
				ASSERT(
						((Arg1.pData != null) && (Arg1.pData.typeOfData == uCG)),
						"Error: the first argument of the CG operation must be a CG.\n");
				G1 = (CG) Arg1.pData.data;
				nivG1 = Arg1.index;

				Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(2), pTermRes.index);

				if ((Arg2.pData != null) && (Arg2.pData.typeOfData == uConcept)) {
					C1 = (Concept) Arg2.pData.data;
				} else {
					ASSERT(false,
							"Error: The second argument of the CG operation should be a concept.\n");
				}

				PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
						pTermRes.pTerm.getAt(3), pTermRes.index);
				ASSERT(
						((Arg3.pData != null) && (Arg3.pData.typeOfData == uCG)),
						"Error: the third argument of the CG operation must be a CG.\n");
				G2 = (CG) Arg3.pData.data;
				nivG2 = Arg3.index;

				PrologDataIndexPair Arg4 = env.unification.valueFromUnifStack(
						pTermRes.pTerm.getAt(4), pTermRes.index);

				if ((Arg4.pData != null) && (Arg4.pData.typeOfData == uConcept)) {
					C2 = (Concept) Arg4.pData.data;
				} else {
					ASSERT(false,
							"Error: The fourth argument of the CG operation should be a concept.\n");
				}

				if (pTermRes.pTerm.size() == 7) {
					PrologDataIndexPair Arg5 = env.unification
							.valueFromUnifStack(pTermRes.pTerm.getAt(5),
									pTermRes.index);
					ASSERT((Arg5.pData == null),
							"Error: the fifth argument of the CG operation must be a free variable.\n");
					G3 = new CG();
					DonRes = pTermRes.pTerm.getAt(5);

					PrologDataIndexPair Arg6 = env.unification
							.valueFromUnifStack(pTermRes.pTerm.getAt(6),
									pTermRes.index);
					ASSERT((Arg6.pData == null),
							"Error: the sixth argument of the CG operation must be a free variable.\n");
					DonResBis = pTermRes.pTerm.getAt(6);
				}
			} else { // les cas : CGOper(G1, G2, G3) or subsume(G1, G2)
				Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(1), pTermRes.index);
				ASSERT(
						((Arg1.pData != null) && (Arg1.pData.typeOfData == uCG)),
						"Error: the first argument of the CG operation must be a CG.\n");
				G1 = (CG) Arg1.pData.data;
				nivG1 = Arg1.index;

				Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(2), pTermRes.index);
				ASSERT(
						((Arg2.pData != null) && (Arg2.pData.typeOfData == uCG)),
						"Error: the second argument of the CG operation must be a CG.\n");
				G2 = (CG) Arg2.pData.data;
				nivG2 = Arg2.index;

				if (pTermRes.pTerm.size() == 4) {
					PrologDataIndexPair Arg3 = env.unification
							.valueFromUnifStack(pTermRes.pTerm.getAt(3),
									pTermRes.index);
					ASSERT((Arg3.pData == null),
							"Error: the third argument of the CG operation must be a free variable.\n");
					G3 = new CG();
					DonRes = pTermRes.pTerm.getAt(3);
				}
			}

			// Les arguments sont a present prets, en tenant compte des
			// differentes posibilites
			// Appel de l'operation de matching matchCG
			CGMatchResult resMatchCG = new CGMatchResult(G3, null);
			CGOperation uneOperGC = new CGOperation(env);
			resultat = uneOperGC.matchCG(CGOperation.convertToByte(IdPred, G3),
					C1, G1, nivG1, C2, G2, nivG2, resMatchCG);
			uneOperGC.corefMatchVec_MakeEmpty();
			uneOperGC = null;
			env.unification.Unif_Stack.pushEmptyRecord();

			if (resultat && (DonRes != null)) {
				PrologData donTmp = new PrologData(uCG, resMatchCG.G3);
				resultat = env.unification.unify(DonRes, pTermRes.index,
						donTmp, pTermRes.index);
			}

			if (resultat && (DonResBis != null)) {
				resultat = env.unification
						.unify(DonResBis, pTermRes.index, new PrologData(
								uConcept, resMatchCG.E3), pTermRes.index);
			}

			if (resultat) {
				pTermRes.pos = -1;

				Return_Stack.push(Exec_Stack.pop());
			} else {
				if (resMatchCG.G3 != null) {
					resMatchCG.G3.myDestroy();
				}

				if (resMatchCG.E3 != null) {
					resMatchCG.E3 = null;
				}

				env.unification.Unif_Stack.pop();
			}

			resMatchCG = null;
		} else if (IdPred.equals("length")) {
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: length takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(((Arg1.pData != null) && (Arg1.pData.typeOfData == uList)),
					"Error: The first argument of length must be a list.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData == null) || (Arg2.pData.typeOfData == uNumber)),
					"Error: The second argument of length must be an integer or a free variable.\n");
			pLstPrlg = (PrologList) Arg1.pData.data;

			int taille = 0;

			if (pLstPrlg != null) {
				taille = pLstPrlg.size();

				PrologDataIndexPair ValVarList = null;
				PrologData uneDonTmp = null;
				boolean finished = false;
				int Arg1Niv = Arg1.index;

				while (!finished) {
					try {
						uneDonTmp = (PrologData) pLstPrlg.lastElement();
					} catch (NoSuchElementException nsex) {
						// This could possibly happen
					}

					if (uneDonTmp.typeOfData == uVarList) {
						ValVarList = env.unification.valueFromUnifStack(
								uneDonTmp, Arg1Niv);
						Arg1Niv = ValVarList.index;

						if ((ValVarList.pData != null)
								&& (ValVarList.pData.typeOfData != uList)) {
							throw new ExecException(
									"The value of the variable after | should be a list.\n");
						} else if (ValVarList.pData != null) {
							pLstPrlg = (PrologList) ValVarList.pData.data;
							taille--; // decremente la taille de -1 car |x ne
										// doit pas etre compte

							if (pLstPrlg == null) {
								finished = true;
							} else {
								taille = taille + pLstPrlg.size();
							}
						} else {
							throw new ExecException(
									"Warning : The length of the list can not be determined since it is partially specified; the variable after | is free.\n");
						}
					} else {
						finished = true;
					}
				}
			}

			env.unification.Unif_Stack.pushEmptyRecord();
			resultat = env.unification.unify(new PrologData(uNumber,
					new Long(taille)), pTermRes.index, pTermRes.pTerm
					.getAt(2), pTermRes.index);

			if (resultat) {
				pTermRes.pos = -1;

				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("stringToLetters")
				|| IdPred.equals("identToLetters")) {
			byte typeMot = 0;

			if (IdPred.equals("stringToLetters")) {
				typeMot = uString;
			} else {
				typeMot = uIdentifier;
			}

			ASSERT((pTermRes.pTerm.size() == 3), "Error: " + IdPred
					+ " takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData == null) || (Arg1.pData.typeOfData == typeMot)),
					"Error: The first argument of " + IdPred
							+ " must be a string/ident or a free variable.\n");

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData == uList)),
					"Error: The second argument of " + IdPred
							+ " must be a list or a free variable.\n");
			ASSERT(((Arg1.pData != null) || (Arg2.pData != null)),
					"Error: At least one of the two arguments of " + IdPred
							+ " must be bound.\n");

			if (Arg1.pData != null) { // le mot est fourni, passer au cars

				String mot = (String) Arg1.pData.data;

				// Construire la liste des lettres qui compose la chaine
				// String.valueOf(char) ==> String
				int tailleMot = mot.length();
				int i = 0;

				if (IdPred.equals("stringToLetters")) {
					// Ignorer les doubles quotes du string
					i++;
					tailleMot--;
				}

				String carToString = null;
				pLstPrlg = new PrologList();

				PrologData uneDon;

				for (; i < tailleMot; i++) {
					carToString = "\"" + String.valueOf(mot.charAt(i)) + "\"";
					uneDon = new PrologData(uString, carToString);
					pLstPrlg.addData(uneDon);
				}

				env.unification.Unif_Stack.pushEmptyRecord();
				uneDon = new PrologData(uList, pLstPrlg);
				resultat = env.unification.unify(uneDon, pTermRes.index,
						pTermRes.pTerm.getAt(2), pTermRes.index);
			} else { // le mot n'est pas fourni, le composer

				// La liste des cars est fournie
				// 1. Former un vecteur de char ? partir de la liste des
				// chaines/cars
				// 2. Former le mot ? partir du vecteur form? pr?c?demment
				pLstPrlg = (PrologList) Arg2.pData.data;
				pLstPrlg = copyAllOfTheListWithUnification(pLstPrlg, Arg2.index);

				int tailleVect = pLstPrlg.size();
				int i = 0;
				char[] vectCars = null;

				if (IdPred.equals("stringToLetters")) {
					tailleVect = tailleVect + 2;
					vectCars = new char[tailleVect];
					vectCars[0] = '\"';
					vectCars[tailleVect - 1] = '\"';
					i = 1;
				} else {
					vectCars = new char[tailleVect];
				}

				PrologData uneDon;
				String s = null;

				for (int listIndex = 0; 
						listIndex < pLstPrlg.size(); listIndex++, i++) {
					uneDon = (PrologData) pLstPrlg.get(listIndex);
					s = (String) uneDon.data;
					vectCars[i] = s.charAt(1);
				}

				String mot = new String(vectCars);
				uneDon = new PrologData(typeMot, mot);
				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(pTermRes.pTerm.getAt(1),
						pTermRes.index, uneDon, pTermRes.index);
			}

			if (resultat) {
				pTermRes.pos = -1;

				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("concat")) {
			ASSERT((pTermRes.pTerm.size() == 4), "Error: " + IdPred
					+ " takes three arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData == null) || (typeIsPrimitive(Arg1.pData.typeOfData))),
					"Error: The first argument of " + IdPred
							+ " must be a number, a boolean, an identifier, a string, or a free variable.\n");
			int nNoOfFreeArguments = 0;
			if (Arg1.pData == null) {
				nNoOfFreeArguments++;
			}

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData == null) || (typeIsPrimitive(Arg2.pData.typeOfData))),
					"Error: The second argument of " + IdPred
							+ " must be a number, a boolean, an identifier, a string, or a free variable.\n");
			if (Arg2.pData == null) {
				nNoOfFreeArguments++;
			}

			PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(3), pTermRes.index);
			ASSERT(
					((Arg3.pData == null) || (Arg3.pData.typeOfData == uString)),
					"Error: The third argument of " + IdPred
							+ " must be a string or a free variable.\n");

			if (Arg3.pData == null) {
				nNoOfFreeArguments++;
			}

			ASSERT(
					(nNoOfFreeArguments == 1) || (nNoOfFreeArguments == 0),
					"Error: "
							+ IdPred
							+ " must have either two or three bound arguments.\n");

			if (Arg3.pData == null || nNoOfFreeArguments == 0) {
				// We are concat'ing the easy case of Arg1 + Arg2
				String s1 = primitiveTypeToString(Arg1.pData);
				String s2 = primitiveTypeToString(Arg2.pData);

				String s3 = "\"" + s1.substring(1, s1.length() - 1)
						+ s2.substring(1, s2.length() - 1) + "\"";

				PrologData uneDon = new PrologData(uString, s3);

				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(uneDon, pTermRes.index,
						pTermRes.pTerm.getAt(3), pTermRes.index);

			} else if (Arg2.pData == null) {
				// Arg3 is not null, and nNoOfArguments == 1
				String s1 = primitiveTypeToString(Arg1.pData);
				String s3 = primitiveTypeToString(Arg3.pData);

				String s1stripped = s1.substring(1, s1.length() - 1);
				String s3stripped = s3.substring(1, s3.length() - 1);

				resultat = s3stripped.startsWith(s1stripped);
				if (!resultat) {
					env.unification.Unif_Stack.pushEmptyRecord();
				} else {
					int s1strippedLength = s1stripped.length();
					String s2 = "\""
							+ s3stripped.substring(s1strippedLength, s3stripped
									.length()) + "\"";

					PrologData uneDon = new PrologData(uString, s2);

					env.unification.Unif_Stack.pushEmptyRecord();
					resultat = env.unification.unify(uneDon, pTermRes.index,
							pTermRes.pTerm.getAt(2), pTermRes.index);
				}
			} else {
				// Arg1.pDonnee is null, and nNoOfFreeArguments == 1
				String s2 = primitiveTypeToString(Arg2.pData);
				String s3 = primitiveTypeToString(Arg3.pData);

				String s2stripped = s2.substring(1, s2.length() - 1);
				String s3stripped = s3.substring(1, s3.length() - 1);

				resultat = s3stripped.endsWith(s2stripped);
				if (!resultat) {
					env.unification.Unif_Stack.pushEmptyRecord();
				} else {
					int s2strippedLength = s2stripped.length();
					String s1 = "\""
							+ s3stripped.substring(0, s3stripped.length()
									- s2strippedLength) + "\"";

					PrologData uneDon = new PrologData(uString, s1);

					env.unification.Unif_Stack.pushEmptyRecord();
					resultat = env.unification.unify(uneDon, pTermRes.index,
							pTermRes.pTerm.getAt(1), pTermRes.index);
				}
			}

			if (resultat) {
				pTermRes.pos = -1;

				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("external")) {
			resultat = true;
			ASSERT((pTermRes.pTerm.size() == 4), "Error: " + IdPred
					+ " takes three arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(Arg1.pData != null && Arg1.pData.typeOfData == uString, 
					"Error: The first argument of " + IdPred
							+ " must be a string.\n");
			int nNoOfFreeArguments = 0;

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && (Arg2.pData.typeOfData == uList)),
					"Error: The second argument of " + IdPred
							+ " must be a list.\n");

			PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(3), pTermRes.index);
			ASSERT(
					((Arg3.pData == null) || (Arg3.pData.typeOfData == uString)),
					"Error: The third argument of " + IdPred
							+ " must be a string or a free variable.\n");

			if (Arg3.pData == null) {
				nNoOfFreeArguments++;
			}


			ASSERT(
					(nNoOfFreeArguments == 1) || (nNoOfFreeArguments == 0),
					"Error: "
							+ IdPred
							+ " must have either two or three bound arguments.\n");
			
			String functionName = Arg1.pData.valString();
			if (functionName.length() > 2) {
				// Cut off beginning and ending '"'.
				functionName = functionName.substring(1,  functionName.length()-1);
			}

			Function myFunc = (Function) window.$get(functionName);

			// Make parameter list
			Vector<Object> params = new Vector<Object>(10);
			PrologList pLstPrlg1 = (PrologList) Arg2.pData.data;
			pLstPrlg1 = copyAllOfTheListWithUnification(pLstPrlg1, Arg2.index);
			for (int listIndex = 0; listIndex < pLstPrlg1.size(); ++listIndex) {
				Object obj = pLstPrlg1.get(listIndex).data;
				params.add(obj);
			}

			Object result = null;
			try {
				result = myFunc.apply(window, params);
			} catch (Exception e) {
				String strMessage = "Could not call function: " + functionName + "\nException = " + e.getMessage(); 
				env.recordErrorMessage(strMessage);
				console.log("UP210.6.5: " + strMessage);
				resultat = false;
			}

			if (resultat) {
				PrologData uneDon = null;
				if (result instanceof String) {
					uneDon = new PrologData(uString, result);
				} else if (result instanceof Double) {
					uneDon = new PrologData(uNumber, result);
				} else if (result instanceof Long) {
					uneDon = new PrologData(uNumber, result);
				} else {
					uneDon = new PrologData(uString, result.toString());
				}
	
				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(uneDon, pTermRes.index,
						pTermRes.pTerm.getAt(3), pTermRes.index);
			}
			
			if (resultat) {
				pTermRes.pos = -1;

				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("branchOfCG")) { // branchOfCG(CG_Branch, CG)

			// on le traitera de la meme maniere que member : on parcourt le CG,
			// similaire en cela a une liste de branchs
			// et on tentera d'unifier notre branch arg1 avec la branch courante
			// dans CG

			// branchOfCG must have two arguments
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: branchOfCG takes two arguments.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData == uCG)),
					"Error: The second argument of branchOfCG must be a CG.\n");

			CG unGC = (CG) Arg2.pData.data;
			Vector<Relation> vctRels = unGC.m_vctRelations;
			int nbreBranch = vctRels.size();

			while ((pTermRes.pos < nbreBranch) && !resultat) {
				env.unification.Unif_Stack.pushEmptyRecord();

				// Creer un CG a partir de la branche/relation courante dans le
				// CG arg2
				// Remplir branchCadre
				CG unGCBranch = createCGBranch((Relation) vctRels
						.elementAt(pTermRes.pos));

				// Inverser les arg de unifier comme pour la primitive "eq"
				resultat = env.unification.unify(
						new PrologData(uCG, unGCBranch), Arg2.index,
						pTermRes.pTerm.getAt(1), pTermRes.index);
				pTermRes.pos++;

				if (resultat) {
					Return_Stack.push(Exec_Stack.pop());
				} else {
					env.unification.Unif_Stack.pop();
				}
			}
		} else if (IdPred.equals("concOfCG")) { // concOfCG(ConceptOUVar, CG)
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: concOfCG takes two arguments.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData == uCG)),
					"Error: The second argument of concOfCG must be a CG.\n");

			CG unGC = (CG) Arg2.pData.data;
			Vector<Concept> vctConcepts = unGC.m_vctConcepts;
			int nbreConcs = vctConcepts.size();
			resultat = false;

			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);

			while ((pTermRes.pos < nbreConcs) && !resultat) {
				env.unification.Unif_Stack.pushEmptyRecord();

				Concept concCour = (Concept) vctConcepts
						.elementAt(pTermRes.pos);

				// Is Arg1 a free variable?
				if (Arg1.pData == null) {
					// Yes, it was a free variable.
					// Therefore, we don't transform it to a CG,
					// since otherwise, we will unify the whole CG.

					// Inverser les arg de unifier comme pour la primitive "eq"
					resultat = env.unification.unify(new PrologData(uConcept,
							concCour), Arg2.index, pTermRes.pTerm.getAt(1),
							pTermRes.index);
				} else {
					// No, it was not a free variable.
					// Therefore, there is no harm done in making it a CG.

					// Make a CG out of the concept.
					// This is because env.unification.unifier does not do the
					// special variable-substitution magic on uConcept.
					CG gTmp = new CG();
					gTmp.addConcept(concCour);

					// Inverser les arg de unifier comme pour la primitive "eq"
					resultat = env.unification
							.unify(new PrologData(uCG, gTmp), Arg2.index,
									pTermRes.pTerm.getAt(1), pTermRes.index);
				}
				pTermRes.pos++;

				if (resultat) {
					Return_Stack.push(Exec_Stack.pop());
				} else {
					env.unification.Unif_Stack.pop();
				}
			}
		} else if (IdPred.equals("member")) {
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: member takes two arguments.\n"); // member doit
																// avoir deux
																// arg.

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData == uList)),
					"Error: The second argument of member must be a list.\n");

			// INUTIL : env.unification.Unif_Stack.addNewElement(); // pour la
			// forme initiale de membre
			pLstPrlg = (PrologList) Arg2.pData.data;

			/*
			 * le parcourt de la liste a le recherche de l'element pourrait
			 * impliquer, avec des VarList, des passages d'une liste a une
			 * autre. Il faudrait alors savoir tj dans quelle liste on est. Pour
			 * cela, la solution adoptee consiste a ajouter un arg a pTermRes,
			 * lstMember, qui specifiera la liste courante***********
			 */
			pTermRes.lstMember = null;
			pTermRes.indLstMember = 0;

			int Arg2Niv = Arg2.index;

			int dernierInd = pLstPrlg.size() - 1;
			boolean finished = false;

			while (!finished && !resultat) {
				while ((pTermRes.pos < dernierInd) && !resultat) {
					env.unification.Unif_Stack.pushEmptyRecord();

					/**
					 * Si on arrive au dernier element de la liste et c'est une
					 * VarList alors il faut chercher sa valeur et relancer le
					 * membre ...
					 */
					resultat = env.unification.unify(pTermRes.pTerm.getAt(1),
							pTermRes.index, pLstPrlg.getAt(pTermRes.pos),
							Arg2Niv);
					pTermRes.pos++;

					if (resultat) {
						Return_Stack.push(Exec_Stack.pop());
					} else {
						env.unification.Unif_Stack.pop();
					}
				}

				if (!resultat && (pTermRes.pos == dernierInd)) {
					// avec la condition pTermRes.Pos == dernierInd, on traite
					// le cas o? la liste est vide
					if (pLstPrlg.getAt(dernierInd).typeOfData == uVarList) {
						PrologDataIndexPair contr = env.unification
								.valueFromUnifStack(pLstPrlg.getAt(dernierInd),
										Arg2Niv);
						ASSERT((contr.pData != null)
								&& (contr.pData.typeOfData == uList),
								"Error: The second argument of member should be a list.\n");
						pLstPrlg = (PrologList) contr.pData.data;
						Arg2Niv = contr.index;
						pTermRes.lstMember = pLstPrlg;
						pTermRes.indLstMember = contr.index;
						dernierInd = pLstPrlg.size() - 1;
						pTermRes.pos = 0;
					} else {
						env.unification.Unif_Stack.pushEmptyRecord(); // pour la
																		// forme
																		// instanciee
																		// de
																		// membre
						resultat = env.unification.unify(pTermRes.pTerm
								.getAt(1), pTermRes.index, pLstPrlg
								.getAt(dernierInd), Arg2Niv);
						pTermRes.pos++;

						if (resultat) {
							Return_Stack.push(Exec_Stack.pop());
						} else {
							env.unification.Unif_Stack.pop();
						}

						finished = true;
					}
				} else {
					finished = true;
				}
			}

			if (!resultat) {
				pTermRes.lstMember = null;
				pTermRes.indLstMember = 0;
				pTermRes.pos = 0;
			}
		} else if (IdPred.equals("not")) { // not(But)
			ASSERT((pTermRes.pTerm.size() == 2),
					"Error: not takes one argument.\n"); // not doit avoir 1
															// arg.
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && ((Arg1.pData.typeOfData == uTerm)
							|| (Arg1.pData.typeOfData == uIdentifier) || (Arg1.pData.typeOfData == uCG))),
					"Error: The not argument must be a term or a CG.\n");
			pTermRes.pos = -1; // not(But) reste dans la Exec_Stack
			pTermRes.indexInExecStack = Return_Stack.indexOfTop();

			// et on empile ensuite But
			PrologTerm aTrmtmp = null;

			if ((Arg1.pData.typeOfData == uIdentifier)
					|| (Arg1.pData.typeOfData == uCG)) {
				aTrmtmp = new PrologTerm();
				aTrmtmp.addData(Arg1.pData);
			} else {
				aTrmtmp = (PrologTerm) Arg1.pData.data;
			}

			Exec_Stack.push(new TermToBeResolved(aTrmtmp, Arg1.index, 0));
			resultat = true;
		} else if (IdPred.equals("findall")) { // findall(Var, But, ListValVar)

			/*****
			 * resolution de findall est traite comme suit : elle consiste ?
			 * cr?er une liste L (listfindall), et faire comme si findall(X,B,L)
			 * :- B, addElemForAll(..), fail. et donc : depiler findall pour
			 * l'empiler dans Return_Stack et empiler dans Exec_Stack les buts :
			 * But, addElemForAll(ValVar, ListValVar), fail . Le "fail" va
			 * imposer des resatisfactions de But suivi de addElemForAll qui
			 * mettera les valeurs de X dans ListValVar. Une fois But ?puis?,
			 * l'interpreteur tentera de resatisfaire findall. On aura alors
			 * dans la Exec_Stack : findall(), B, addElemForAll(..), fail. La
			 * premi?re resatisfaction de findall consistera ? le depiler pour
			 * l'empiler dans Return_Stack et a enlever les trois ?l?ments qui
			 * se trouvent au sommet de la Exec_Stack (B, addElemForAll(..),
			 * fail), comme si les trois buts n'ont jamais existe, et on
			 * indiquera quelle est resatisfaite mais quelle ne peut plus etre
			 * resatisfaite. d'autres aspects (detail mais important) se
			 * retrouvent dans le code
			 */
			ASSERT((pTermRes.pTerm.size() == 4),
					"Error: findall takes three arguments.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && ((Arg2.pData.typeOfData == uTerm)
							|| (Arg2.pData.typeOfData == uIdentifier) || (Arg2.pData.typeOfData == uCG))),
					"Error: The second argument of findall must be a term or a CG.\n");

			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData == null)
							&& ((pTermRes.pTerm.getAt(1).typeOfData == uVariable) || (pTermRes.pTerm
									.getAt(1).typeOfData == uVarList)) && isVariableGoal(
							(String) pTermRes.pTerm.getAt(1).data, Arg2.pData)),
					"Error: The first argument of findall must be a free variable that is contained in the second argument.\n");

			PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(3), pTermRes.index);
			ASSERT(
					(Arg3.pData == null)
							&& ((pTermRes.pTerm.getAt(3).typeOfData == uVariable) || (pTermRes.pTerm
									.getAt(3).typeOfData == uVarList)),
					"Error: the third argument of findall must be a free variable.\n");

			// Creer la liste qui contiendra les valeurs possibles
			// de X; le premier arg de findall
			pTermRes.pos = -1; // findall(X,But,L) sera resatisfaite
			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pLstPrlg = new PrologList();

			PrologData nouvDon = new PrologData(uList, pLstPrlg);
			env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index,
					nouvDon, pTermRes.index);
			pTermRes.lstMember = pLstPrlg;
			Return_Stack.push(Exec_Stack.pop()); // il s'agit du but findall(..)

			// Push le but fail
			PrologTerm aTrmTmp = new PrologTerm();
			nouvDon = new PrologData(uIdentifier, "fail");
			aTrmTmp.addData(nouvDon);
			nouvDon = null;
			Exec_Stack.push(new TermToBeResolved(aTrmTmp, pTermRes.index, 0));

			// Push le but inserer(ValVar, ListValVar)
			aTrmTmp = new PrologTerm();
			aTrmTmp.addData(new PrologData(uIdentifier, "addElemForAll"));
			aTrmTmp.addData(pTermRes.pTerm.getAt(1)); // on met la variable car
														// sa valeur changera
			aTrmTmp.addData(pTermRes.pTerm.getAt(3));
			Exec_Stack.push(new TermToBeResolved(aTrmTmp, pTermRes.index, 0));

			// et on empile ensuite But
			if (Arg2.pData.typeOfData == uCG) {
				aTrmTmp = new PrologTerm();
				aTrmTmp.addData(Arg2.pData);
			} else {
				aTrmTmp = (PrologTerm) Arg2.pData.data;
			}

			Exec_Stack.push(new TermToBeResolved(aTrmTmp, Arg2.index, 0));

			aTrmTmp = null;
			resultat = true;
		} else if (IdPred.equals("set_list")) { // set_list(Ensemble, Liste)
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: set_list takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData == uSet)),
					"Error: the first argument of set_list must be a free variable or a set.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData == uList)),
					"Error: the second argument of set_list must be a free variable or a list.\n");
			ASSERT(((Arg1.pData != null) || (Arg2.pData != null)),
					"Error: the two arguments of set_list can not be two free variables.\n"); // on
																								// ne
																								// peut
																								// avoir
																								// deux
																								// var.
																								// libres

			if (Arg1.pData == null) { // Ensemble non connue, on le cree
				pLstPrlg = (PrologList) Arg2.pData.data;
				pLstPrlg = copyAllOfTheListWithUnification(pLstPrlg, Arg2.index);

				PrologData uneDon = new PrologData(uSet, pLstPrlg);
				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(pTermRes.pTerm.getAt(1),
						pTermRes.index, uneDon, pTermRes.index);
			} else { // Liste non connue, on la cree

				PrologData uneDon = Arg1.pData.myCopy();
				uneDon.typeOfData = uList; // On a transforme l'ensemble en une
											// liste
				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(uneDon, pTermRes.index,
						pTermRes.pTerm.getAt(2), pTermRes.index);
			}

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("shuffle")) { // set_list(Input_List, Output_List)
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: shuffle takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT((Arg1.pData.typeOfData == uList),
					"Error: the first argument of shuffle must be a list.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT((Arg2.pData == null),
					"Error: the second argument of shuffle must be a free variable.\n");

			pLstPrlg = (PrologList) Arg1.pData.data;
			pLstPrlg = copyAllOfTheListWithUnification(pLstPrlg, Arg1.index);
			pLstPrlg.shuffle();

			PrologData uneDon = new PrologData(uList, pLstPrlg);
			env.unification.Unif_Stack.pushEmptyRecord();
			resultat = env.unification.unify(pTermRes.pTerm.getAt(2),
											 pTermRes.index, uneDon, pTermRes.index);

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("term_list")) { // term_list(Terme, Liste)
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: term_list takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(((Arg1.pData == null) || (Arg1.pData.typeOfData == uTerm)),
					"Error: the first argument of term_list must be a free variable or a term.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData == uList)),
					"Error: the second argument of term_list must be a free variable or a list.\n");
			ASSERT(((Arg1.pData != null) || (Arg2.pData != null)),
					"Error: the two arguments of term_list can not be two free variables.\n"); // on
																								// ne
																								// peut
																								// avoir
																								// deux
																								// var.
																								// libres

			if (Arg1.pData == null) { // Terme non connue, on le cr?e
				pLstPrlg = (PrologList) Arg2.pData.data;

				// Vector vct = (Vector) Arg2.pDonnee.Don; // Arg2..
				// retournerait en principe une PrologList
				ASSERT((pLstPrlg.size() != 0),
						"Error: the second argument of term_list can not be an empty list.\n");

				// Verifier que le 1er elem de la liste est un ident
				PrologDataIndexPair ArgTmp = env.unification
						.valueFromUnifStack((PrologData) pLstPrlg.elementAt(0),
								Arg2.index);
				ASSERT(
						((ArgTmp.pData != null) && (ArgTmp.pData.typeOfData == uIdentifier)),
						"Error: the first element of the list (the second argument of term_list) must be an identifier.\n");

				// ******** IMPORTANT*********************////
				// *** A REVOIR**** touteLaListe ici ne constitue pas une
				// solution tres satisfaisante
				// car la valeur d'une variable peut etre une structure qui
				// contient elle
				// pLstPrlg = touteLaListe(pLstPrlg, Arg2.niv);
				// On conserve donc le probleme.. pour le cas ou le dernier elem
				// de la liste
				// est une VarListe ..... a traiter ce probleme par la suite,
				// une fois que
				// ********* le probleme d'indexation soit reglee
				pTerme = new PrologTerm();

				PrologData uneDon;

				for (int listIndex = 0;
						listIndex < pLstPrlg.size();
						++listIndex) {
					uneDon = (PrologData) pLstPrlg.get(listIndex);
					pTerme.addData(uneDon);
				}
				pTerme.set(0, ArgTmp.pData); // remplacer son premier
														// elem
				ArgTmp = null; // pour que ArgTmp soit eliminer localement et
								// correctement

				uneDon = new PrologData(uTerm, pTerme);
				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(pTermRes.pTerm.getAt(1),
						pTermRes.index, uneDon, pTermRes.index);
			} else { // Terme connu; construire ou tester la liste (2 arg)
				pTerme = (PrologTerm) Arg1.pData.data;
				pLstPrlg = new PrologList();

				PrologData uneDon = null;

				for (int listIndex = 0;
						listIndex < pTerme.size();
						++listIndex) {
					uneDon = (PrologData) pTerme.get(listIndex);
					pLstPrlg.addData(uneDon);
				}

				uneDon = new PrologData(uList, pLstPrlg);
				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(uneDon, pTermRes.index,
						pTermRes.pTerm.getAt(2), pTermRes.index);
			}

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("read") || IdPred.equals("read_sentence")) {
			// We mustn't be an applet
			ASSERT(!env.bIsApplet,
					"Cannot use the 'read' or 'read_sentence' predicates in an applet!");
			if (IdPred.equals("read")) {
				ASSERT((pTermRes.pTerm.size() == 2),
						"Error: read takes one argument.\n"); // read doit avoir
																// 1 arg.
			} else {
				ASSERT(
						((pTermRes.pTerm.size() == 2) || (pTermRes.pTerm.size() == 3)),
						"Error: read_sentence takes one or two arguments.\n");
			}

			byte modeLecture = 0;

			if (pTermRes.pTerm.size() == 2) { // read(x) or read_sentence(L)
				Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(1), pTermRes.index);
				ASSERT(
						((Arg1.pData == null) && ((pTermRes.pTerm.getAt(1).typeOfData == uVariable) || (pTermRes.pTerm
								.getAt(1).typeOfData == uVarList))),
						"Error: the read and read_sentence/1 argument must be a free variable.\n");

				if (IdPred.equals("read")) {
					modeLecture = uReadData;
				} else {
					modeLecture = uReadSentence;
				}

				env.io.appendToConsole("|: ");
				env.io.readSomething(modeLecture);
			} else { // Le cas de read_sentence(String, List)
				modeLecture = uReadSentence;
				Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(1), pTermRes.index);
				ASSERT(
						((Arg1.pData != null) && (Arg1.pData.typeOfData == uString)),
						"Error: The first argument of read_sentence/2 must be a String.\n");

				Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm
						.getAt(2), pTermRes.index);
				ASSERT(
						((Arg2.pData == null) && ((pTermRes.pTerm.getAt(2).typeOfData == uVariable) || (pTermRes.pTerm
								.getAt(2).typeOfData == uVarList))),
						"Error: The second argument of read_sentence/2 must be a free variable.\n");

				try {
					String sTmp = (String) Arg1.pData.data;
					env.compile.CompileTxt = sTmp.substring(1,
							sTmp.length() - 1); // Enlever les doubles quotes
					env.compile.textEndIndex = env.compile.CompileTxt.length();
					env.compile.curCharIndex = 0;
					env.compile.readChar();
					env.compile.vctUnitTyp.clear();
					env.compile.tSentence();
				} catch (CompileException e1) {
					if (!e1.getMessage().equals("End Of Text")
							|| env.compile.vctUnitTyp.isEmpty()) {
						env.io.appendToConsole("\n Error in the given string.");
						env.compile.vctUnitTyp.clear();
					}
				}
			}

			if (!env.compile.vctUnitTyp.isEmpty() && (modeLecture == uReadData)) {
				PrologTerm trmTmp = new PrologTerm();

				try {
					env.compile.currElem = 0;
					env.compile.tPrologData(true, trmTmp);
				} catch (CompileException ce) {
					// This could possibly happen
				}

				PrologData donIn = trmTmp.getAt(0);
				trmTmp.clear();
				trmTmp = null;
				env.compile.vctUnitTyp.clear();

				env.unification.Unif_Stack.pushEmptyRecord();
				resultat = env.unification.unify(donIn, pTermRes.index,
						pTermRes.pTerm.getAt(1), pTermRes.index);

				if (resultat) {
					pTermRes.pos = -1;
					Return_Stack.push(Exec_Stack.pop());
				} else { // {
					env.unification.Unif_Stack.pop();
				}

				// pTermRes.Pos = 0; inutil puisqu'il l'est au depart et il ne
				// change pas ici
				// }; // cela s'applique aussi pour les buts suivants
			} else if (!env.compile.vctUnitTyp.isEmpty()
					&& (modeLecture == uReadSentence)) {
				// Cr?er la liste des mots composant la phrase
				PrologList LstPrlg = new PrologList();
				UnitType unitTyp = null;
				String sTmp = null;

				for (int listIndex = 0;
						listIndex < env.compile.vctUnitTyp.size();
						++listIndex) {
					unitTyp = env.compile.vctUnitTyp.get(listIndex);
					sTmp = '"' + unitTyp.unit.toString() + '"';
					LstPrlg.addData(new PrologData(uString, sTmp));
				}

				env.compile.vctUnitTyp.clear();

				// Unifier la liste ainsi cr?e avec l'argument correspondant de
				// read_sentence
				env.unification.Unif_Stack.pushEmptyRecord();

				PrologData donTmp = new PrologData(uList, LstPrlg);
				int indArg = 0;

				if (pTermRes.pTerm.size() == 2) {
					indArg = 1;
				} else {
					indArg = 2;
				}

				resultat = env.unification.unify(donTmp, pTermRes.index,
						pTermRes.pTerm.getAt(indArg), pTermRes.index);
				donTmp = null;

				if (resultat) {
					pTermRes.pos = -1;
					Return_Stack.push(Exec_Stack.pop());
				} else {
					env.unification.Unif_Stack.pop();
				}
			} else {
				throw new ExecException("Error while reading data.");
			}
		} else if (IdPred.equals("addElemForAll")) {
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			pLstPrlg = (PrologList) Arg2.pData.data;

			if ((pLstPrlg.size() == 0)
					|| (Arg1.pData != ((PrologData) pLstPrlg.lastElement()))) {
				pLstPrlg.addData(Arg1.pData);
			}

			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("write")) {

			ASSERT((pTermRes.pTerm.size() == 2),
					"Error: write takes one argument.\n"); // write doit avoir 1
															// arg.
			// if (env.bIsApplet) {
			// PrologPlusCGFrame.pCurPrologTextArea =
			// PrologPlusCGApplet.webConsoleArea;
			// } else {
			// PrologPlusCGFrame.pCurPrologTextArea =
			// PrologPlusCGFrame.consoleArea;
			// }
			env.printer.indVar = 0;

			env.printer.printPrologData(pTermRes.pTerm.getAt(1),
					pTermRes.index, true);
			
			env.printer.flush();

			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("writenl")) {
			ASSERT((pTermRes.pTerm.size() == 2),
					"Error: writenl takes one argument.\n"); // writenl doit
																// avoir 1 arg.
			// if (env.bIsApplet) {
			// PrologPlusCGFrame.pCurPrologTextArea =
			// PrologPlusCGApplet.webConsoleArea;
			// } else {
			// PrologPlusCGFrame.pCurPrologTextArea =
			// PrologPlusCGFrame.consoleArea;
			// }
			env.printer.indVar = 0;
			env.printer.printPrologData(pTermRes.pTerm.getAt(1),
					pTermRes.index, true);
			env.printer.flush();
			env.io.appendToConsole("\n");
			env.unification.Unif_Stack.pushEmptyRecord(); // Even if there was
															// no unification;
															// for homogenizing
															// with
															// RetourArriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("clearConsole")) {
			// clearConsole must have no arguments
			ASSERT((pTermRes.pTerm.size() == 1),
					"Error: clearConsole takes no arguments.\n");

			// Clear the web console area
			env.io.clearConsole();

			// Set everything OK
			env.unification.Unif_Stack.pushEmptyRecord(); // Even if there was
															// no unification;
															// for homogenizing
															// with
															// RetourArriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("nl")) {
			// nl must have no arguments
			ASSERT((pTermRes.pTerm.size() == 1),
					"Error: nl takes no arguments.\n");

			// Clear the web console area
			env.io.appendToConsole("\n");

			// Set everything OK
			env.unification.Unif_Stack.pushEmptyRecord(); // Even if there was
															// no unification;
															// for homogenizing
															// with
															// RetourArriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("destroyAll")) { // destroyAll
			ASSERT((pTermRes.pTerm.size() == 1),
					"Error: destroyAll has no argument.\n");
			clear_globalPrlgPCGObjs();
			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("destroy")) { // destroy(IdObj)
			ASSERT((pTermRes.pTerm.size() == 2),
					"Error: destroy takes one argument.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && (Arg1.pData.typeOfData == uIdentifier)),
					"Error: the first argument of destroy must be an identifier.\n");

			String IdObj = (String) Arg1.pData.data;
			ASSERT((globalPrlgPCGObjs.get(IdObj) != null),
					"Error : Object unknown.");
			globalPrlgPCGObjs.remove(IdObj);
			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("objectify")) { // objectify(_variable, IdObj)
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: objectify takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && (Arg1.pData.typeOfData == uObject)),
					"Error: the first argument of objectify must be an object.\n");

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && (Arg2.pData.typeOfData == uIdentifier)),
					"Error: the second argument of objectify must be an identifier.\n");

			String IdObj = (String) Arg2.pData.data;
			ASSERT((globalPrlgPCGObjs.get(IdObj) == null),
			"Error : Object already exists.");
			
			// Rentrer l'association <IdObj, nouvObj> dans la table des
			// "donneesGlobales"
			globalPrlgPCGObjs.put(IdObj, new PrologData(uObject, Arg1.pData.data));

			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
			// no unification:
			// For homogenizing
			// with
			// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("createInstance")) { // createInstance(Ident,
														// Terme);
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: createInstance takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && ((Arg1.pData.typeOfData == uIdentifier) || (Arg1.pData.typeOfData == uString))),
					"Error: the first argument of createInstance must be an identifier.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData == uTerm)),
					"Error: the second argument of createInstance must be a term.\n");

			if (env.program == null) {
				env.io
						.showMessageDialog(
								"No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.",
								"Warning");
				Return_Stack.makeEmpty();

				return resultat;
			}

			PrologRule pRegle = new PrologRule();

			// Par ailleurs, la regle Ident <- Terme sera transformee en :
			// Ident::valSysIdVar <- Terme::valSysIdVar,
			// l'ajout de la variable des deux cotes va nous permettre de
			// resoudre correctement l'heritage...
			// a. transformer Ident en Ident::valSysIdVar; valSysCleBtCp(Ident,
			// valSysIdVar)
			PrologTerm aCple = new PrologTerm();
			PrologData uneDonId = new PrologData(uIdentifier,
					env.compile.valSysCleBtCp);
			aCple.addData(uneDonId); // construction de valSysCleBtCp(

			PrologTerm aTerm1 = new PrologTerm();
			aTerm1.addData(Arg1.pData); // mettre Ident en un Terme

			String ClePaquet = env.compile.valSysGEN
					+ env.compile.nameOfArgument(aTerm1, -1);

			aCple.addData(new PrologData(uTerm, aTerm1)); // construction de
															// valSysCleBtCp(Ident,

			PrologData uneDonVr = new PrologData(uVariable,
					env.compile.valSysIdVar);
			aCple.addData(uneDonVr); // construction de valSysCleBtCp(Ident,
										// valSysIdVar)
			pRegle.addTerm(aCple);

			// b. remplacer dans pCurRule t2 par t2::valSysIdVar;
			// valSysCleBtCp(t2, valSysIdVar)
			aCple = new PrologTerm();
			aCple.addData(uneDonId);
			aCple.addData(Arg2.pData);
			aCple.addData(uneDonVr);
			pRegle.addTerm(aCple);
			pRules = (RuleVector) env.program.get(ClePaquet);

			if (pRules != null) {
				pRules.addRule(pRegle);
			} else { // un nouveau paquet
				pRules = new RuleVector();
				pRules.addRule(pRegle);
				env.program.put(ClePaquet, pRules);
			}

			programModified = true;
			pRules = null;
			ClePaquet = null;
			pRegle = null;
			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("asserta") || IdPred.equals("assertz")) {
			// asserta/z(Terme, ListeTermes); la liste souvent vide
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: asserta/z takes two arguments.\n"); // asserta/z
																// doit avoir
																// deux arg.
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(Arg1.pData != null,
					"Error: the first argument of asserta/z must be bound.\n");

			if ((Arg1.pData.typeOfData == uIdentifier)
					|| (Arg1.pData.typeOfData == uCG)) { // Il faut le
															// transformer en un
															// term

				PrologTerm unTrm = new PrologTerm();
				unTrm.addData(Arg1.pData);
				Arg1.pData = new PrologData(uTerm, unTrm);
			} else {
				ASSERT(Arg1.pData.typeOfData == uTerm,
						"Error: the first argument of asserta/z must be a term or a CG.\n");
			}

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData != null) && (Arg2.pData.typeOfData == uList)),
					"Error: the second argument of asserta/z must be a list.\n");

			if (env.program == null) {
				String strMessage = "No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.";
				if (!env.bIsApplet) {
					env.io.showMessageDialog(strMessage, "Warning");
				} else {
					env.recordErrorMessage(strMessage);
				}

				Return_Stack.makeEmpty();
				return false;
			}

			PrologRule pRule = new PrologRule();
			pRule.addTerm(assertTerm((PrologTerm) Arg1.pData.data, Arg1.index));
			pLstPrlg = (PrologList) Arg2.pData.data;

			// ******* IMPORTANT : Comme pour term_list; touteLaListe n'est pas
			// appropriee
			// ***** ici; car il faut garder les variables et traiter les
			// structures contenant les variables ..
			// ****** A REVOIR ***************//
			// pLstPrlg = touteLaListe(pLstPrlg, Arg2.niv);
			PrologData uneDon;
			PrologTerm unTrm;

			for (int listIndex = 0;
					listIndex < pLstPrlg.size(); 
					++listIndex) {
				uneDon = (PrologData) pLstPrlg.get(listIndex);

				if ((uneDon.typeOfData == uIdentifier)
						|| (uneDon.typeOfData == uCG)
						|| (uneDon.typeOfData == uVariable)) { // Il faut le
																// transformer
																// en un term
					unTrm = new PrologTerm();
					unTrm.addData(uneDon);
					pRule.addTerm(assertTerm(unTrm, Arg2.index));
				} else {
					ASSERT((uneDon.typeOfData == uTerm),
							"Error: the second argument of asserta/z must be a list of terms or CG.\n");
					pRule.addTerm(assertTerm((PrologTerm) uneDon.data,
							Arg2.index));
				}
			}

			pLstPrlg = null;
			uneDon = null;

			String ClePaquet = env.compile.nameOfArgument(pRule.getAt(0),
					Arg1.index);
			pRules = (RuleVector) env.program.get(ClePaquet);

			if (pRules != null) {
				if (IdPred.equals("asserta")) { // ajouter au debut du paquet

					try {
						pRules.add(0, pRule);
					} catch (java.lang.ArrayIndexOutOfBoundsException exp) {
						// This could possibly happen
					}
				} else { // ajouter a la fin du paquet
					pRules.addRule(pRule);
				}
			} else { // un nouveau paquet
				pRules = new RuleVector();
				pRules.addRule(pRule);
				env.program.put(ClePaquet, pRules);
			}

			programModified = true;
			pRules = null;
			ClePaquet = null;
			pRule = null;
			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("retract")) { // retract(Terme); eliminer toute
												// regle dont la tete puisse
												// s'unifier...
			ASSERT((pTermRes.pTerm.size() == 2),
					"Error: retract takes one argument.\n"); // retract doit
																// avoir 1 arg.
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(Arg1.pData != null,
					"Error: the argument of retract must be bound.\n");

			if ((Arg1.pData.typeOfData == uIdentifier)
					|| (Arg1.pData.typeOfData == uCG)) { // Il faut le
															// transformer en un
															// term
				PrologTerm unTrm = new PrologTerm();
				unTrm.addData(Arg1.pData);
				Arg1.pData = new PrologData(uTerm, unTrm);
			} else {
				ASSERT((Arg1.pData.typeOfData == uTerm),
						"Error: the argument of retract must be a term.\n");

			}

			String IdCle = env.compile.nameOfArgument(
					(PrologTerm) Arg1.pData.data, Arg1.index);

			if (env.program == null) {
				env.io
						.showMessageDialog(
								"No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.",
								"Warning");
				Return_Stack.makeEmpty();

				return resultat;
			}
			
			pRules = (RuleVector) env.program.get(IdCle);
			
			if (pRules != null) {
				// //env.unification.Unif_Stack.addNewElement(); // une pour la
				// forme initiale
				PrologData Donnee2;
				PrologRule uneRegle;
				int indRegle = 0;

				for (int listIndex = 0;
						listIndex < pRules.size() && !resultat;
						++listIndex) {
					uneRegle = pRules.get(listIndex);
					env.unification.Unif_Stack.pushEmptyRecord(); // une pour la
																	// forme
																	// instanciee

					int TopOfUnification_Stack = env.unification.Unif_Stack
							.indexOfTop();

					Donnee2 = new PrologData(uTerm, uneRegle.getAt(0));
					resultat = env.unification.unify(Donnee2,
							TopOfUnification_Stack, Arg1.pData, Arg1.index);

					if (resultat) {
						pTermRes.pos = -1;
						Return_Stack.push(Exec_Stack.pop());
						uneRegle.myDestroy();
						uneRegle = null;
						pRules.remove(indRegle);

						if (pRules.isEmpty()) {
							env.program.remove(IdCle);
						}

						programModified = true;
					} else {
						env.unification.Unif_Stack.pop();
						indRegle++;
					}
				} // fin du for (...

				Donnee2 = null;
				uneRegle = null;
			} else {
				resultat = false;
			}

			IdCle = null;
		} else if (IdPred.equals("suppress")) { // suppress(Ident, Nbre), Nbre
												// designe le nbre d'arg

			// suppress elimine tout le paquet
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: suppress takes two arguments.\n"); // suppress doit
																// avoir deux
																// arg.
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && (Arg1.pData.typeOfData == uIdentifier)),
					"Error: the first argument of suppress must be an identifier.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && (Arg2.pData.typeOfData == uNumber)),
					"Error: the second argument of suppress must be an integer.\n");

			if (env.program == null) {
				env.io
						.showMessageDialog(
								"No program has been loaded and compiled.\n Only predefined goal (except asserta/z, createInstance, retract and suppress) can be satisfied.",
								"Warning");
				Return_Stack.makeEmpty();

				return resultat;
			}

			String Strg = env.compile.getTermSlashNumberOfArgumentsString(
					(String) Arg1.pData.data, ((Long) Arg2.pData.data)
							.intValue());
			pRules = (RuleVector) env.program.get(Strg);

			PrologRule uneRegle;

			if (pRules != null) {
				for (int listIndex = 0;
						listIndex  < pRules.size();
						++listIndex) {
					uneRegle = pRules.get(listIndex);
					uneRegle.myDestroy();
					uneRegle = null;
				}

				pRules.clear();
				env.program.remove(Strg);
				programModified = true;
				resultat = true;
				env.unification.Unif_Stack.pushEmptyRecord(); // even if there
																// was no
																// unification:
																// For
																// homogenizing
																// with
																// Retour_Arriere
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			}
		} else if (IdPred.equals("isInstance")) {
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: instance takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && ((Arg1.pData.typeOfData == uIdentifier) || (Arg1.pData.typeOfData == uString))),
					"Error : the first argument of isInstance should be an identifier or a string.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && (Arg2.pData.typeOfData == uIdentifier)),
					"Error : the second argument of isInstance should be an identifier.\n");

			try {
				UnifyCG aUnifyCG = new UnifyCG(env);
				resultat = aUnifyCG.conform(pTermRes.pTerm.getAt(1),
						pTermRes.index, (String) Arg2.pData.data);
			} catch (ExecException exex) {
				resultat = false;
			}

			if (resultat) {
				env.unification.Unif_Stack.pushEmptyRecord(); // even if there
																// was no
																// unification:
																// For
																// homogenizing
																// with
																// Retour_Arriere
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			}
		} else if (IdPred.equals("addInstance")) {
			if (env.typeHierarchy == null) {
				throw new ExecException(
						"Error : No type hierarchy is specified.");
			}

			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: addInstance takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && ((Arg1.pData.typeOfData == uIdentifier) || (Arg1.pData.typeOfData == uString))),
					"Error : the first argument of addInstance should be an identifier or a string.\n");
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && (Arg2.pData.typeOfData == uIdentifier)),
					"Error : the second argument of addInstance should be an identifier.\n");

			env.typeHierarchy.addInstance((String) Arg1.pData.data,
					(String) Arg2.pData.data);
			resultat = true;
			programModified = true;
			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
		} else if (IdPred.equals("free")) { // free(DonneePrlg)
			ASSERT((pTermRes.pTerm.size() == 2),
					"Error: free takes one argument.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			resultat = (Arg1.pData == null);

			if (resultat) {
				env.unification.Unif_Stack.pushEmptyRecord(); // even if there
																// was no
																// unification:
																// For
																// homogenizing
																// with
																// Retour_Arriere
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			}
		} else if (IdPred.equals("val")) { // val(VarLibre, ExpressionPrefixe)
											// ou

			// val(VarLibre, IdObjet) ou val(IdObj, Expr)
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: val takes two arguments.\n"); // val doit avoir 2
															// arg.

			// ASSERT((pTermRes.pTerm.getS(1).typDon == uVariable),
			// "Error: the first argument of val must be a free variable.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData == null) || (pTermRes.pTerm.getAt(1).typeOfData == uIdentifier)),
					"Error: the first argument of val must be a free variable or an object identifier.\n");

			PrologData donTmp = null;

			if (pTermRes.pTerm.getAt(2).typeOfData == uIdentifier) {
				String IdObj = (String) pTermRes.pTerm.getAt(2).data;
				donTmp = (PrologData) globalPrlgPCGObjs.get(IdObj);
				ASSERT((donTmp != null), "Error : The object " + IdObj
						+ " is unknown.\n");
			} else {
				donTmp = evalExpr(pTermRes.pTerm.getAt(2), pTermRes.index);

				// donTmp = new PrologData(uNumber, nbreRes);
			}

			env.unification.Unif_Stack.pushEmptyRecord();

			if (pTermRes.pTerm.getAt(1).typeOfData == uVariable) {
				resultat = env.unification.unify(pTermRes.pTerm.getAt(1),
						pTermRes.index, donTmp, pTermRes.index);
			} else {
				String IdObj = (String) pTermRes.pTerm.getAt(1).data;
				globalPrlgPCGObjs.put(IdObj, donTmp);
				resultat = true;
			}

			ASSERT((resultat == true),
					"Error: the two arguments of val should be unified");
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
		} else if (IdPred.equals("sup") || IdPred.equals("inf")
				|| IdPred.equals("eqv")) {
			ASSERT((pTermRes.pTerm.size() == 3), "Error: " + IdPred
					+ " takes two arguments.\n");

			PrologData uneDonTrans1 = evalExpr(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((uneDonTrans1 != null) && (uneDonTrans1.typeOfData == uNumber)),
					"Error : the expression should return a number.");

			Number val1 = (Number) uneDonTrans1.data;

			PrologData uneDonTrans2 = evalExpr(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((uneDonTrans2 != null) && (uneDonTrans2.typeOfData == uNumber)),
					"Error : the expression should return a number.");

			Number val2 = (Number) uneDonTrans2.data;

			if (IdPred.equals("sup")) {
				resultat = val1.doubleValue() > val2.doubleValue();
			} else if (IdPred.equals("inf")) {
				resultat = val1.doubleValue() < val2.doubleValue();
			} else if (IdPred.equals("eqv")) {
				resultat = val1.doubleValue() == val2.doubleValue();
			}

			if (resultat) {
				env.unification.Unif_Stack.pushEmptyRecord(); // even if there
																// was no
																// unification:
																// For
																// homogenizing
																// with
																// Retour_Arriere
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			}
		} else if (IdPred.equals("seed")) {
			ASSERT((pTermRes.pTerm.size() == 2), "Error: " + IdPred
					+ " takes one argument.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && (Arg1.pData.typeOfData == uNumber)),
					"Error: the argument of  "
							+ IdPred
							+ " must be a number between 0 and 2,100,000,000.\n");

			Number val1 = (Number) Arg1.pData.data;
			long val1Long = val1.longValue();
			ASSERT(
					val1Long >= 0 && val1Long <= 2100000000L,
					"Error: the argument of  "
							+ IdPred
							+ " must be a number between 0 and 2,100,000,000.\n");

			rndRandom.setSeed(val1Long);

			env.unification.Unif_Stack.pushEmptyRecord(); // even if there was
															// no unification:
															// For homogenizing
															// with
															// Retour_Arriere
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("rnd")) {
			ASSERT((pTermRes.pTerm.size() == 4), "Error: " + IdPred
					+ " takes three arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT(
					((Arg1.pData != null) && (Arg1.pData.typeOfData == uNumber)),
					"Error: the first argument of  "
							+ IdPred
							+ " must be a number between 0 and 2,100,000,000.\n");

			Number val1 = (Number) Arg1.pData.data;
			long val1Long = val1.longValue();
			ASSERT(
					val1Long >= 0 && val1Long <= 2100000000L,
					"Error: the first argument of  "
							+ IdPred
							+ " must be a number between 0 and 2,100,000,000.\n");

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(
					((Arg2.pData != null) && (Arg2.pData.typeOfData == uNumber)),
					"Error: the second argument of  "
							+ IdPred
							+ " must be a number between 0 and 2,100,000,000.\n");

			Number val2 = (Number) Arg2.pData.data;
			long val2Long = val2.longValue();
			ASSERT(
					val2Long >= 0 && val2Long <= 2100000000L,
					"Error: the second argument of  "
							+ IdPred
							+ " must be a number between 0 and 2,100,000,000.\n");

			ASSERT(val1Long <= val2Long, "Error: the first argument of  "
					+ IdPred
					+ " must be less than or equal to the second argument.\n");

			PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(3), pTermRes.index);
			ASSERT(Arg3.pData == null, "Error: the third argument of  "
					+ IdPred + " must be a free variable.\n");

			double randomDouble = rndRandom.nextDouble();
			double myDifference = (double) val2Long - val1Long;
			double mySolutionDouble = (myDifference * randomDouble) + val1Long;
			Double mySolutionDoubleObject = new Double(mySolutionDouble);
			double mySolutionAtomicDouble = Math.floor(mySolutionDoubleObject.doubleValue());
			Long mySolutionLong = new Long((long) mySolutionAtomicDouble);
			
			PrologData aPrologData = new PrologData(uNumber, mySolutionLong);

			env.unification.Unif_Stack.pushEmptyRecord();
			resultat = env.unification.unify(aPrologData, pTermRes.index,
					pTermRes.pTerm.getAt(3), pTermRes.index);
			pTermRes.pos = -1;
			Return_Stack.push(Exec_Stack.pop());
			resultat = true;
		} else if (IdPred.equals("eq")) { // this corresponds to unification
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: eq takes two arguments.\n");
			env.unification.Unif_Stack.pushEmptyRecord();

			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);

			if ((Arg1.pData != null)
					&& ((Arg1.pData.typeOfData == uCG) || (Arg1.pData.typeOfData == uConcept))
					&& (Arg2.pData != null)
					&& ((Arg2.pData.typeOfData == uCG) || (Arg2.pData.typeOfData == uConcept))) {
				resultat = env.unification
						.unify(pTermRes.pTerm.getAt(2), pTermRes.index,
								pTermRes.pTerm.getAt(1), pTermRes.index);
			} else {
				resultat = env.unification
						.unify(pTermRes.pTerm.getAt(1), pTermRes.index,
								pTermRes.pTerm.getAt(2), pTermRes.index);
			}

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("dif")) { // this corresponds to not(eq...))
			ASSERT((pTermRes.pTerm.size() == 3),
					"Error: dif takes two arguments.\n");
			env.unification.Unif_Stack.pushEmptyRecord();
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);

			if ((Arg1.pData != null)
					&& ((Arg1.pData.typeOfData == uCG) || (Arg1.pData.typeOfData == uConcept))
					&& (Arg2.pData != null)
					&& ((Arg2.pData.typeOfData == uCG) || (Arg2.pData.typeOfData == uConcept))) {
				resultat = env.unification
						.unify(pTermRes.pTerm.getAt(2), pTermRes.index,
								pTermRes.pTerm.getAt(1), pTermRes.index);
			} else {
				resultat = env.unification
						.unify(pTermRes.pTerm.getAt(1), pTermRes.index,
								pTermRes.pTerm.getAt(2), pTermRes.index);
			}

			resultat = !resultat;

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
				// env.unification.Unif_Stack.pop();
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("fail")) {
			resultat = false;
		} else if (IdPred.equals("isSubType") || IdPred.equals("isSuperType")) { // isSubType(Type1,
																					// Type2)
																					// ou
																					// isSuperType(Type1,
																					// Type2)

			if (env.typeHierarchy == null) {
				throw new ExecException(
						"Error : No type hierarchy is specified.");
			}

			ASSERT((pTermRes.pTerm.size() == 3), "Error: " + IdPred
					+ " takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT((Arg1.pData.typeOfData == uIdentifier),
					"Error: the first argument of " + IdPred
							+ " must be an identifier.\n");

			String Type1 = (String) Arg1.pData.data;
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT((Arg2.pData.typeOfData == uIdentifier),
					"Error: the second argument of " + IdPred
							+ " must be an identifier.\n");

			String Type2 = (String) Arg2.pData.data;

			if (IdPred.equals("isSubType")) {
				resultat = env.typeHierarchy.isSubType(Type1, Type2);
			} else {
				resultat = env.typeHierarchy.isSuperType(Type1, Type2);
			}

			if (resultat) {
				env.unification.Unif_Stack.pushEmptyRecord(); // even if there
																// was no
																// unification:
																// For
																// homogenizing
																// with
																// Retour_Arriere
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			}
		} else if (IdPred.equals("immediateSubTypes")
				|| IdPred.equals("immediateSuperTypes")
				|| IdPred.equals("subTypes") || IdPred.equals("superTypes")) { // oper(Type,
																				// LstOfTypes)

			if (env.typeHierarchy == null) {
				throw new ExecException(
						"Error : No type hierarchy is specified.");
			}

			ASSERT((pTermRes.pTerm.size() == 3), "Error: " + IdPred
					+ " takes two arguments.\n");
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT((Arg1.pData.typeOfData == uIdentifier),
					"Error: the first argument of " + IdPred
							+ " must be an identifier.\n");

			String Type = (String) Arg1.pData.data;

			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT(((Arg2.pData == null) || (Arg2.pData.typeOfData == uList)),
					"Error: the second argument of " + IdPred
							+ " must be a free variable or a list.\n");

			PrologData L = null;

			if (IdPred.equals("immediateSubTypes")) {
				L = env.typeHierarchy.immediateSubTypes(Type);
			} else if (IdPred.equals("immediateSuperTypes")) {
				L = env.typeHierarchy.immediateSuperTypes(Type);
			} else if (IdPred.equals("subTypes")) {
				L = env.typeHierarchy.subTypes(Type);
			} else {
				L = env.typeHierarchy.superTypes(Type);
			}

			env.unification.Unif_Stack.pushEmptyRecord();
			resultat = env.unification.unify(pTermRes.pTerm.getAt(2),
					pTermRes.index, L, pTermRes.index);

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("maxComSubTypes")
				|| IdPred.equals("minComSuperTypes")) { // XComYTypes(Typ1,
														// Typ2, MaxMinType)
			if (env.typeHierarchy == null) {
				throw new ExecException(
						"Error : No type hierarchy is specified.");
			}

			ASSERT((pTermRes.pTerm.size() == 4), "Error:" + IdPred
					+ " takes tree arguments.\n");

			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT((Arg1.pData.typeOfData == uIdentifier),
					"Error: the first argument of " + IdPred
							+ " must be an identifier.\n");

			String Type1 = (String) Arg1.pData.data;
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT((Arg2.pData.typeOfData == uIdentifier),
					"Error: the second argument of " + IdPred
							+ " must be an identifier.\n");

			String Type2 = (String) Arg2.pData.data;
			PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(3), pTermRes.index);
			ASSERT(((Arg3.pData == null) || (Arg3.pData.typeOfData == uList)),
					"Error: the third argument of " + IdPred
							+ " must be a free variable or a list.\n");

			Vector<String> Types3 = null;

			if (IdPred.equals("maxComSubTypes")) {
				Types3 = env.typeHierarchy.maxComSubTypes(Type1, Type2);
			} else {
				Types3 = env.typeHierarchy.minComSuperTypes(Type1, Type2);
			}

			PrologList aList = new PrologList();
			for (int listIndex = 0;
					listIndex < Types3.size();
					++listIndex) {
				String aType = Types3.get(listIndex);
				PrologData aDonnee = new PrologData(uIdentifier, aType);
				aList.addData(aDonnee);
			}

			env.unification.Unif_Stack.pushEmptyRecord();
			resultat = env.unification.unify(pTermRes.pTerm.getAt(3),
					pTermRes.index, new PrologData(uList, aList),
					pTermRes.index);

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		} else if (IdPred.equals("maxComSubType")
				|| IdPred.equals("minComSuperType")) { // XComYType(Typ1, Typ2,
														// MaxMinType)

			if (env.typeHierarchy == null) {
				throw new ExecException(
						"Error : No type hierarchy is specified.");
			}

			ASSERT((pTermRes.pTerm.size() == 4), "Error:" + IdPred
					+ " takes tree arguments.\n");

			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);
			ASSERT((Arg1.pData.typeOfData == uIdentifier),
					"Error: the first argument of " + IdPred
							+ " must be an identifier.\n");

			String Type1 = (String) Arg1.pData.data;
			Arg2 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(2),
					pTermRes.index);
			ASSERT((Arg2.pData.typeOfData == uIdentifier),
					"Error: the second argument of " + IdPred
							+ " must be an identifier.\n");

			String Type2 = (String) Arg2.pData.data;
			PrologDataIndexPair Arg3 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(3), pTermRes.index);
			ASSERT(
					((Arg3.pData == null) || (Arg3.pData.typeOfData == uIdentifier)),
					"Error: the third argument of " + IdPred
							+ " must be a free variable or an identifier.\n");

			String Type3 = null;

			if (IdPred.equals("maxComSubType")) {
				Type3 = env.typeHierarchy.maxComSubType(Type1, Type2);
			} else {
				Type3 = env.typeHierarchy.minComSuperType(Type1, Type2);
			}

			env.unification.Unif_Stack.pushEmptyRecord();
			resultat = env.unification.unify(pTermRes.pTerm.getAt(3),
					pTermRes.index, new PrologData(uIdentifier, Type3),
					pTermRes.index);

			if (resultat) {
				pTermRes.pos = -1;
				Return_Stack.push(Exec_Stack.pop());
			} else {
				env.unification.Unif_Stack.pop();
			}
		}

		if (!resultat) {
			pTermRes.pos = 0;
		}

		return resultat;
	}

	/**
	 * Dans cette nouvelle version : on cree une instanciation en profondeur du
	 * du term. Pour cela, on ecrit le term dans le tampon
	 * env.printer.nodeTreeDebug pour avoir la forme instanciee, en chaine de
	 * caracteres et ensuite on la compile pour avoir sa representation interne
	 ***/
	PrologTerm assertTerm(PrologTerm pTerme, int niv) throws CompileException {
		env.bWriteToDebugTree = true;
		env.printer.alternatePrintString = "";
		env.printer.printTerm(pTerme, niv); // Ecriture dans
											// alternatePrintString

		PrologTerm trm = env.compile
				.compileTerm(env.printer.alternatePrintString);
		env.printer.alternatePrintString = "";
		env.bWriteToDebugTree = false;
		return trm;
	}

	/***
	 * Ancienne def. Son probleme : elle ne fait pas une instanciation en
	 * profondeur; mais juste au premier niveau PrologTerm assertTerm(PrologTerm
	 * pTerme, int niv) { PrologTerm nouvTerm = new PrologTerm(); PrologData
	 * uneDon; PrologDataIndexPair valArg; for (Enumeration e =
	 * pTerme.elements(); e.hasMoreElements(); ) { uneDon = (PrologData)
	 * e.nextElement(); valArg = env.unification.valeur(uneDon, niv); if
	 * (valArg.pDonnee != null) nouvTerm.add(valArg.pDonnee); else
	 * nouvTerm.add(uneDon); };
	 * 
	 * return nouvTerm; }
	 *******/
	public boolean resatisfyPredicateGoal(TermToBeResolved pTermRes,
			String IdPred) throws ExecException, CompileException {
		boolean resultat = false;
		RuleVector pLocalRules = null;

		if (IdPred.equals("branchOfCG")) {
			PrologDataIndexPair Arg2 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(2), pTermRes.index);
			CG unGC = (CG) Arg2.pData.data;
			Vector<Relation> vctRels = unGC.m_vctRelations;
			int nbreBranch = vctRels.size();

			while ((pTermRes.pos < nbreBranch) && !resultat) {
				env.unification.Unif_Stack.pushEmptyRecord();

				// Creer un CG a partir de la branche/relation courante dans le
				// CG arg2
				CG unGCBranch = createCGBranch((Relation) vctRels
						.elementAt(pTermRes.pos));

				// Inverser les arg de unifier comme pour la primitive "eq"
				resultat = env.unification.unify(
						new PrologData(uCG, unGCBranch), Arg2.index,
						pTermRes.pTerm.getAt(1), pTermRes.index);
				pTermRes.pos++;

				if (resultat) {
					Return_Stack.push(Exec_Stack.pop());
				} else {
					env.unification.Unif_Stack.pop();
				}
			}
		} else if (IdPred.equals("concOfCG")) { // concOfCG(ConceptOUVar, CG)

			PrologDataIndexPair Arg2 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(2), pTermRes.index);
			CG unGC = (CG) Arg2.pData.data;
			Vector<Concept> vctConcepts = unGC.m_vctConcepts;
			int nbreConcs = vctConcepts.size();
			resultat = false;

			PrologDataIndexPair Arg1 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(1), pTermRes.index);

			while ((pTermRes.pos < nbreConcs) && !resultat) {
				env.unification.Unif_Stack.pushEmptyRecord();

				Concept concCour = (Concept) vctConcepts
						.elementAt(pTermRes.pos);

				// Is Arg1 a free variable?
				if (Arg1.pData == null) {
					// Yes, it was a free variable.
					// Therefore, we don't transform it to a CG,
					// since otherwise, we will unify the whole CG.

					// Inverser les arg de unifier comme pour la primitive "eq"
					resultat = env.unification.unify(new PrologData(uConcept,
							concCour), Arg2.index, pTermRes.pTerm.getAt(1),
							pTermRes.index);
				} else {
					// No, it was not a free variable.
					// Therefore, there is no harm done
					// in making a CG out of the concept.

					// Make a CG out of the concept.
					// This is because env.unification.unifier does not do the
					// special variable-substitution magic on uConcept.
					CG gTmp = new CG();
					gTmp.addConcept(concCour);

					// Inverser les arg de unifier comme pour la primitive "eq"
					resultat = env.unification
							.unify(new PrologData(uCG, gTmp), Arg2.index,
									pTermRes.pTerm.getAt(1), pTermRes.index);
				}
				pTermRes.pos++;

				if (resultat) {
					Return_Stack.push(Exec_Stack.pop());
				} else {
					env.unification.Unif_Stack.pop();
				}
			}
		} else if (IdPred.equals("member")) {
			PrologDataIndexPair Arg2 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(2), pTermRes.index);
			PrologList pLstPrlg = null;
			int Arg2Niv = Arg2.index;

			if (pTermRes.lstMember == null) {
				pLstPrlg = (PrologList) Arg2.pData.data;
			} else {
				pLstPrlg = pTermRes.lstMember;
				Arg2Niv = pTermRes.indLstMember;
			}

			int dernierInd = pLstPrlg.size() - 1;

			boolean finished = false;

			while (!finished && !resultat) {
				while ((pTermRes.pos < dernierInd) && !resultat) {
					env.unification.Unif_Stack.pushEmptyRecord();
					resultat = env.unification.unify(pTermRes.pTerm.getAt(1),
							pTermRes.index, pLstPrlg.getAt(pTermRes.pos),
							Arg2Niv);
					pTermRes.pos++;

					if (resultat) {
						Return_Stack.push(Exec_Stack.pop());
					} else {
						env.unification.Unif_Stack.pop();
					}
				}

				/**
				 * Si on arrive au dernier element de la liste et c'est une
				 * VarList alors il faut chercher sa valeur et relancer le
				 * membre ...
				 */
				if (!resultat && (pTermRes.pos == dernierInd)) {
					if (pLstPrlg.getAt(dernierInd).typeOfData == uVarList) {
						PrologDataIndexPair contr = env.unification
								.valueFromUnifStack(pLstPrlg.getAt(dernierInd),
										Arg2Niv);
						ASSERT((contr.pData != null)
								&& (contr.pData.typeOfData == uList),
								"Error: The second argument of member should be a list.\n");
						pLstPrlg = (PrologList) contr.pData.data;
						Arg2Niv = contr.index;
						pTermRes.lstMember = pLstPrlg;
						pTermRes.indLstMember = contr.index;

						dernierInd = pLstPrlg.size() - 1;
						pTermRes.pos = 0;
					} else {
						env.unification.Unif_Stack.pushEmptyRecord(); // pour la
																		// forme
																		// instanciee
																		// de
																		// membre
						resultat = env.unification.unify(pTermRes.pTerm
								.getAt(1), pTermRes.index, pLstPrlg
								.getAt(dernierInd), Arg2Niv);
						pTermRes.pos++;

						if (resultat) {
							Return_Stack.push(Exec_Stack.pop());
						} else {
							env.unification.Unif_Stack.pop();
						}

						finished = true;
					}
				} else {
					finished = true;
				}
			}

			if (!resultat) {
				pTermRes.lstMember = null;
				pTermRes.indLstMember = 0;
			}
		} else if (IdPred.equals("not")) {
			if (pTermRes.pos == -1) { // dans ce cas, indexInExecStack marque
										// Return_Stack et non Exec_Stack

				for (int i = Return_Stack.indexOfTop(); ((i > pTermRes.indexInExecStack) && (i >= 0)); i--) {
					Return_Stack.pop(); // en depilant (afin de ne plus les
										// considerer) les TermRes de PileRetour
					env.unification.Unif_Stack.pop(); // impliquent qu'il faut
														// faire de meme avec
														// leur
														// UnificationRecord
				}
				pTermRes.indexInExecStack = -1;
			}

			// a ce niveau, vctResult = false (par defaut, ce qui est desire)
			// ... et en bas, on mettra pTermPos = 0
		} else if (IdPred.equals("findall")) {
			if (pTermRes.indLstMember != -1) {
				// voir remarque ci-dessous sur indLstMember ..
				// D?piler les trois buts au sommet de Exec_Stack fail,
				// addElemForAll(..), B
				// indLstMember est utilis? ici juste comme un tag indiquant la
				// prochaine fois
				// qu'il faut sauter ce traitement ci
				pTermRes.indLstMember = -1;
				env.unification.Unif_Stack.pushEmptyRecord(); // even if there
																// was no
																// unification:
																// For
																// homogenizing
																// with
																// Retour_Arriere
				env.unification.unify(pTermRes.pTerm.getAt(3), pTermRes.index,
						new PrologData(uList, pTermRes.lstMember),
						pTermRes.index);
				pTermRes.lstMember = null;
				Return_Stack.push(Exec_Stack.pop()); // il s'agit du but
														// findall(..)
				Exec_Stack.pop(); // depiler But
				Exec_Stack.pop(); // depiler addElemForAll(..)
				Exec_Stack.pop(); // depiler fail

				resultat = true;
			}
		} else if (IdPred.equals("retract")) {
			PrologDataIndexPair Arg1 = env.unification.valueFromUnifStack(
					pTermRes.pTerm.getAt(1), pTermRes.index);
			Arg1 = env.unification.valueFromUnifStack(pTermRes.pTerm.getAt(1),
					pTermRes.index);

			if ((Arg1.pData.typeOfData == uIdentifier)
					|| (Arg1.pData.typeOfData == uCG)) { // Il faut le
															// transformer en un
															// term

				PrologTerm unTrm = new PrologTerm();
				unTrm.addData(Arg1.pData);
				Arg1.pData = new PrologData(uTerm, unTrm);
			}

			String IdCle = env.compile.nameOfArgument(
					(PrologTerm) Arg1.pData.data, Arg1.index);
			pLocalRules = (RuleVector) env.program.get(IdCle);

			if (pLocalRules != null) {
				// //env.unification.Unif_Stack.addNewElement(); // une pour la
				// forme initiale
				PrologData data2;
				PrologRule aRule;
				int indRegle = 0;

				for (int listIndex = 0;
						listIndex < pLocalRules.size() && !resultat;
						++listIndex)  {
					aRule = pLocalRules.get(listIndex);
					env.unification.Unif_Stack.pushEmptyRecord();

					int TopOfUnification_Stack = env.unification.Unif_Stack
							.indexOfTop();

					data2 = new PrologData(uTerm, aRule.getAt(0));
					resultat = env.unification.unify(data2,
							TopOfUnification_Stack, Arg1.pData, Arg1.index);

					if (resultat) {
						Return_Stack.push(Exec_Stack.pop());
						aRule.myDestroy();
						aRule = null;
						pLocalRules.remove(indRegle);

						if (pLocalRules.isEmpty()) {
							env.program.remove(IdCle);

							// pTermRes.Pos = 0;
						}
						programModified = true;
					} else {
						env.unification.Unif_Stack.pop();
						indRegle++;
					}
				} // fin du for (...

				// if (!vctResult) env.unification.Unif_Stack.Pop();
				data2 = null;
				aRule = null;
			} else {
				resultat = false;
			}

			IdCle = null;
		}

		if (!resultat) {
			pTermRes.pos = 0;
		}

		return resultat;
	}

	PrologData evalExpr(PrologData pDon, int niv) throws ExecException {
		Number aNumber = null;
		PrologDataIndexPair Arg1 = env.unification
				.valueFromUnifStack(pDon, niv);
		ASSERT((Arg1.pData != null),
				"Error: any variable in an expression should have a value.\n");

		if (Arg1.pData.typeOfData == uNumber) {
			aNumber = (Number) Arg1.pData.data;
		} else if (Arg1.pData.typeOfData == uTerm) {
			PrologTerm pTerm = (PrologTerm) Arg1.pData.data;
			String IdTerm = (String) pTerm.getAt(0).data;
			ASSERT((IdTerm.equals("add") || IdTerm.equals("sub")
					|| IdTerm.equals("mul") || IdTerm.equals("div")),
					"Error: an operator in an expression must be add, sub, mul or div.\n");
			ASSERT((pTerm.size() == 3),
					"Error: any operator must have two arguments.\n");

			PrologData aDataTrans1 = evalExpr(pTerm.getAt(1), Arg1.index);
			ASSERT(
					((aDataTrans1 != null) && (aDataTrans1.typeOfData == uNumber)),
					"Error : the operand should be a number.");

			Number val1 = (Number) aDataTrans1.data;

			PrologData aDataTrans2 = evalExpr(pTerm.getAt(2), Arg1.index);
			ASSERT(
					((aDataTrans2 != null) && (aDataTrans2.typeOfData == uNumber)),
					"Error : the operand should be a number.");

			Number val2 = (Number) aDataTrans2.data;

			if ((val1 instanceof Long) && (val2 instanceof Long)) {
				int nbreEntier = 0;

				if (IdTerm.equals("add")) {
					nbreEntier = val1.intValue() + val2.intValue();
				} else if (IdTerm.equals("sub")) {
					nbreEntier = val1.intValue() - val2.intValue();
				} else if (IdTerm.equals("mul")) {
					nbreEntier = val1.intValue() * val2.intValue();
				}

				aNumber = new Long(nbreEntier);

				if (IdTerm.equals("div")) {
					double nbreDouble = 0.0;
					nbreDouble = val1.doubleValue() / val2.doubleValue();
					aNumber = new Double(nbreDouble);
				}
			} else {
				double nbreDouble = 0.0;

				if (IdTerm.equals("add")) {
					nbreDouble = val1.doubleValue() + val2.doubleValue();
				} else if (IdTerm.equals("sub")) {
					nbreDouble = val1.doubleValue() - val2.doubleValue();
				} else if (IdTerm.equals("mul")) {
					nbreDouble = val1.doubleValue() * val2.doubleValue();
				} else {
					nbreDouble = val1.doubleValue() / val2.doubleValue();
				}

				aNumber = new Double(nbreDouble);
			}
		} else {
			ASSERT(false,
					"Error: an element in an expression is neither a number nor an operator.\n");
		}

		Arg1 = null;

		return new PrologData(uNumber, aNumber);
	}

	public void clear_globalPrlgPCGObjs() {
		globalPrlgPCGObjs.clear(); // Est-ce suffisant pour detruire les objets
									// aussi ??
	}

	// une liste peut se terminer par un constructeur suivi d'une variable
	// dont la valeur serait une liste, elle meme peut se terminer ...
	// dans certains cas, on aimerait avoir la liste qui contiendrait tous
	// elements des listes "lies" par les constructeurs
	PrologList copyAllOfTheListWithUnification(PrologList aList, int level)
			throws ExecException {
		if (aList.isEmpty()) {
			return aList;
		}

		PrologList newList = new PrologList();
		copyListWithUnification(aList, level, newList);

		PrologData lastElem = (PrologData) aList.lastElement();
		boolean finished = false;
		PrologDataIndexPair ValVarList = null;
		int valLevel = level;
		PrologList aList1 = null;

		while (!finished) {
			ValVarList = env.unification.valueFromUnifStack(lastElem, valLevel);
			valLevel = ValVarList.index;

			if (lastElem.typeOfData == uVarList) {
				if ((ValVarList.pData != null)
						&& (ValVarList.pData.typeOfData != uList)) {
					throw new ExecException(
							"The value of the variable after | should be a list.\n");
				} else if (ValVarList.pData != null) {
					// Enlever le dernier element de la liste courante;
					// il represente une varListe qui est remplacee par sa
					// valeur
					// nouvListe.removeElementAt(nouvListe.size() - 1);
					aList1 = (PrologList) ValVarList.pData.data;
					copyListWithUnification(aList1, ValVarList.index, newList);

					try {
						lastElem = (PrologData) aList1.lastElement();
					} catch (Exception expt) {
						finished = true;
					}
				} else {
					throw new ExecException(
							"Warning : The list is partially specified; the variable after | is free.\n");
				}
			} else {
				finished = true;
				newList.addData(ValVarList.pData);
			}
		}

		return newList;
	}

	void copyListWithUnification(PrologList aList, int level, PrologList newList) {
		int indexOfLastElement = aList.size() - 1;

		for (int i = 0; i < indexOfLastElement; i++) {
			PrologDataIndexPair contr = env.unification.valueFromUnifStack(
					(PrologData) aList.elementAt(i), level);
			newList.addData(contr.pData);
		}
	}

	CG createCGBranch(Relation rel) {
		// 1. Creer le CG cadre
		Relation newRelation = new Relation();
		newRelation.m_pdRelationName = rel.m_pdRelationName;

		Concept concSrce = rel.m_concSource;
		Concept newConcSrce = new Concept(concSrce.m_pdType,
						  concSrce.m_pdReferent, concSrce.m_pdValue,
						  env);
		newConcSrce.addOutgoingRelation(newRelation);
		newRelation.m_concSource = newConcSrce;

		Concept concDest = rel.m_concDestination;
		Concept newConcDest = new Concept(concDest.m_pdType,
						  concDest.m_pdReferent, concDest.m_pdValue,
						  env);
		newConcDest.addIncomingRelation(newRelation);
		newRelation.m_concDestination = newConcDest;

		Vector<Concept> nouvVctConcs = new Vector<Concept>(2);
		nouvVctConcs.addElement(newConcSrce);
		nouvVctConcs.addElement(newConcDest);

		Vector<Relation> newVctRels = new Vector<Relation>(1);
		newVctRels.addElement(newRelation);

		return new CG(nouvVctConcs, newVctRels);
	}

	boolean isVariableGoal(String strIdVar, PrologData aTerm) {
		env.bWriteToDebugTree = true;
		env.printer.alternatePrintString = "";
		// -1 because we want to "print" the variable
		// and not its value.
		env.printer.printPrologData(aTerm, -1);

		String str = env.printer.alternatePrintString;
		env.printer.alternatePrintString = "";
		env.bWriteToDebugTree = false;

		int indDebStr = str.indexOf(strIdVar);
		boolean valRet = false;

		if (indDebStr >= 0) {
			int taille = strIdVar.length();

			// boolean finished = false;
			char carAvDeb;

			// boolean finished = false;
			char carAprFin;

			while ((indDebStr >= 0) && !valRet) {
				carAvDeb = str.charAt(indDebStr - 1); // En principe, indDebStr
														// > 0
				carAprFin = str.charAt(indDebStr + taille);

				if (!Character.isLetterOrDigit(carAvDeb) && (carAvDeb != '_')
						&& !Character.isLetterOrDigit(carAprFin)
						&& (carAprFin != '_')) {
					valRet = true;
				} else {
					indDebStr = str.indexOf(strIdVar, indDebStr + taille);
				}
			}
		}

		return valRet;
	}

	byte typeFromClass(Class<? extends Object> aClass) {
		String strClassName = aClass.getName();
		byte resultType = 0;

		if (strClassName.equals("java.lang.Integer")
				|| strClassName.equals("int")
				|| strClassName.equals("java.lang.Long")
				|| strClassName.equals("long")
				|| strClassName.equals("java.lang.Double")
				|| strClassName.equals("double")) {
			resultType = uNumber;
		} else if (strClassName.equals("java.lang.Boolean")
				|| strClassName.equals("boolean")) {
			resultType = uBoolean;
		} else if (strClassName.equals("java.lang.String")) {
			resultType = uString;
		} else {
			resultType = uObject;
		}

		return resultType;
	}

	byte typeFromString(String nameOfClass) {
		byte result = 0;

		if (nameOfClass.equals("Long") || nameOfClass.equals("Double")) {
			result = uNumber;
		} else if (nameOfClass.equals("Boolean")) {
			result = uBoolean;
		} else if (nameOfClass.equals("String")) {
			result = uString;
		} else {
			result = uObject;
		}

		return result;
	}

	// Check whether type is a primitive type
	// (number, boolean, identifier, string)
	boolean typeIsPrimitive(byte typDon) {
		return ((typDon == uNumber) || (typDon == uBoolean)
				|| (typDon == uIdentifier) || (typDon == uString));
	}
	
	String primitiveTypeToString(PrologData pData) throws ExecException {
		ASSERT(typeIsPrimitive(pData.typeOfData),
				"Error: wrong type of PrologData: Should be a number, a boolean, an identifier, or a string.\n");

		switch (pData.typeOfData) {
		case uNumber:
            if (pData.data instanceof Long) {
                Long valLong = ((Long) pData.data);
                return "\"" + valLong.toString() + "\"";
            } else {
                Double valDble = ((Double) pData.data);
                return "\"" + valDble.toString() + "\"";
            }
        case uBoolean: {
            boolean valBool = ((Boolean) pData.data).booleanValue();
            if (valBool) {
            	return "\"true\"";
            } else {
            	return "\"false\"";
            }
        }

        case uIdentifier:
        	return "\"" + (String) pData.data + "\"";
        case uString:
        	return (String) pData.data;
		}
		
		ASSERT(false,
				"Unreachable code reached in Resolution.primitiveTypeToString");
		
		return "";
	}
}
