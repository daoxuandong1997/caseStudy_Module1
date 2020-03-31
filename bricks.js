// class cua tat ca cac vien gach
var Bricks = function (offsetX, offsetY, margin, width, height, row, col) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.margin = margin;
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this.isBroken = false;

// cong thuc tinh do rong brick
// 2 * OFFSET + 5 * WIDTH + 4 * MARGIN = CANVAS.WIDTH
// OFFSET = MARGIN = 25;
// WIDTH = 70
// ROW = 4
// COL = 5
// ve brick
    this.drawBricks = function() {
                context.beginPath();
                context.rect(this.x, this.y, this.width, this.height);
                context.fillStyle = 'orange';
                context.fill();
                context.closePath();
            }
};
