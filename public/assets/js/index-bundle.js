/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}
		for(var key in attrs) {
			if (hasOwn.call(attrs, key)) {
				newAttrs[key] = attrs[key]
			}
		}
		attrs = newAttrs
	}
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string") {
			if (typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.6"
m.vnode = Vnode
if (true) module["exports"] = m
else window.m = m
}());
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).setImmediate, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _izitoast = __webpack_require__(23);

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = exports.Data = {
	data: {
		MetaData: {},
		VehicleOwnersBio: {},
		DriversBio: {},
		GuarantorsBio: {},
		VehicleDetails: {}
	},
	items: [],
	item: {
		MetaData: {},
		VehicleOwnersBio: {},
		DriversBio: {},
		GuarantorsBio: {},
		VehicleDetails: {}
	},
	searchquery: "",
	Search: function Search() {
		return _mithril2.default.request({
			url: "api/items/search" + Data.searchquery,
			method: "GET"
		});
	},
	Submit: function Submit() {
		console.log(Data.data);
		console.log(JSON.stringify(Data.data));

		return _mithril2.default.request({
			method: "POST",
			url: "/api/items/create",
			data: Data.data
		}).then(function (result) {
			console.log(result);
			_izitoast2.default.success({
				title: "OK",
				message: "Successfully inserted record!"
			});
		});
	},
	GetAll: function GetAll() {
		console.log("get all");
		return _mithril2.default.request({
			method: "GET",
			url: "/api/items/all"
		}).then(function (result) {
			console.log(result);
			Data.items = result;
			return result;
		});
	},
	GetOne: function GetOne(id) {
		console.log("get all");
		return _mithril2.default.request({
			method: "GET",
			url: "/api/items/" + id
		}).then(function (result) {
			console.log(result);
			Data.item = result;
			return result;
		});
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TextInput = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = exports.TextInput = {
	view: function view(_ref) {
		var attrs = _ref.attrs;

		return (0, _mithril2.default)(
			"div",
			{ "class": "pa2 " + attrs.class },
			(0, _mithril2.default)(
				"label",
				{ "class": "db pa2" },
				attrs.label
			),
			(0, _mithril2.default)("input", {
				type: "text",
				"class": "pv2 ph3 br2 bw1 ba b--gray db w-100",
				oninput: attrs.oninput
			})
		);
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ImageInput = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageInput = exports.ImageInput = {
	image: "",
	ProcessInput: function ProcessInput(e, Callback) {
		console.log(e);
		var file = e.target.files[0];
		var reader = new FileReader();

		reader.addEventListener("load", function (e) {
			Callback(reader.result);
			_mithril2.default.redraw();
			// preview.src = reader.result;
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	},
	view: function view(_ref) {
		var attrs = _ref.attrs;

		return (0, _mithril2.default)(
			"div",
			{ "class": " pa2 tc " + attrs.class },
			(0, _mithril2.default)(
				"label",
				{ "class": "dib tc" },
				(0, _mithril2.default)("img", { src: attrs.Value, "class": "w5 h5 bg-light-gray db", alt: "" })
			),
			(0, _mithril2.default)(
				"strong",
				{ "class": "db f4 ma0 pa2" },
				attrs.label
			),
			(0, _mithril2.default)("input", {
				type: "file",
				"class": "pv2 ph3 br2 bw1 ba b--gray db w-100 tc",
				placeholder: "oad fd",
				onchange: function onchange(e) {
					return ImageInput.ProcessInput(e, attrs.Callback);
				}
			})
		);
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v4.3.2, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.flatpickr = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours(dateObj.getHours() % 12 +
            12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (dateObj, frmt, overrideLocale) {
        if (config.formatDate !== undefined)
            return config.formatDate(dateObj, frmt);
        var locale = overrideLocale || l10n;
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, locale, config)
                : c !== "\\" ? c : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (config && config.parseDate)
                parsedDate = config.parseDate(date, format);
            else {
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate = fn(parsedDate, val, l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            config.errorHandler(new Error("Invalid date provided: " + date_orig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}

var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return (1 +
        Math.round(((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            (week1.getDay() + 6) % 7) /
            7));
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    errorHandler: console.warn,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}

var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign({}, flatpickr.defaultConfig),
        l10n: english,
    };
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.visibility = "hidden";
            self.calendarContainer.style.display = "block";
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
            self.calendarContainer.style.visibility = "visible";
            self.calendarContainer.style.display = null;
        }
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && self.selectedDates.length === 0) {
            self.setDate(self.config.minDate !== undefined
                ? new Date(self.config.minDate.getTime())
                : new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds, 0), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (e.type !== "input") {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, DEBOUNCED_CHANGE_MS);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (limitMaxHours) {
            var maxTime = self.config.maxTime !== undefined
                ? self.config.maxTime
                : self.config.maxDate;
            hours = Math.min(hours, maxTime.getHours());
            if (hours === maxTime.getHours())
                minutes = Math.min(minutes, maxTime.getMinutes());
        }
        if (limitMinHours) {
            var minTime = self.config.minTime !== undefined
                ? self.config.minTime
                : self.config.minDate;
            hours = Math.max(hours, minTime.getHours());
            if (hours === minTime.getHours())
                minutes = Math.max(minutes, minTime.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) {
            evt.which === 1 && handler(evt);
        };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        bind(window.document, "mousedown", onClick(documentClick));
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["input", "increment"], self._debouncedChange, {
                passive: true,
            });
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, true);
                newIndex += 42;
            }
        }
        focus();
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        clearNode(self.daysContainer);
        self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.firstChild;
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
        self.currentYearElement = yearInput.childNodes[0];
        if (self.config.minDate)
            self.currentYearElement.setAttribute("data-min", self.config.minDate.getFullYear().toString());
        if (self.config.maxDate) {
            self.currentYearElement.setAttribute("data-max", self.config.maxDate.getFullYear().toString());
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("div", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.setAttribute("data-step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("data-step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("data-min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("data-max", self.config.time_24hr ? "23" : "12");
        self.minuteElement.setAttribute("data-min", "0");
        self.minuteElement.setAttribute("data-max", "59");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.setAttribute("data-step", self.minuteElement.getAttribute("data-step"));
            self.secondElement.setAttribute("data-min", self.minuteElement.getAttribute("data-min"));
            self.secondElement.setAttribute("data-max", self.minuteElement.getAttribute("data-max"));
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index = document.activeElement.$i;
            focusOnDay(index, 0);
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        if (self.config.enableTime) {
            if (self.config.minDate !== undefined)
                setHoursFromDate(self.config.minDate);
            else
                setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(e.target);
            });
            if (lostFocus && isIgnored) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.getAttribute("data-min") &&
                newYear <
                    parseInt(self.currentYearElement.getAttribute("data-min"))) ||
            (self.currentYearElement.getAttribute("data-max") &&
                newYear >
                    parseInt(self.currentYearElement.getAttribute("data-max"))))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    self.close();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case 37:
                case 39:
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                default:
                    break;
            }
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case self.l10n.amPM[1].charAt(0):
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            elem.classList.contains("disabled") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (i, date) {
            var timestamp = date.getTime();
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var i = 0, date = self.days.childNodes[i].dateObj; i < 42; i++, date =
                self.days.childNodes[i] &&
                    self.days.childNodes[i].dateObj) {
            _loop_1(i, date);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self._input.disabled || self.config.inline)
            return;
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
            "onPreCalendarPosition",
        ];
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign({}, flatpickr.l10ns.default, (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        self.formatDate = createDateFormatter(self);
    }
    function positionCalendar(customPositionElement) {
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, function (acc, child) { return acc + child.offsetHeight; }, 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            self.selectedDateElem && self.selectedDateElem.focus();
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
        }
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                self.isOpen && positionCalendar();
            },
        });
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        e.preventDefault();
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (e.target === self.currentYearElement) {
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp") {
            self.changeYear(self.currentYear + 1);
        }
        else if (e.target.className === "arrowDown") {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("data-min")), max = parseFloat(input.getAttribute("data-max")), step = parseFloat(input.getAttribute("data-step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
if (typeof window === "object")
    window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

exports.default = flatpickr$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _HomePage = __webpack_require__(10);

var _NewDriverPage = __webpack_require__(12);

var _ViewItem = __webpack_require__(19);

var _Shell = __webpack_require__(20);

var _data = __webpack_require__(1);

var _analytics = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.getElementById("appContainer");

_mithril2.default.route.prefix("#!");

_mithril2.default.route(root, "/", {
	"/": {
		view: function view(vnode) {
			return (0, _mithril2.default)(_Shell.Shell, (0, _mithril2.default)(_HomePage.HomePage, vnode.attrs));
		}
	},
	"/registration": {
		view: function view(vnode) {
			return (0, _mithril2.default)(_Shell.Shell, (0, _mithril2.default)(_NewDriverPage.NewDriverPage, vnode.attrs));
		}
	},
	"/item/:id": {
		view: function view(vnode) {
			return (0, _mithril2.default)(_Shell.Shell, (0, _mithril2.default)(_ViewItem.ViewItem, vnode.attrs));
		}
	},
	"/analytics": {
		view: function view(vnode) {
			return (0, _mithril2.default)(_Shell.Shell, (0, _mithril2.default)(_analytics.Analytics, vnode.attrs));
		}
	}
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(8);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HomePage = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _flatpickr = __webpack_require__(5);

var _flatpickr2 = _interopRequireDefault(_flatpickr);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePage = exports.HomePage = {
	oncreate: function oncreate() {
		_data.Data.GetAll();
		(0, _flatpickr2.default)(document.getElementById("fromDate"), {});
		(0, _flatpickr2.default)(document.getElementById("toDate"), {});
	},
	view: function view() {
		return (0, _mithril2.default)(
			"section",
			{ "class": "tc ph6 pb5 ", style: "min-height:90vh" },
			(0, _mithril2.default)(
				"div",
				{ "class": "bg-gray cf pa3" },
				(0, _mithril2.default)(
					"button",
					{ "class": "fr pv2 ph3 bg-white shadow-4 " },
					"Refresh List"
				)
			),
			(0, _mithril2.default)(
				"table",
				{ "class": "f6 w-100  center ba b--black-20 bg-white", cellspacing: "0" },
				(0, _mithril2.default)(
					"thead",
					{ "class": "tc" },
					(0, _mithril2.default)(
						"tr",
						{ "class": "bg-near-white" },
						(0, _mithril2.default)(
							"th",
							{ "class": "fw6 bb b--black-20  pa3 " },
							"S/N"
						),
						(0, _mithril2.default)(
							"th",
							{ "class": "fw6 bb b--black-20  pa3 " },
							"Name"
						),
						(0, _mithril2.default)(
							"th",
							{ "class": "fw6 bb b--black-20  pa3 " },
							"Reg. No."
						),
						(0, _mithril2.default)(
							"th",
							{ "class": "fw6 bb b--black-20  pa3 " },
							"Vehicle No."
						),
						(0, _mithril2.default)(
							"th",
							{ "class": "fw6 bb b--black-20  pa3 " },
							"Form No."
						),
						(0, _mithril2.default)(
							"th",
							{ "class": "fw6 bb b--black-20  pa3 " },
							"Actions"
						)
					)
				),
				(0, _mithril2.default)(
					"tbody",
					{ "class": "lh-copy" },
					_data.Data.items.map(function (item) {
						return (0, _mithril2.default)(
							"tr",
							null,
							(0, _mithril2.default)(
								"td",
								{ "class": "pv3 pr3 bb b--black-20" },
								item.ID
							),
							(0, _mithril2.default)(
								"td",
								{ "class": "pv3 pr3 bb b--black-20" },
								item.DriversBio.FirstName + " " + item.DriversBio.LastName
							),
							(0, _mithril2.default)(
								"td",
								{ "class": "pv3 pr3 bb b--black-20" },
								item.VehicleDetails.RegistrationNumber
							),
							(0, _mithril2.default)(
								"td",
								{ "class": "pv3 pr3 bb b--black-20" },
								item.VehicleDetails.VehicleLicenseNumber
							),
							(0, _mithril2.default)(
								"td",
								{ "class": "pv3 pr3 bb b--black-20" },
								item.MetaData.FormNumber
							),
							(0, _mithril2.default)(
								"td",
								{ "class": "pv3 pr3 bb b--black-20" },
								(0, _mithril2.default)(
									"a",
									{
										"class": "link bg-green white pv2 ph3 br2 pointer",
										oncreate: _mithril2.default.route.link,
										href: "/item/" + item.ID
									},
									"view"
								)
							)
						);
					})
				)
			)
		);
	}
};

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NewDriverPage = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _FormWizard = __webpack_require__(13);

var _data = __webpack_require__(1);

var _izitoast = __webpack_require__(23);

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewDriverPage = exports.NewDriverPage = {
	oncreate: function oncreate() {},
	view: function view() {
		return (0, _mithril2.default)(
			"section",
			{ "class": "tc ph6 " },
			(0, _mithril2.default)(
				"div",
				{ "class": "bg-gray cf pa3" },
				(0, _mithril2.default)(
					"button",
					{
						"class": "fr pv2 ph3 bg-white shadow-4 ",
						onclick: function onclick() {
							return _data.Data.Submit();
						}
					},
					"Save"
				)
			),
			(0, _mithril2.default)(
				"section",
				{ "class": "pv3" },
				(0, _mithril2.default)(_FormWizard.FormWizard, null)
			),
			(0, _mithril2.default)(
				"div",
				{ "class": "bg-gray cf pa3" },
				(0, _mithril2.default)(
					"button",
					{
						"class": "fr pv2 ph3 bg-white shadow-4 ",
						onclick: function onclick() {
							var f = _data.Data.data;
							if (!f.MetaData.FormNumber || !f.MetaData.SlotNumber) {
								_izitoast2.default.error({
									title: "Error",
									message: "Please fill out the Meta Data",
									position: "topCenter"
								});
								return;
							}
							if (!f.VehicleOwnersBio.FirstName || !f.VehicleOwnersBio.LastName || !f.VehicleOwnersBio.OtherName || !f.VehicleOwnersBio.Gender || !f.VehicleOwnersBio.DateOfBirth || !f.VehicleOwnersBio.MaritalStatus || !f.VehicleOwnersBio.OfficeAddress || !f.VehicleOwnersBio.ResidentialAddress || !f.VehicleOwnersBio.PhoneNumbers || !f.VehicleOwnersBio.Occupation || !f.VehicleOwnersBio.Religion || !f.VehicleOwnersBio.LocalGovernmentOfOrigin || !f.VehicleOwnersBio.StateOfOrigin || !f.VehicleOwnersBio.Nationality || !f.VehicleOwnersBio.NameOfNextOfKin || !f.VehicleOwnersBio.RelationshipWithNextOfKin || !f.VehicleOwnersBio.PhoneNumberOfNextOfKin || !f.VehicleOwnersBio.OwnersPassport) {
								_izitoast2.default.error({
									title: "Error",
									message: "Please fill Vehicle Owner's Data",
									position: "topCenter"
								});
								return;
							}
							if (!f.DriversBio.FirstName || !f.DriversBio.LastName || !f.DriversBio.OtherName || !f.DriversBio.Gender || !f.DriversBio.DateOfBirth || !f.DriversBio.MaritalStatus || !f.DriversBio.OfficeAddress || !f.DriversBio.ResidentialAddress || !f.DriversBio.PhoneNumbers || !f.DriversBio.Occupation || !f.DriversBio.Religion || !f.DriversBio.LocalGovernmentOfOrigin || !f.DriversBio.StateOfOrigin || !f.DriversBio.Nationality || !f.DriversBio.NameOfNextOfKin || !f.DriversBio.RelationshipWithNextOfKin || !f.DriversBio.PhoneNumberOfNextOfKin || !f.DriversBio.DriversPhotograph
							// !f.DriversBio.DriversThumbprint
							) {
									_izitoast2.default.error({
										title: "Error",
										message: "Please fill out the Driver's Bio Data",
										position: "topCenter"
									});
									return;
								}
							if (!f.GuarantorsBio.FirstName || !f.GuarantorsBio.LastName || !f.GuarantorsBio.OtherName || !f.GuarantorsBio.Gender || !f.GuarantorsBio.DateOfBirth || !f.GuarantorsBio.MaritalStatus || !f.GuarantorsBio.OfficeAddress || !f.GuarantorsBio.ResidentialAddress || !f.GuarantorsBio.PhoneNumbers || !f.GuarantorsBio.Occupation || !f.GuarantorsBio.Religion || !f.GuarantorsBio.LocalGovernmentOfOrigin || !f.GuarantorsBio.StateOfOrigin || !f.GuarantorsBio.Nationality || !f.GuarantorsBio.GuarantorsPassport || !f.GuarantorsBio.GuarantorsIdentity) {
								_izitoast2.default.error({
									title: "Error",
									message: "Please fill out the Guarantor's Bio Data",
									position: "topCenter"
								});
								return;
							}
							if (!f.VehicleDetails.RegistrationNumber || !f.VehicleDetails.TypeOfVehicle || !f.VehicleDetails.VehicleLicenseNumber || !f.VehicleDetails.ChasisNumber || !f.VehicleDetails.EngineNumber || !f.VehicleDetails.InsuranceNumber || !f.VehicleDetails.PhotographOfVehicle) {
								_izitoast2.default.error({
									title: "Error",
									message: "Please fill out the Guarantor's Bio Data",
									position: "topCenter"
								});
								return;
							}
							// add loader here...
							_data.Data.Submit();
						}
					},
					"Save"
				)
			)
		);
	}
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormWizard = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _MetaData = __webpack_require__(14);

var _VehicleOwnersBio = __webpack_require__(15);

var _DriversBio = __webpack_require__(16);

var _GuarantorsBio = __webpack_require__(17);

var _VehicleDetails = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormWizard = exports.FormWizard = {
	start: 0,
	view: function view() {
		return (0, _mithril2.default)(
			"section",
			null,
			(0, _mithril2.default)(_MetaData.MetaData, null),
			(0, _mithril2.default)(_VehicleDetails.VehicleDetails, null),
			(0, _mithril2.default)(_VehicleOwnersBio.VehicleOwnersBio, null),
			(0, _mithril2.default)(_DriversBio.DriversBio, null),
			(0, _mithril2.default)(_GuarantorsBio.GuarantorsBio, null)
		);
	}
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MetaData = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _TextInput = __webpack_require__(2);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MetaData = exports.MetaData = {
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "mv4 pv4" },
			(0, _mithril2.default)(
				"fieldset",
				null,
				(0, _mithril2.default)(
					"legend",
					{ "class": "ph2" },
					"Registration Meta Data"
				),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Form Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.MetaData.FormNumber = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Slot Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.MetaData.SlotNumber = v;
					})
				})
			)
		);
	}
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VehicleOwnersBio = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _TextInput = __webpack_require__(2);

var _ImageInput = __webpack_require__(4);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VehicleOwnersBio = exports.VehicleOwnersBio = {
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "mv4 pv4" },
			(0, _mithril2.default)(
				"fieldset",
				null,
				(0, _mithril2.default)(
					"legend",
					{ "class": "ph2" },
					"Vehicle Owner's Bio"
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "tc dib w-100" },
					(0, _mithril2.default)(_ImageInput.ImageInput, {
						label: "Owners Passport",
						"class": " dib w-50 ",
						Value: _data.Data.data.VehicleOwnersBio.OwnersPassport,
						Callback: function Callback(v) {
							return _data.Data.data.VehicleOwnersBio.OwnersPassport = v;
						}
					})
				),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "First Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.FirstName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Last Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.LastName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Other Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.OtherName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Gender",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.Gender = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Date of Birth",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.DateOfBirth = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Marital Status",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.MaritalStatus = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Office Address",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.OfficeAddress = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Residential Address",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.ResidentialAddress = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Phone Numbers",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.PhoneNumbers = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Occupation",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.Occupation = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Religion",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.Religion = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "L.G.A. of Origin",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.LocalGovernmentOfOrigin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "State of Origin",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.StateOfOrigin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Nationality",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.Nationality = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Name of NOK",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.NameOfNextOfKin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Relationship with NOK",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.RelationshipWithNextOfKin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Phone Number of NOK",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleOwnersBio.PhoneNumberOfNextOfKin = v;
					})
				})
			)
		);
	}
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DriversBio = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _TextInput = __webpack_require__(2);

