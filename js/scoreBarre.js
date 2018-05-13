function afficheBarre(){
		ctx.save();
		var lineaire = ctx.createLinearGradient(0,0,canvas.width,0);
		lineaire.addColorStop(0,"green");
		lineaire.addColorStop(0.5,"blue");
		lineaire.addColorStop(1,"red");
		ctx.strokeStyle = lineaire;
		ctx.strokeRect(0, 0, canvas.width, canvas.height/10);	
		ctx.restore();
}

function afficheScore(){
	var sizeOfFont = String(canvas.height/18);
	ctx.font = sizeOfFont +'px serif';
	ctx.fillStyle='white';
	ctx.fillText('SCORE',0, canvas.height/25);
	ctx.fillStyle='white';
	if(joueur.score != 0){
		cond = 5 - (Math.log10(joueur.score));
	}else{
		cond = 5;
	}
	for(i = 0; i < cond;i++){
		ctx.fillText("0",0+(canvas.width/35 * i),canvas.height/11);
	}
	ctx.fillText(joueur.score,(canvas.width/35 * i),canvas.height/11);
	afficheHighScore(canvas.width/3.26,canvas.height/25);
}


function afficheLife(){
	ctx.save();
	for(i = 0;i<joueur.life;i++){
		ctx.drawImage(images["life"],(canvas.width/1.6) + (canvas.width/15*i)
		,canvas.height/50,canvas.width/20,canvas.height/18);
	}
	ctx.drawImage(images["01R"],canvas.width-(canvas.width/15)
		,canvas.height/50,canvas.width/20,canvas.height/18);
	var sizeOfFont = String(canvas.height/18);
	ctx.font = sizeOfFont +'px serif';
	ctx.fillStyle='white';
    ctx.fillText('x',canvas.width - (canvas.height/7.4), canvas.height/15);
	ctx.fillText(joueur.retry,canvas.width - (canvas.height/10),canvas.height/15);
	ctx.restore();
}

function afficheLevel(){
	var sizeOfFont = String(canvas.height/18);
	ctx.font = sizeOfFont +'px serif';
	ctx.fillStyle='white';
    ctx.fillText('LVL',canvas.width/2.3, canvas.height/25);
	ctx.fillText(level,(canvas.width/2.13),canvas.height/11);
}

function afficheMarteau() {
	var img = images["bonus"];
	if (joueur.marteau) {
		ctx.drawImage(img, 23 * (canvas.width / 100), canvas.height/50, (canvas.width/20), (canvas.height/17));
	}
}

function afficheWin(){
	if(joueur.score < pnt +500){
	joueur.score += 2;
	}else if (joueur.score == pnt +500){
		time = 0;
		winner = false
		musicisload = false;
		level++;
		actualLevel = levelList[(level-1)%3];
		actualLevel.initLevel();
		joueur.rest();
		if(localStorage.getItem("highScore") < joueur.score){
			localStorage.setItem("highScore",joueur.score);
		}
		tonneaux = [];
	}
}

function afficheGameOver(){
	var sizeOfFont = String(canvas.height/18);
	ctx.font = sizeOfFont +'px serif';
	ctx.fillStyle = "red";
	ctx.fillText('YOU DIED',37 * canvas.width/100,(canvas.height/15));
}