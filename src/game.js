import _ from 'lodash';
import Tile from './tile';
import Grid from './grid';

export default class {
  constructor() {
    this.base = [2, 4];

    this.size = 4;
    this.grid = new Grid(this.size, this.base);
    this.events();
  }

  start() {
    this.grid.genTile();
    this.grid.genTile();
  }

  /*  init() {

    }*/


  events() {
    const _this = this;
    document.onkeyup = function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          _this.control(0);
          break;
        case 'ArrowUp':
          _this.control(3);
          break;
        case 'ArrowRight':
          console.log('right');
          _this.control(1);
          break;
        case 'ArrowDown':
          console.log('down');
          _this.control(2);
          break;
        default:
          break;
      }
    };
  }

  buildTraversals(vector) {
    const traversals = {x: [], y: []};
    for (let i = 0; i < this.size; i++) {
      traversals.x.push(i);
      traversals.y.push(i);
    }
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();
    return traversals;
  }

  control(direction) {
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let canGenTile = false;
    let x = 0, y = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        [x, y] = [traversals.x[i], traversals.y[j]];
        let tile = this.grid.container[y][x];

        if (tile) {
          tile.merge = false;
          let trans = this.getNextPosition(tile.position, vector);
          let target = this.grid.getTile(trans.next);

          if(target && !target.merge && tile.value === target.value){

            tile.value *= 2;
            tile.merge = true;
            this.grid.coverTo(tile, target.position);
            canGenTile = true;
          }else{
            if(tile.position !== trans.previous){
              this.grid.moveTo(tile, trans.previous);
              canGenTile = true;
            }
          }

        }
      }
    }
    if(canGenTile){
      this.grid.genTile();
    }else{
      console.log('failed')
    }
  }

  getNextPosition(position, vector) {
    do{
      var previous = position;
      position = {x: previous.x+vector.x, y: previous.y+vector.y};
    }while(this.grid.within(position) && this.grid.avaliable(position));
    return {previous, next: position};
  }

  getVector(direction){

    const vectors = new Map([
      [0, {x: -1, y: 0}],
      [1, {x: 1, y: 0}],
      [2, {x: 0, y: 1}],
      [3, {x: 0, y: -1}]
  ]);

    return vectors.get(direction);
  }
}
