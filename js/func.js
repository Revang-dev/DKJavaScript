var playing = false;
var sound_title = false;
var DKJump;

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
  }
  images[name].src = "image/" + name + ".png";
}

function loadAllImage(){
	  
  loadImage("01C");
  loadImage("01L");
  loadImage("01R");
  loadImage("02C");
  loadImage("02L");
  loadImage("02R");
  loadImage("coins01");
  loadImage("coins02");
  loadImage("DK");
  loadImage("DKA");
  loadImage("DKA2");
  loadImage("DKG01");
  loadImage("DKG02");
  loadImage("JL");
  loadImage("JR");
  loadImage("ladder");
  loadImage("life");
  loadImage("T01");
  loadImage("T02");
  loadImage("T03");
  loadImage("T04");
  loadImage("TF01");
  loadImage("TF02");
  loadImage("bonus");
  loadImage("01D");
  loadImage("DKSPL1");
  loadImage("DKSPR1");
  loadImage("DKSP2");
  loadImage("DKSP3");
  loadImage("TB1");
  loadImage("TB2");
  loadImage("TB3");
  loadImage("TB4");
  loadImage("titleDK");
  loadImage("Dcircle");
  loadImage("DK_die");
}

function startAnimation(){
	ctx.save();
	
	afficheFond();
	timeUpdate++;
	if(timeUpdate >= canvas.height/2 && timeUpdate <= canvas.height/2 + 220){
		if (!sound_title) {
			playSound("title");
			sound_title = true;
		}
		ctx.drawImage(images["titleDK"], 0, canvas.height/2 -canvas.height/3, canvas.width, canvas.height/3);
		if((timeUpdate <= canvas.height/2 + 80 && timeUpdate >= canvas.height/2 + 40) || (timeUpdate <= canvas.height/2 + 160 && timeUpdate >= canvas.height/2 + 120)){
			if (!playing) {
				playSound("sp1");
				playing = true;
			}
			ctx.drawImage(images["DKG01"], canvas.width/2 - (canvas.width/7/2), canvas.height/2, canvas.width/7, canvas.height/7);
		}else if((timeUpdate <= canvas.height/2 + 120 && timeUpdate >= canvas.height/2 + 80)||(timeUpdate <= canvas.height/2 + 200 && timeUpdate >= canvas.height/2 + 120)){
			if (playing) {
				playSound("sp1");
				playing = false;
			}
			ctx.drawImage(images["DKG02"], canvas.width/2 - (canvas.width/7/2), canvas.height/2, canvas.width/7, canvas.height/7);
		}else{
			ctx.drawImage(images["DK"], canvas.width/2 - (canvas.width/7/2), canvas.height/2, canvas.width/7, canvas.height/7);
		}
	}else if(timeUpdate >= canvas.height/2 + 220){
		startM = false;
		ctx.drawImage(images["titleDK"], 0, canvas.height/2 -canvas.height/3, canvas.width, canvas.height/3);
		ctx.drawImage(images["DK"], canvas.width/2 - (canvas.width/7/2), canvas.height/2, canvas.width/7, canvas.height/7);
		timeUpdate = 0;
	}else{
		ctx.drawImage(images["titleDK"], 0, timeUpdate -canvas.height/3, canvas.width, canvas.height/3);
	}
	ctx.restore;
}

function DK_death(){
	ctx.save();
	if (dKong.y > DKJump && !dKong.fall) {
		dKong.y -= 0.4;
		dKong.img = images["DK_die"];
		if (dKong.y <= DKJump) {
			dKong.fall = true;
		}
	}
	else if ((dKong.y - 2 * dKong.h) < canvas.height) {
		dKong.y += 2;
	}
	else {
		dKong.img = images["DK"];
		afficheWin();
	}
	ctx.restore;
}
function mainMenu(){
	ctx.save();
	afficheFond();
	ctx.globalAlpha = 1;
	ctx.drawImage(images["titleDK"], 0, canvas.height/2 -canvas.height/3, canvas.width, canvas.height/3);
	ctx.drawImage(images["DK"], canvas.width/2 - (canvas.width/7/2), canvas.height/2, canvas.width/7, canvas.height/7);
	var sizeOfFont = String(canvas.height/18);
	ctx.font = sizeOfFont +'px serif';
	ctx.fillStyle = "white";
	startb += startm * 0.01;
	if (startb <= 0.5 || startb >= 1) {
		startm = -startm;
	}
	ctx.globalAlpha = startb;
	ctx.fillText('Press Spacebar',canvas.width/3,(canvas.height/9));
	afficheHighScore(canvas.width/2,canvas.width/1.15);
	ctx.restore();
}

function circle(){
	if(canvas.width*3 - timeUpdate*2 >= 1){
		timeUpdate++;
		mid = canvas.width*3 - timeUpdate*2;
		posx = joueur.x+(joueur.l/2)- mid/2;
		posy = joueur.y+(joueur.h/2)- mid/2;
		ctx.save();
		ctx.fillStyle = 'black';
		ctx.fillRect(posx-canvas.width+1, 0, canvas.width, canvas.height);
		ctx.fillRect(posx+mid-1, 0, canvas.width, canvas.height);
		ctx.fillRect(0, posy-canvas.height+1, canvas.width, canvas.height);
		ctx.fillRect(0, posy+ mid-1, canvas.width, canvas.height);
		ctx.drawImage(images["Dcircle"],posx,posy,mid,mid);
		ctx.restore();
	}else{
		game = false;
		timeUpdate = 0;
		startGame();
	}
}

