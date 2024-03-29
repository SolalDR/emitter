# Emitter

[![Maintainability](https://api.codeclimate.com/v1/badges/cb31cd965230a2c407c0/maintainability)](https://codeclimate.com/github/SolalDR/emitter/maintainability)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@solaldr/emitter)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@solaldr/emitter)

An abstract class to implement event system

[Documentation](https://solaldr.github.io/emitter/index.html) — [Source](https://github.com/SolalDR/emitter)

## How to install 

With npm:
```
npm install @solaldr/emitter
```

With yarn:
```
yarn add @solaldr/emitter
```

## How to use

A simple example to create a bus.

``` javascript
import Emitter from "emitter"

class ObjectEventable extends Emitter {
    constructor() {
        super();
        this.list = [];
    }

    add(item) {
        this.list.push(item);
        this.emit('add');
    }
}


var a = new ObjectEventable();
a.on('add', () => {
    console.log('Item added');
})

a.add('Test') // Should output 'Item added' in console 
```

A simple example to create a bus.

``` javascript
import Emitter from "emitter"

class Bus extends Emitter {
    constructor() {
        super();
    }
}

export default new Bus();
```
