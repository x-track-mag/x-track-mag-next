"use strict";

/**
 * An EventEmitter for the front-side
 */
function EventEmitter() {}

const EP = EventEmitter.prototype;

/**
 * Registers an event listener for the specified event. If the listener has
 * already been registered for the event, this is a no-op.
 *
 * @param {string} name The event name.
 * @param {function} fn The listener function.
 */
EP.addEventListener = function (name, fn) {
	var eventMap = (this.__events = this.__events || {});
	var handlerList = (eventMap[name] = eventMap[name] || []);
	if (handlerList.indexOf(fn) < 0) {
		handlerList.push(fn);
	}
	console.log(`We have ${handlerList.length} listeners for ${name}`);
};
EP.on = EP.addEventListener;

/**
 * Unregisters an event listener from the specified event. If the listener
 * hasn't been registered for the event, this is a no-op.
 *
 * @param {string} name The event name.
 * @param {function} fn The listener function.
 */
EP.removeEventListener = function (name, fn) {
	var eventMap = (this.__events = this.__events || {});
	var handlerList = eventMap[name];
	if (handlerList) {
		var index = handlerList.indexOf(fn);
		if (index >= 0) {
			handlerList.splice(index, 1);
		}
	}
};
EP.off = EP.removeEventListener;

/**
 * Emits an event, causing all registered event listeners for that event to be
 * called in registration order.
 *
 * @param {string} name The event name.
 * @param {...*} var_args Arguments to call listeners with.
 */
EP.emit = function (name, var_args) {
	var eventMap = (this.__events = this.__events || {});
	var handlerList = eventMap[name];
	var args = Array.prototype.slice.call(arguments, 1);
	if (handlerList) {
		for (var i = 0; i < handlerList.length; i++) {
			var fn = handlerList[i];
			try {
				fn.apply(this, args);
			} catch (err) {
				console.log(
					`Event handler for ${name} has generated an error : ${err.message} !`
				);
			}
		}
	}
};

export default EventEmitter;
