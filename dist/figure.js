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
        this.layers = [];
        this.data = {
            head: [
                {
                    path: "50,100 50,80 90,75 100,20 90,10 0,10",
                    transform: ['sim_x', 'right'],
                    attribut: {
                        fill: "#DABE95",
                        stroke: "#4C3C3C"
                    }
                }
            ]
        };
    }
    Figure.prototype.head = function (id) {
        if (id === void 0) { id = 0; }
        var head = this.data.head[id];
        var pts = this.raw_to_point(head.path);
        pts = this.apply_transform(pts, head.transform);
        this.layers[0] = {
            p: pts,
            a: head.attribut
        };
        return this;
    };
    Figure.prototype.draw = function () {
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            var path = this.point_to_svg(layer.p);
            var d = this.canvas.path(path);
            if (layer.a) {
                for (var key in layer.a) {
                    d.attr(key, layer.a[key]);
                }
            }
        }
    };
    Figure.prototype.apply_transform = function (pts, transforms) {
        for (var _i = 0, transforms_1 = transforms; _i < transforms_1.length; _i++) {
            var tr = transforms_1[_i];
            switch (tr) {
                case 'right':
                    for (var _a = 0, pts_1 = pts; _a < pts_1.length; _a++) {
                        var pt = pts_1[_a];
                        pt.x += 100;
                    }
                    break;
                case 'sim_x':
                    var new_pt = [];
                    for (var _b = 0, pts_2 = pts; _b < pts_2.length; _b++) {
                        var pt = pts_2[_b];
                        new_pt.unshift({ x: pt.x - (pt.x * 2), y: pt.y });
                    }
                    pts = new_pt.concat(pts);
                    break;
            }
        }
        return pts;
    };
    Figure.prototype.point_to_svg = function (points) {
        var result = '', l;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var pt = points_1[_i];
            l = (result == '') ? 'M' : 'L';
            result += l + pt.x + ' ' + pt.y;
        }
        return result + 'Z';
    };
    Figure.prototype.raw_to_point = function (data) {
        var result = [];
        var pts = data.split(' ');
        var d;
        for (var _i = 0, pts_3 = pts; _i < pts_3.length; _i++) {
            var pt = pts_3[_i];
            d = pt.split(',');
            result.push({ x: Number(d[0]), y: Number(d[1]) });
        }
        return result;
    };
    Figure.prototype.split = function (p1, p2, level) {
    };
    Figure.prototype.toPath = function (points, split) {
        if (split === void 0) { split = 0; }
        var result = '', pts = points.split(' '), d, l;
        for (var _i = 0, pts_4 = pts; _i < pts_4.length; _i++) {
            var pt = pts_4[_i];
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