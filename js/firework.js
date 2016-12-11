/**
 * Created by johnla on 2016-12-11.
 */
var MIN_PARTICLES = 25;
var MAX_PARTICLES = 125;

function Firework(){
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
    this.particles = [];
    this.seed = new Particle(random(width), height, createVector(0, random(-5,-8)), this.color);
    this.exploded = false;

    this.explode = function () {
      this.exploded = true;
      for(var i = 0; i < random(MIN_PARTICLES, MAX_PARTICLES); i++) {
          this.particles.push(new Particle(this.seed.pos.x, this.seed.pos.y, p5.Vector.random2D().mult(random(-5,5),random(-5,5)), this.color, true));
      }
      this.seed = null;
    };
    this.dead = function () {
      return this.exploded && this.particles.length == 0;
    };
    this.update = function () {
        if(this.exploded){
            for(var i = this.particles.length - 1; i >= 0; i--){
                var particle = this.particles[i];
                if(particle.dead()){
                    this.particles.splice(i, 1);
                }else{
                    particle.applyForce(gravity);
                    particle.update();
                }
            }
        }else{
            if(this.seed.vel.y >= 0){
                this.explode();
            }else{
                this.seed.applyForce(gravity);
                this.seed.update();
            }
        }
    };
    this.draw = function () {
        if(!this.exploded){
            this.seed.draw();
        }else{
            for(var i = 0; i < this.particles.length; i++){
                this.particles[i].draw();
            }
        }
    }
}