var _ImageInput = __webpack_require__(4);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DriversBio = exports.DriversBio = {
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "mv4 pv4" },
			(0, _mithril2.default)(
				"fieldset",
				null,
				(0, _mithril2.default)(
					"legend",
					{ "class": "ph2" },
					"Driver's Bio"
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "tc dib w-100" },
					(0, _mithril2.default)(_ImageInput.ImageInput, {
						label: "Drivers Photograph",
						"class": " dib w-50 ",
						Value: _data.Data.data.DriversBio.DriversPhotograph,
						Callback: function Callback(v) {
							return _data.Data.data.DriversBio.DriversPhotograph = v;
						}
					}),
					(0, _mithril2.default)(_ImageInput.ImageInput, {
						label: "Drivers Thumbprint",
						"class": " dib w-50 ",
						Value: _data.Data.data.DriversBio.DriversThumbprint,
						Callback: function Callback(v) {
							return _data.Data.data.DriversBio.DriversThumbprint = v;
						}
					})
				),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "First Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.FirstName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Last Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.LastName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Other Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.OtherName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Gender",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.Gender = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Date of Birth",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.DateOfBirth = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Marital Status",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.MaritalStatus = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Office Address",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.OfficeAddress = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Residential Address",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.ResidentialAddress = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Phone Numbers",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.PhoneNumbers = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Occupation",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.Occupation = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Religion",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.Religion = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "L.G.A. of Origin",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.LocalGovernmentOfOrigin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "State of Origin",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.StateOfOrigin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Nationality",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.Nationality = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Name of NOK",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.NameOfNextOfKin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Relationship with NOK",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.RelationshipWithNextOfKin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Phone Number of NOK",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.DriversBio.PhoneNumberOfNextOfKin = v;
					})
				})
			)
		);
	}
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GuarantorsBio = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _TextInput = __webpack_require__(2);

var _ImageInput = __webpack_require__(4);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GuarantorsBio = exports.GuarantorsBio = {
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "mv4 pv4" },
			(0, _mithril2.default)(
				"fieldset",
				null,
				(0, _mithril2.default)(
					"legend",
					{ "class": "ph2" },
					"Guarantor's Bio"
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "tc dib w-100" },
					(0, _mithril2.default)(_ImageInput.ImageInput, {
						label: "Guarantors Passport",
						"class": " dib w-50 ",
						Value: _data.Data.data.GuarantorsBio.GuarantorsPassport,
						Callback: function Callback(v) {
							return _data.Data.data.GuarantorsBio.GuarantorsPassport = v;
						}
					}),
					(0, _mithril2.default)(_ImageInput.ImageInput, {
						label: "Guarantors Identity",
						"class": " dib w-50 ",
						Value: _data.Data.data.GuarantorsBio.GuarantorsIdentity,
						Callback: function Callback(v) {
							return _data.Data.data.GuarantorsBio.GuarantorsIdentity = v;
						}
					})
				),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "First Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.FirstName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Last Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.LastName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Other Name",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.OtherName = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Gender",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.Gender = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Date of Birth",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.DateOfBirth = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Marital Status",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.MaritalStatus = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Office Address",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.OfficeAddress = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Residential Address",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.ResidentialAddress = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Phone Numbers",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.PhoneNumbers = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Occupation",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.Occupation = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Religion",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.Religion = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "L.G.A. of Origin",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.LocalGovernmentOfOrigin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "State of Origin",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.StateOfOrigin = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Nationality",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.GuarantorsBio.Nationality = v;
					})
				})
			)
		);
	}
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VehicleDetails = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _TextInput = __webpack_require__(2);

