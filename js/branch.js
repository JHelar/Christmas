/**
 * Created by Johnh on 2016-12-14.
 */
var b1 = new XYPos(0, 0.9);
var b2 = new XYPos(0, -0.5 * 3.1415926535897932384626433832795 / 3);
var b3 = new XYPos(0, -1.2 * 3.1415926535897932384626433832795 / 3);
var b4 = new XYPos(0, 2 * 3.1415926535897932384626433832795 / 3);

var maxSize = 600 / 2.6;

var Branch = function(position, direction, size, n){
  this.position = position;
  this.reachSize = size;
  this.currentSize = 1;
  this.sizeStep = 1.5;
  this.direction = direction;
  this.branches = [];
  this.completed = false;

  if(n < maxRecursions){
    var posX2, posY2, dirX2, dirY2, size2, n2;
    posX2 = position.x + (size * direction.x);
    posY2 = position.y + (size * direction.y);
    size2 = size / shrink;
    n2 = n + 1;

    //Branch 1
    dirX2 = cos(b1.x * angle + b1.y) * direction.x + sin(b1.x * angle + b1.y) * direction.y;
    dirY2 = -sin(b1.x * angle + b1.y) * direction.x + cos(b1.x * angle + b1.y) * direction.y;
    this.branches.push(new Branch(new XYPos(posX2, posY2), new XYPos(dirX2, dirY2), size2, n2));

    //Branch 2
    dirX2 = cos(b2.x * angle + b2.y) * direction.x + sin(b2.x * angle + b2.y) * direction.y;
    dirY2 = -sin(b2.x * angle + b2.y) * direction.x + cos(b2.x * angle + b2.y) * direction.y;
    this.branches.push(new Branch(new XYPos(posX2, posY2), new XYPos(dirX2, dirY2), size2, n2));

    //Branch 3
    dirX2 = cos(b3.x * angle + b3.y) * direction.x + sin(b3.x * angle + b3.y) * direction.y;
    dirY2 = -sin(b3.x * angle + b3.y) * direction.x + cos(b3.x * angle + b3.y) * direction.y;
    this.branches.push(new Branch(new XYPos(posX2, posY2), new XYPos(dirX2, dirY2), size2, n2));

    //Branch 4
    dirX2 = cos(b4.x * angle + b4.y) * direction.x + sin(b4.x * angle + b4.y) * direction.y;
    dirY2 = -sin(b4.x * angle + b4.y) * direction.x + cos(b4.x * angle + b4.y) * direction.y;
    this.branches.push(new Branch(new XYPos(posX2, posY2), new XYPos(dirX2, dirY2), size2, n2));
  }

  this.done = function () {
      for(var i = 0; i < this.branches.length; i++)
      {
          if(!this.branches[i].done()){
              return false;
          }
      }
      return this.completed;
  };
  this.update = function(){
      if(this.currentSize < this.reachSize) {
          this.currentSize += this.sizeStep;
      }else{
          this.completed = true;
          for(var i = 0; i < this.branches.length; i++){
              this.branches[i].update();
          }
      }
  };

  this.draw = function(rand){

      var endPosX = this.position.x + (this.direction.x * this.currentSize);
      var endPosY = this.position.y + (this.direction.y * this.currentSize);
      strokeWeight(10 * (this.reachSize / maxSize));
      stroke(125 * (this.reachSize / maxSize), 51,0);
      line(this.position.x, this.position.y, endPosX, endPosY);
      if(this.completed) {
          if(this.branches.length <= 0){
              fill(rand, 125, 255);
              stroke(rand, 255, 125);
              ellipse(endPosX, endPosY, 10);
          }else{
              for(var i = 0; i < this.branches.length; i++){
                  this.branches[i].draw(rand);
              }
          }
      }
  };
};