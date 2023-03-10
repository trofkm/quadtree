class QuadTree {
    constructor(boundaries, capacity) {
        this.boundaries = boundaries
        this.points = [];
        // each section of the quadtree had this capacity
        this.capacity = capacity;
        this.divided = false;
        // Used to check if the distance between the two nearest points is greater than
        // this value
        this.minDistance = 2;
    }



    insert(point) {
        if (!this.boundaries.in(point))
            return false;

        if (!this.divided && this.points.length < this.capacity) {
            if (this.isNotNear(point))
                this.points.push(point);
            return true;
        }

        if (!this.divided) {
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

    // this function returns false if the distance between input point and
    // the nearest point is less than the parameter
    isNotNear(point) {
        let distance = (p1, p2) => {
            return sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };
        for (let p of this.points) {
            if (distance(p, point) < this.minDistance) return false;
        }
        return true;
    }

    subdivide() {
        let x = this.boundaries.x;
        let y = this.boundaries.y;
        let w = this.boundaries.width;
        let h = this.boundaries.height;

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
        rect(this.boundaries.x, this.boundaries.y, this.boundaries.width * 2, this.boundaries.height * 2);
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

    query(range) {
        let found = [];
        // return empty array
        if (!this.boundaries.intersects(range))
            return found;

        if (!this.divided) {
            for (let p of this.points) {
                if (range.in(p))
                    found.push(p);
            }
            return found;
        }

        if (this.divided) {
            found = found.concat(this.northwest.query(range));
            found = found.concat(this.northeast.query(range));
            found = found.concat(this.southwest.query(range));
            found = found.concat(this.southeast.query(range));
            return found;
        }
    }

}



