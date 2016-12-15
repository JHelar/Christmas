/**
 * Created by Johnh on 2016-12-14.
 */
var Tree = function (startW, startH) {
    this.startPos = new XYPos(startW / 2, startH);
    this.startDir = new XYPos(0, -1);
    this.startSize =  startH / 2.6;
    this.root = null;
    this.treeDone = false;
    this.rand = 255;

    this.create = function () {
       this.root = new Branch(this.startPos, this.startDir, this.startSize, 0);
    };

    this.update = function () {
        if(!this.treeDone) {
            this.root.update();
            this.treeDone = this.root.done();
        }
    };

    this.draw = function () {
        if(random(1) <= 0.1)
            this.rand = random(255);
        this.root.draw(this.rand);

    }
};