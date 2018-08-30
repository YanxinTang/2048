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

  events() {
    let toucheStartX = 0, toucheStartY = 0,
        toucheEndX = 0, toucheEndY = 0;
    const map = new Map([
      ['ArrowLeft', 0],
      ['ArrowUp', 3],
      ['ArrowRight', 1],
      ['ArrowDown', 2]
    ]);
    const _this = this;
    document.onkeyup = function (event) {
      _this.control(map.get(event.key))
    };

    let game_container = document.getElementById('game-container');
    game_container.addEventListener('touchstart', function(e){
      e.preventDefault();
      if(e.touches.length > 1){
        return ;
      }
      toucheStartX = e.touches[0].clientX;
      toucheStartY = e.touches[0].clientY;
    });
    game_container.addEventListener('touchmove', function(e){
      e.preventDefault();
    });
    game_container.addEventListener('touchend', function(e){
      e.preventDefault();
      if(e.touches.length > 1){
        return ;
      }
      toucheEndX = e.changedTouches[0].clientX;
      toucheEndY = e.changedTouches[0].clientY;

      let dx = toucheEndX - toucheStartX,
          dy = toucheEndY - toucheStartY;

      if(Math.abs(dx) > Math.abs(dy)){
        _this.control(dx>0?1:0);
      }else{
        _this.control(dy>0?2:3);
      }
    });
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
          tile.node.classList.remove('newer', 'merge');
          let trans = this.getNextPosition(tile.position, vector);
          let target = this.grid.getTile(trans.next);

          if(target && !target.merge && tile.value === target.value){

            target.value *= 2;

            target.merge = true;

            target.node.classList.add('merge');
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
