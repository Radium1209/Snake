function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.init = function() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }

    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                alert("Game Over!");
                this.init();
            }
        }
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        if (x + this.xspeed != 0 && y + this.yspeed != 0 || this.total < 1) {
            this.xspeed = x;
            this.yspeed = y;
        }
    }

    this.update = function(){
        if (this.total == this.tail.length) {
            for (var i = 0; i < this.tail.length-1; i++) {
                this.tail[i]=this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;

        if (this.x < 0 || this.x > width-scl || this.y < 0 || this.y > height-scl) {
            alert("Game Over!");
            this.init();
        }

        //this.x = constrain(this.x, 0, width-scl);
        //this.y = constrain(this.y, 0, height-scl);
    }

    this.show = function(){
        fill(155);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(0);
        rect(this.x, this.y, scl, scl);
    }
}
