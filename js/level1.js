function loadLevel1(){
	initLevel();
	dKong = new donkeyKong(canvas.width/25);
	loadPlateform();
	loadEchelle();
	loadBonus();
}

function initLevel() {
	plateform.splice(0,plateform.length);
	tonneaux.splice(0,plateform.length);
	echelles.splice(0,plateform.length);
}

function loadPlateform(){
	color = 'red';
	cwt = canvas.width;
	cht = canvas.height;
	add =  cht/7.8;
	platfm0 = new Plateform(0,cwt/4.55,cwt-(cwt/10),cwt/4.55,color);
	
	platfm1 = new Plateform(0, cht-cht/120, cht, cht - add*0.4,color);
	platfm2 = new Plateform(0, cht - (add*1.5), cwt-(cwt/10), cht - add,color);
	platfm3 = new Plateform(cwt/10, cht - (add*2.1), cwt, cht - (add*2.8),color);
	platfm4 = new Plateform(0, cht - (add*4), cwt-(cwt/10),  cht - (add*3.4),color);
	platfm5 = new Plateform(cwt/10,cht - (add*4.6),  cwt,  cht - (add*5.5),color);
	plateform.push(platfm0);
	plateform.push(platfm1);
	plateform.push(platfm2);
	plateform.push(platfm3);
	plateform.push(platfm4);
	plateform.push(platfm5);
}

function loadEchelle(){
	cwt = canvas.width;
	cht = canvas.height;
	add =  cht/7.8;
	ech1 = new Echelle(cwt-cwt/1.5,cht-(cht/5.7),cwt/7);
	ech2 = new Echelle(cwt-cwt/3,cht-(cht/6.5),cwt/8.8);
	ech3 = new Echelle(cwt-cwt/2,cht-(cht/2.09),cwt/6.2);
	ech4 = new Echelle(cwt-cwt/1.5,cht-(cht/1.57),cwt/6.7);
	ech5 = new Echelle(cwt-cwt/3,cht-(cht/1.47),cwt/4.5);
	ech6 = new Echelle(cwt-cwt/2,cht-(cht/1.26),cwt/6.8);
	echelles.push(ech1);
	echelles.push(ech2);
	echelles.push(ech3);
	echelles.push(ech4);
	echelles.push(ech5);
	echelles.push(ech6);
}

function loadBonus(){
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