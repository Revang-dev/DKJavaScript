
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
			if(this.wait == 80){
				tonneaux.push(new Tonneau(this.x + (this.l/2),this.y + (this.h/1.5)));
				this.img = images["DK"];
				this.wait = 0;
				this.atk = false;
			}else if(this.wait <= 40){
				this.img = images["DKA2"];
				this.wait ++;
			}else{
				this.img = images["DKA"];
				this.wait ++;
			}
			
		} else if (this.megAttack) {
			if (this.wait == 0 || this.wait == 120) {
				this.img = images["DKSPL1"];
				playSound("sp1");
				this.wait ++;
			}
			else if (this.wait == 60 || this.wait == 180) {
				this.img = images["DKSPR1"];
				playSound("sp1");
				this.wait ++;
			}
			else if (this.wait == 240) {
				this.img = images["DKSP2"];
				this.wait ++;
			}
			else if (this.wait == 300) {
				this.img = images["DKSP3"];
				tonneauxBleu.push(new TonneauBleu(2,0));
				tonneauxBleu.push(new TonneauBleu(1.6,0.4));
				tonneauxBleu.push(new TonneauBleu(1.2,0.8));
				tonneauxBleu.push(new TonneauBleu(0.8,1.2));
				tonneauxBleu.push(new TonneauBleu(0.4,1.6));
				tonneauxBleu.push(new TonneauBleu(0,2));
				this.wait ++;
			}
			else if (this.wait == 360) {
				this.img = images["DK"];
				this.megAttack = false;
				this.wait = 0;
			}
			else {
				this.wait ++;
			}
		
		}else if(Math.floor(Math.random() * Math.floor(4)) == 0 && !this.megAttack && time == 0){
			this.atk = true;
		}else if(Math.floor(Math.random() * Math.floor(5)) == 0 && !this.atk && time == 0){
			this.megAttack = true;
		}
	}
	
}