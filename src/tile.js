import Grid from './grid'

class Tile {
  constructor(v, p) {
    this._value = 0;
    this._position = {x: null, y: null};
    this.merge = false;
    this.node = this.template();
    this.init(v, p);
  }

  init(v, p) {
    this.value = v;
    this.position = p;
  }

  template() {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.classList.add(`tile-${this.value}`);
    return tile;
  }

  set position(p) {
    if (this._position.x === null) {
      this.node.classList.add(`tile-${p.y}-${p.x}`);
    } else {
      this.node.classList.replace(`tile-${this._position.y}-${this._position.x}`, `tile-${p.y}-${p.x}`);
    }
    this._position = p;
  }

  get position() {
    return this._position;
  }

  set value(v) {
    if (this.node) {
      this.node.innerText = v;
      this.node.classList.replace(`tile-${this.value}`, `tile-${v}`);
    }
    this._value = v;
  }

  get value() {
    return this._value;
  }
}

export default Tile;