var _ImageInput = __webpack_require__(4);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VehicleDetails = exports.VehicleDetails = {
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "mv4 pv4" },
			(0, _mithril2.default)(
				"fieldset",
				null,
				(0, _mithril2.default)(
					"legend",
					{ "class": "ph2" },
					"Vehicle Details"
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "tc dib w-100" },
					(0, _mithril2.default)(_ImageInput.ImageInput, {
						label: "Vehicle's Photograph",
						"class": " dib w-50 ",
						Value: _data.Data.data.VehicleDetails.PhotographOfVehicle,
						Callback: function Callback(v) {
							return _data.Data.data.VehicleDetails.PhotographOfVehicle = v;
						}
					})
				),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Registration Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleDetails.RegistrationNumber = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Type of Vehicle",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleDetails.TypeOfVehicle = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Vehicle License Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleDetails.VehicleLicenseNumber = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Chasis Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleDetails.ChasisNumber = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Engine Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleDetails.EngineNumber = v;
					})
				}),
				(0, _mithril2.default)(_TextInput.TextInput, {
					label: "Insurance Number",
					"class": "dib w-50",
					oninput: _mithril2.default.withAttr("value", function (v) {
						return _data.Data.data.VehicleDetails.InsuranceNumber = v;
					})
				})
			)
		);
	}
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ViewItem = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewItem = exports.ViewItem = {
	oncreate: function oncreate(vnode) {
		console.log(vnode.attrs.id);
		_data.Data.GetOne(vnode.attrs.id);
	},
	view: function view() {
		var vo_data = _data.Data.item.VehicleOwnersBio;
		var VehicleOwnersBio = {
			Name: vo_data.FirstName + " " + vo_data.LastName,
			Gender: vo_data.Gender,
			"Date of Birth": vo_data.DateOfBirth,
			"Marital Status": vo_data.MaritalStatus,
			"Office Address": vo_data.OfficeAddress,
			"Residential Address": vo_data.ResidentialAddress,
			"Phone Numbers": vo_data.PhoneNumbers,
			Occupation: vo_data.Occupation,
			Religion: vo_data.Religion,
			"L.G.A. of Origin": vo_data.LocalGovernmentOfOrigin,
			"State of Origin": vo_data.StateOfOrigin,
			Nationality: vo_data.Nationality,
			"Name of NOK": vo_data.NOK,
			"Relationship with NOK": vo_data.RelationshipWithNextOfKin,
			"Phone Number of NOK": vo_data.PhoneNumberOfNextOfKin
		};

		var drivers_data = _data.Data.item.DriversBio;
		var DriversBio = {
			Name: drivers_data.FirstName + " " + drivers_data.LastName,
			Gender: drivers_data.Gender,
			"Date of Birth": drivers_data.DateOfBirth,
			"Marital Status": drivers_data.MaritalStatus,
			"Office Address": drivers_data.OfficeAddress,
			"Residential Address": drivers_data.ResidentialAddress,
			"Phone Numbers": drivers_data.PhoneNumbers,
			Occupation: drivers_data.Occupation,
			Religion: drivers_data.Religion,
			"L.G.A. of Origin": drivers_data.LocalGovernmentOfOrigin,
			"State of Origin": drivers_data.StateOfOrigin,
			Nationality: drivers_data.Nationality,
			"Name of NOK": drivers_data.NOK,
			"Relationship with NOK": drivers_data.RelationshipWithNextOfKin,
			"Phone Number of NOK": drivers_data.PhoneNumberOfNextOfKin
		};

		var v_data = _data.Data.item.VehicleDetails;
		var VehicleParticulars = {
			"Registration Number": v_data.RegistrationNumber,
			"Type of Vehicle": v_data.TypeOfVehicle,
			"Vehicle License Number": v_data.VehicleLicenseNumber,
			"Chasis Number": v_data.ChasisNumber,
			"Engine Number": v_data.EngineNumber,
			"Insurance Number": v_data.InsuranceNumber
		};

		var g_data = _data.Data.item.GuarantorsBio;
		var GuarantorsBio = {
			Name: g_data.FirstName + " " + g_data.LastName,
			Gender: g_data.Gender,
			Occupation: g_data.Occupation,
			"Office Address": g_data.OfficeAddress,
			"Residential Address": g_data.ResidentialAddress,
			"Phone Numbers": g_data.PhoneNumbers,
			"L.G.A. of Origin": g_data.LocalGovernmentOfOrigin,
			"State of Origin": g_data.StateOfOrigin,
			Nationality: g_data.Nationality,
			Religion: g_data.Religion
		};

		console.log(Object.entries(VehicleOwnersBio).forEach(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2),
			    k = _ref2[0],
			    v = _ref2[1];

			return v;
		}));
		return (0, _mithril2.default)(
			"section",
			{ "class": "tc ph6 pb5 ", style: "min-height:90vh" },
			(0, _mithril2.default)(
				"div",
				{ "class": "bg-gray cf pa3" },
				(0, _mithril2.default)(
					"button",
					{ "class": "fr pv2 ph3 bg-white shadow-4 " },
					"Print"
				)
			),
			(0, _mithril2.default)(
				"section",
				{ "class": "pv3 cf" },
				(0, _mithril2.default)(
					"div",
					{ "class": "dib  ba pa3 fl", style: "width:49%" },
					(0, _mithril2.default)(
						"h3",
						null,
						"Vehicle Owner Bio Data"
					),
					(0, _mithril2.default)(
						"div",
						null,
						(0, _mithril2.default)(
							"div",
							null,
							(0, _mithril2.default)(
								"div",
								{ "class": "cf tc" },
								(0, _mithril2.default)(
									"div",
									{ "class": " pa2 tc w-50 dib " },
									(0, _mithril2.default)(
										"label",
										{ "class": "dib tc" },
										(0, _mithril2.default)("img", {
											src: _data.Data.item.VehicleOwnersBio.OwnersPassport ? _data.Data.item.VehicleOwnersBio.OwnersPassport : "//placehold.it/200x200",
											"class": "w-100 bg-light-gray db h4",
											alt: "",
											style: "min-height:20px"
										})
									),
									(0, _mithril2.default)(
										"strong",
										{ "class": "db f5 ma0 pa2" },
										"Owner's Passport"
									)
								)
							)
						),
						Object.entries(VehicleOwnersBio).map(function (_ref3) {
							var _ref4 = _slicedToArray(_ref3, 2),
							    key = _ref4[0],
							    value = _ref4[1];

							return (0, _mithril2.default)(
								"div",
								{ "class": "cf pv2" },
								(0, _mithril2.default)(
									"div",
									{ "class": "w-30 tl fl pr1" },
									(0, _mithril2.default)(
										"strong",
										null,
										key
									)
								),
								(0, _mithril2.default)(
									"div",
									{ "class": "w-70 tl fl" },
									(0, _mithril2.default)(
										"span",
										{ "class": "fw6 ttu lh-copy" },
										value
									)
								)
							);
						})
					)
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "dib  ba pa3 fr", style: "width:49%" },
					(0, _mithril2.default)(
						"h3",
						null,
						"Drivers Bio Data"
					),
					(0, _mithril2.default)(
						"div",
						null,
						(0, _mithril2.default)(
							"div",
							null,
							(0, _mithril2.default)(
								"div",
								{ "class": "cf" },
								(0, _mithril2.default)(
									"div",
									{ "class": " pa2 tc w-50 fl" },
									(0, _mithril2.default)(
										"label",
										{ "class": "dib tc" },
										(0, _mithril2.default)("img", {
											src: _data.Data.item.DriversBio.DriversPhotograph ? _data.Data.item.DriversBio.DriversPhotograph : "//placehold.it/200x200",
											"class": "w-100 bg-light-gray db",
											alt: "",
											style: "min-height:20px"
										})
									),
									(0, _mithril2.default)(
										"strong",
										{ "class": "db f5 ma0 pa2" },
										"Drivers Photograph"
									)
								),
								(0, _mithril2.default)(
									"div",
									{ "class": " pa2 tc w-50 fl " },
									(0, _mithril2.default)(
										"label",
										{ "class": "dib tc" },
										(0, _mithril2.default)("img", {
											src: _data.Data.item.DriversBio.DriversThumbprint ? _data.Data.item.DriversBio.DriversThumbprint : "//placehold.it/200x200",
											"class": "w-100 bg-light-gray db h4",
											alt: "",
											style: "min-height:20px"
										})
									),
									(0, _mithril2.default)(
										"strong",
										{ "class": "db f5 ma0 pa2" },
										"Drivers Thumbprint"
									)
								)
							)
						),
						Object.entries(DriversBio).map(function (_ref5) {
							var _ref6 = _slicedToArray(_ref5, 2),
							    key = _ref6[0],
							    value = _ref6[1];

							return (0, _mithril2.default)(
								"div",
								{ "class": "cf pv2" },
								(0, _mithril2.default)(
									"div",
									{ "class": "w-30 tl fl pr1" },
									(0, _mithril2.default)(
										"strong",
										null,
										key
									)
								),
								(0, _mithril2.default)(
									"div",
									{ "class": "w-70 tl fl" },
									(0, _mithril2.default)(
										"span",
										{ "class": "fw6 ttu lh-copy" },
										value
									)
								)
							);
						})
					)
				)
			),
			(0, _mithril2.default)(
				"section",
				{ "class": "pv3 cf" },
				(0, _mithril2.default)(
					"div",
					{ "class": "dib  ba pa3 fl", style: "width:49%" },
					(0, _mithril2.default)(
						"h3",
						null,
						"Vehicle Particulars"
					),
					(0, _mithril2.default)(
						"div",
						null,
						(0, _mithril2.default)(
							"div",
							null,
							(0, _mithril2.default)(
								"div",
								{ "class": "cf tc" },
								(0, _mithril2.default)(
									"div",
									{ "class": " pa2 tc w-50 dib " },
									(0, _mithril2.default)(
										"label",
										{ "class": "dib tc" },
										(0, _mithril2.default)("img", {
											src: _data.Data.item.VehicleDetails.PhotographOfVehicle ? _data.Data.item.VehicleDetails.PhotographOfVehicle : "//placehold.it/200x200",
											"class": "w-100 bg-light-gray db h4",
											alt: "",
											style: "min-height:20px"
										})
									),
									(0, _mithril2.default)(
										"strong",
										{ "class": "db f5 ma0 pa2" },
										"Photograph of Vehicle"
									)
								)
							)
						),
						Object.entries(VehicleParticulars).map(function (_ref7) {
							var _ref8 = _slicedToArray(_ref7, 2),
							    key = _ref8[0],
							    value = _ref8[1];

							return (0, _mithril2.default)(
								"div",
								{ "class": "cf pv2" },
								(0, _mithril2.default)(
									"div",
									{ "class": "w-30 tl fl pr1" },
									(0, _mithril2.default)(
										"strong",
										null,
										key
									)
								),
								(0, _mithril2.default)(
									"div",
									{ "class": "w-70 tl fl" },
									(0, _mithril2.default)(
										"span",
										{ "class": "fw6 ttu lh-copy" },
										value
									)
								)
							);
						})
					)
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "dib  ba pa3 fr", style: "width:49%" },
					(0, _mithril2.default)(
						"h3",
						null,
						"Guarantors Bio Data"
					),
					(0, _mithril2.default)(
						"div",
						null,
						(0, _mithril2.default)(
							"div",
							null,
							(0, _mithril2.default)(
								"div",
								{ "class": "cf" },
								(0, _mithril2.default)(
									"div",
									{ "class": " pa2 tc w-50 fl" },
									(0, _mithril2.default)(
										"label",
										{ "class": "dib tc" },
										(0, _mithril2.default)("img", {
											src: _data.Data.item.GuarantorsBio.GuarantorsPassport ? _data.Data.item.GuarantorsBio.GuarantorsPassport : "//placehold.it/200x200",
											"class": "w-100 bg-light-gray db",
											alt: "",
											style: "min-height:20px"
										})
									),
									(0, _mithril2.default)(
										"strong",
										{ "class": "db f5 ma0 pa2" },
										"Guarantors Passport"
									)
								),
								(0, _mithril2.default)(
									"div",
									{ "class": " pa2 tc w-50 fl " },
									(0, _mithril2.default)(
										"label",
										{ "class": "dib tc" },
										(0, _mithril2.default)("img", {
											src: _data.Data.item.GuarantorsBio.GuarantorsIdentity ? _data.Data.item.GuarantorsBio.GuarantorsIdentity : "//placehold.it/200x200",
											"class": "w-100 bg-light-gray db h4",
											alt: "",
											style: "min-height:20px"
										})
									),
									(0, _mithril2.default)(
										"strong",
										{ "class": "db f5 ma0 pa2" },
										"Guarantors Identity"
									)
								)
							)
						),
						Object.entries(GuarantorsBio).map(function (_ref9) {
							var _ref10 = _slicedToArray(_ref9, 2),
							    key = _ref10[0],
							    value = _ref10[1];

							return (0, _mithril2.default)(
								"div",
								{ "class": "cf pv2" },
								(0, _mithril2.default)(
									"div",
									{ "class": "w-30 tl fl pr1" },
									(0, _mithril2.default)(
										"strong",
										null,
										key
									)
								),
								(0, _mithril2.default)(
									"div",
									{ "class": "w-70 tl fl" },
									(0, _mithril2.default)(
										"span",
										{ "class": "fw6 ttu lh-copy" },
										value
									)
								)
							);
						})
					)
				)
			),
			(0, _mithril2.default)(
				"div",
				{ "class": "bg-gray cf pa3" },
				(0, _mithril2.default)(
					"button",
					{ "class": "fr pv2 ph3 bg-white shadow-4 " },
					"Print"
				)
			)
		);
	}
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Shell = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _flatpickr = __webpack_require__(5);

var _flatpickr2 = _interopRequireDefault(_flatpickr);

var _svgIcons = __webpack_require__(22);

var _data = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shell = exports.Shell = {
	oncreate: function oncreate() {
		(0, _flatpickr2.default)(document.getElementById("fromDate"), {});
		(0, _flatpickr2.default)(document.getElementById("toDate"), {});
	},
	view: function view(vnode) {
		return (0, _mithril2.default)(
			"section",
			{ "class": "bg-near-white  f6 fw3 navy" },
			(0, _mithril2.default)(
				"div",
				{ "class": "bg-dark-blue white-80 shadow-4 fixed w-100 z-3" },
				(0, _mithril2.default)(
					"div",
					{ "class": "ph5 pa3 cf" },
					(0, _mithril2.default)(
						"a",
						{ "class": "link dib ph2 pv2 ", oncreate: _mithril2.default.route.link, href: "/" },
						"home"
					),
					(0, _mithril2.default)(
						"a",
						{
							"class": "link dib ph2 pv2 ",
							oncreate: _mithril2.default.route.link,
							href: "/analytics"
						},
						"analytics"
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "dib pl4" },
						(0, _mithril2.default)(
							"span",
							{ "class": " dib ph2 pv2 " },
							"search:"
						),
						(0, _mithril2.default)(
							"form",
							{ "class": "dib pl3 w5 relative" },
							(0, _mithril2.default)("input", {
								type: "text",
								"class": "bg-white br4 bw0 pv2 pl3 pr4 w-100 f6 dib",
								placeholder: "form number, name, slot number, etc",
								style: "outline: none",
								oninput: _mithril2.default.withAttr("value", function (value) {
									_data.Data.searchquery = value;
								})
							}),
							(0, _mithril2.default)(
								"p",
								{ "class": "mv0 dib w1 h1 absolute pointer", style: "top: 0.5rem; right:0.5rem",
									onclick: function onclick() {
										console.log("Search button clicked");
										_data.Data.Search().then(function (resp) {
											console.log(resp);
										}).catch(function (err) {
											console.log(err);
										});
									} },
								(0, _mithril2.default)(_svgIcons.SVGIcons, { type: "search" })
							)
						)
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "dib fr pv2" },
						(0, _mithril2.default)(
							"a",
							{
								"class": "bw0 bg-dark-red shadow-4 pv2 ph3  br2 white-90 pointer grow link",
								style: "background-color:#5889FF",
								oncreate: _mithril2.default.route.link,
								href: "/registration"
							},
							"New Registration"
						)
					)
				)
			),
			(0, _mithril2.default)(
				"section",
				{ "class": "pa4 tc " },
				(0, _mithril2.default)("div", { "class": "pv4" }),
				(0, _mithril2.default)(
					"div",
					{ "class": "dib bb b--gray pa2 pb3" },
					(0, _mithril2.default)(
						"div",
						{ "class": "dib pr3" },
						(0, _mithril2.default)(
							"span",
							{ "class": "dib pr2" },
							"From: "
						),
						(0, _mithril2.default)("input", {
							type: "text",
							id: "fromDate",
							"class": "pv2 ph3 br2 bw1 ba b--gray dib "
						})
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "dib " },
						(0, _mithril2.default)(
							"span",
							{ "class": "dib pr2" },
							"To: "
						),
						(0, _mithril2.default)("input", {
							type: "text",
							id: "toDate",
							"class": "pv2 ph3 br2 bw1 ba b--gray dib "
						})
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "dib ml3" },
						(0, _mithril2.default)(
							"button",
							{ "class": "bw0  shadow-4 pv2 ph3  br2 pointer grow ma2" },
							"Search"
						),
						(0, _mithril2.default)(
							"button",
							{ "class": "bw0 shadow-4 pv2 ph3  br2  pointer grow ma2" },
							"Clear"
						)
					)
				)
			),
			vnode.children
		);
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Analytics = {
    view: function view(vnode) {
        return (0, _mithril2.default)(
            "section",
            { "class": "" },
            (0, _mithril2.default)(
                "table",
                { "class": "f6 w-100  center ba b--black-20 bg-white", cellspacing: "0" },
                (0, _mithril2.default)(
                    "thead",
                    { "class": "tc" },
                    (0, _mithril2.default)(
                        "tr",
                        { "class": "bg-near-white" },
                        (0, _mithril2.default)(
                            "th",
                            { "class": "fw6 bb b--black-20  pa3 " },
                            "S/N"
                        ),
                        (0, _mithril2.default)(
                            "th",
                            { "class": "fw6 bb b--black-20  pa3 " },
                            "Name"
                        ),
                        (0, _mithril2.default)(
                            "th",
                            { "class": "fw6 bb b--black-20  pa3 " },
                            "Reg. No."
                        ),
                        (0, _mithril2.default)(
                            "th",
                            { "class": "fw6 bb b--black-20  pa3 " },
                            "Vehicle No."
                        ),
                        (0, _mithril2.default)(
                            "th",
                            { "class": "fw6 bb b--black-20  pa3 " },
                            "Form No."
                        ),
                        (0, _mithril2.default)(
                            "th",
                            { "class": "fw6 bb b--black-20  pa3 " },
                            "Actions"
                        )
                    )
                ),
                (0, _mithril2.default)(
                    "tbody",
                    { "class": "lh-copy" },
                    (0, _mithril2.default)(
                        "tr",
                        null,
                        (0, _mithril2.default)("td", { "class": "pv3 pr3 bb b--black-20" }),
                        (0, _mithril2.default)("td", { "class": "pv3 pr3 bb b--black-20" }),
                        (0, _mithril2.default)("td", { "class": "pv3 pr3 bb b--black-20" }),
                        (0, _mithril2.default)("td", { "class": "pv3 pr3 bb b--black-20" }),
                        (0, _mithril2.default)("td", { "class": "pv3 pr3 bb b--black-20" }),
                        (0, _mithril2.default)("td", { "class": "pv3 pr3 bb b--black-20" })
                    )
                )
            )
        );
    }
};

