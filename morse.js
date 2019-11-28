// JavaScript Document


document.getElementById("button").onclick = function mirror(){
	
	var morsebox = document.getElementById("morsebox");
	var typebox = document.getElementById("typebox");
	
	var inputvalue = typebox.value;
	
	var mapObj = {
		A:" • -- ",
		a:" • -- ",
		B:" -- • • • ",
		b:" -- • • • ",
		C:" -- • -- • ",
		c:" -- • -- • ",
		D:" -- • • ",
		d:" -- • • ",
		E:" • ",
		e:" • ",
		F: " • • -- • ",
		f: " • • -- • ",
		G:" -- -- . ",
		g:" -- -- . ",
		H:" • • • • ",
		h:" • • • • ",
		I:" • • ",
		i:" • • ",
		J:" • -- -- -- ",
		j:" • -- -- -- ",
		K:" -- • -- ",
		k:" -- • -- ",
		L:" • -- • • ",
		l:" • -- • • ",
		M:" -- -- ",
		m:" -- -- ",
		N:" -- • ",
		n:" -- • ",
		O:" -- -- -- ",
		o:" -- -- -- ",
		P:" • -- -- • ",
		p:" • -- -- • ",
		Q:" -- -- • -- ",
		q:" -- -- • -- ",
		R:" • -- • ",
		r:" • -- • ",
		S:" • • • ",
		s:" • • • ",
		T:" -- ",
		t:" -- ",
		U:" • • -- ",
		u:" • • -- ",
		V:" • • • -- ",
		v:" • • • -- ",
		W:" • -- -- ",
		w:" • -- -- ",
		x:" -- • • -- ",
		X:" -- • • -- ",
		Y:" -- • -- -- ",
		y:" -- • -- -- ",
		Z:" -- - • • ",
		z:" -- - • • ",
		1:" • -- -- -- -- ",
		2:"• • -- -- --",
		3:" • • • -- --",
		4:" • • • • -- ",
		5:" • • • • • ",
		6:" -- • • • • ",
		7:" -- -- • • • ",
		8:" -- -- -- • • ",
		9:" -- -- -- -- • ",
		0:" -- -- -- -- --"
		
};
var newvalue = inputvalue.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|1|2|3|4|5|6|7|8|9|0/gi, function(matched){
  return mapObj[matched];
});
	
	morsebox.value = newvalue;
	
	
	
	
}


