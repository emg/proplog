var prolog = new PrologPlusCG.PPCGJS("#console");

var program = `
//
// In order for this to work across the Internet, the PPCGApplet.jar 
// which accompanies this file must be signed with the following command:
//
// jarsigner PPCGApplet.jar YourKeyName
//
// The key can be generated (first!) with:
//
// keytool -genkey -keyalg rsa -alias YourKeyName
//

reset :- retract(reaction(_)), fail.
reset.

reset_game :- retract(correct_answers(_)), fail.
reset_game :- retract(answer_given(_)), fail.
reset_game :- assertz(correct_answers(0), ()), assertz(answer_given(1), ()), addto_game_number.

correct_answers(0).
answer_given(1).
argument_number(99).
game_number(1).

addto_game_number:- game_number(M),  val(M1,add(M,1)), 
		retract(game_number(M)), assertz(game_number(M1), ()).


reset_answer_given:- retract(answer_given(_)), fail.
reset_answer_given:- assertz(answer_given(0), ()).

reset_argument_number :- retract(argument_number(_)).
reset_argument_number.

start_over :- clearConsole, reset_game, reset, help.

update_answer_given:- 
	retract(answer_given(0)), assertz(answer_given(1), ()), correct_answers(X), 
	nl, write("THE NUMBER OF CORRECT ANSWERS IN A ROW: "), write(X),nl .

addto_correct_answers:- correct_answers(M),  val(M1,add(M,1)), 
		retract(correct_answers(M)), assertz(correct_answers(M1), ()).
reset_correct_answers:- correct_answers(M),
		retract(correct_answers(M)), assertz(correct_answers(0), ()).

play_sound_if_equal(M,C) :- eq(M,C), external("playSound", ("Fanfare"), _).
play_sound_if_equal(M,C).

play_sound_if_necessary :- correct_answers(M), play_sound_if_equal(M, 10).


clearscreen :- correct_answers(10), clearConsole, reset_game, reset,/.
clearscreen :- nl, write("Continue until you have got 10 correct answers in a row!"), nl.

write_argument :- 
	answer_given(1),
	correct_answers(X), sup(10,X),
	generate_uid_if_not_there_already,
	clearConsole, reset, 
	rnd(1, 33, N), 
	argument(N, _U1, _U2, _U3, R), 
	reset_answer_given,
	write(_U1), nl, write(_U2), nl, 
	write("Ergo: "), write(_U3), nl,
	save_reaction(R), 
	save_argument_number(N),
	nl, 
	save_time,
	reset_answer_given,
	write("Decide with a click above whether this argument is valid or invalid!"),nl,/.
write_argument :- answer_given(1),
	clearConsole, reset, 
	game_number(N),
	write("Game number: "), write(N), nl,
	write("You have obtained 10 correct answers in a row in this game."), nl,
	write("This means that you have completed the test."),nl,
	write("Thank you very much for participating."),nl, nl,
	write("Click on Clear Screen, if you want a new game!"),nl,
/.
write_argument.

reaction_valid :- answer_given(0), reaction(0), 
	nl, write("Wrong answer!"), nl, 
	reset_correct_answers,
	write("This is an invalid argument!"), nl, nl, 
	update_answer_given,/,
	log_answer(valid, false),
	nl.
reaction_valid :-  answer_given(0), 
	reaction(R), nl, write("Correct answer!"), nl, 
	addto_correct_answers,
        play_sound_if_necessary,
	write("This is a valid argument!"), nl, 
	write("It is an application of "), write(R), nl, nl,
	update_answer_given,/,
	log_answer(valid, true),
	nl.
reaction_valid.

help :- 	clearConsole, reset, 
	write("Here you must decide, whether a argument, randomly generated by the system,"), nl,
	write("is valid or invalid."), nl, 
	write("The argument will appear when you click the leftmost button named 'New argument'."), nl, 
	write("Then you must decide whether the argument is valid or invalid, and"), nl,
	write("indicate your decision by using the buttons named 'Valid' and 'Invalid'."), nl,  nl,
	write("Click the button named 'Start over', if you wish to start over."), nl, nl, /.

argument(1,"If Eve is at home, then Adam is at home.","Eve is at home.","Adam is at home.","Modus Ponens").
argument(2,"If Adam is at home, then Eve is at home.","Adam is at home.","Eve is at home.","Modus Ponens").
argument(3,"If Eve is not at home, then Adam is at home.","Eve is not at home.","Adam is at home.","Modus Ponens").
argument(4,"If Adam is not at home, then Eve is at home.","Adam is not at home.","Eve is at home.","Modus Ponens").
argument(5,"If Eve is at home, then Adam is not at home.","Eve is at home.","Adam is not at home.","Modus Ponens").
argument(6,"If Adam is at home, then Eve is not at home.","Adam is at home.","Eve is not at home.","Modus Ponens").
argument(7,"If Eve is at home, then Adam is at home.","Adam is not at home.","Eve is not at home.","Modus Tollens").
argument(8,"If Adam is at home, then Eve is at home.","Eve is not at home.","Adam is not at home.","Modus Tollens").
argument(9,"If Eve is not at home, then Adam is at home.","Adam is not at home.","Eve is at home.","Modus Tollens").
argument(10,"If Adam is not at home, then Eve is at home.","Eve is not at home.","Adam is at home.","Modus Tollens").
argument(11,"If Eve is at home, then Adam is not at home.","Adam is at home.","Eve is not at home.","Modus Tollens").
argument(12,"If Adam is at home, then Eve is not at home.","Eve is at home.","Adam is not at home.","Modus Tollens").
argument(13,"Adam and Eve are not both at home.","Eve is at home.","Adam is not at home.","Disjunctive argumentation").
argument(14,"Adam and Eve are not both at home.","Adam is at home.","Eve is not at home.","Disjunctive argumentation").
argument(15,"At least one of Adam and Eve is at home.","Adam is not at home.","Eve is at home.","Disjunctive argumentation").
argument(16,"At least one of Adam and Eve is at home.","Eve is not at home.","Adam is at home.","Disjunctive argumentation").
argument(17,"If Eve is at home, then Adam is at home.","Adam is at home.","Eve is at home.",0).
argument(18,"If Adam is at home, then Eve is at home.","Eve is at home.","Adam is at home.",0).
argument(19,"If Eve is not at home, then Adam is at home.","Adam is at home.","Eve is not at home.",0).
argument(20,"If Adam is not at home, then Eve is at home.","Eve is at home.","Adam is not at home.",0).
argument(21,"If Eve is at home, then Adam is not at home.","Adam is not at home.","Eve is at home.",0).
argument(22,"If Adam is at home, then Eve is not at home.","Eve is not at home.","Adam is at home.",0).
argument(23,"If Eve is at home, then Adam is at home.","Eve is not at home.","Adam is not at home.",0).
argument(24,"If Adam is at home, then Eve is at home.","Adam is not at home.","Eve is not at home.",0).
argument(25,"If Eve is not at home, then Adam is at home.","Eve is at home.","Adam is not at home.",0).
argument(26,"If Adam is not at home, then Eve is at home.","Adam is at home.","Eve is not at home.",0).
argument(27,"If Eve is at home, then Adam is not at home.","Eve is not at home.","Adam is at home.",0).
argument(28,"If Adam is at home, then Eve is not at home.","Adam is not at home.","Eve is at home.",0).
argument(29,"Adam and Eve are not both at home.","Adam is not at home.","Eve is at home.",0).
argument(30,"Adam and Eve are not both at home.","Eve is not at home.","Adam is at home.",0).
argument(31,"At least one of Adam and Eve is at home.","Eve is at home.","Adam is not at home.",0).
argument(32,"At least one of Adam and Eve is at home.","Adam is at home.","Eve is not at home.",0).


save_reaction(R) :- reset, assertz(reaction(R), ()).

save_argument_number(N) :- retract(argument_number(_)), assertz(argument_number(N), ()).


reaction_invalid :- answer_given(0), reaction(0), nl, write("Correct answer!"), nl, 
	addto_correct_answers,
        play_sound_if_necessary,
	write("This is an invalid argument!"), nl, nl, 
	update_answer_given,/,
	log_answer(invalid, true),
	nl.
reaction_invalid :- answer_given(0), reaction(R), nl, write("Wrong answer!"), nl, 
	reset_correct_answers,
	write("This is a valid argument!"), nl, 
	write("It is an application of "), write(R), nl,nl,
	update_answer_given,
	/,
	log_answer(invalid, false),
	nl.
reaction_invalid.

// This indicates that we have not generated a user id in this session yet.
// This will be retracted, and replaced with a randomly generated user id.
generated_uid(0).

// Generate a user id if we haven't done so already
generate_uid_if_not_there_already :- generated_uid(X), dif(0, X), /.
generate_uid_if_not_there_already :-
	generated_uid(0),
	rnd(10000, 100000000, _newUID), 
	retract(generated_uid(0)), 
	asserta(generated_uid(_newUID), ()), /.
generate_uid_if_not_there_already.

// Get current time in Unix epoch milliseconds
get_time_now(_milliseconds_unix_epoch) :-
    // Get system time since January 1, 1970, midnight UTC.
    external("getTimeNow", (), _milliseconds_unix_epoch).

// Save time of creation of proposition
proposition_creation_time(0).
save_time :- suppress(proposition_creation_time, 1),
	get_time_now(_creation_time_in_milliseconds),
	assertz(proposition_creation_time(_creation_time_in_milliseconds), ()), /.
save_time.

// Get time in milliseconds taken to answer question
get_time_to_answer(_milliseconds) :-
	get_time_now(_now_milliseconds),
	proposition_creation_time(_start_milliseconds),
    val(_milliseconds, sub(_now_milliseconds, _start_milliseconds)).


log_answer(_validity, _correct) :-
	reaction(_R),
	get_time_to_answer(_timetaken),
	generated_uid(_uid),
	argument_number(_argumentNumber),
	game_number(_gameNumber),
	concat("uid=", _uid, _s1),
	concat(_s1, "&timelapse=", _s2),
	concat(_s2, _timetaken, _s3),
	concat(_s3, "&validity=", _s4),
	concat(_s4, _validity, _s5),
	concat(_s5, "&corr=", _s6),
	concat(_s6, _correct, _s7),
	concat(_s7, "&argumentNumber=", _s8),
	concat(_s8, _argumentNumber, _s9),
	concat(_s9, "&gameNumber=", _s10),
	concat(_s10, _gameNumber, _query),
	sendURL(_query).


myurlbase(_urlbase) :-
	// This hack is necessary because https:// is read as https: followed by a comment. This is a bug in the Prolog+CG lexer.
	concat("https:/", "/logic.aau.dk/logproplog/log/?", _urlbase).

sendURL(_query) :-
    myurlbase(_urlstring1),
    concat(_urlstring1, _query, _urlstring),
    external("visitURL", (_urlstring), _X).

// For debugging purposes

write_answer_given:- answer_given(X), write("Answer given: "), write(X), fail.
write_answer_given.

`;

