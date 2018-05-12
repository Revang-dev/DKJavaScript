function loadLevel2(){
	dKong = new donkeyKong(canvas.width/2-(canvas.width/10/2));
	initLevel2();
	loadPlateform2();
	loadEchelle2();
	loadBonus2();
}

function initLevel2() {
	plateform.splice(0,plateform.length);
	tonneaux.splice(0,plateform.length);
	echelles.splice(0,plateform.length);
}

function loadPlateform2(){
	color = 'blue';
	cwt = canvas.width;
	cht = canvas.height;
	add =  cht/7.8;
	platfm0 = new Plateform(cwt/3,cwt/4.55,cwt-(cwt/3),cwt/4.55,color);
	platfm1 = new Plateform(0, cht-cht/120, cht, cht-cht/120,color);
	platfm2 = new Plateform(cwt-cwt/1.05, cht - (add*1.5), cwt/1.05, cht - (add*1.5),color);
	platfm3 = new Plateform(cwt/7, cht - (add*2.8), cwt-(cwt/7), cht - (add*2.8),color);
	platfm4 = new Plateform(cwt/5, cht - (add*4), cwt-(cwt/5),  cht - (add*4),color);
	platfm5 = new Plateform(cwt/4, cht - (add*5.1),  cwt-(cwt/4),  cht - (add*5.1),color);
	plateform.push(platfm0);
	plateform.push(platfm1);
	plateform.push(platfm2);
	plateform.push(platfm3);
	plateform.push(platfm4);
	plateform.push(platfm5);
}

function loadEchelle2(){
	cwt = canvas.width;
	cht = canvas.height;
	add =  cht/7.8;
	ech1 = new Echelle(cwt-cwt/1.05,cht-(cht/4.9),cwt/5.35);
	ech2 = new Echelle(cwt/1.05-(canvas.width/19),cht-(cht/4.9),cwt/5.35);
	ech3 = new Echelle(cwt-cwt/1.5,cht-(cht/4.9),cwt/5.35);
	ech4 = new Echelle(cwt/1.5-(canvas.width/19),cht-(cht/4.9),cwt/5.35);
//	ech5 = new Echelle(cwt-cwt/3,cht-(cht/1.47),cwt/4.5);
//	ech6 = new Echelle(cwt-cwt/2,cht-(cht/1.26),cwt/6.8);
	echelles.push(ech1);
	echelles.push(ech2);
	echelles.push(ech3);
	echelles.push(ech4);
//	echelles.push(ech5);
//	echelles.push(ech6);
}

function loadBonus2(){
	cwt = canvas.width;
	cht = canvas.height;
	bn1 = new bonus(cwt/1.4,cht/1.4);
	bn2 = new bonus(cwt/15,cht/1.8);
	bn3 = new bonus(cwt/1.8,cht/1.7);
	bn4 = new bonus(cwt/5,cht/2.5);
	bn5 = new bonus(cwt - cwt/10,cht/10);
	bonusList.push(bn1);
	bonusList.push(bn2);
	bonusList.push(bn3);
	bonusList.push(bn4);
	bonusList.push(bn5);
}