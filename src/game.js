import _ from 'lodash';
import Tile from './tile.js';

export default class  {
    constructor(){
        this.doc = document;
        this.base = [2, 4];
        this.game = new Array(4).fill(new Array(4).fill(0));
        this.tile_wrapper = document.getElementById('tile');

        this.init();
        this.events();
    }

    init(){
        this.game = this.game.map(row => {
            return row.map(e => {
                return null;
            });
        });
    }

    gen_tile(){
        let x = _.random(0, 3),
            y = _.random(0, 3),
            key = _.random(0, 1);
        if(this.game[x][y] !== null){
            return this.gen_tile();
        }else{
            let newer = new Tile(this.base[key], [x, y]);
            this.game[x][y] = newer;
            this.tile_wrapper.appendChild(newer.node);

        }
    }

    events(){
        let _this = this;
        document.onkeyup = function(event){
            switch (event.key) {
                case 'ArrowLeft':
                    console.log('left');
                    _this.left();
                    break;
                case 'ArrowUp':
                    _this.up();
                    break;
                case 'ArrowRight':
                    console.log('right');
                    _this.right();
                    break;
                case 'ArrowDown':
                    console.log('down');
                    _this.down();
                    break;
                default:
                    break;
            }

        };
    }


    ctrl(){
        let vector = {x: 0, y: 0};
        let _this = this;
        let traversals = this.buildTraversals(vector);
        let i, j;

        traversals.x.forEach(x => {
            let index = 0;
            let row = [];
            traversals.y.forEach(y => {
                vector.y === 1 ? [i, j]= [y, x] : [i, j]= [x, y];
                if(_this.game[i][j] === null){
                    return ;
                }

                if(row[index] === undefined){
                    row[index] = _this.game[i][j];
                }else if(_this.game[i][j].value === row[index].value){

                    _this.game[i][j].value *= 2;
                    _this.game[i][j].position = row[index].position;
                    _this.tile_wrapper.removeChild(row[index].node);
                    row[index] = _this.game[i][j];
                    index++;
                }else {
                    index++;
                    row[index] = _this.game[i][j];
                }
                console.log(i, j)
            });
            console.log(row);
        });
    }



    left(){
        let can_gen_tile = false;
        for (let i=0; i<4; i++){
        //    row
            let row =[null, null, null, null], index = 0;
            for (let j=0; j<4; j++){
            //    col
                if(this.game[i][j] === null){
                    if(this.game[i][j+1]){
                        can_gen_tile = true;
                    }
                    continue;
                }
                if(row[index] === null){
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [i, index];

                }else if(this.game[i][j].value === row[index].value){
                    can_gen_tile = true;

                    this.game[i][j].value *=2;
                    this.game[i][j].position = row[index].position;
                    this.tile_wrapper.removeChild(row[index].node);
                    row[index] = null;
                    row[index] = this.game[i][j];
                    index++;
                }else {
                    index++;
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [i, index];
                }
            }
            this.game[i] = row;
        }
        if(can_gen_tile){
            this.gen_tile();
        }
    }
    up(){
        let can_gen_tile = false;
        for (let j=0; j<4; j++){
            //    row
            let row =[null, null, null, null], index = 0;
            for (let i=0; i<4; i++){
                //    col
                if(this.game[i][j] === null){
                    if(i<3 && this.game[i+1][j]){
                        can_gen_tile = true;
                    }
                    continue;
                }

                if(row[index] === null){
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [index, j];

                }else if(this.game[i][j].value === row[index].value){
                    can_gen_tile = true;

                    this.game[i][j].value *=2;
                    this.game[i][j].position = row[index].position;
                    this.tile_wrapper.removeChild(row[index].node);
                    row[index] = null;
                    row[index] = this.game[i][j];
                }else {
                    index++;
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [index, j];
                }
            }
            for (let i=0; i<4; i++){
                this.game[i][j] = row[i];
            }
        }
        if(can_gen_tile){
            this.gen_tile();
        }
    }
    right() {
        let can_gen_tile = false;
        for (let i = 0; i < 4; i++) {
            //    row
            let row =[null, null, null, null], index = 3;
            for (let j = 3; j >= 0; j--) {
                //    col
                if (!this.game[i][j]) {
                    if (j>0 && this.game[i][j-1]) {
                        can_gen_tile = true;
                    }
                    continue;
                }
                if(row[index] === null){
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [i, index];

                }else if(this.game[i][j].value === row[index].value){
                    can_gen_tile = true;
                    this.game[i][j].value *=2;
                    this.game[i][j].position = row[index].position;
                    this.tile_wrapper.removeChild(row[index].node);
                    row[index] = null;
                    row[index] = this.game[i][j];
                    index--;
                }else {
                    index--;
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [i, index];
                }
            }
            this.game[i] = row;
        }
        if(can_gen_tile){
            this.gen_tile();
        }
    }
    down() {
        let can_gen_tile = false;
        for (let j = 0; j < 4; j++) {
            //    row
            let row =[null, null, null, null], index = 3;
            for (let i = 3; i >= 0; i--) {
                //    col
                if (!this.game[i][j]) {
                    if (i>0 && this.game[i-1][j]) {
                        can_gen_tile = true;
                    }
                    continue;
                }
                if(row[index] === null){
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [index, j];

                }else if(this.game[i][j].value === row[index].value){
                    can_gen_tile = true;

                    this.game[i][j].value *=2;
                    this.game[i][j].position = row[index].position;
                    this.tile_wrapper.removeChild(row[index].node);
                    row[index] = null;
                    row[index] = this.game[i][j];
                    index--;
                }else {
                    index--;
                    row[index] = this.game[i][j];
                    this.game[i][j].position = [index, j];
                }
            }
            for (let i = 3; i >= 0; i--){
                this.game[i][j] = row[i];
            }
        }
        if(can_gen_tile){
            this.gen_tile();
        }
    }

}