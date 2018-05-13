// Une classe pour le rectangle
// typiquement dans rectangle.js
class bonus {
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
      this.l =  canvas.width/18;
      this.h = canvas.width/18;
	  this.img = images["coins01"];
    }
    
    draw(ctx) {
		ctx.save();
		if(time%20 == 0){
			if(this.img == images["coins01"]){
				this.img = images["coins02"];
			}else{
				this.img = images["coins01"];
			}
		}
	ctx.drawImage(this.img,this.x, this.y,this.l,this.h);
	ctx.restore();
  }
}
  
class player{
	 constructor(x, y, l, h) {
      this.x = x || 0;
      this.y = y || 0;
      this.l = l || canvas.width/22;
      this.h = h || canvas.height/15;
      this.vitesseX = 0; 
      this.vitesseY = 0; 
      this.vitesseMax = 2;
	  this.img = images["01R"];
	  this.hit = false;
	  this.score = 0;
	  this.life = 1;
	  this.retry = 5;
	  this.opacity = 1;
	  this.moving = false;
	  this.fall = false;
	  this.jump = false;
	  this.climb = false;
	  this.attack = false;
	  this.marteau = false;
	  this.onPlatform = true;
	  this.dead = false;
	  this.endD = 0;
    }
    rest(){
		this.images = ["01R"];
		this.hit = false;
		this.opacity = 1;
		this.moving = false;
		this.jump = false;
		this.climb = false;
		this.fall = false;
		this.dead =false;
		this.x = actualLevel.startx;
		this.y= actualLevel.starty;
		tonneaux = [];
	}
	
	stop(){
		if(this.moving && (this.vitesseX == 0 && this.vitesseY == 0) || this.climb){
					joueur.moving = false;
				}
	}
	
	attack(){
		this.attack =true;
	}
	
    draw(ctx) {
		ctx.save();
		if(500 == invulnerability){
			joueur.hit = false;
			invulnerability = 0;
			joueur.opacity = 1;
		} else if(joueur.hit){
			invulnerability += 1;
			isInvulnerable();
		}
		ctx.globalAlpha = this.opacity;
		ctx.drawImage(this.img,this.x, this.y,this.l,this.h);
		ctx.restore();
    }
    
    move() {
	if(this.dead){
		isDying();
	}else{
      this.x += this.vitesseX;
      this.y += this.vitesseY;
	  if(this.jump){
		isJumping();
	  }else if(this.vitesseX != 0 && this.move){
		isWalking();
	  }else if(this.climb && this.move){
		isClimbing();
	  }else if (this.attack){
		isattacking();
	  }else{
		isLanding();
	  }
	}
	}
 }

class Plateform{
  constructor(x1,y1, x2, y2,c,elvB,elvS,elvE){
    this.x1 = x1 || 0;
    this.y1 = y1 || 0;
    this.x2 = x2 || 1;
    this.y2 = y2 || 1;
    this.h= canvas.height/60;
	this.color = c;
	this.elevator = elvB || false;
	this.elvtStart = elvS || 0;
	this.elvtEnd = elvE || 0;
	this.vitesseY = -1;
  }
  
  draw(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = 'grey';
    ctx.lineWidth= this.h;
    ctx.stroke();
    ctx.lineTo(this.x1, this.y1);
    ctx.strokeStyle = this.color;
    ctx.lineWidth= this.h - 2;
    ctx.stroke();
    ctx.restore();
  }
  move(){
	if(this.elevator){
		if(this.y1 <= this.elvtEnd){
			this.y1 = this.elvtStart;
			this.y2 = this.elvtStart;
			player.fall = true;
		}
		this.y1 += this.vitesseY;
		this.y2 += this.vitesseY;
	}
  }
  
}

class Tonneau {
  constructor(cx, cy,r,v) {
    this.x = cx || 0;
    this.y = cy || 0;
	this.h = r || canvas.height/50;
	this.l = r || canvas.height/50;
    this.vitesseX = v || 1; 
    this.vitesseY = 0;
    this.fall = false;
	this.echelle = false;
	this.onPlateforme = false;
	this.passed= false;
	this.echlEnd = 0;
	this.img = images["T01"];
	this.onPlateforme = true;
  }
  
  draw(ctx) {
	ctx.save();
	if(!this.echelle){
		if(this.img == images["T01"] && time%20 == 0){
			this.img = images["T02"];
		}else if(this.img == images["T02"] && time%20 == 0){
			this.img = images["T03"];
		}else if(this.img == images["T03"] && time%20 == 0){
			this.img = images["T04"];
		}else if(time%20 == 0){
			this.img = images["T01"];
		}
		ctx.drawImage(this.img,this.x-this.l,this.y-this.h,this.h*2.1,this.l*2.1);
	}else{
		if(this.img == images["TF01"] && time%20 == 0){
			this.img = images["TF02"];
		}else if(time%20 == 0){
			this.img = images["TF01"];
		}
		ctx.drawImage(this.img,this.x-this.l,this.y-this.h,this.h*3-3,this.l*2-3);
	}
    ctx.restore();
  }
  
  direction(y1,y2){
	  if(y1 < y2){
		this.vitesseX = 1;
	}else if (y1 > y2){
		this.vitesseX = -1;		
	}else{
		if(this.x == canvas.width/2){
			if(Math.floor(Math.random() * Math.floor(2)) < 0){
				this.vitesseX = -1;
			}else{
				this.vitesseX = 1;
			}
		}else if (this.x < canvas.width/2){
			this.vitesseX = 1;
		}else{
			this.vitesseX = -1;
		}
	}
  }
  
  move() {
		this.x += this.vitesseX;
		this.y += this.vitesseY;
	}
}

class Echelle {
	constructor(x, y,h) {
      this.x = x || 0;
      this.y = y || 0;
      this.l = canvas.width/19;
      this.h = h || 20;
	}
	
	draw(ctx) {
		ctx.save();
		if(this.h > 80){
				ctx.drawImage(images["ladder"],this.x, this.y,this.l,this.h);
		}else{
		ctx.drawImage(images["ladder"],0,0,10,
		this.h,this.x, this.y,this.l,this.h);
	}
		ctx.restore();
    }
}

class Marteau {
	constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
      this.l = canvas.width/20;
      this.h = canvas.height/17;
	  this.img = images["bonus"];
	  this.exist = false;
	  this.get = false;
	}
	draw(ctx) {
		if (this.exist && !this.get) {
			if (this.x == 0 && this.y == 0) {
				var tmp = Math.floor(Math.random() * actualLevel.plateform.length);
				var myPlateform = actualLevel.plateform[tmp];
				this.x = myPlateform.x1 + Math.floor(Math.random() * (myPlateform.x2 - myPlateform.x1)) - this.l;
				this.y = myPlateform.y1 + Math.floor((myPlateform.y2 - myPlateform.y1) / (myPlateform.x2 - myPlateform.x1) * this.x) - this.h;
			}
			ctx.save();
			ctx.drawImage(this.img,this.x, this.y,this.l,this.h);
			ctx.restore();
		}
    }
}