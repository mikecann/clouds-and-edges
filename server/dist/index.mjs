/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer_1(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isNumber = function isNumber(num) {
  var type = kindOf(num);

  if (type === 'string') {
    if (!num.trim()) return false;
  } else if (type !== 'number') {
    return false;
  }

  return (num - num + 1) >= 0;
};

/*!
 * is-odd <https://github.com/jonschlinkert/is-odd>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isOdd = function isOdd(i) {
  if (!isNumber(i)) {
    throw new TypeError('is-odd expects a number.');
  }
  if (Number(i) !== Math.floor(i)) {
    throw new RangeError('is-odd expects an integer.');
  }
  return !!(~~i & 1);
};

class Counter {
    initializePromise;
    state;
    value = 0;
    constructor(state, env) {
        this.state = state;
    }
    async initialize() {
        let stored = (await this.state.storage.get('value'));
        this.value = stored || 0;
    }
    // Handle HTTP requests from clients.
    async fetch(request) {
        // Make sure we're fully initialized from storage.
        if (!this.initializePromise) {
            // if (this.initializePromise === null) {
            this.initializePromise = this.initialize().catch(err => {
                // If anything throws during initialization then we need to be
                // sure sure that a future request will retry initialize().
                // Note that the concurrency involved in resetting this shared
                // promise on an error can be tricky to get right -- we don't
                // recommend customizing it.
                this.initializePromise = undefined;
                throw err;
            });
        }
        await this.initializePromise;
        // Apply requested action.
        let url = new URL(request.url);
        let currentValue = this.value;
        switch (url.pathname) {
            case '/increment':
                currentValue = ++this.value;
                await this.state.storage.put('value', this.value);
                break;
            case '/addTwo':
                this.value += 2;
                currentValue = this.value;
                await this.state.storage.put('value', this.value);
                break;
            case '/decrement':
                currentValue = --this.value;
                await this.state.storage.put('value', this.value);
                break;
            case '/':
                // Just serve the current value. No storage calls needed!
                break;
            default:
                return new Response('Not found', { status: 404 });
        }
        // Return `currentValue`. Note that `this.value` may have been
        // incremented or decremented by a concurrent request when we
        // yielded the event loop to `await` the `storage.put` above!
        // That's why we stored the counter value created by this
        // request in `currentValue` before we used `await`.
        return new Response(`${currentValue}`);
    }
}

var index = {
    async fetch(request, env) {
        try {
            return await handleRequest(request, env);
        }
        catch (e) {
            return new Response(e.message);
        }
    },
};
async function handleRequest(request, env) {
    const startTime = Date.now();
    let id = env.COUNTER.idFromName("A");
    let obj = env.COUNTER.get(id);
    let resp = await obj.fetch(request.url);
    let count = parseInt(await resp.text());
    let wasOdd = isOdd(count) ? "is odd" : "is even";
    const delta = Date.now() - startTime;
    const response = new Response(`Hi Mike  ${count} ${wasOdd} that took ${delta}ms!!`);
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
}

export { Counter, index as default };
//# sourceMappingURL=index.mjs.map
