import _ from "lodash";
import Tile from "./tile";

export default class  {
  constructor(size, base){
    this.base = base;
    this.size = size;
    this.tileWrapper = document.getElementById('tile-wrapper');
    this.container = this.init();
  }

  init(){
    let container =  new Array(this.size).fill(new Array(this.size).fill(null));
    container = container.map(row => row.map(e => null));
    return container;
  }

  within(tile){
    if(tile.x >= 0 && tile.x < this.size
      && tile.y >=0 && tile.y < this.size){
      return true;
    }else{
      return false;
    }
  }

  avaliable(tile){
    if(this.within(tile) && this.container[tile.y][tile.x] === null){
      return true;
    }else{
      return false;
    }
  }

  genTile() {
    const x = _.random(0, 3);
    const y = _.random(0, 3);
    const key = _.random(0, 1);

    if (this.container[y][x] !== null) {
      return this.genTile();
    }
    const newer = new Tile(this.base[key], {x, y});
    this.container[y][x] = newer;
    this.tileWrapper.appendChild(newer.node);
  }
  getTile(position){
    if(this.within(position)){
      return this.container[position.y][position.x];
    }else{
      return false;
    }
  }
  coverTo(tile, targetLocation){
    let targetTile = this.getTile(targetLocation);
    this.moveTo(tile, targetLocation);
    this.remove(targetTile);
  }
  moveTo(tile, targetLocation){
    this.container[targetLocation.y][targetLocation.x] = tile;
    this.container[tile.position.y][tile.position.x] = null;
    tile.position = targetLocation;
  }
  remove(tile){
    this.tileWrapper.removeChild(tile.node);
    tile = null;
  }
}