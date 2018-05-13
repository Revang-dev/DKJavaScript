function traiteKeydown(evt) {
	let code = evt.code;
	if (game) {
		if (evt.keyCode == 32) {
			useHammer();
		}
		switch(code) {
			case 'ArrowRight':
				if (joueur.climb) {
					if (joueur.y +joueur.h <= ladder) {
						joueur.climb = false;
					}
				}
				if (!joueur.climb) {
					joueur.moving = true;
					joueur.vitesseX = joueur.vitesseMax;
				}
				break;
			case 'ArrowLeft':
				if (joueur.climb) {
					if (joueur.y +joueur.h <= ladder) {
						joueur.climb = false;
					}
				}
				if (!joueur.climb) {
					joueur.moving = true;
					joueur.vitesseX = -joueur.vitesseMax;
				}
				break;
			case 'ArrowUp':
			// on va vers le haut
				AnimClimb(true);
				if (!joueur.jump  && !joueur.climb) {
					joueur.jump = true;
					joueur.climb = false;
					emp = joueur.y - (joueur.h*1.5);
					joueur.vitesseY = -2;
				}
	 
				break;
			case 'ArrowDown':
			// on va vers le bas
				AnimClimb(false);
				break;
			}
		}
		else {
			if (evt.keyCode == 32 && menu) {
				menu = false;
				timeUpdate = 0;
				playSound("start");
				requestAnimationFrame(animation);
			}
		}
}
 
function traiteKeyup(evt) {
	let code = evt.code;
		switch(code) {
			case 'ArrowRight':
				joueur.stop();
			case 'ArrowLeft':
				if(joueur.vitesseX > 0){
					joueur.img = images["01R"];
				}else{
					joueur.img = images["01L"];
				}
				joueur.vitesseX = 0;
				joueur.stop();
				break;
			case 'ArrowUp':
				joueur.stop();
				if(joueur.climb){
					if (joueur.y + joueur.h <= ladder) {
						joueur.climb = false;
					}
					joueur.vitesseY = 0;
				}
			case 'ArrowDown':
				joueur.stop();
				if(joueur.climb){
					if (joueur.y + joueur.h >= endladder) {
						joueur.climb = false;
					}
					joueur.vitesseY = 0;
				}
			}
}
  