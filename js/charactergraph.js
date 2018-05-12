function isJumping(){
	if(joueur.vitesseX > 0 || joueur.img == images["01R"] || joueur.img == images["02R"]){
		joueur.img = images["JR"];
	}else if(joueur.vitesseX < 0 || joueur.img == images["01L"] || joueur.img == images["02L"]){
		joueur.img = images["JL"];
	}
}

function isWalking(){
	if(joueur.vitesseX > 0 &&timeUpdate%10 == 0){
		if(joueur.img == images["01R"]){
			joueur.img = images["02R"];
		}else{	
			joueur.img = images["01R"];
		}
	}else if(timeUpdate%10 == 0){
		if(joueur.img == images["01L"] && timeUpdate%10 == 0){
			joueur.img = images["02L"];
		}else{
			joueur.img = images["01L"];
		}
	}
}

function isLanding(){
	if(joueur.img == images["JR"]){
		joueur.img = images["01R"];
	}else if(joueur.img == images["JL"]){
		joueur.img = images["01L"];
	}
	//timeUpdate = 0;
}

function isInvulnerable(){
	if(invulnerability%10 == 0 && joueur.opacity == 1 ){
		joueur.opacity = 0.1;
	}else if(invulnerability%10 == 0){
		joueur.opacity = 1;
	}
}

function isClimbing(){
	if(timeUpdate%10 == 0 && joueur.img == images["02C"]){
		joueur.img = images["01C"];
	}else if(timeUpdate%10 == 0){
		joueur.img = images["02C"];
	}
}

function isDying(){
	if(joueur.endD == 0){
		circle();
	}else if(timeUpdate%3 == 0 && joueur.y > joueur.endD){
		joueur.y -= 2;
	}else if(joueur.y <= joueur.endD){
		joueur.y += 3;
		joueur.endD = 0;
				timeUpdate = 0;
	}
}