exports.default = Analytics;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Icon = exports.SVGIcons = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVGIcons = exports.SVGIcons = {
	view: function view(vnode) {
		switch (vnode.attrs.type) {
			case "logo-black":
				return (0, _mithril2.default)(
					"svg",
					_extends({ "class": "w-100", viewBox: "0 0 36 26" }, vnode.attrs),
					(0, _mithril2.default)(
						"g",
						{
							id: "Welcome",
							stroke: "none",
							"stroke-width": "1",
							fill: "none",
							"fill-rule": "evenodd"
						},
						(0, _mithril2.default)(
							"g",
							{
								id: "Mobile-Portrait-Copy",
								transform: "translate(-16.000000, -12.000000)"
							},
							(0, _mithril2.default)(
								"g",
								{ id: "logo", transform: "translate(10.000000, 9.000000)" },
								(0, _mithril2.default)(
									"g",
									{ id: "Group-3", transform: "translate(6.000000, 3.000000)" },
									(0, _mithril2.default)(
										"g",
										{
											id: "Group-2",
											transform: "translate(7.973666, 0.000000)",
											fill: "#2E3938"
										},
										(0, _mithril2.default)(
											"g",
											{ id: "Group-Copy", "fill-rule": "nonzero" },
											(0, _mithril2.default)("path", {
												d: "M0.0436856122,24.7067099 C-0.0427713225,25.4129674 0.487478465,25.9848377 1.22451348,25.9833184 L26.6698414,25.9308675 C27.4084516,25.929345 27.9369572,25.4565539 27.8506693,24.8766868 L25.4856554,8.68075251 C25.3991985,8.07761682 24.7354388,7.50631105 23.9913314,7.40378973 L19.9729071,6.85014088 L19.9729071,5.72693317 C19.9729071,5.72693317 19.9729071,1.23410141 13.9471774,0.156058938 C7.92144775,-0.921983453 7.92144775,3.9673789 7.92144775,3.9673789 L7.92144775,5.18971974 C7.92144775,5.86479994 8.52532656,6.49029414 9.26620998,6.58627691 L15.955754,7.45291925 L15.955754,6.29666717 L9.26049879,5.37421097 L9.26049879,4.16288493 C9.26049879,4.16288493 9.26049879,0.528902807 13.9471774,1.32883321 C18.6338561,2.12876342 18.6338561,5.53142714 18.6338561,5.53142714 L18.6338561,6.66564964 C18.6338561,7.29206343 19.2275287,7.87678349 19.971636,7.97318391 L23.9900603,8.49377794 L26.4673129,24.8614991 L1.42704202,24.7071383 L3.90429462,5.89163123 L5.24334566,6.06510767 L5.24334566,4.82073726 L2.56524357,4.45175478 L0.0436856122,24.7067099 Z",
												id: "Shape"
											})
										),
										(0, _mithril2.default)("path", {
											d: "M11.7246818,19.6279318 L9.33430967,19.5601143 L9.45245768,18.8187369 L7.63048009,18.7420307 L8.84101662,12.2597894 L12.4136013,12.9097416 L11.7246818,19.6279318 Z M10.9259389,13.1195253 L10.3827763,17.1530716 L9.88143642,17.1151826 L10.4731534,13.042845 L9.34874816,12.8511441 L8.40513073,18.2686432 L10.208328,18.3613224 L10.1117847,19.0915943 L11.4256977,19.1406799 L12.0654613,13.3112262 L10.9259389,13.1195253 Z M15.8628212,19.744877 L13.4605922,19.6770596 L13.5135401,18.9888025 L11.6781515,18.9120962 L12.3046543,12.8902314 L15.9908743,13.5401836 L15.8628212,19.744877 Z M14.3968514,13.6979063 L14.1917637,17.4388589 L13.6839848,17.4009699 L13.9310344,13.621226 L12.7740505,13.4295251 L12.3002486,18.4683735 L14.1191963,18.5610527 L14.0844072,19.2396905 L15.406662,19.288776 L15.5689524,13.8896072 L14.3968514,13.6979063 Z M19.6514083,14.1660832 L19.9913705,19.8609796 L15.7045676,19.7404153 L15.8523716,13.516131 L19.6514083,14.1660832 Z M15.9895113,13.9579638 L15.8788198,19.3062789 L19.065878,19.4240843 L18.8558503,14.4180458 L15.9895113,13.9579638 Z M17.6702826,15.2353428 L17.721007,18.3249808 L17.2008244,18.2939373 L17.182182,15.1700717 L17.6702826,15.2353428 Z",
											id: "440-copy",
											stroke: "#2E3938",
											"stroke-width": "0.5"
										})
									),
									(0, _mithril2.default)("rect", {
										id: "Rectangle-2",
										fill: "#2D3938",
										transform: "translate(6.178707, 7.702437) rotate(8.000000) translate(-6.178707, -7.702437) ",
										x: "3.40463511",
										y: "6.94062199",
										width: "5.54814319",
										height: "1.52362949"
									}),
									(0, _mithril2.default)("rect", {
										id: "Rectangle-2-Copy-2",
										fill: "#2D3938",
										transform: "translate(4.087669, 13.256233) rotate(8.000000) translate(-4.087669, -13.256233) ",
										x: "0.0987211391",
										y: "12.4944185",
										width: "7.97789668",
										height: "1.52362949"
									}),
									(0, _mithril2.default)("rect", {
										id: "Rectangle-2-Copy",
										fill: "#2D3938",
										transform: "translate(4.743779, 18.878940) rotate(7.000000) translate(-4.743779, -18.878940) ",
										x: "1.96970713",
										y: "18.1171252",
										width: "5.54814319",
										height: "1.52362949"
									})
								)
							)
						)
					)
				);
			case "logo-white":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						xmlns: "http://www.w3.org/2000/svg"
					}, vnode.attrs, {
						viewBox: "0 0 36 26"
					}),
					(0, _mithril2.default)("style", null),
					(0, _mithril2.default)(
						"g",
						{ fill: "none" },
						(0, _mithril2.default)(
							"g",
							{ fill: "#fff" },
							(0, _mithril2.default)("path", { d: "M8 24.7C7.9 25.4 8.5 26 9.2 26L34.6 25.9C35.4 25.9 35.9 25.5 35.8 24.9L33.5 8.7C33.4 8.1 32.7 7.5 32 7.4L27.9 6.9 27.9 5.7C27.9 5.7 27.9 1.2 21.9 0.2 15.9-0.9 15.9 4 15.9 4L15.9 5.2C15.9 5.9 16.5 6.5 17.2 6.6L23.9 7.5 23.9 6.3 17.2 5.4 17.2 4.2C17.2 4.2 17.2 0.5 21.9 1.3 26.6 2.1 26.6 5.5 26.6 5.5L26.6 6.7C26.6 7.3 27.2 7.9 27.9 8L32 8.5 34.4 24.9 9.4 24.7 11.9 5.9 13.2 6.1 13.2 4.8 10.5 4.5 8 24.7Z" }),
							(0, _mithril2.default)("path", {
								d: "M19.7 19.6L17.3 19.6 17.4 18.8 15.6 18.7 16.8 12.3 20.4 12.9 19.7 19.6ZM18.9 13.1L18.4 17.2 17.9 17.1 18.4 13 17.3 12.9 16.4 18.3 18.2 18.4 18.1 19.1 19.4 19.1 20 13.3 18.9 13.1ZM23.8 19.7L21.4 19.7 21.5 19 19.7 18.9 20.3 12.9 24 13.5 23.8 19.7ZM22.4 13.7L22.2 17.4 21.7 17.4 21.9 13.6 20.7 13.4 20.3 18.5 22.1 18.6 22.1 19.2 23.4 19.3 23.5 13.9 22.4 13.7ZM27.6 14.2L28 19.9 23.7 19.7 23.8 13.5 27.6 14.2ZM24 14L23.9 19.3 27 19.4 26.8 14.4 24 14ZM25.6 15.2L25.7 18.3 25.2 18.3 25.2 15.2 25.6 15.2Z",
								style: "stroke-width:0.5;stroke:#fff"
							})
						),
						(0, _mithril2.default)("rect", {
							transform: "translate(-16 -12)translate(10 9)translate(6 3)translate(6.178707 7.702437)rotate(8)",
							x: "-2.8",
							y: "-0.8",
							width: "5.5",
							height: "1.5",
							"class": "a"
						}),
						(0, _mithril2.default)("rect", {
							transform: "translate(-16 -12)translate(10 9)translate(6 3)translate(4.087669 13.256233)rotate(8)",
							x: "-4",
							y: "-0.8",
							width: "8",
							height: "1.5",
							"class": "a"
						}),
						(0, _mithril2.default)("rect", {
							transform: "translate(-16 -12)translate(10 9)translate(6 3)translate(4.743779 18.87894)rotate(7)",
							x: "-2.8",
							y: "-0.8",
							width: "5.5",
							height: "1.5",
							"class": "a",
							fill: "#fff"
						})
					)
				);
			case "facebook":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						viewBox: "0 0 32 32",
						role: "presentation",
						"aria-hidden": "true",
						focusable: "false"
					}, vnode.attrs),
					(0, _mithril2.default)("path", {
						"fill-rule": "evenodd",
						d: "M8 14.408v-4.165c0-.424.35-.812.77-.812h2.519V7.347c0-4.84 2.484-7.311 7.42-7.347 1.645 0 3.219.212 4.692.636.455.141.63.424.595.883l-.56 4.062c-.035.178-.14.354-.315.531-.21.105-.42.176-.63.14-.875-.247-1.784-.352-2.799-.352-1.399 0-1.61.283-1.61 1.73v1.8H22.6c.42 0 .805.423.805.883l-.349 4.17c0 .422-.35.705-.77.705H18.08v16c0 .424-.349.812-.769.812h-5.213c-.42 0-.804-.388-.804-.812V15.185h-2.52A.781.781 0 0 1 8 14.408"
					})
				);
			case "google":
				return (0, _mithril2.default)(
					"svg",
					{ width: "30px", height: "30px", viewBox: "10 10 25 25", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
					(0, _mithril2.default)(
						"title",
						null,
						"btn_google_light_normal_ios"
					),
					(0, _mithril2.default)(
						"desc",
						null,
						"Created with Sketch."
					),
					(0, _mithril2.default)(
						"defs",
						null,
						(0, _mithril2.default)(
							"filter",
							{ x: "-50%", y: "-50%", width: "200%", height: "200%", filterUnits: "objectBoundingBox", id: "filter-1" },
							(0, _mithril2.default)("feOffset", { dx: "0", dy: "1", "in": "SourceAlpha", result: "shadowOffsetOuter1" }),
							(0, _mithril2.default)("feGaussianBlur", { stdDeviation: "0.5", "in": "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
							(0, _mithril2.default)("feColorMatrix", { values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0", "in": "shadowBlurOuter1", type: "matrix", result: "shadowMatrixOuter1" }),
							(0, _mithril2.default)("feOffset", { dx: "0", dy: "0", "in": "SourceAlpha", result: "shadowOffsetOuter2" }),
							(0, _mithril2.default)("feGaussianBlur", { stdDeviation: "0.5", "in": "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
							(0, _mithril2.default)("feColorMatrix", { values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0", "in": "shadowBlurOuter2", type: "matrix", result: "shadowMatrixOuter2" }),
							(0, _mithril2.default)(
								"feMerge",
								null,
								(0, _mithril2.default)("feMergeNode", { "in": "shadowMatrixOuter1" }),
								(0, _mithril2.default)("feMergeNode", { "in": "shadowMatrixOuter2" }),
								(0, _mithril2.default)("feMergeNode", { "in": "SourceGraphic" })
							)
						),
						(0, _mithril2.default)("rect", { id: "path-2", x: "0", y: "0", width: "40", height: "40", rx: "2" })
					),
					(0, _mithril2.default)(
						"g",
						{ id: "Google-Button", stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
						(0, _mithril2.default)("g", { id: "9-PATCH", transform: "translate(-608.000000, -160.000000)" }),
						(0, _mithril2.default)(
							"g",
							{ id: "btn_google_light_normal", transform: "translate(-1.000000, -1.000000)" },
							(0, _mithril2.default)(
								"g",
								{ id: "button", transform: "translate(4.000000, 4.000000)", filter: "url(#filter-1)" },
								(0, _mithril2.default)(
									"g",
									{ id: "button-bg" },
									(0, _mithril2.default)("use", { fill: "#FFFFFF", "fill-rule": "evenodd" }),
									(0, _mithril2.default)("use", { fill: "none" }),
									(0, _mithril2.default)("use", { fill: "none" }),
									(0, _mithril2.default)("use", { fill: "none" })
								)
							),
							(0, _mithril2.default)(
								"g",
								{ id: "logo_googleg_48dp", transform: "translate(15.000000, 15.000000)" },
								(0, _mithril2.default)("path", { d: "M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z", id: "Shape", fill: "#4285F4" }),
								(0, _mithril2.default)("path", { d: "M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z", id: "Shape", fill: "#34A853" }),
								(0, _mithril2.default)("path", { d: "M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z", id: "Shape", fill: "#FBBC05" }),
								(0, _mithril2.default)("path", { d: "M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z", id: "Shape", fill: "#EA4335" }),
								(0, _mithril2.default)("path", { d: "M0,0 L18,0 L18,18 L0,18 L0,0 Z", id: "Shape" })
							),
							(0, _mithril2.default)("g", { id: "handles_square" })
						)
					)
				);
			case "email":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						viewBox: "0 0 24 24",
						role: "presentation",
						"aria-hidden": "true",
						focusable: "false",
						style: "fill: currentcolor;"
					}, vnode.attrs),
					(0, _mithril2.default)("path", {
						"fill-rule": "evenodd",
						d: "M22.497 4H1.503C.665 4 0 4.673 0 5.507v12.985C0 19.326.672 20 1.503 20h20.994A1.5 1.5 0 0 0 24 18.492V5.507C24 4.674 23.328 4 22.497 4zM23 18.203l-6.141-7.907L23 5.628v12.575zM22.174 5l-9.685 7.362c-.259.196-.719.196-.977 0L1.827 5h20.347zM1 5.628l6.14 4.667L1 18.185V5.629zM1.634 19l6.302-8.1 2.97 2.258c.616.468 1.572.468 2.188 0l2.969-2.257L22.353 19H1.633z"
					})
				);
			case "location":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						width: "17",
						height: "25",
						version: "1.1",
						id: "Capa_1",
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 54.757 54.757",
						style: "enable-background:new 0 0 54.757 54.757;"

					}, vnode.attrs),
					(0, _mithril2.default)("path", { d: "M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5\r s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z" }),
					(0, _mithril2.default)("path", { d: "M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952\r L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4\r C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031\r C45.576,13.08,46.321,24.468,41.099,31.431z" })
				);
			case "search":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						version: "1.1",
						id: "Capa_1",
						xmlns: "http://www.w3.org/2000/svg",
						x: "0px",
						y: "0px",
						viewBox: "0 0 56.966 56.966",
						style: "enable-background:new 0 0 56.966 56.966; "
					}, vnode.attrs),
					(0, _mithril2.default)("path", {
						d: "M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23\r s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92\r c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17\r s-17-7.626-17-17S14.61,6,23.984,6z",
						fill: "gray"
					})
				);
			case "down":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						version: "1.1",
						id: "Capa_1",
						xmlns: "http://www.w3.org/2000/svg",
						x: "0px",
						y: "0px",
						viewBox: "0 0 256 256",
						style: "enable-background:new 0 0 256 256;"
					}, vnode.attrs),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("polygon", { points: "225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" })
						)
					)
				);

			case "up":
				return (0, _mithril2.default)(
					"svg",
					_extends({
						version: "1.1",
						id: "Capa_1",
						xmlns: "http://www.w3.org/2000/svg",
						x: "0px",
						y: "0px",
						viewBox: "0 0 256 256",
						style: "enable-background:new 0 0 256 256;"
					}, vnode.attrs),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("polygon", { points: "128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907 \t\t" })
						)
					)
				);
			case "bag":
				return (0, _mithril2.default)(
					"svg",
					_extends({}, vnode.attrs, { viewBox: "0 0 19 18", version: "1.1" }),
					(0, _mithril2.default)(
						"g",
						{
							id: "Welcome",
							stroke: "none",
							"stroke-width": "1",
							fill: "none",
							"fill-rule": "evenodd"
						},
						(0, _mithril2.default)(
							"g",
							{
								id: "Mobile-Portrait-Copy-2",
								transform: "translate(-179.000000, -730.000000)",
								"fill-rule": "nonzero",
								fill: "#000000"
							},
							(0, _mithril2.default)(
								"g",
								{
									id: "shopping-basket-button-copy",
									transform: "translate(179.000000, 730.000000)"
								},
								(0, _mithril2.default)("path", {
									d: "M14.1167266,6.59969262 L10.282554,0.391905738 C10.1082392,0.203790984 9.84685252,0.0156762295 9.58543165,0.0156762295 C9.32401079,0.0156762295 9.06258993,0.109733607 8.88830935,0.391905738 L5.05413669,6.59969262 L0.871402878,6.59969262 C0.348561151,6.59969262 0,6.97592213 0,7.54026639 L0,7.82243852 L2.17850719,16.5697746 C2.35278777,17.3222336 3.04991007,17.9806352 3.83417266,17.9806352 L15.1624101,17.9806352 C15.9466727,17.9806352 16.643795,17.416291 16.8180755,16.5697746 L18.9965827,7.82243852 L18.9965827,7.54026639 C18.9965827,6.97592213 18.6480216,6.59969262 18.1251799,6.59969262 L14.1167266,6.59969262 Z M6.97122302,6.59969262 L9.58543165,2.46116803 L12.1996403,6.59969262 L6.97122302,6.59969262 Z M9.58543165,14.1242828 C8.62688849,14.1242828 7.8426259,13.2777664 7.8426259,12.2431352 C7.8426259,11.2085041 8.62688849,10.3619877 9.58543165,10.3619877 C10.5439748,10.3619877 11.3282374,11.2085041 11.3282374,12.2431352 C11.3282374,13.2777664 10.5439748,14.1242828 9.58543165,14.1242828 Z",
									id: "Shape"
								})
							)
						)
					)
				);
			case "wishlist":
				return (0, _mithril2.default)(
					"svg",
					_extends({}, vnode.attrs, { viewBox: "0 0 25 15" }),
					(0, _mithril2.default)(
						"g",
						{ id: "Welcome", stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
						(0, _mithril2.default)(
							"g",
							{ id: "Mobile-Portrait-Copy-2", transform: "translate(-23.000000, -732.000000)", "fill-rule": "nonzero", fill: "#030104" },
							(0, _mithril2.default)(
								"g",
								{ id: "add-to-list-copy", transform: "translate(23.000000, 732.500000)" },
								(0, _mithril2.default)("path", { d: "M10,7 C10,7.784 9.45,8.4 8.75,8.4 L1.25,8.4 C0.55,8.4 0,7.784 0,7 C0,6.216 0.55,5.6 1.25,5.6 L8.75,5.6 C9.45,5.6 10,6.216 10,7 Z M8.75,11.2 L1.25,11.2 C0.55,11.2 0,11.816 0,12.6 C0,13.384 0.55,14 1.25,14 L8.75,14 C9.45,14 10,13.384 10,12.6 C10,11.816 9.45,11.2 8.75,11.2 Z M24.25,5.6 L20,5.6 L20,0.84 C20,0.056 19.45,0 18.75,0 C18.05,0 17.5,0.056 17.5,0.84 L17.5,5.6 L13.375,5.6 C12.675,5.6 12.625,6.216 12.625,7 C12.625,7.784 12.675,8.4 13.375,8.4 L17.5,8.4 L17.5,13.16 C17.5,13.944 18.05,14 18.75,14 C19.45,14 20,13.944 20,13.16 L20,8.4 L24.25,8.4 C24.95,8.4 25,7.784 25,7 C25,6.216 24.95,5.6 24.25,5.6 Z M8.75,0 L1.25,0 C0.55,0 0,0.616 0,1.4 C0,2.184 0.55,2.8 1.25,2.8 L8.75,2.8 C9.45,2.8 10,2.184 10,1.4 C10,0.616 9.45,0 8.75,0 Z", id: "Shape" })
							)
						)
					)
				);
			case "logout":
				return (0, _mithril2.default)(
					"svg",
					{ version: "1.1", id: "Capa_1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px",
						viewBox: "0 0 490.667 490.667", style: "enable-background:new 0 0 490.667 490.667;" },
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("path", { d: "M330.667,192c5.888,0,10.667-4.779,10.667-10.667v-128C341.333,23.936,317.419,0,288,0H53.333C23.915,0,0,23.936,0,53.333\r v384c0,29.397,23.915,53.333,53.333,53.333H288c29.419,0,53.333-23.936,53.333-53.333v-128c0-5.888-4.779-10.667-10.667-10.667\r S320,303.445,320,309.333v128c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32v-384c0-17.643,14.357-32,32-32H288\r c17.643,0,32,14.357,32,32v128C320,187.221,324.779,192,330.667,192z" })
						)
					),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("path", { d: "M480,234.667H138.667c-5.888,0-10.667,4.779-10.667,10.667S132.779,256,138.667,256H480\r c5.888,0,10.667-4.779,10.667-10.667S485.888,234.667,480,234.667z" })
						)
					),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("path", { d: "M487.531,237.824l-64-64c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l56.448,56.448l-56.448,56.448\r c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.093l64-64\r C491.691,248.747,491.691,241.984,487.531,237.824z" })
						)
					)
				);

			case "loader":
				return (0, _mithril2.default)(
					"div",
					{ "class": "dib w-100 tc" },
					(0, _mithril2.default)(
						"svg",
						{ width: "38", height: "38", viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg" },
						(0, _mithril2.default)(
							"defs",
							null,
							(0, _mithril2.default)(
								"linearGradient",
								{ x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%", id: "a" },
								(0, _mithril2.default)("stop", { "stop-color": "#000", "stop-opacity": "0", offset: "0%" }),
								(0, _mithril2.default)("stop", { "stop-color": "#000", "stop-opacity": ".631", offset: "63.146%" }),
								(0, _mithril2.default)("stop", { "stop-color": "#000", offset: "100%" })
							)
						),
						(0, _mithril2.default)(
							"g",
							{ fill: "none", "fill-rule": "evenodd" },
							(0, _mithril2.default)(
								"g",
								{ transform: "translate(1 1)" },
								(0, _mithril2.default)(
									"path",
									{ d: "M36 18c0-9.94-8.06-18-18-18", id: "Oval-2", stroke: "url(#a)", "stroke-width": "2" },
									(0, _mithril2.default)("animateTransform", {
										attributeName: "transform",
										type: "rotate",
										from: "0 18 18",
										to: "360 18 18",
										dur: "0.9s",
										repeatCount: "indefinite" })
								),
								(0, _mithril2.default)(
									"circle",
									{ fill: "#fff", cx: "36", cy: "18", r: "1" },
									(0, _mithril2.default)("animateTransform", {
										attributeName: "transform",
										type: "rotate",
										from: "0 18 18",
										to: "360 18 18",
										dur: "0.9s",
										repeatCount: "indefinite" })
								)
							)
						)
					)
				);
			case "phone":
				return (0, _mithril2.default)(
					"svg",
					_extends({ version: "1.1", id: "Capa_1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px",
						viewBox: "0 0 29.731 29.731", style: "enable-background:new 0 0 29.731 29.731;" }, vnode.attrs),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)("path", { d: "M23.895,29.731c-1.237,0-2.731-0.31-4.374-0.93c-3.602-1.358-7.521-4.042-11.035-7.556\r c-3.515-3.515-6.199-7.435-7.558-11.037C-0.307,6.933-0.31,4.245,0.921,3.015c0.177-0.177,0.357-0.367,0.543-0.563\r c1.123-1.181,2.392-2.51,4.074-2.45C6.697,0.05,7.82,0.77,8.97,2.201c3.398,4.226,1.866,5.732,0.093,7.478l-0.313,0.31\r c-0.29,0.29-0.838,1.633,4.26,6.731c1.664,1.664,3.083,2.882,4.217,3.619c0.714,0.464,1.991,1.166,2.515,0.642l0.315-0.318\r c1.744-1.769,3.25-3.296,7.473,0.099c1.431,1.15,2.15,2.272,2.198,3.433c0.069,1.681-1.27,2.953-2.452,4.075\r c-0.195,0.186-0.385,0.366-0.562,0.542C26.103,29.424,25.126,29.731,23.895,29.731z M5.418,1C4.223,1,3.144,2.136,2.189,3.141\r C1.997,3.343,1.811,3.539,1.628,3.722C0.711,4.638,0.804,7.045,1.864,9.856c1.31,3.472,3.913,7.266,7.33,10.683\r c3.416,3.415,7.208,6.018,10.681,7.327c2.811,1.062,5.218,1.152,6.133,0.237c0.183-0.183,0.379-0.369,0.581-0.56\r c1.027-0.976,2.192-2.082,2.141-3.309c-0.035-0.843-0.649-1.75-1.825-2.695c-3.519-2.83-4.503-1.831-6.135-0.176l-0.32,0.323\r c-0.78,0.781-2.047,0.608-3.767-0.51c-1.193-0.776-2.667-2.038-4.379-3.751c-4.231-4.23-5.584-6.819-4.26-8.146l0.319-0.315\r c1.659-1.632,2.66-2.617-0.171-6.138C7.245,1.651,6.339,1.037,5.496,1.001C5.47,1,5.444,1,5.418,1z" })
					)
				);
			default:
				return "not found";
		}
	}
};

