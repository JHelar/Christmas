/**
 * Created by johnla on 2016-12-11.
 */
function Particle(x, y, vel, color, deadly){
    this.pos = createVector(x, y);
    this.vel = vel;
    this.acc = createVector(0, 0);
    this.color = color;
    this.lifespan = 255;
    if(deadly)
        this.lifefrequency = random(2, 20);
    else
        this.lifefrequency = 0;

    this.applyForce = function(force){
        this.acc.add(force);
    };

    this.dead = function () {
      return this.lifespan <= 0;
    };

    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan -= this.lifefrequency;
    };

    this.draw = function () {
        strokeWeight(this.lifefrequency == 0 ? 6 : 3);
        stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
        point(this.pos.x, this.pos.y);
    }
}