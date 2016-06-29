var Point = (function () {
    function Point(px, py) {
        this.x = px;
        this.y = py;
    }
    Point.prototype.getSVG = function () {
        return this.x + ' ' + this.y;
    };
    return Point;
}());
;
var Figure = (function () {
    function Figure(canvas) {
        this.canvas = canvas;
    }
    Figure.prototype.split = function (p1, p2, level) {
    };
    Figure.prototype.toPath = function (points, split) {
        if (split === void 0) { split = 0; }
        var result = '', pts = points.split(' '), d, l;
        for (var _i = 0, pts_1 = pts; _i < pts_1.length; _i++) {
            var pt = pts_1[_i];
            d = pt.split(',');
            l = (result == '') ? 'M' : 'L';
            result += l + d.join(' ');
        }
        return result + 'Z';
    };
    return Figure;
}());
;
//# sourceMappingURL=figure.js.map