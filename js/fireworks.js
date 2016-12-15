/**
 * Created by johnla on 2016-12-11.
 */
var fireworks = [];
var gravity;

//Tree variables
var shrink, maxRecursions, angle;
var tree = new Tree(800, 600);

var pi = 3.1415926535897932384626433832795;
function setup(){
    createCanvas(800, 600);
    colorMode(RGB);
    background(0);

    gravity = createVector(0, 0.1);

    shrink = 1.8;
    maxRecursions = 5;
    angle = 0.2 * pi;
    tree.create();
}

function draw() {
    background(0, 25);
    tree.update();
    tree.draw();

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