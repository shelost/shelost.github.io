// JavaScript Document

const Flist = {"Philip K. Dick\'s story \"We Can Remember it For You Wholesale\" ends with Quail learning that he prevented one of these events through \'kindness and mercy\' alone. This kind of event is facilitated with a technology called \'sophons\' in a novel in which \"Wallbreakers\" help carry it out. Cixin Liu\'s (\"tsuh-sheen lyoo'z\") book The Dark Forest begins 400 years before this kind of event is planned to occur. In another novel, the narrator knocks out an annoying curate in the (*) aftermath of this kind of event. In that novel, a deadly weapon called \"Black Smoke\" and machines called tripods are used by a group carrying out this kind of event, but bacteria harmless to humans thwart that plan. For 10 points, give this kind of struggle shown in H.G. Wells's The War of the Worlds.": "Orwell", "two" : "rer", "r3tet3r": "erwer"};

const Qlist = Object.keys(Flist);


document.getElementById("nextButton").onclick = function Question(){
	
	var num = Math.floor(Math.random() * 2);
	var activeq = Qlist[num];
	var
	
	document.getElementById("question-text").innerHTML = activeq;
}


function checkA(num){
	
	var answer = document.forms.["testform"]["answer"].value;
	
	if answer == 
	
}