var bCompiledCorrectly = prolog.compileProgram(program);
var errorMessage = prolog.getErrorMessage();

if (!bCompiledCorrectly) {
    alert("bCompiledCorrectly = " + bCompiledCorrectly + "\nErrorMessage = " + errorMessage);
}

//var bQueriedCorrectly = prolog.runQuery("main, grandfather(abraham, X).");
var bQueriedCorrectly = prolog.runQuery("help.");
/*
if (!bQueriedCorrectly) {
    alert("bQueriedCorrectly = " + bQueriedCorrectly + "\nError = " + prolog.getErrorMessage());
}
*/

function getTimeNow() {
    var date = new Date();
    return date.getTime();
}

function playSound(filename) {
    // From https://stackoverflow.com/questions/10105063/how-to-play-a-notification-sound-on-websites

    var myfilename;
    if (filename.length > 2 && filename[0] == '"' && filename[filename.length-1] == '"') {
	// From Prolog+CG, we get the string, but with surrounding quotes.
	myfilename = filename.slice(1, filename.length-1);
    } else {
	myfilename = filename;
    }

    var mp3Source = '<source src="' + myfilename + '.mp3" type="audio/mpeg">';
    var oggSource = '<source src="' + myfilename + '.ogg" type="audio/ogg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + myfilename +'.mp3">';
    var inner = '<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + '</audio>';
    document.getElementById("sound").innerHTML=inner;
}



