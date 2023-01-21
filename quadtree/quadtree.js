class QuadTree {
    constructor(boundares, capacity) {
        this.boundares = boundares
        this.points = [];
        // each section of the quadtree had this capacity
        this.capacity = capacity;
        this.divided = false;
    }

    insert(point) {
        if (!this.boundares.in(point))
            return false;

        if (!this.divided && this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) {
            // todo: split values in this array 
            this.subdivide();
        }
        if (this.divided) {
            if (this.northwest.insert(point))
                return true;
            if (this.northeast.insert(point))
                return true;
            if (this.southwest.insert(point))
                return true;

            if (this.southeast.insert(point))
                return true;
        }
        return false;
    }


    subdivide() {
        let x = this.boundares.x;
        let y = this.boundares.y;
        let w = this.boundares.width;
        let h = this.boundares.height;

        // todo: here is an issue with low capacity, caused by maximum call stack size exceeded
        // Can be solved by capacity > then 4 or by increasing the capacity of the nested qtrees by one
        let nw = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity)
        let ne = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity)
        let sw = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity)
        let se = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity)
        for (let point of this.points) {
            if (this.northwest.insert(point))
                continue;
            if (this.northeast.insert(point))
                continue;
            if (this.southwest.insert(point))
                continue;
            if (this.southeast.insert(point))
                continue;
        }
        this.points = [];
        this.divided = true;
    }

    show(drawPoints) {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER)
        rect(this.boundares.x, this.boundares.y, this.boundares.width * 2, this.boundares.height * 2);
        if (this.divided) {
            this.northwest.show(drawPoints);
            this.northeast.show(drawPoints);
            this.southwest.show(drawPoints);
            this.southeast.show(drawPoints);
        }
        if (drawPoints) {
            for (let p of this.points) {
                strokeWeight(4)
                point(p.x, p.y);
            }
        }
    }

}