var Icon = exports.Icon = {

	view: function view(vnode) {
		var name = vnode.attrs.name;

		switch (name) {
			case "list":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg" }, vnode.attrs, { viewBox: "0 0 511.6 511.6" }),
					(0, _mithril2.default)("path", { d: "M118.8 201H27.4c-7.6 0-14.1 2.7-19.4 8C2.7 214.3 0 220.8 0 228.4v54.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h91.4c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4v-54.8c0-7.6-2.7-14.1-8-19.4S126.4 201 118.8 201z" }),
					(0, _mithril2.default)("path", { d: "M118.8 54.8H27.4c-7.6 0-14.1 2.7-19.4 8C2.7 68.1 0 74.6 0 82.2v54.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h91.4c7.6 0 14.1-2.7 19.4-8s8-11.8 8-19.4V82.2c0-7.6-2.7-14.1-8-19.4C132.9 57.5 126.4 54.8 118.8 54.8z" }),
					(0, _mithril2.default)("path", { d: "M118.8 347.2H27.4c-7.6 0-14.1 2.7-19.4 8C2.7 360.5 0 367 0 374.6v54.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h91.4c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4v-54.8c0-7.6-2.7-14.1-8-19.4S126.4 347.2 118.8 347.2z" }),
					(0, _mithril2.default)("path", { d: "M484.2 201H210.1c-7.6 0-14.1 2.7-19.4 8s-8 11.8-8 19.4v54.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h274.1c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4v-54.8c0-7.6-2.7-14.1-8-19.4C498.3 203.7 491.8 201 484.2 201z" }),
					(0, _mithril2.default)("path", { d: "M484.2 347.2H210.1c-7.6 0-14.1 2.7-19.4 8 -5.3 5.3-8 11.8-8 19.4v54.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h274.1c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4v-54.8c0-7.6-2.7-14.1-8-19.4C498.3 349.8 491.8 347.2 484.2 347.2z" }),
					(0, _mithril2.default)("path", { d: "M503.6 62.8c-5.3-5.3-11.8-8-19.4-8H210.1c-7.6 0-14.1 2.7-19.4 8s-8 11.8-8 19.4v54.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h274.1c7.6 0 14.1-2.7 19.4-8s8-11.8 8-19.4V82.2C511.6 74.6 509 68.1 503.6 62.8z" })
				);
			//break;
			case "home":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg" }, vnode.attrs, { viewBox: "0 0 39.4 39.4" }),
					(0, _mithril2.default)("path", { d: "M33.6 21v12.4c0 1.1-0.9 2-2 2H7.8c-1.1 0-2-0.9-2-2V21c0-0.7 0.4-1.3 0.9-1.7l11.9-7.4c0.6-0.4 1.5-0.4 2.1 0l11.9 7.4C33.3 19.6 33.6 20.3 33.6 21zM38.5 15.4L20.8 4.4c-0.6-0.4-1.5-0.4-2.1 0L0.9 15.4c-0.9 0.6-1.2 1.8-0.6 2.8 0.6 0.9 1.8 1.2 2.8 0.6L19.7 8.4l16.6 10.4c0.3 0.2 0.7 0.3 1.1 0.3 0.7 0 1.3-0.3 1.7-0.9C39.7 17.2 39.4 16 38.5 15.4z" })
				);
			case "user":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg" }, vnode.attrs, { viewBox: "0 0 258.8 258.8" }),
					(0, _mithril2.default)("circle", { cx: "129.4", cy: "60", r: "60" }),
					(0, _mithril2.default)("path", { d: "M129.4 150c-60.1 0-108.7 48.7-108.7 108.8h217.5C238.1 198.7 189.4 150 129.4 150z" })
				);
			case "search":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg"
					}, vnode.attrs, {
						viewBox: "0 0 250.3 250.3" }),
					(0, _mithril2.default)("path", { d: "M244.2 214.6l-54.4-54.4c-0.3-0.3-0.6-0.5-0.9-0.8 10.7-16.2 16.9-35.7 16.9-56.6C205.8 46.1 159.7 0 102.9 0S0 46.1 0 102.9c0 56.8 46.1 102.9 102.9 102.9 20.9 0 40.3-6.2 56.6-16.9 0.3 0.3 0.5 0.6 0.8 0.9l54.4 54.4c8.2 8.2 21.4 8.2 29.6 0C252.4 236 252.4 222.8 244.2 214.6zM102.9 170.1c-37.1 0-67.2-30.1-67.2-67.2 0-37.1 30.1-67.2 67.2-67.2 37.1 0 67.2 30.1 67.2 67.2C170.1 140 140 170.1 102.9 170.1z" })
				);
			case "search-online":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg" }, vnode.attrs, { viewBox: "0 0 512 512" }),
					(0, _mithril2.default)("path", { d: "M472.2 34.6H39.8C17.8 34.6 0 52.4 0 74.4v45.3c0 3.1 2.5 5.7 5.7 5.7h500.6c3.1 0 5.7-2.5 5.7-5.7V74.4C512 52.4 494.2 34.6 472.2 34.6zM71.8 92.8c-7.1 0-12.8-5.7-12.8-12.8s5.7-12.8 12.8-12.8c7.1 0 12.8 5.7 12.8 12.8C84.6 87.1 78.9 92.8 71.8 92.8zM113 92.8c-7.1 0-12.8-5.7-12.8-12.8s5.7-12.8 12.8-12.8 12.8 5.7 12.8 12.8C125.8 87.1 120 92.8 113 92.8zM154.1 92.8c-7.1 0-12.8-5.7-12.8-12.8s5.7-12.8 12.8-12.8c7.1 0 12.8 5.7 12.8 12.8C166.9 87.1 161.2 92.8 154.1 92.8z" }),
					(0, _mithril2.default)("path", { d: "M353.3 286.9c-7.2 7.2-7.2 18.9 0 26.1 7.2 7.2 18.9 7.2 26.1 0 7.2-7.2 7.2-18.9 0-26.1C372.2 279.7 360.5 279.7 353.3 286.9z" }),
					(0, _mithril2.default)("path", { d: "M506.3 148.2H5.7c-3.1 0-5.7 2.5-5.7 5.7v283.7c0 22 17.8 39.8 39.8 39.8h432.4c22 0 39.8-17.8 39.8-39.8V153.8C512 150.7 509.5 148.2 506.3 148.2zM300.2 366.8H90.2c-6.3 0-11.4-5.1-11.4-11.4 0-6.3 5.1-11.4 11.4-11.4h210c6.3 0 11.4 5.1 11.4 11.4C311.5 361.7 306.4 366.8 300.2 366.8zM429.9 363.5c-4.4 4.4-11.6 4.4-16.1 0l-27.5-27.5c-15.8 8.7-35.9 6.3-49.1-6.9 -16.1-16.1-16.1-42.2 0-58.3 16.1-16.1 42.2-16.1 58.3 0 13.3 13.3 15.6 33.4 6.9 49.1l27.5 27.5C434.3 351.8 434.3 359 429.9 363.5z" })
				);
			case "front-store-black":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg"
					}, vnode.attrs, { viewBox: "0 0 459 459" }),
					(0, _mithril2.default)("path", { d: "M433.5 25.5h-408v51h408V25.5zM459 280.5v-51L433.5 102h-408L0 229.5v51h25.5v153h255v-153h102v153h51v-153H459zM229.5 382.5h-153v-102h153V382.5z" })
				);
			case "shopper-at-store":
				return (0, _mithril2.default)(
					"svg",
					_extends({}, vnode.attrs, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 488.2 488.2" }),
					(0, _mithril2.default)("path", { d: "M340.8 121.2c0 3 2.4 5.4 5.4 5.4h15.9c3 0 5.4-2.4 5.4-5.4V93h-26.8V121.2z" }),
					(0, _mithril2.default)("path", { d: "M277.1 228c1.9 0.8 3.9 1.1 5.9 1.1 6.6 0 12.9-4 15.4-10.6l12-31.4v5.3h19.3V136.5 94.4v-1.4h-4.9c0 0 0 0 0 0 -8.6 0-14.9 2.8-17.6 10.1L267.6 206.7c-0.9 2.3-1.1 4.6-1 6.9 4.3 3.7 7.7 8.4 9.7 13.9C276.6 227.6 276.8 227.9 277.1 228z" }),
					(0, _mithril2.default)("path", { d: "M354.2 78.7c19 0 34.4-17.6 34.4-39.3C388.6 17.6 373.2 0 354.2 0c-19 0-34.4 17.6-34.4 39.3C319.8 61.1 335.2 78.7 354.2 78.7z" }),
					(0, _mithril2.default)("path", { d: "M131.5 154c20 0 36.3-18.6 36.3-41.5 0-22.9-16.2-41.5-36.3-41.5 -20 0-36.2 18.6-36.2 41.5C95.3 135.4 111.5 154 131.5 154z" }),
					(0, _mithril2.default)("path", { d: "M398.2 187.5l11.8 31c2.5 6.6 8.8 10.6 15.4 10.6 2 0 3.9-0.3 5.9-1.1 8.5-3.2 12.8-12.8 9.6-21.3l-39.5-103.5c-2.8-7.3-9.7-10.1-17.6-10.1h-4.9v99.3h19.3L398.2 187.5z" }),
					(0, _mithril2.default)("path", { d: "M469.2 234.8h-71l-0.1-30.9h-13.2v25.6c0 2-0.8 3.8-2 5.3h-57.5c-1.2-1.5-2-3.3-2-5.3v-25.6h-13.1v30.9h-32.2c0 0.2 0.1 0.3 0.1 0.5 1.7 14-5.4 27.1-16.9 33.7h190.7v79.1H432.9v-15.1c0-6.3-5.1-11.4-11.4-11.4h-17.7v-14c0-6.3-5.1-11.4-11.4-11.4h-39.5c-6.3 0-11.4 5.1-11.4 11.4v14h-13.6c-6.3 0-11.4 5.1-11.4 11.4v15.1h-37.2v-15.1c0-6.3-5.1-11.4-11.4-11.4h-34.4c-6.3 0-11.4 5.1-11.4 11.4v15.1h-44.4l0.3-79.1v-33.2l12.4 18.2c3.3 4.8 8.7 7.6 14.4 7.6 0.7 0 1.4 0 2.1-0.1l39.8-4.8c9.5-1.1 16.3-9.8 15.2-19.4 -1.2-9.5-9.6-16.4-19.4-15.2l-29.3 3.5 -33.7-49.4c-4.1-6.1-10.7-7.1-18.2-7.1h-60.5c-8.8 0-16 3.1-18.8 11L42 289.7c-2.8 7.8 0.5 16 7.1 20.3v35.9H13.3c-3.9 0-7.5 2-9.6 5.2 -2.1 3.3-2.4 7.4-0.8 10.9l23.9 53c1.8 4.1 5.9 6.7 10.4 6.7h48.4v45.6c0 11.5 9.3 20.9 20.9 20.9 11.5 0 20.9-9.3 20.9-20.9V349.5h8.3v117.8c0 11.5 9.4 20.9 20.9 20.9 11.5 0 20.9-9.3 20.9-20.9v-5.1h288.3c11.3 0 20.6-9.2 20.6-20.6V251.9C486.3 242.4 478.7 234.8 469.2 234.8zM66.3 345.9v-35c3.8-1.9 6.9-5.1 8.5-9.4l10.6-29.2 0.4 73.6H66.3zM452.1 428.1h-48.3v-7.6c0-6.3-5.1-11.4-11.4-11.4h-24.8v-9.8c0-6.3-5.1-11.4-11.4-11.4h-57.3c-6.3 0-11.4 5.1-11.4 11.4v28.8h-36.9v-17.1c0-6.3-5.1-11.4-11.4-11.4h-37.5c-6.3 0-11.4 5.1-11.4 11.4v17.1h-12.7v-62.9h274.6V428.1z" })
				);
			case "close":
				return (0, _mithril2.default)(
					"svg",
					_extends({ xmlns: "http://www.w3.org/2000/svg"
					}, vnode.attrs, {
						viewBox: "0 0 23.3 23.3" }),
					(0, _mithril2.default)("path", { d: "M16 11.7L22.6 5.1c1-1 1-2.5 0-3.5l-0.9-0.9c-1-1-2.5-1-3.5 0L11.7 7.3 5.1 0.7c-1-1-2.5-1-3.5 0L0.7 1.6c-1 1-1 2.5 0 3.5l6.6 6.6 -6.6 6.6c-1 1-1 2.5 0 3.5l0.9 0.9c1 1 2.5 1 3.5 0l6.6-6.6 6.6 6.6c1 1 2.5 1 3.5 0l0.9-0.9c1-1 1-2.5 0-3.5L16 11.7z" })
				);
			case "location":
				return (0, _mithril2.default)(
					"svg",
					_extends({}, vnode.attrs, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 54.8 54.8" }),
					(0, _mithril2.default)("path", { d: "M27.6 12c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7S31.4 12 27.6 12zM27.6 24c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5S30.3 24 27.6 24z" }),
					(0, _mithril2.default)("path", { d: "M40.9 5.6C37.3 2 32.5 0 27.4 0c-5.1 0-9.9 2-13.6 5.6 -6.7 6.7-7.5 19.3-1.8 27L27.4 54.8 42.7 32.6C48.5 24.9 47.6 12.3 40.9 5.6zM41.1 31.4L27.4 51.2 13.6 31.4C8.4 24.5 9.2 13.1 15.2 7 18.5 3.8 22.8 2 27.4 2s8.9 1.8 12.1 5C45.6 13.1 46.3 24.5 41.1 31.4z" })
				);
			case "add-to-list":
				return (0, _mithril2.default)(
					"svg",
					_extends({}, vnode.attrs, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" }),
					(0, _mithril2.default)("path", { d: "M40 50c0 2.8-2.2 5-5 5H5c-2.8 0-5-2.2-5-5s2.2-5 5-5h30C37.8 45 40 47.2 40 50zM35 65H5c-2.8 0-5 2.2-5 5s2.2 5 5 5h30c2.8 0 5-2.2 5-5S37.8 65 35 65zM97 45H80V28c0-2.8-2.2-3-5-3s-5 0.2-5 3v17H53.5c-2.8 0-3 2.2-3 5s0.2 5 3 5H70v17c0 2.8 2.2 3 5 3s5-0.2 5-3V55h17c2.8 0 3-2.2 3-5S99.8 45 97 45zM35 25H5c-2.8 0-5 2.2-5 5s2.2 5 5 5h30c2.8 0 5-2.2 5-5S37.8 25 35 25z" })
				);
			case "cart":
				return (0, _mithril2.default)(
					"svg",
					_extends({}, vnode.attrs, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 90" }),
					(0, _mithril2.default)("path", { d: "M43.5 72.8c-2.6 0-4.7 2.1-4.7 4.8 0 2.6 2.1 4.8 4.8 4.8s4.8-2.1 4.8-4.7C48.3 74.9 46.1 72.8 43.5 72.8zM72.3 72.8c-2.6 0-4.7 2.1-4.7 4.8 0 2.6 2.1 4.8 4.8 4.8s4.8-2.1 4.8-4.7C77.1 74.9 75 72.8 72.3 72.8zM29.5 29.5l-3.8-11.7H5.4l2 7h13.2l14.3 43.6H81.4l13.3-38.9H29.5z" })
				);
			default:
				return "";
		}
	}
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* iziToast | v1.2.0
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
(function (root, factory) {
	if(true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if(typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.iziToast = factory(root);
	}
})(typeof global !== 'undefined' ? global : window || this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//
	var $iziToast = {},
		PLUGIN_NAME = 'iziToast',
		BODY = document.querySelector('body'),
		ISMOBILE = (/Mobi/.test(navigator.userAgent)) ? true : false,
		ISCHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
		ISFIREFOX = typeof InstallTrigger !== 'undefined',
		ACCEPTSTOUCH = 'ontouchstart' in document.documentElement,
		POSITIONS = ['bottomRight','bottomLeft','bottomCenter','topRight','topLeft','topCenter','center'],
		THEMES = {
			info: {
				color: 'blue',
				icon: 'ico-info'
			},
			success: {
				color: 'green',
				icon: 'ico-success'
			},
			warning: {
				color: 'orange',
				icon: 'ico-warning'
			},
			error: {
				color: 'red',
				icon: 'ico-error'
			},
			question: {
				color: 'yellow',
				icon: 'ico-question'
			}
		},
		MOBILEWIDTH = 568,
		CONFIG = {};


	// Default settings
	var defaults = {
		id: null, 
		class: '',
		title: '',
		titleColor: '',
		titleSize: '',
		titleLineHeight: '',
		message: '',
		messageColor: '',
		messageSize: '',
		messageLineHeight: '',
		backgroundColor: '',
		theme: 'light', // dark
		color: '', // blue, red, green, yellow
		icon: '',
		iconText: '',
		iconColor: '',
		image: '',
		imageWidth: 50,
		maxWidth: null,
		zindex: null,
		layout: 1,
		balloon: false,
		close: true,
		closeOnEscape: false,
		rtl: false,
		position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
		target: '',
		targetFirst: true,
		toastOnce: false,
		timeout: 5000,
		animateInside: true,
		drag: true,
		pauseOnHover: true,
		resetOnHover: false,
		progressBar: true,
		progressBarColor: '',
		progressBarEasing: 'linear',
		overlay: false,
		overlayClose: false,
		overlayColor: 'rgba(0, 0, 0, 0.6)',
		transitionIn: 'fadeInUp', // bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX
		transitionOut: 'fadeOut', // fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
		transitionInMobile: 'fadeInUp',
		transitionOutMobile: 'fadeOutDown',
		buttons: {},
		onOpening: function () {},
		onOpened: function () {},
		onClosing: function () {},
		onClosed: function () {}
	};

	//
	// Methods
	//


	/**
	 * Polyfill for remove() method
	 */
	if(!('remove' in Element.prototype)) {
	    Element.prototype.remove = function() {
	        if(this.parentNode) {
	            this.parentNode.removeChild(this);
	        }
	    };
	}

	/*
     * Polyfill for CustomEvent for IE >= 9
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
     */
    if(typeof window.CustomEvent !== 'function') {
        var CustomEventPolyfill = function (event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        CustomEventPolyfill.prototype = window.Event.prototype;

        window.CustomEvent = CustomEventPolyfill;
    } 

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if(Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if(Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			if(collection){
				for (var i = 0, len = collection.length; i < len; i++) {
					callback.call(scope, collection[i], i, collection);
				}
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function (defaults, options) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};


	/**
	 * Create a fragment DOM elements
	 * @private
	 */
	var createFragElem = function(htmlStr) {
		var frag = document.createDocumentFragment(),
			temp = document.createElement('div');
		temp.innerHTML = htmlStr;
		while (temp.firstChild) {
			frag.appendChild(temp.firstChild);
		}
		return frag;
	};


	/**
	 * Check if is a color
	 * @private
	 */
	var isColor = function(color){
		if( color.substring(0,1) == '#' || color.substring(0,3) == 'rgb' || color.substring(0,3) == 'hsl' ){
			return true;
		} else {
			return false;
		}
	};


	/**
	 * Check if is a Base64 string
	 * @private
	 */
	var isBase64 = function(str) {
	    try {
	        return btoa(atob(str)) == str;
	    } catch (err) {
	        return false;
	    }
	};


	/**
	 * Drag method of toasts
	 * @private
	 */
	var drag = function() {
	    
	    return {
	        move: function(toast, instance, settings, xpos) {

	        	var opacity,
	        		opacityRange = 0.3,
	        		distance = 180;
	            
	            if(xpos !== 0){
	            	
	            	toast.classList.add(PLUGIN_NAME+'-dragged');

	            	toast.style.transform = 'translateX('+xpos + 'px)';

		            if(xpos > 0){
		            	opacity = (distance-xpos) / distance;
		            	if(opacity < opacityRange){
							instance.hide(toast, extend(settings, { transitionOut: 'fadeOutRight', transitionOutMobile: 'fadeOutRight' }), 'drag');
						}
		            } else {
		            	opacity = (distance+xpos) / distance;
		            	if(opacity < opacityRange){
							instance.hide(toast, extend(settings, { transitionOut: 'fadeOutLeft', transitionOutMobile: 'fadeOutLeft' }), 'drag');
						}
		            }
					toast.style.opacity = opacity;
			
					if(opacity < opacityRange){

						if(ISCHROME || ISFIREFOX)
							toast.style.left = xpos+'px';

						toast.parentNode.style.opacity = opacityRange;

		                this.stopMoving(toast, null);
					}
	            }

				
	        },
	        startMoving: function(toast, instance, settings, e) {

	            e = e || window.event;
	            var posX = ((ACCEPTSTOUCH) ? e.touches[0].clientX : e.clientX),
	                toastLeft = toast.style.transform.replace('px)', '');
	                toastLeft = toastLeft.replace('translateX(', '');
	            var offsetX = posX - toastLeft;

				toast.classList.remove(settings.transitionIn);
				toast.classList.remove(settings.transitionInMobile);
				toast.style.transition = '';

	            if(ACCEPTSTOUCH) {
	                document.ontouchmove = function(e) {
	                    e.preventDefault();
	                    e = e || window.event;
	                    var posX = e.touches[0].clientX,
	                        finalX = posX - offsetX;
                        drag.move(toast, instance, settings, finalX);
	                };
	            } else {
	                document.onmousemove = function(e) {
	                    e.preventDefault();
	                    e = e || window.event;
	                    var posX = e.clientX,
	                        finalX = posX - offsetX;
                        drag.move(toast, instance, settings, finalX);
	                };
	            }

	        },
	        stopMoving: function(toast, e) {

	            if(ACCEPTSTOUCH) {
	                document.ontouchmove = function() {};
	            } else {
	            	document.onmousemove = function() {};
	            }

				toast.style.opacity = '';
				toast.style.transform = '';

	            if(toast.classList.contains(PLUGIN_NAME+'-dragged')){
	            	
	            	toast.classList.remove(PLUGIN_NAME+'-dragged');

					toast.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
					setTimeout(function() {
						toast.style.transition = '';
					}, 400);
	            }

	        }
	    };

	}();


	/**
	 * Destroy the current initialization.
	 * @public
	 */
	$iziToast.destroy = function () {

		forEach(document.querySelectorAll('.'+PLUGIN_NAME+'-wrapper'), function(element, index) {
			element.remove();
		});

		forEach(document.querySelectorAll('.'+PLUGIN_NAME), function(element, index) {
			element.remove();
		});

		// Remove event listeners
		document.removeEventListener(PLUGIN_NAME+'-opened', {}, false);
		document.removeEventListener(PLUGIN_NAME+'-opening', {}, false);
		document.removeEventListener(PLUGIN_NAME+'-closing', {}, false);
		document.removeEventListener(PLUGIN_NAME+'-closed', {}, false);
		document.removeEventListener('keyup', {}, false);

		// Reset variables
		CONFIG = {};
	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	$iziToast.settings = function (options) {

		// Destroy any existing initializations
		$iziToast.destroy();

		CONFIG = options;
		defaults = extend(defaults, options || {});
	};


	/**
	 * Building themes functions.
	 * @public
	 * @param {Object} options User settings
	 */
	forEach(THEMES, function (theme, name) {

		$iziToast[name] = function (options) {

			var settings = extend(CONFIG, options || {});
			settings = extend(theme, settings || {});

			this.show(settings);
		};

	});


	/**
	 * Do the calculation to move the progress bar
	 * @private
	 */
	 $iziToast.progress = function ($toast, options, callback) {

		var that = this,
			settings = extend(that.settings, options || {}),
			$elem = $toast.querySelector('.'+PLUGIN_NAME+'-progressbar div');

	    return {
	        start: function() {

	        	if($elem !== null){
					$elem.style.transition = 'width '+ settings.timeout +'ms '+settings.progressBarEasing;
					$elem.style.width = '0%';
				}
	        	settings.TIME.START = new Date().getTime();
	        	settings.TIME.END = settings.TIME.START + settings.timeout;
				settings.TIME.TIMER = setTimeout(function() {

					clearTimeout(settings.TIME.TIMER);

					if(!$toast.classList.contains(PLUGIN_NAME+'-closing')){

						that.hide($toast, settings, 'timeout');

						if(typeof callback === 'function'){
							callback.apply(that);
						}
					}

				}, settings.timeout);
				
	        },
	        pause: function() {

				settings.TIME.REMAINING = settings.TIME.END - new Date().getTime();

				clearTimeout(settings.TIME.TIMER);

				if($elem !== null){
					var computedStyle = window.getComputedStyle($elem),
						propertyWidth = computedStyle.getPropertyValue('width');

					$elem.style.transition = 'none';
					$elem.style.width = propertyWidth;					
				}

				if(typeof callback === 'function'){
					setTimeout(function() {
						callback.apply(that);						
					}, 10);
				}

	        },
	        resume: function() {

	        	if($elem !== null){
					$elem.style.transition = 'width '+ settings.TIME.REMAINING +'ms '+settings.progressBarEasing;
					$elem.style.width = '0%';
				}

	        	settings.TIME.END = new Date().getTime() + settings.TIME.REMAINING;
				settings.TIME.TIMER = setTimeout(function() {

					clearTimeout(settings.TIME.TIMER);

					if(!$toast.classList.contains(PLUGIN_NAME+'-closing')){

						that.hide($toast, settings, 'timeout');

						if(typeof callback === 'function'){
							callback.apply(that);
						}
					}


				}, settings.TIME.REMAINING);

	        },
	        reset: function(){

				clearTimeout(settings.TIME.TIMER);

				if($elem !== null){
					$elem.style.transition = 'none';
					$elem.style.width = '100%';
				}

				if(typeof callback === 'function'){
					setTimeout(function() {
						callback.apply(that);						
					}, 10);
				}

	        }
	    };

	};


	/**
	 * Close the specific Toast
	 * @public
	 * @param {Object} options User settings
	 */
	$iziToast.hide = function ($toast, options, closedBy) {

		var settings = extend(this.settings, options || {});
			closedBy = closedBy || null;

		if(typeof $toast != 'object'){
			$toast = document.querySelector($toast);
		}

		$toast.classList.add(PLUGIN_NAME+'-closing');

		settings.closedBy = closedBy;
		settings.REF = $toast.getAttribute('data-iziToast-ref');

		// Overlay
		(function(){

			var $overlay = document.querySelector('.'+PLUGIN_NAME+'-overlay');
			if($overlay !== null){
				var refs = $overlay.getAttribute('data-iziToast-ref');		
					refs = refs.split(',');
				var index = refs.indexOf(settings.REF);

				if(index !== -1){
					refs.splice(index, 1);			
				}
				$overlay.setAttribute('data-iziToast-ref', refs.join());

				if(refs.length === 0){
					$overlay.classList.remove('fadeIn');
					$overlay.classList.add('fadeOut');
					setTimeout(function() {
						$overlay.remove();
					}, 700);
				}
			}

		})();

		if(settings.transitionIn || settings.transitionInMobile){
			$toast.classList.remove(settings.transitionIn);
			$toast.classList.remove(settings.transitionInMobile);
		}

		if(ISMOBILE || window.innerWidth <= MOBILEWIDTH){
			if(settings.transitionOutMobile)
				$toast.classList.add(settings.transitionOutMobile);
		} else {
			if(settings.transitionOut)
				$toast.classList.add(settings.transitionOut);
		}
		var H = $toast.parentNode.offsetHeight;
				$toast.parentNode.style.height = H+'px';
				$toast.style.pointerEvents = 'none';
		
		if(!ISMOBILE || window.innerWidth > MOBILEWIDTH){
			$toast.parentNode.style.transitionDelay = '0.2s';
		}

		try {
			settings.closedBy = closedBy;
			var event = new CustomEvent(PLUGIN_NAME+'-closing', {detail: settings, bubbles: true, cancelable: true});
			document.dispatchEvent(event);
		} catch(ex){
			console.warn(ex);
		}

		setTimeout(function() {
			
			$toast.parentNode.style.height = '0px';
			$toast.parentNode.style.overflow = '';

			setTimeout(function(){
				
				$toast.parentNode.remove();
				try {
					settings.closedBy = closedBy;
					var event = new CustomEvent(PLUGIN_NAME+'-closed', {detail: settings, bubbles: true, cancelable: true});
					document.dispatchEvent(event);
				} catch(ex){
					console.warn(ex);
				}

				if(typeof settings.onClosed !== 'undefined'){
					settings.onClosed.apply(null, [settings, $toast, closedBy]);
				}

			}, 1000);
		}, 200);


		if(typeof settings.onClosing !== 'undefined'){
			settings.onClosing.apply(null, [settings, $toast, closedBy]);
		}
	};

	/**
	 * Create and show the Toast
	 * @public
	 * @param {Object} options User settings
	 */
	$iziToast.show = function (options) {

		var that = this;

		// Merge user options with defaults
		var settings = extend(CONFIG, options || {});
			settings = extend(defaults, settings);

			settings.TIME = {};

		if(settings.toastOnce && settings.id && document.querySelectorAll('.'+PLUGIN_NAME+'#'+settings.id).length > 0){
			return false;
		}

		settings.REF = new Date().getTime() + Math.floor((Math.random() * 10000000) + 1);

		var $DOM = {
			body: document.querySelector('body'),
			overlay: document.createElement('div'),
			toast: document.createElement('div'),
			toastBody: document.createElement('div'),
			toastTexts: document.createElement('div'),
			toastCapsule: document.createElement('div'),
			icon: document.createElement('i'),
			cover: document.createElement('div'),
			buttons: document.createElement('div'),
			wrapper: null
		};

		$DOM.toast.setAttribute('data-iziToast-ref', settings.REF);
		$DOM.toast.appendChild($DOM.toastBody);
		$DOM.toastCapsule.appendChild($DOM.toast);

		// CSS Settings
		(function(){

			$DOM.toast.classList.add(PLUGIN_NAME);
			$DOM.toast.classList.add(PLUGIN_NAME+'-opening');
			$DOM.toastCapsule.classList.add(PLUGIN_NAME+'-capsule');
			$DOM.toastBody.classList.add(PLUGIN_NAME + '-body');
			$DOM.toastTexts.classList.add(PLUGIN_NAME + '-texts');

			if(ISMOBILE || window.innerWidth <= MOBILEWIDTH){
				if(settings.transitionInMobile)
					$DOM.toast.classList.add(settings.transitionInMobile);
			} else {
				if(settings.transitionIn)
					$DOM.toast.classList.add(settings.transitionIn);
			}

			if(settings.class){
				var classes = settings.class.split(' ');
				forEach(classes, function (value, index) {
					$DOM.toast.classList.add(value);
				});
			}

			if(settings.id){ $DOM.toast.id = settings.id; }

			if(settings.rtl){ $DOM.toast.classList.add(PLUGIN_NAME + '-rtl'); }

			if(settings.layout > 1){ $DOM.toast.classList.add(PLUGIN_NAME+'-layout'+settings.layout); }

			if(settings.balloon){ $DOM.toast.classList.add(PLUGIN_NAME+'-balloon'); }

			if(settings.maxWidth){
				if( !isNaN(settings.maxWidth) ){
					$DOM.toast.style.maxWidth = settings.maxWidth+'px';
				} else {
					$DOM.toast.style.maxWidth = settings.maxWidth;
				}
			}

			if(settings.theme !== '' || settings.theme !== 'light') {

				$DOM.toast.classList.add(PLUGIN_NAME+'-theme-'+settings.theme);
			}

			if(settings.color) { //#, rgb, rgba, hsl
				
				if( isColor(settings.color) ){
					$DOM.toast.style.background = settings.color;
				} else {
					$DOM.toast.classList.add(PLUGIN_NAME+'-color-'+settings.color);
				}
			}

			if(settings.backgroundColor) {
				$DOM.toast.style.background = settings.backgroundColor;
				if(settings.balloon){
					$DOM.toast.style.borderColor = settings.backgroundColor;				
				}
			}
		})();

		// Cover image
		(function(){
			if(settings.image) {
				$DOM.cover.classList.add(PLUGIN_NAME + '-cover');
				$DOM.cover.style.width = settings.imageWidth + 'px';

				if(isBase64(settings.image.replace(/ /g,''))){
					$DOM.cover.style.backgroundImage = 'url(data:image/png;base64,' + settings.image.replace(/ /g,'') + ')';
				} else {
					$DOM.cover.style.backgroundImage = 'url(' + settings.image + ')';
				}

				if(settings.rtl){
					$DOM.toastBody.style.marginRight = (settings.imageWidth + 10) + 'px';
				} else {
					$DOM.toastBody.style.marginLeft = (settings.imageWidth + 10) + 'px';				
				}
				$DOM.toast.appendChild($DOM.cover);
			}
		})();

		// Button close
		(function(){
			if(settings.close){
				
				$DOM.buttonClose = document.createElement('button');

				$DOM.buttonClose.classList.add(PLUGIN_NAME + '-close');
				$DOM.buttonClose.addEventListener('click', function (e) {
					var button = e.target;
					that.hide($DOM.toast, settings, 'button');
				});
				$DOM.toast.appendChild($DOM.buttonClose);
			} else {
				if(settings.rtl){
					$DOM.toast.style.paddingLeft = '20px';
				} else {
					$DOM.toast.style.paddingRight = '20px';
				}
			}
		})();

		// Progress Bar & Timeout
		(function(){
			if(settings.timeout) {

				if(settings.progressBar){
					$DOM.progressBar = document.createElement('div');
					$DOM.progressBarDiv = document.createElement('div');
					$DOM.progressBar.classList.add(PLUGIN_NAME + '-progressbar');
					$DOM.progressBarDiv.style.background = settings.progressBarColor;
					$DOM.progressBar.appendChild($DOM.progressBarDiv);
					$DOM.toast.appendChild($DOM.progressBar);
				}

				if(settings.pauseOnHover && !settings.resetOnHover){
					
					$DOM.toast.addEventListener('mouseenter', function (e) {
						this.classList.add(PLUGIN_NAME+'-paused');

						that.progress($DOM.toast, settings).pause();
					});
					$DOM.toast.addEventListener('mouseleave', function (e) {
						this.classList.remove(PLUGIN_NAME+'-paused');

						that.progress($DOM.toast, settings).resume();
					});
				}

				if(settings.resetOnHover){

					$DOM.toast.addEventListener('mouseenter', function (e) {
						this.classList.add(PLUGIN_NAME+'-reseted');

						that.progress($DOM.toast, settings).reset();
					});
					$DOM.toast.addEventListener('mouseleave', function (e) {
						this.classList.remove(PLUGIN_NAME+'-reseted');

						that.progress($DOM.toast, settings).start();
					});
				}
			}
		})();

		// Icon
		(function(){
			if(settings.icon) {
				$DOM.icon.setAttribute('class', PLUGIN_NAME + '-icon ' + settings.icon);
				
				if(settings.iconText){
					$DOM.icon.appendChild(document.createTextNode(settings.iconText));
				}

				if(settings.rtl){
					$DOM.toastBody.style.paddingRight = '33px';
				} else {
					$DOM.toastBody.style.paddingLeft = '33px';				
				}
				
				if(settings.iconColor){
					$DOM.icon.style.color = settings.iconColor;
				}
				$DOM.toastBody.appendChild($DOM.icon);
			}
		})();

		// Title
		(function(){
			if(settings.title.length > 0) {

				$DOM.strong = document.createElement('strong');
				$DOM.strong.classList.add(PLUGIN_NAME + '-title');
				$DOM.strong.appendChild(createFragElem(settings.title));
				$DOM.toastTexts.appendChild($DOM.strong);

				if(settings.titleColor) {
					$DOM.strong.style.color = settings.titleColor;
				}
				if(settings.titleSize) {
					if( !isNaN(settings.titleSize) ){
						$DOM.strong.style.fontSize = settings.titleSize+'px';
					} else {
						$DOM.strong.style.fontSize = settings.titleSize;
					}
				}
				if(settings.titleLineHeight) {
					if( !isNaN(settings.titleSize) ){
						$DOM.strong.style.lineHeight = settings.titleLineHeight+'px';
					} else {
						$DOM.strong.style.lineHeight = settings.titleLineHeight;
					}
				}
			}
		})();
		
		// Message
		(function(){
			if(settings.message.length > 0) {

				$DOM.p = document.createElement('p');
				$DOM.p.classList.add(PLUGIN_NAME + '-message');
				$DOM.p.appendChild(createFragElem(settings.message));
				$DOM.toastTexts.appendChild($DOM.p);

				if(settings.messageColor) {
					$DOM.p.style.color = settings.messageColor;
				}
				if(settings.messageSize) {
					if( !isNaN(settings.titleSize) ){
						$DOM.p.style.fontSize = settings.messageSize+'px';
					} else {
						$DOM.p.style.fontSize = settings.messageSize;
					}
				}
				if(settings.messageLineHeight) {
					
					if( !isNaN(settings.titleSize) ){
						$DOM.p.style.lineHeight = settings.messageLineHeight+'px';
					} else {
						$DOM.p.style.lineHeight = settings.messageLineHeight;
					}
				}
			}
		})();

		if(settings.title.length > 0 && settings.message.length > 0) {
			if(settings.rtl){
				$DOM.strong.style.marginLeft = '10px';
			} else if(settings.layout !== 2 && !settings.rtl) {
				$DOM.strong.style.marginRight = '10px';	
			}
		}

		$DOM.toastBody.appendChild($DOM.toastTexts);

		// Buttons
		(function(){
			if(settings.buttons.length > 0) {

				$DOM.buttons.classList.add(PLUGIN_NAME + '-buttons');

				if(settings.title.length > 0 && settings.message.length === 0) {
					if(settings.rtl){
						$DOM.strong.style.marginLeft = '15px';
					} else {
						$DOM.strong.style.marginRight = '15px';
					}
				}
				if(settings.message.length > 0) {
					if(settings.rtl){
						$DOM.p.style.marginLeft = '15px';
					} else {
						$DOM.p.style.marginRight = '15px';
					}
					$DOM.p.style.marginBottom = '0';
				}

				forEach(settings.buttons, function (value, index) {
					$DOM.buttons.appendChild(createFragElem(value[0]));

					var $btns = $DOM.buttons.childNodes;

					$btns[index].classList.add(PLUGIN_NAME + '-buttons-child');

					if(value[2]){
						setTimeout(function() {
							$btns[index].focus();
						}, 300);
					}

					$btns[index].addEventListener('click', function (e) {
						e.preventDefault();
						var ts = value[1];
						return ts(that, $DOM.toast);
					});
				});
			}
			$DOM.toastBody.appendChild($DOM.buttons);
		})();

		// Target
		(function(){
			$DOM.toastCapsule.style.visibility = 'hidden';
			setTimeout(function() {
				var H = $DOM.toast.offsetHeight;
				var style = $DOM.toast.currentStyle || window.getComputedStyle($DOM.toast);
				var marginTop = style.marginTop;
					marginTop = marginTop.split('px');
					marginTop = parseInt(marginTop[0]);
				var marginBottom = style.marginBottom;
					marginBottom = marginBottom.split('px');
					marginBottom = parseInt(marginBottom[0]);

				$DOM.toastCapsule.style.visibility = '';
				$DOM.toastCapsule.style.height = (H+marginBottom+marginTop)+'px';

				setTimeout(function() {
					$DOM.toastCapsule.style.height = 'auto';
					if(settings.target){
						$DOM.toastCapsule.style.overflow = 'visible';
					}
				}, 500);

				if(settings.timeout) {
					that.progress($DOM.toast, settings).start();
				}
			}, 100);
		})();

		// Target
		(function(){
			var position = settings.position;

			if(settings.target){

				$DOM.wrapper = document.querySelector(settings.target);
				$DOM.wrapper.classList.add(PLUGIN_NAME + '-target');

				if(settings.targetFirst) {
					$DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
				} else {
					$DOM.wrapper.appendChild($DOM.toastCapsule);
				}

			} else {

				if( POSITIONS.indexOf(settings.position) == -1 ){
					console.warn('['+PLUGIN_NAME+'] Incorrect position.\nIt can be › ' + POSITIONS);
					return;
				}

				if(ISMOBILE || window.innerWidth <= MOBILEWIDTH){
					if(settings.position == 'bottomLeft' || settings.position == 'bottomRight' || settings.position == 'bottomCenter'){
						position = PLUGIN_NAME+'-wrapper-bottomCenter';
					}
					else if(settings.position == 'topLeft' || settings.position == 'topRight' || settings.position == 'topCenter'){
						position = PLUGIN_NAME+'-wrapper-topCenter';
					}
					else {
						position = PLUGIN_NAME+'-wrapper-center';
					}
				} else {
					position = PLUGIN_NAME+'-wrapper-'+position;
				}
				$DOM.wrapper = document.querySelector('.' + PLUGIN_NAME + '-wrapper.'+position);

				if(!$DOM.wrapper) {
					$DOM.wrapper = document.createElement('div');
					$DOM.wrapper.classList.add(PLUGIN_NAME + '-wrapper');
					$DOM.wrapper.classList.add(position);
					document.body.appendChild($DOM.wrapper);
				}
				if(settings.position == 'topLeft' || settings.position == 'topCenter' || settings.position == 'topRight'){
					$DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
				} else {
					$DOM.wrapper.appendChild($DOM.toastCapsule);
				}
			}

			if(!isNaN(settings.zindex)) {
				$DOM.wrapper.style.zIndex = settings.zindex;
			} else {
				console.warn('['+PLUGIN_NAME+'] Invalid zIndex.');
			}
		})();

		// Overlay
		(function(){

			if(settings.overlay) {

				if( document.querySelector('.'+PLUGIN_NAME+'-overlay.fadeIn') !== null ){

					$DOM.overlay = document.querySelector('.'+PLUGIN_NAME+'-overlay');
					$DOM.overlay.setAttribute('data-iziToast-ref', $DOM.overlay.getAttribute('data-iziToast-ref') + ',' + settings.REF);

					if(!isNaN(settings.zindex) && settings.zindex !== null) {
						$DOM.overlay.style.zIndex = settings.zindex-1;
					}
				} else {

					$DOM.overlay.classList.add(PLUGIN_NAME+'-overlay');
					$DOM.overlay.classList.add('fadeIn');
					$DOM.overlay.style.background = settings.overlayColor;
					$DOM.overlay.setAttribute('data-iziToast-ref', settings.REF);
					if(!isNaN(settings.zindex) && settings.zindex !== null) {
						$DOM.overlay.style.zIndex = settings.zindex-1;
					}
					document.querySelector('body').appendChild($DOM.overlay);
				}

				if(settings.overlayClose) {

					$DOM.overlay.removeEventListener('click', {});
					$DOM.overlay.addEventListener('click', function (e) {
						that.hide($DOM.toast, settings, 'overlay');
					});
				} else {
					$DOM.overlay.removeEventListener('click', {});
				}

			}

		})();

		// Inside animations
		(function(){
			if(settings.animateInside){
				$DOM.toast.classList.add(PLUGIN_NAME+'-animateInside');
			
				var animationTimes = [200, 100, 300];
				if(settings.transitionIn == 'bounceInLeft'){
					animationTimes = [400, 200, 400];
				}

				if(settings.title.length > 0) {
					setTimeout(function(){
						$DOM.strong.classList.add('slideIn');
					}, animationTimes[0]);
				}

				if(settings.message.length > 0) {
					setTimeout(function(){
						$DOM.p.classList.add('slideIn');
					}, animationTimes[1]);
				}

				if(settings.icon) {
					setTimeout(function(){
						$DOM.icon.classList.add('revealIn');
					}, animationTimes[2]);
				}

				if(settings.buttons.length > 0 && $DOM.buttons) {
					var counter = 150;
					forEach($DOM.buttons.childNodes, function(element, index) {

						setTimeout(function(){
							element.classList.add('revealIn');
						}, counter);
						counter = counter + 150;
					});
				}
			}
		})();

		settings.onOpening.apply(null, [settings, $DOM.toast]);

		try {
			var event = new CustomEvent(PLUGIN_NAME + '-opening', {detail: settings, bubbles: true, cancelable: true});
			document.dispatchEvent(event);
		} catch(ex){
			console.warn(ex);
		}

		setTimeout(function() {

			$DOM.toast.classList.remove(PLUGIN_NAME+'-opening');
			$DOM.toast.classList.add(PLUGIN_NAME+'-opened');

			try {
				var event = new CustomEvent(PLUGIN_NAME + '-opened', {detail: settings, bubbles: true, cancelable: true});
				document.dispatchEvent(event);
			} catch(ex){
				console.warn(ex);
			}

			settings.onOpened.apply(null, [settings, $DOM.toast]);
		}, 1000);

		if(settings.drag){

			if(ACCEPTSTOUCH) {

			    $DOM.toast.addEventListener('touchstart', function(e) {
			        drag.startMoving(this, that, settings, e);
			    }, false);

			    $DOM.toast.addEventListener('touchend', function(e) {
			        drag.stopMoving(this, e);
			    }, false);
			} else {

			    $DOM.toast.addEventListener('mousedown', function(e) {
			    	e.preventDefault();
			        drag.startMoving(this, that, settings, e);
			    }, false);

			    $DOM.toast.addEventListener('mouseup', function(e) {
			    	e.preventDefault();
			        drag.stopMoving(this, e);
			    }, false);
			}
		}

		if(settings.closeOnEscape) {

			document.addEventListener('keyup', function (evt) {
				evt = evt || window.event;
				if(evt.keyCode == 27) {
				    that.hide($DOM.toast, settings, 'esc');
				}
			});
		}

		that.toast = $DOM.toast;		
	};
	

	return $iziToast;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ })
/******/ ]);
//# sourceMappingURL=index-bundle.js.map