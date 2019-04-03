const assert = require('assert');
const Emitter = require('./../src/main');

const emitter = new Emitter();
var valueTest = 1;
var callback = () => {
	valueTest ++;
};

emitter.on('test', callback);

valueTest = 1;	// Reset
emitter.emit('test');
assert.equal(valueTest, 2, "Test .on() method");

valueTest = 1; // Reset
emitter.off('test', callback);
emitter.emit('test');
assert.equal(valueTest, 1, "Test .off() method");

valueTest = 1; // Reset
emitter.once('test', callback);
emitter.emit('test');
emitter.emit('test');
assert.equal(valueTest, 2, "Test .once() method");