function startGame(){
	if(timeUpdate <= 300){
		ctx.save();
		afficheFond();
		var sizeOfFont = String(canvas.height/18);
		ctx.font = sizeOfFont +'px serif';
		ctx.fillStyle='white';
		ctx.fillText('START!',canvas.width/2.4, canvas.height/2);
		timeUpdate++;
		ctx.restore();
	}else{
		joueur.rest();
		timeUpdate = 0;
		game = true;
		joueur.life = 3;
		if (!musicisload) {
			var lvlmusic = ((level - 1) % 3) + 1;
			playMusic("music" + lvlmusic);
			musicisload = true;
		}
		if(sessionStorage.getItem("highscore") != null){
			joueur.score =  sessionStorage.getItem("highScore");
		}
		
	}
}

function afficheFond(){
	ctx.save();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

function afficheHighScore(x,y){
	var sizeOfFont = String(canvas.height/18);
	ctx.font = sizeOfFont +'px serif';
	ctx.fillStyle='red';
	ctx.fillText("HiSCORE", x - (canvas.width/30 * 3.5),y);
	if(localStorage.getItem("highScore") != null && localStorage.getItem("highScore") != 0){
		cond = 5 - (Math.log10(localStorage.getItem("highScore")));
	}else{
		cond = 6;
	}
	for(i = 0; i < cond;i++){
		ctx.fillText("0",x - (canvas.width/30 * 2.4) +(canvas.width/35 * i),y + canvas.height/19.5);
	}
	if(localStorage.getItem("highScore") != null){
		ctx.fillText(localStorage.getItem("highScore"),x - (canvas.width/30 * 2.4) + (canvas.width/35 * i),y + canvas.height/19.5);
	}
}

function AnimJump() {
  if (!joueur.fall) {
    if (joueur.y <= emp) {
      joueur.vitesseY = 2;
      joueur.fall = true;
    }
  }
  else {
    if (joueur.y >= canvas.scrollHeight	- joueur.h) {
      joueur.y = canvas.scrollHeight;
      joueur.vitesseY = 0;
      joueur.jump = false;
      joueur.fall = false;
    }
  }
}

function AnimClimb(dir){
	if(dir && joueur.vitesseX == 0){
		if (joueur.climb) {
					if (joueur.y + joueur.vitesseY <= ladder) {
						joueur.climb = false;
						joueur.vitesseY = 0;
						joueur.y = ladder - joueur.h;
						joueur.img = images["01R"];
						joueur.moving = false;
					}else{
						joueur.moving = true;
						joueur.y -= 2;
					}
		}
		else if (ladder != -1 && ladder < joueur.y && !joueur.jump && joueur.vitesseX == 0) {
			joueur.jump = false;
			joueur.fall = false;
			joueur.climb = true;
			emp = joueur.y;
			joueur.vitesseY = 0;
			joueur.y -= 2;
			joueur.x = xladder;
		}
	}else{
		if (joueur.climb && joueur.vitesseX == 0) {
			if (joueur.y + joueur.h + joueur.vitesseY >= endladder) {
				joueur.climb = false;
				joueur.vitesseY = 0;
				joueur.y = endladder - joueur.h;
				joueur.img = images["01R"];
				joueur.moving = false;
			}
			else {
				joueur.moving = true;
				joueur.y += 2;
			}
		}
		else if (ladder > joueur.y && joueur.vitesseX == 0) {
			joueur.climb = true;
			joueur.jump = false;
			joueur.fall = false;
			joueur.vitesseY = 0;
			joueur.y += 2;
			joueur.x = xladder;
		}
	}
}

function marioAtDK(){
	if(!joueur.dead && joueur.y + joueur.h <= dKong.y+dKong.h && joueur.x + joueur.l <= dKong.x+dKong.l && joueur.x >= 0 && !winner){
		winner = true;
		DKJump = dKong.y - dKong.h / 4;
		pnt = joueur.score;
		marteau = new Marteau();
		joueur.marteau = false;
		stopMusic();
		playSound("onDK");
	}
}

function playMusic(name) {
	music.src = "sound/"+ name +".mp3";
	if (music.paused = true) {
		music.volume = 0.6;
		music.play();
		music.loop = true;
	}
}

function stopMusic() {
	music.pause();
}

function playSound(name) {
	sound.src = "sound/"+ name +".mp3";
	if (sound.paused = true) {
		sound.play();
		sound.loop = false;
	}
}

function useHammer() {
	if (joueur.marteau) {
		xJ = joueur.x+(joueur.l/2);
		yJ = joueur.y+joueur.h;
		actualLevel.plateform.forEach((plt)=>{
			coef = (plt.y2 - plt.y1) / (plt.x2 - plt.x1);
			tmpy = Math.floor((xJ - plt.x1) * coef + plt.y1 - plt.h / 2);
			if (xJ >= plt.x1 && xJ <= plt.x2) {
				if (yJ >=  tmpy && yJ - joueur.vitesseY <= tmpy) {
					joueur.marteau = false;
					playSound("hammer");
					
					tonneaux.forEach((tno)=>{
						xT = tno.x - tno.h/2;
						if (xT >= plt.x1 && xT <= plt.x2) {
							yT = tno.y + tno.h;
							tmpy2 = plt.y1 + xT * coef;
							if (yT + tno.h >=  tmpy2 && yT - tno.h <=  tmpy2) {
								tonneaux.splice(tonneaux.indexOf(tno),1);
							}
						}
					})
				}
			}
		})
	}
}