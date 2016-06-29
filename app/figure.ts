
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

    private layers: Array<any> = [];

    private data = {
        head:[
            {
                path: "50,100 50,80 90,75 100,20 90,10 0,10",
                transform: ['sim_x', 'right'],
                attribut: {
                    fill: "#DABE95",
                    stroke: "#4C3C3C"
                }
            }
        ] 
    }

    constructor(private canvas: any) {
        
     }

     public head(id: number = 0){

         let head:any = this.data.head[id];
         let pts: Array<any> = this.raw_to_point(head.path);
         pts = this.apply_transform(pts, head.transform);
         this.layers[0] = {
             p: pts,
             a: head.attribut
         }

         return this;
     }

     public draw(){

         for(let layer of this.layers){
             let path = this.point_to_svg(layer.p);
             let d = this.canvas.path(path);

             if(layer.a){
                 for (var key in layer.a) {
                     d.attr(key, layer.a[key]);
                 }
             }
         }
     }

     private apply_transform(pts: Array<any>, transforms: Array<string>){

         for(let tr of transforms){

             switch(tr){

                 case 'right':
                    for(let pt of pts){
                        pt.x += 100;
                    }
                    break;

                 case 'sim_x':

                    let new_pt: Array<any> = [];

                    for(let pt of pts){
                        new_pt.unshift({x: pt.x - (pt.x * 2), y: pt.y});
                    }
                    pts = new_pt.concat(pts);
                    break;
             }
         }

         return pts;
     }

     private point_to_svg(points: Array<any>){

         let result: string = '',
            l:  string;

        for(let pt of points){

            l = (result == '') ? 'M' : 'L';
            result += l+pt.x+' '+pt.y;
        }
        return result+'Z';
    }

    private raw_to_point(data: string){

        let result: Array<any> = [];
        let pts: Array<string> = data.split(' ');
        let d: Array<string>;
        
        for(let pt of pts){
            d = pt.split(',');
            result.push({x: Number(d[0]), y: Number(d[1])});
        }

        return result;
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






