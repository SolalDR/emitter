const assert = require('assert');
const Emitter = require('./../src/main');

const emitter = new Emitter();
var valueTest = 1;
var callback = () => {
	valueTest ++;
};
emitter.on('test', callback);


test('on', () => {
	var emitter = new Emitter();
	var value = 0;
	emitter.on(['test1', 'test2'], ()=>{
		value ++;
	})
	emitter.emit('test1');
	expect(value).toBe(1);

	emitter.emit('test2');
	expect(value).toBe(2);

	value = 1;	// Reset
	emitter.on('test', () => {
		value++
	});
	emitter.emit('test');
	expect(value).toBe(2);
});

test('emit', () => {
	var emitter = new Emitter();
	var value = 0;
	
	emitter.on(['test1', 'test2'], ()=>{
		value ++;
	});

	var callback = () => { value ++;}
	emitter.on('test1', callback); // Register an event that already exist
	emitter.on('test1', callback); // Register a callback that already exist

	emitter.emit(['test1', 'test2']);
	emitter.emit('test');
  expect(value).toBe(3);
});

test('off', ()=>{
	valueTest = 1; // Reset
	emitter.on('test', () => {});
	emitter.off('test', callback);
	emitter.off('test2', callback);
	emitter.emit('test');
	expect(valueTest).toBe(1);	
})

test('once', ()=>{
	valueTest = 1; // Reset
	emitter.once('test', callback);
	emitter.emit('test');
	emitter.emit('test');
	expect(valueTest).toBe(2);	
})

test('eventExist', ()=>{
	emitter.on('test', callback);
	var existTest = emitter.eventExist('test', callback);
	expect(existTest).toBe(true);

	var existBruh = emitter.eventExist('bruh', callback);
	expect(existBruh).toBe(false);
})

test('onceAll', ()=>{
	var emitter = new Emitter();
	var value = 0;
	emitter.onceAll(['test1', 'test2'], ()=>{
		value = 1;
	})
	expect(value).toBe(0);
	emitter.emit('test1');
	expect(value).toBe(0);
	emitter.emit('test2');
	expect(value).toBe(1);
})