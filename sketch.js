function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200, 200, 200, 200);
    let qt = new QuadTree(boundary, 4);
    console.log(qt);

    for (let i = 0; i < 5; i++) {
        let p = new Point(random(width), random(height));
        qt.insert(p);
    }

}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80);
}
