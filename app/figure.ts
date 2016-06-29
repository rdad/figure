
declare var Raphael: any;


class Point {

    public x: number
    public y: number

    constructor(px: number, py: number) {
        this.x = px;
        this.y = py;
     }
    getSVG() {
        return this.x+' '+this.y;
    }
};

class Figure{

    constructor(private canvas: any) {
        
     }

    private split(p1:Point, p2:Point, level:number){

    }

    public toPath(points: string, split: number = 0){

        let result: string = '',
            pts: Array<string> = points.split(' '),
            d: Array<string>,
            l:  string;

        for(let pt of pts){
            d = pt.split(',');
            l = (result == '') ? 'M' : 'L';
            result += l+d.join(' ');
        }
        return result+'Z';
    }
};






