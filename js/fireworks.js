/**
 * Created by johnla on 2016-12-11.
 */
var fireworks = [];
var gravity;

function setup(){
    createCanvas(600, 400);
    stroke(255);
    strokeWeight(4);
    background(0);
    gravity = createVector(0, 0.1);
}

function draw() {
    background(0, 25);
    if(random(1) <= 0.1){
        fireworks.push(new Firework());
    }
    for(var i = fireworks.length-1; i >= 0; i--){
        var firework = fireworks[i];
        if(firework.dead()){
            fireworks.splice(i, 1);
        }else{
            firework.update();
            firework.draw();
        }
    }
}