class QuadTree {
    constructor(boundares, capacity) {
        this.boundares = boundares
        this.points = [];
        // each section of the quadtree had this capacity
        this.capacity = capacity;
        this.divided = false;
    }

    insert(point) {
        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
            }
        }
    }

    subdivide() {
        let x = this.boundares.x;
        let y = this.boundares.y;
        let w = this.boundares.width;
        let h = this.boundares.height;

        let nw = new Rectangle(x + w / 2, this.y - h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity)
        let ne = new Rectangle(x - w / 2, this.y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity)
        let sw = new Rectangle(x + w / 2, this.y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity)
        let se = new Rectangle(x - w / 2, this.y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity)
    }

}

