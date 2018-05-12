function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
      //resourceLoaded();
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
  loadImage("title");
  loadImage("bonus");
}

function afficheFond(){
	ctx.save();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
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
	if(joueur.y + joueur.h <= dKong.y+dKong.h && joueur.x + joueur.l <= dKong.x+dKong.l && joueur.x >= 0 && !winner){
		winner = true;
		pnt = joueur.score;
		marteau = new Marteau();
		player.marteau = false;
		stopMusic();
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