function visitURL(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    // document.getElementById("demo").innerHTML = this.responseText;
	    // console.log("UP210: response = " + this.responseText);
	}
    };
    var myurl;
    if (url.length > 2 && url[0] == '"' && url[url.length-1] == '"') {
	myurl = url.slice(1, url.length-1);
    } else {
	myurl = url;
    }
    // console.log("UP200: myurl = '" + myurl + "'");
    xhttp.open("GET", myurl, true);
    xhttp.send();
    return false;
}

function writeArgument() {
    bQueriedCorrectly = prolog.runQuery("write_argument.");
}

function clearConsole() {
    prolog.runQuery("clearscreen.");
}

function startOver() {
    prolog.runQuery("start_over.");
}

function writeHelp() {
    if (prolog.runQuery("help.")) {
 	console.log("help/0 succeeded.");
    } else {
 	console.log("help/0 did not succeed.");
    }
}

function reactionValid() {
    var bQueriedCorrectly = prolog.runQuery("reaction_valid.");
    /*
    if (!bQueriedCorrectly) {
	alert("bQueriedCorrectly = " + bQueriedCorrectly + "\nError = " + prolog.getErrorMessage());
    }
    */
}

function reactionInvalid() {
    var bQueriedCorrectly = prolog.runQuery("reaction_invalid.");
    /*
    if (!bQueriedCorrectly) {
	alert("bQueriedCorrectly = " + bQueriedCorrectly + "\nError = " + prolog.getErrorMessage());
    }
    */
}

