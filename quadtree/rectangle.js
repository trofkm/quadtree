// x and y are the coordinates of the center of the rectangle
// width and height are the distance between the center and the edge of the rectangle
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    in(point) {
        let flagX = point.x >= this.x - this.width && point.x <= this.x + this.width;
        let flagY = point.y >= this.y - this.height && point.y <= this.y + this.height;
        return flagX && flagY;
    }
    intersects(rect) {
        let checkLeftRight = rect.x - rect.width > this.x + this.width ||
            rect.x + rect.width < this.x - this.width;
        let checkUpDown = rect.y - rect.height > this.y + this.height ||
            rect.y + rect.height < this.y - this.height;
        return !checkLeftRight && !checkUpDown;
    }
}