var s;
var scl = 15;
var food;

function setup() {
    // set canvas position
    cnv = createCanvas(scl*30,scl*30);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 3 * 2;
    cnv.position(x, y);
    s = new Snake();
    frameRate(7);
    pickLocation();
}

function judgeLocation(food) {
    if (food.x == s.x && food.y == s.y)
        return false;
    for (var i = 0; i < s.tail.length; i++) {
        var pos = s.tail[i];
        if (food.x == pos.x && food.y == pos.y) {
            return false;
        }
    }
    return true;
}

function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)),floor(random(rows)));
    food.mult(scl);
    frameRate(7+floor(0.2*s.total))
}

function draw() {
    background('#BDC0BA');
    s.death();
    s.update();
    s.show();

    if (s.eat(food)) {
        // the food can't coincide with snake
        while (!judgeLocation(food)) {
            pickLocation();
        }
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    if (keyCode == UP_ARROW && !(s.xspeed==0&&s.yspeed==0)) {
        s.dir(0, -1);
    } else if (keyCode == DOWN_ARROW && !(s.xspeed==0&&s.yspeed==0)) {
        s.dir(0, 1);
    } else if (keyCode == RIGHT_ARROW && !(s.xspeed==0&&s.yspeed==0)) {
        s.dir(1, 0);
    }else if (keyCode == LEFT_ARROW && !(s.xspeed==0&&s.yspeed==0)) {
        s.dir(-1, 0);
    }
    else {
        if (s.xspeed == 0 && s.yspeed == 0) {
            frameRate(7);
        }
        s.dir(1, 0);
    }
}
