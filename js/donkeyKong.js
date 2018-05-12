
class donkeyKong{
	constructor(x){
		this.x = x;
		this.y = canvas.height/9;
		this.h = canvas.height/10;
		this.l = canvas.width/10;
		this.img = images["DK"];
		this.wait = 0;
		this.atk = false;
	}
	
	draw(ctx){
		ctx.save();
		ctx.drawImage(this.img,this.x,this.y,this.l,this.h); 
		ctx.restore();
	}	

	donkeyAttack(){
		if(this.atk){
			if(this.wait == 60){
				tonneaux.push(new Tonneau(this.x + (this.l/2),this.y + (this.h/1.5)));//attention bug avec echelle si/12
				this.img = images["DK"];
				this.wait = 0;
				this.atk = false;
			}else{
				this.img = images["DKA"];
				this.wait ++;
			}
		}else if(Math.floor(Math.random() * Math.floor(4)) == 0 && !this.megAttack && time == 0){
			this.atk = true;
		}/*else if(Math.floor(Math.random() * Math.floor(5)) == 0 && !this.atk && time == 0){
			this.megAttack = true;
		}*/
	}
	
	donkeyFinalAttack(){
		if(this.megAttack){
		}
	
	}
}