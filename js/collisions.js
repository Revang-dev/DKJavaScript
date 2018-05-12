function testeCollisions() {
  testeCollisionsAvecMurs(joueur);
  testCollisionsEnnemisMurs();
  testCollisionJoueursEnnemis();
  testCollisionJoueursPlatform();
  testCollisionTonneauPlatform();
  testCollisionJoueurEchelle();
  testCollisionsBonusJoueur();
  tonneaux.forEach((tno) =>{
	testCollisionTonneauEchelle(tno);
  })
}

function testCollisionsEnnemisMurs() {
   tonneaux.forEach((el) => {
     testeCollisionsAvecMurs(el);
   })
   
  joueur.draw(ctx);
  
}

function testCollisionsBonusJoueur(){
	for(i = 0; i < bonusList.length;i++){
		if(rectsOverlap(joueur.x,joueur.y,joueur.l,joueur.h,bonusList[i].x,bonusList[i].y,bonusList[i].l,bonusList[i].h)){
			joueur.score += 100;
			playSound("coin");
			bonusList.splice(i,1);
		}
	}
}

function testeCollisionsAvecMurs(r) {
  // MURS DROITE ET GAUCHE
  
  if((r.x + r.l) > canvas.width) {
    // detection avec mur de droite
    r.vitesseX = -r.vitesseX;
    r.x = canvas.width - r.l;
  } else if((r.x) < 0) {
    // detection avec mur de gauche
	 if((r.y) >= canvas.height/9){
				tonneaux.splice(tonneaux.indexOf(r),1);			  
			}
    r.vitesseX = -r.vitesseX;
    r.x = 0;
  }
   if(r.vitesseX == -1 || r.vitesseX == 1){
		if((r.y + r.h) >= canvas.height) {
			r.vitesseY = 0;
		}
	}
  // MURS BAS ET HAUT
  if((r.y + r.h) > canvas.height) {
    // detection avec mur de bas
	if(r.fall){
		r.fall = false;
		r.vitesseY = 0;
	}
    r.vitesseY = -r.vitesseY;
    r.y = canvas.height - r.h;
  } else if((r.y) < 0) {
    // detection avec mur de haut
    r.vitesseY = -r.vitesseY;
    r.y = 0;
  }
}
 
function testCollisionJoueursEnnemis() {
  tonneaux.forEach((el) => {
        if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                 el.x-el.l, el.y-el.h, el.l*2, el.h*2) && !joueur.hit) {
			joueur.life--;
			if (joueur.life > -1) {
				sound.volume = 0.6;
				playSound("hit");
			}
			if(joueur.retry == 1 && joueur.life == 0){
				sound.volume = 0.4;
				playSound("gameover");
				stopMusic();
				gameOver = true;
			}else if(joueur.life == 0){
				sound.volume = 0.9;
				playSound("loselife");
				joueur.retry--;
				joueur.life = 3;
				joueur.rest();
			}else{
				joueur.hit = true;
			}
		}
	  })
  
}
 
function testCollisionTonneauPlatform(){
	tonneaux.forEach((tno)=>{
		xJ = tno.x;
		yJ = tno.y+tno.h;
		plateform.forEach((plt)=>{
			coef = (plt.y2 - plt.y1) / (plt.x2 - plt.x1);
			tmpy = Math.floor((xJ - plt.x1) * coef + plt.y1 - plt.h / 2);
			if (xJ >= plt.x1 && xJ <= plt.x2) {
				if (yJ >=  tmpy && yJ - tno.vitesseY <= tmpy) {
					if(tno.fall || (tno.echelle && tno.echlEnd <= tno.y+tno.vitesseY)){
						tno.direction(plt.y1,plt.y2);
						tno.y = tmpy - tno.h;
						tno.fall = false;
						tno.echelle= false;
						tno.passed = false;
						tno.vitesseY = 0;				
					}
				}else if(tmpy <= yJ && tmpy > tno.y+(tno.h/4) && !tno.echelle){
					tno.y = tmpy - tno.h;
				}
			}else if(tno.y + tno.h <= tmpy && tno.y + tno.h/1.3 > tmpy - tno.h && !tno.echelle){
				tno.direction(plt.y1,plt.y2);
				tno.vitesseY=3;
				tno.fall = true;
			}
			if(tmpy > yJ && tmpy-tno.h <= yJ && xJ >= plt.x1 && xJ <= plt.x2 && !tno.echelle){
				tno.direction(plt.y1,plt.y2);
				tno.vitesseY=1;
			}
		})
	})
}	
 
function testCollisionJoueursPlatform(){
	xJ = joueur.x+(joueur.l/2);
	yJ = joueur.y+joueur.h;
	plateform.forEach((plt)=>{
		coef = (plt.y2 - plt.y1) / (plt.x2 - plt.x1);
		tmpy = Math.floor((xJ - plt.x1) * coef + plt.y1 - plt.h / 2);
		if (xJ >= plt.x1 && xJ <= plt.x2) {
			if (yJ >=  tmpy && yJ - joueur.vitesseY <= tmpy) {
				if(joueur.fall){
					joueur.y = tmpy - joueur.h;
					joueur.jump = false;
					joueur.fall = false;
					joueur.vitesseY = 0;
				}
			}else if(!joueur.climb && !joueur.jump && tmpy <= yJ && tmpy > joueur.y+(joueur.h/4)){
				joueur.y = tmpy - joueur.h;
			}
		}else if(joueur.y + joueur.h <= tmpy && joueur.y + joueur.h/1.5 > tmpy - joueur.h && !joueur.jump){
            joueur.vitesseY=2;
            joueur.jump = true;
            joueur.fall = true;
			joueur.climb = false;
        }
		if(tmpy > yJ && tmpy-joueur.h <= yJ && xJ >= plt.x1 && xJ <= plt.x2 && !joueur.jump && !joueur.climb){
			joueur.vitesseY=2;
			joueur.jump = true;
			joueur.fall = true;
			joueur.climb = false;
		}
	})
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
 
  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
     return false; 
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
     return false;
  return true; 
}

function testCollisionTonneauEchelle(tno){
	echelles.forEach((ech) => {
		if ((ech.x <= tno.x && ech.x + ech.l >= tno.x)
			&& (ech.y <= tno.y+tno.l && ech.y + ech.h/2 >= tno.y + tno.l) && !tno.echelle && !tno.passed
		) {
			rand = Math.floor(Math.random() * Math.floor(2));
			if(!tno.passed && rand > 0){
				tno.vitesseX= 0;
				tno.echelle = true;
				tno.echlEnd = ech.y + ech.h/2;
				tno.x = ech.x + tno.l;
				tno.vitesseY= 1;
			}else{
				tno.passed = true;
			}
		}else if((ech.x > tno.x && ech.x + ech.l < tno.x) && (ech.y <= tno.y+tno.l && ech.y + ech.h/2 >= tno.y + tno.l) && !tno.echelle){
			tno.passed = false;
		}
	})
}

function testCollisionJoueurEchelle() {
	ladder = -1;
	endladder = -1;
	xladder = -1;
	echelles.forEach((ech) => {
		if ((ech.x <= joueur.x+joueur.l/2 && ech.x + ech.l >= joueur.x + joueur.l/2) && 
		((ech.y <= joueur.y && ech.y + ech.h >= joueur.y) || (ech.y <= joueur.y + joueur.h && ech.y + ech.h >= joueur.y + joueur.h))) {
			ladder = ech.y;
			endladder = ladder + ech.h;
			xladder = ech.x + ech.l/10;
		}
	})
}
