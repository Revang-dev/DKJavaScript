window.onload = init;

let canvas, ctx;
let game = false;
let ladder = -1;
let endladder = -1;
let xladder = -1;
let emp;
let pnt;
//for Animation
var images ={};
var timeUpdate = 0;
var invulnerability = 0;
var time = 0;
//for Sound
let music = new Audio("");
let sound = new Audio("");
let musicisload = false;
////////////////////////
var level = 1;
let tonneaux = [];
let levelList = [];
let actualLevel;
let dKong;
var startb = 0.74;
var startm = 1;
var gameOver = false;
var winner  = false;
var menu = true;


// main.js
function init() {
	console.log("page chargee");
	canvas = document.querySelector("#myCanvas");
	ctx = canvas.getContext("2d");
	loadAllImage();
	marteau = new Marteau();
	levelList.push(new levelT1());
	levelList.push(new levelT2());
	levelList.push(new levelT3());
	actualLevel = levelList[0];
	actualLevel.initLevel();
	joueur = new player(actualLevel.startx, actualLevel.starty);
	// Ecouteurs de clavier
	window.onkeydown = traiteKeydown;
	window.onkeyup = traiteKeyup;

	// on demarre l'animation
	requestAnimationFrame(animation);
}



// Boucle d'animation
function animation() {
	if (game) {
		time++;
		if(time == 100){
			time = 0;
		}
		if (!musicisload) {
			var lvlmusic = ((level - 1) % 3) + 1;
			playMusic("music" + lvlmusic);
			musicisload = true;
		}
	// 1 on efface
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  
	// 2 on dessine et on deplace
	dessineEtDeplaceLesObjets();
  
	// 3 on teste les collisions
	testeCollisions();
  
	// 4 on rappelle la boucle d'animation 60 fois / s

	}
	else if(menu){
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.drawImage(images["title"], 0, 0, canvas.width, canvas.height);
		var sizeOfFont = String(canvas.height/18);
		ctx.font = sizeOfFont +'px serif';
		ctx.fillStyle = "white";
		startb += startm * 0.01;
		if (startb <= 0.5 || startb >= 1) {
			startm = -startm;
		}
		ctx.globalAlpha = startb;
		ctx.fillText('Press Spacebar',canvas.width/3,(canvas.height/9));
		ctx.restore();
	}else{
		startGame();
	}
	requestAnimationFrame(animation);
}


function dessineEtDeplaceLesObjets() {
	afficheFond();
	if(!joueur.dead){
		joueur.draw(ctx);
	}else{
		joueur.move();
		joueur.draw(ctx);
	}
	afficheBarre();
	marioAtDK();
	actualLevel.plateform.forEach((plt) => {
		plt.draw(ctx);
		plt.move();
	})
	actualLevel.echelles.forEach((ech) => {
		ech.draw(ctx);
    })
	dKong.draw(ctx);
	if(gameOver){
		afficheGameOver();
	}else if(winner){
		afficheWin();
		afficheScore();
		afficheLife();
		afficheLevel();
	}else if(joueur.dead){
		timeUpdate++;
		actualLevel.bonusList.forEach((bn) =>{
			bn.draw(ctx);
		})
		
		tonneaux.forEach((tonn) => {
			tonn.draw(ctx);

		})
		afficheScore();
		afficheLife();
		afficheLevel();
		afficheMarteau();
		if(player.endD == 0){
			ctx.globalCompositeOperation='destination-over';
			ctx.fillStyle='black';
			ctx.fillRect(0,0,cw,ch);
		}
	}else{
		dKong.donkeyAttack();
		afficheScore();
		afficheLife();
		afficheLevel();
		afficheMarteau();
		if(joueur.moving){
			timeUpdate++;
		}
		if (joueur.jump) {
			AnimJump();
		}
		actualLevel.bonusList.forEach((bn) =>{
			bn.draw(ctx);
		})
		
		tonneaux.forEach((tonn) => {
			tonn.draw(ctx);
			tonn.move();

		})
		marteau.draw(ctx);
		joueur.move();
	}  

}



