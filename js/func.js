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
	if(joueur.y + joueur.h <= canvas.height/4.6 && joueur.x + joueur.l <= canvas.width/5 && joueur.x >= 0 && !winner){
		winner = true;
		pnt = joueur.score;
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