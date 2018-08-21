class Tile {

    constructor(v, p){
        this._value = 0;
        this._position = [];
        this.node = this.template();
        this.init(v, p);
    }

    init(v, p){
        this.value = v;
        this.position = p;
    }

    template(){
        let tile = document.createElement('div');
        tile.classList.add('tile-item');
        tile.classList.add(`tile-${this.value}`);
        return tile;
    }

    set position(p){
        if(this._position.length === 0){
            this.node.classList.add(`tile-${p[0]}-${p[1]}`);

        }else{

            this.node.classList.replace(`tile-${this._position[0]}-${this._position[1]}`, `tile-${p[0]}-${p[1]}`);
        }
        this._position = p;
    }
    get position(){
        return this._position;
    }
    set value(v){
        if(this.node){
            this.node.innerText = v;
            this.node.classList.replace(`tile-${this.value}`, `tile-${v}`)
        }
        this._value = v;
    }
    get value(){
        return this._value;
    }
}

export default Tile;