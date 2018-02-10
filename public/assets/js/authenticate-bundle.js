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
/******/ 	return __webpack_require__(__webpack_require__.s = 123);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).setImmediate, __webpack_require__(6)))

/***/ }),

/***/ 1:
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var IMAGESERVER = exports.IMAGESERVER = "https://tinyfiles.past3dev.com";
var GOOGLE_MAPS_CLIENT_KEY = exports.GOOGLE_MAPS_CLIENT_KEY = "AIzaSyAsqrZKCXbh9rFjnstvvC4K0tO3kO4w8co";
var GOOGLE_MAPS_VERSION = exports.GOOGLE_MAPS_VERSION = '3.14';
var GOOGLE_MAPS_LIBRARIES = exports.GOOGLE_MAPS_LIBRARIES = ['places'];

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserModel = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _localforage = __webpack_require__(5);

var _localforage2 = _interopRequireDefault(_localforage);

var _cookie = __webpack_require__(21);

var _utils = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { UserAuth } from "../components/auth";

var UserModel = exports.UserModel = {
	NewUser: {},
	User: {},
	Orders: [],
	GetUserfromStorage: function GetUserfromStorage() {
		console.log("user : ", UserModel.User);
		// if (getCookie("X-USER-TOKEN") !== "") {
		// 	console.log("No user, lets look for a user");
		return _localforage2.default.getItem("user").then(function (user) {
			console.log("Got User");
			if (!(0, _utils.isEmptyObject)(user)) {
				UserModel.User = user;
				console.log(UserModel.User);
				_mithril2.default.redraw();
				return;
			}
			UserModel.User = {};
			_mithril2.default.redraw();
		}).catch(function (error) {
			return error;
		});
		// } else {
		// 	return new Promise((resolve, reject) => {
		// 		reject("Not logged in");
		// 	});
		// }
	},
	GetOrders: function GetOrders() {
		return _mithril2.default.request({
			method: "GET",
			url: "/api/orders/user/" + UserModel.User.phone
		}).then(function (resp) {
			console.log("ORDERS: ", resp);
			UserModel.Orders = resp;
			_mithril2.default.redraw();
		}).catch(function (err) {
			console.log(err);
		});
	}
};

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _authPage = __webpack_require__(29);

var _authPage2 = _interopRequireDefault(_authPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import OffCanvasMenu from './components/offCanvasMenu.js';
// import AdminShell from './containers/adminShell.js';
// import {MerchantAuth} from './components/auth.js';


var root = document.getElementById('appContainer');

_mithril2.default.route.prefix('/authenticate');

_mithril2.default.route(root, '/', {
  '/': {
    render: function render(vnode) {
      return (0, _mithril2.default)(
        'section',
        { 'class': 'flex flex-column justify-center   vh-100 items-center fw2 f6' },
        (0, _mithril2.default)(
          'div',
          { 'class': 'flex ba b--light-gray bw1 w-60-m  w-40-l ' },
          (0, _mithril2.default)(_authPage2.default, null)
        )
      );
    }
  }
});

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.modal = undefined;
exports.isEmptyObject = isEmptyObject;

var _tingle = __webpack_require__(15);

var _tingle2 = _interopRequireDefault(_tingle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmptyObject(obj) {
	for (var v in obj) {
		if (obj.hasOwnProperty(v)) {
			return false;
		}
	}
	return true;
}

// instanciate new modal
var modal = exports.modal = new _tingle2.default.modal({
	footer: false,
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["tc"],
	onOpen: function onOpen() {
		console.log("modal open");
	},
	onClose: function onClose() {
		console.log("modal closed");
	},
	beforeClose: function beforeClose() {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
		// return false; // nothing happens
	}
});

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(t,o){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (o),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=o():t.tingle=o()}(this,function(){function t(t){var o={onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]};this.opts=r({},o,t),this.init()}function o(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}function e(){this.modal=document.createElement("div"),this.modal.classList.add("tingle-modal"),0!==this.opts.closeMethods.length&&this.opts.closeMethods.indexOf("overlay")!==-1||this.modal.classList.add("tingle-modal--noOverlayClose"),this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),this.opts.closeMethods.indexOf("button")!==-1&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.classList.add("tingle-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML="×",this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)),this.modalBox=document.createElement("div"),this.modalBox.classList.add("tingle-modal-box"),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),this.opts.closeMethods.indexOf("button")!==-1&&this.modal.appendChild(this.modalCloseBtn),this.modal.appendChild(this.modalBox)}function s(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}function i(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:l.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:n.bind(this)},this.opts.closeMethods.indexOf("button")!==-1&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn),this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav)}function n(t){this.opts.closeMethods.indexOf("escape")!==-1&&27===t.which&&this.isOpen()&&this.close()}function l(t){this.opts.closeMethods.indexOf("overlay")!==-1&&!d(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close()}function d(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o););return t}function a(){this.opts.closeMethods.indexOf("button")!==-1&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn),this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav)}function r(){for(var t=1;t<arguments.length;t++)for(var o in arguments[t])arguments[t].hasOwnProperty(o)&&(arguments[0][o]=arguments[t][o]);return arguments[0]}function h(){var t,o=document.createElement("tingle-test-transition"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in e)if(void 0!==o.style[t])return e[t]}var c=h();return t.prototype.init=function(){this.modal||(e.call(this),i.call(this),document.body.insertBefore(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter())},t.prototype.destroy=function(){null!==this.modal&&(a.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.open=function(){var t=this;"function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),document.body.classList.add("tingle-enabled"),this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("tingle-modal--visible"),c?this.modal.addEventListener(c,function o(){"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t.modal.removeEventListener(c,o,!1)},!1):"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),this.checkOverflow()},t.prototype.isOpen=function(){return!!this.modal.classList.contains("tingle-modal--visible")},t.prototype.close=function(){if("function"==typeof this.opts.beforeClose){var t=this.opts.beforeClose.call(this);if(!t)return}document.body.classList.remove("tingle-enabled"),this.modal.classList.remove("tingle-modal--visible");var o=this;c?this.modal.addEventListener(c,function t(){o.modal.removeEventListener(c,t,!1),o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this)},!1):(o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this))},t.prototype.setContent=function(t){"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t))},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){s.call(this)},t.prototype.setFooterContent=function(t){this.modalBoxFooter.innerHTML=t},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),o.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky")))},t.prototype.addFooterBtn=function(t,o,e){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",e),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){s.classList.add(t)}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){var t=window.innerHeight,o=this.modalBox.clientHeight;return o>=t},t.prototype.checkOverflow=function(){this.modal.classList.contains("tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("tingle-modal--overflow"):this.modal.classList.remove("tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(o.call(this),this.setStickyFooter(!0)))},{modal:t}});

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

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
__webpack_require__(18);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 18:
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(19)))

/***/ }),

/***/ 19:
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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserAuth = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _localforage = __webpack_require__(5);

var _localforage2 = _interopRequireDefault(_localforage);

var _user = __webpack_require__(11);

var _cookie = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserAuth = exports.UserAuth = {
	oncreate: function oncreate() {
		_user.UserModel.GetUserfromStorage().then(function () {
			_user.UserModel.GetReservations();
		}).catch(function (error) {
			console.error(error);
		});
	},
	view: function view(vnode) {
		var cookie = (0, _cookie.getCookie)("X-USER-TOKEN");
		if (cookie === "") {
			_mithril2.default.route.set("/signup");
			return (0, _mithril2.default)("div");
		}
		return (0, _mithril2.default)("div", vnode.attrs, _mithril2.default.fragment(vnode.attrs, [vnode.children]));
	}
};

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getCookie = getCookie;
exports.deleteCookie = deleteCookie;
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function deleteCookie(name) {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _auth = __webpack_require__(4);

var _login = __webpack_require__(30);

var _chooseSignupStyle = __webpack_require__(31);

var _uploadProfilePicture = __webpack_require__(32);

var _verifyPhonenumber = __webpack_require__(33);

var _onSignupFlowCompletion = __webpack_require__(34);

var _welcomeAfterSignup = __webpack_require__(35);

var _emailSignup = __webpack_require__(36);

var _beforeJoining = __webpack_require__(37);

var _addPhonenumber = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
	login: _login.Login,
	signup: _chooseSignupStyle.ChooseSignupStyle,
	uploadProfilePic: _uploadProfilePicture.UploadProfilePic,
	onSignupFlowCompletion: _onSignupFlowCompletion.OnSignupFlowCompletion,
	welcomeAfterSignup: _welcomeAfterSignup.WelcomeAfterSignup,
	emailSignup: _emailSignup.EmailSignup,
	beforeJoining: _beforeJoining.BeforeJoining,
	addPhonenumber: _addPhonenumber.AddPhonenumber,
	verifyPhonenumber: _verifyPhonenumber.VerifyPhonenumber
};

var AuthPage = {
	view: function view() {
		console.log(_auth.AuthFlow.Get());
		return (0, _mithril2.default)(
			"section",
			{ "class": "w-100" },
			(0, _mithril2.default)(components[_auth.AuthFlow.CurrentPage])
		);
	}
};

exports.default = AuthPage;

/***/ }),

/***/ 3:
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
					(0, _mithril2.default)("path", { d: "M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5 s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z" }),
					(0, _mithril2.default)("path", { d: "M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952 L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4 C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031 C45.576,13.08,46.321,24.468,41.099,31.431z" })
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
						d: "M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z",
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
							(0, _mithril2.default)("path", { d: "M330.667,192c5.888,0,10.667-4.779,10.667-10.667v-128C341.333,23.936,317.419,0,288,0H53.333C23.915,0,0,23.936,0,53.333 v384c0,29.397,23.915,53.333,53.333,53.333H288c29.419,0,53.333-23.936,53.333-53.333v-128c0-5.888-4.779-10.667-10.667-10.667 S320,303.445,320,309.333v128c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32v-384c0-17.643,14.357-32,32-32H288 c17.643,0,32,14.357,32,32v128C320,187.221,324.779,192,330.667,192z" })
						)
					),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("path", { d: "M480,234.667H138.667c-5.888,0-10.667,4.779-10.667,10.667S132.779,256,138.667,256H480 c5.888,0,10.667-4.779,10.667-10.667S485.888,234.667,480,234.667z" })
						)
					),
					(0, _mithril2.default)(
						"g",
						null,
						(0, _mithril2.default)(
							"g",
							null,
							(0, _mithril2.default)("path", { d: "M487.531,237.824l-64-64c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l56.448,56.448l-56.448,56.448 c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.093l64-64 C491.691,248.747,491.691,241.984,487.531,237.824z" })
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
						(0, _mithril2.default)("path", { d: "M23.895,29.731c-1.237,0-2.731-0.31-4.374-0.93c-3.602-1.358-7.521-4.042-11.035-7.556 c-3.515-3.515-6.199-7.435-7.558-11.037C-0.307,6.933-0.31,4.245,0.921,3.015c0.177-0.177,0.357-0.367,0.543-0.563 c1.123-1.181,2.392-2.51,4.074-2.45C6.697,0.05,7.82,0.77,8.97,2.201c3.398,4.226,1.866,5.732,0.093,7.478l-0.313,0.31 c-0.29,0.29-0.838,1.633,4.26,6.731c1.664,1.664,3.083,2.882,4.217,3.619c0.714,0.464,1.991,1.166,2.515,0.642l0.315-0.318 c1.744-1.769,3.25-3.296,7.473,0.099c1.431,1.15,2.15,2.272,2.198,3.433c0.069,1.681-1.27,2.953-2.452,4.075 c-0.195,0.186-0.385,0.366-0.562,0.542C26.103,29.424,25.126,29.731,23.895,29.731z M5.418,1C4.223,1,3.144,2.136,2.189,3.141 C1.997,3.343,1.811,3.539,1.628,3.722C0.711,4.638,0.804,7.045,1.864,9.856c1.31,3.472,3.913,7.266,7.33,10.683 c3.416,3.415,7.208,6.018,10.681,7.327c2.811,1.062,5.218,1.152,6.133,0.237c0.183-0.183,0.379-0.369,0.581-0.56 c1.027-0.976,2.192-2.082,2.141-3.309c-0.035-0.843-0.649-1.75-1.825-2.695c-3.519-2.83-4.503-1.831-6.135-0.176l-0.32,0.323 c-0.78,0.781-2.047,0.608-3.767-0.51c-1.193-0.776-2.667-2.038-4.379-3.751c-4.231-4.23-5.584-6.819-4.26-8.146l0.319-0.315 c1.659-1.632,2.66-2.617-0.171-6.138C7.245,1.651,6.339,1.037,5.496,1.001C5.47,1,5.444,1,5.418,1z" })
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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Login = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _auth = __webpack_require__(20);

var _svgIcons = __webpack_require__(3);

var _auth2 = __webpack_require__(4);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

var _modal = __webpack_require__(9);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = exports.Login = {
	oninit: function oninit() {
		_auth2.AuthFlow.GetCountriesAndPhoneCode();
		console.log("login");
	},
	view: function view() {
		// console.log(AuthFlow.PhoneCodes)
		// console.log(vnode.attrs.countries)
		var options = _auth2.AuthFlow.PhoneCodes.map(function (country, i) {
			if (i === _auth2.AuthFlow.SelectedPhoneCodeIndex) {
				return (0, _mithril2.default)(
					"option",
					{ "class": "pa2 tr", selected: true },
					country.cioc,
					": ",
					country.callingCodes[0]
				);
			}

			return (0, _mithril2.default)(
				"option",
				{ "class": "pa2 tr" },
				country.name,
				": ",
				country.callingCodes[0]
			);
		});
		window.fbAsyncInit = function () {
			FB.init({
				appId: "1813095229016266", //'772854096255669',
				cookie: true,
				xfbml: true,
				version: 'v2.11'
			});

			FB.AppEvents.logPageView();
		};

		(function (d, s, id) {
			var js,
			    fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
		return (0, _mithril2.default)(
			"section",
			{ "class": "w-100 tc pa-modal" },
			(0, _mithril2.default)(
				"div",
				{ "class": "" },
				(0, _mithril2.default)("script", { src: "https://apis.google.com/js/api.js", onload: "console.log('loaded iam way loaded')" }),
				(0, _mithril2.default)(
					"div",
					{ "class": "overflow-hidden pa1" },
					(0, _mithril2.default)(
						"a",
						{
							"class": "bg-facebook-blue db mb2 white pa2 br2 ba link w-100 flex flex-row justify-start pointer",
							onclick: function onclick() {
								_izitoast2.default.show({
									title: "LOGIN",
									message: "Please wait...",
									image: "/assets/img/svg/rings-loader.svg",
									position: "center",
									progressBar: false,
									overlay: true,
									timeout: false
								});
								console.log("Login with Facebook Login");
								FB.getLoginStatus(function (response) {
									console.log(response);
									if (response.status != "connected") {
										FB.login(function (resp) {
											console.log(resp);
											if (resp.status == "connected") {
												// the user accepted the app...
												console.log(resp);
												FB.api("/me?fields=name,email,picture.width(100)", function (r) {
													var toast = document.querySelector('.iziToast');
													_izitoast2.default.hide(toast);
													console.log(r);
													// populate the signup object with these details
													_auth2.AuthFlow.User.name = r.name;
													_auth2.AuthFlow.User.email = r.email;
													_auth2.AuthFlow.User.image = r.picture.data.url;
													_auth2.AuthFlow.User.imageHeight = r.picture.data.height;
													_auth2.AuthFlow.User.imageWidth = r.picture.data.width;
													_auth2.AuthFlow.User.migrate = "facebook";
													_auth2.AuthFlow.User.token = resp.authResponse.accessToken;
													console.log("Authflow.User: ", _auth2.AuthFlow.User);
													_auth2.AuthFlow.Set("emailSignup");
													// log the user in...
												});
											} else {
												// the user did not accept the app...
												_auth2.AuthFlow.Set("emailSignup");
												console.log(resp);
											}
										}, { scope: 'public_profile,email' });
										// console.log(response.authResponse);
									} else {
										console.log(response.authResponse);
										FB.api("/me?fields=name,email", function (r) {
											_auth2.AuthFlow.User.migrate = "facebook";
											_auth2.AuthFlow.User.email = r.email;
											_auth2.AuthFlow.User.token = response.authResponse.accessToken;
											_auth2.AuthFlow.LoginHandler().then(function () {
												var toast = document.querySelector('.iziToast');
												_izitoast2.default.hide(toast);
												if (_modal2.default.open) {
													_modal2.default.close();
												}
												console.log(window.location.pathname);
												if (window.location.pathname == "/authenticate/") {
													// redirect to home page...
													window.location.assign("/");
												}
												var event = new Event("loggedin");
												document.dispatchEvent(event);
												_mithril2.default.redraw();
											}).catch(function () {
												var toast = document.querySelector('.iziToast');
												_izitoast2.default.hide(toast);
												_izitoast2.default.error({
													title: 'Error',
													message: 'Login was unsuccessful',
													position: 'center' // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
												});
											});
											console.log(r);
										});
									}
								});
							}
						},
						(0, _mithril2.default)(
							"span",
							{ "class": "dib v-mid w2 h2" },
							(0, _mithril2.default)("img", { src: "/assets/img/facebook.png", alt: "facebook" })
						),
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid flex pa2 justify-center flex-auto", style: "flex:1" },
							"Log in with facebook"
						)
					),
					(0, _mithril2.default)(
						"a",
						{
							"class": "bg-white db mb2 pa2 br2 ba b--black-20 link flex flex-row justify-start pointer",
							onclick: function onclick() {
								console.log("Login with Google...");
								_izitoast2.default.show({
									title: "SIGNUP",
									message: "Please wait...",
									image: "/assets/img/svg/rings-loader.svg",
									position: "center",
									progressBar: false,
									timeout: false
								});
								gapi.load("client:auth2", function () {
									// Initialize the client with API key and People API, and initialize OAuth with an
									// OAuth 2.0 client ID and scopes (space delimited string) to request access.
									gapi.client.init({
										apiKey: "AIzaSyAXlmK39TqbZk1ZL7w9QIaSfzFehHPzssU",
										discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
										clientId: "263066866150-1dlrcl4jb5tvohibiit1uqcut18f8o8c.apps.googleusercontent.com",
										scope: 'profile email'
									}).then(function () {
										// Listen for sign-in state changes.
										console.log("getAuthInstance");
										gapi.auth2.getAuthInstance().isSignedIn.listen(function (isSignedIn) {
											// When signin status changes, this function is called.
											// If the signin status is changed to signedIn, we make an API call.
											if (isSignedIn) {
												// Make an API call to the People API, and print the user's given name.
												/// sign up shhould take place here...
												gapi.client.people.people.get({
													'resourceName': 'people/me',
													// 'requestMask.includeField': 'person.names',
													'personFields': "emailAddresses,names"
												}).then(function (response) {
													console.log(response);
													_auth2.AuthFlow.User.name = response.result.names[0].givenName + " " + response.result.names[0].familyName;
													_auth2.AuthFlow.User.email = response.result.emailAddresses[0].value;
													_auth2.AuthFlow.User.migrate = "google";
													console.log('Hello, ' + response.result.names[0].givenName);
													_izitoast2.default.hide(document.querySelector('.iziToast'));
													_auth2.AuthFlow.Set("emailSignup");
												}, function (reason) {
													console.log(reason);
													console.log('Error: ' + reason.result.error.message);
													_izitoast2.default.hide(document.querySelector('.iziToast'));
												});
											} else {
												_izitoast2.default.hide(document.querySelector('.iziToast'));
												console.log("Not Signed in...");
											}
										});

										// Handle the initial sign-in state.
										// updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
										if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
											// DO LOGIN
											// get email and verify a token...
											// Make an API call to the People API, and print the user's given name.
											console.log("make api call");
											gapi.client.people.people.get({
												'resourceName': 'people/me',
												// 'requestMask.includeField': 'person.names'
												'personFields': "emailAddresses,names"
											}).then(function (response) {
												_auth2.AuthFlow.User.migrate = "google";
												_auth2.AuthFlow.User.token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
												_auth2.AuthFlow.User.name = response.result.names[0].givenName + " " + response.result.names[0].familyName;
												_auth2.AuthFlow.User.email = response.result.emailAddresses[0].value;
												_auth2.AuthFlow.LoginHandler().then(function () {
													_izitoast2.default.hide(document.querySelector('.iziToast'));
													if (_modal2.default.open) {
														_modal2.default.close();
													}
													console.log(window.location.pathname);
													if (window.location.pathname == "/authenticate/") {
														// redirect to home page...
														// i really dont remember why i did this but let it be here incase: window.location.assign("/");
														window.location.assign("/merchants");
													}
													var event = new Event("loggedin");
													document.dispatchEvent(event);
													_mithril2.default.redraw();
												}).catch(function () {
													_izitoast2.default.hide(document.querySelector('.iziToast'));
													_izitoast2.default.error({
														title: 'Error',
														message: 'Login was unsuccessful',
														position: 'center' // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
													});
												});
												console.log(r);
												console.log('Hello, ' + response.result.names[0].displayName, _auth2.AuthFlow.User.email);
												_izitoast2.default.hide(document.querySelector('.iziToast'));
											}, function (reason) {
												console.log(reason);
												console.log('Error: ' + reason.result.error.message);
												_izitoast2.default.hide(document.querySelector('.iziToast'));
											});
										} else {

											gapi.auth2.getAuthInstance().signIn();
										}
									});
								});
								// GoogleAuth = gapi.auth2.GoogleAuth
							}
						},
						(0, _mithril2.default)(
							"span",
							{ "class": "dib v-mid w2 h2" },
							(0, _mithril2.default)(_svgIcons.SVGIcons, { type: "google" })
						),
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid pa2 justify-center flex flex-auto" },
							"Log in with Google"
						)
					),
					(0, _mithril2.default)(
						"span",
						{ "class": "or relative pa3 tc" },
						(0, _mithril2.default)(
							"span",
							{ "class": "gray pv2" },
							"or"
						)
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "" },
						(0, _mithril2.default)(
							"div",
							{ id: "countryselect", "class": "w-30 dib " },
							(0, _mithril2.default)(
								"select",
								{
									"class": "w-100 pa3 ba b--black-20 bg-white custom-gray br2",
									style: "outline: none",
									id: "countryselect",
									onchange: _mithril2.default.withAttr("selectedIndex", _auth2.AuthFlow.SetPhoneCode)
								},
								options
							)
						),
						(0, _mithril2.default)("input", {
							"class": "pa3 mv2 ba b--black-20 br2 w-70 dib f5 gray-placeholder",
							placeholder: "8161111111",
							type: "tel",
							name: "phones",
							value: _auth2.AuthFlow.User.raw_phone,
							oninput: _mithril2.default.withAttr("value", function (val) {
								_auth2.AuthFlow.User.raw_phone = val;
							})
						})
					),
					(0, _mithril2.default)("input", {
						"class": "pa3 mv2 ba b--black-20 br2 w-100 db f5 gray-placeholder",
						placeholder: "Password",
						type: "password",
						name: "password",
						value: _auth2.AuthFlow.User.password,
						oninput: _mithril2.default.withAttr("value", function (val) {
							return _auth2.AuthFlow.User.password = val;
						})

					}),
					(0, _mithril2.default)(
						"div",
						{ "class": "cf pv1" },
						(0, _mithril2.default)(
							"span",
							{ "class": "fl" },
							(0, _mithril2.default)("input", { type: "checkbox", name: "remember" }),
							" Remember me"
						),
						(0, _mithril2.default)(
							"span",
							{ "class": "fr" },
							(0, _mithril2.default)(
								"a",
								{ href: "#!", "class": "no-underline blue" },
								"Forgot password?"
							)
						)
					),
					(0, _mithril2.default)(
						"a",
						{
							"class": "pointer bg-custom-red br2 db mv2 white pa3 br1 ba no-underline w-100",
							onclick: function onclick() {
								var raw_phone = _auth2.AuthFlow.User.raw_phone || "";
								if (raw_phone.length == 11 && raw_phone[0] == 0) {
									raw_phone = raw_phone.substr(1);
								} else if (raw_phone.length < 10 || raw_phone.length > 11) {
									_izitoast2.default.error({
										title: "Error",
										message: "Invalid Phone number",
										position: "topRight"
									});
									return;
								}
								// AuthFlow.User.phone = val;
								_auth2.AuthFlow.User.phone = "+" + _auth2.AuthFlow.CurrentPhoneCode + raw_phone;
								console.log("Submitted phone number: ", _auth2.AuthFlow.User.phone);
								_izitoast2.default.show({
									title: "LOGIN",
									message: "Please wait...",
									image: "/assets/img/svg/rings-loader.svg",
									position: "center",
									progressBar: false
								});
								_auth2.AuthFlow.LoginHandler().then(function () {
									var toast = document.querySelector('.iziToast');
									_izitoast2.default.hide(toast);
									if (_modal2.default.open) {
										_modal2.default.close();
									}
									console.log(window.location.pathname);
									if (window.location.pathname == "/authenticate/") {
										// redirect to home page...
										window.location.assign("/");
									}
									var event = new Event("loggedin");
									document.dispatchEvent(event);
									_mithril2.default.redraw();
								}).catch(function () {
									var toast = document.querySelector('.iziToast');
									_izitoast2.default.hide(toast);
									_izitoast2.default.error({
										title: 'Error',
										message: 'Login was unsuccessful',
										position: 'center' // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
									});
								});
							}
						},
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid pa2" },
							"Log in"
						)
					),
					(0, _mithril2.default)("p", { "class": "w-100 bb b--light-gray" }),
					(0, _mithril2.default)(
						"div",
						{ "class": "cf" },
						(0, _mithril2.default)(
							"span",
							{ "class": "custom-gray fl pv2" },
							"Don't have an account?"
						),
						" ",
						(0, _mithril2.default)(
							"a",
							{
								"class": "dib fr pa2 custom-red no-underline ba br2 b--custom-red pointer",
								onclick: function onclick() {
									return _auth2.AuthFlow.Set("signup");
								}
							},
							"Sign up"
						)
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ChooseSignupStyle = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _auth = __webpack_require__(20);

var _svgIcons = __webpack_require__(3);

var _auth2 = __webpack_require__(4);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

var _modal = __webpack_require__(9);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { modal } from "../../util/utils.js";
var ChooseSignupStyle = exports.ChooseSignupStyle = {
	view: function view() {
		window.fbAsyncInit = function () {
			FB.init({
				appId: "1813095229016266",
				cookie: true,
				xfbml: true,
				version: 'v2.11'
			});

			FB.AppEvents.logPageView();
		};

		(function (d, s, id) {
			var js,
			    fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
		return (0, _mithril2.default)(
			"section",
			{ "class": "w-100 tc pa-modal" },
			(0, _mithril2.default)(
				"div",
				{ "class": "" },
				(0, _mithril2.default)("script", { src: "https://apis.google.com/js/api.js", onload: "console.log('loaded iam way loaded')" }),
				(0, _mithril2.default)(
					"div",
					{ "class": "overflow-hidden pa1" },
					(0, _mithril2.default)(
						"a",
						{
							"class": "bg-facebook-blue db mb2 white pa2 br2 ba link w-100 flex flex-row justify-start pointer",
							onclick: function onclick() {
								_izitoast2.default.show({
									title: "SIGNUP",
									message: "Please wait...",
									image: "/assets/img/svg/rings-loader.svg",
									position: "center",
									progressBar: false,
									overlay: true,
									timeout: false
								});
								console.log("Login with Facebook");
								FB.getLoginStatus(function (response) {
									console.log(response);
									if (response.status != "connected") {
										FB.login(function (resp) {
											console.log(resp);
											if (resp.status == "connected") {
												// the user accepted the app...
												FB.api("/me?fields=name,email,picture.width(100)", function (r) {
													var toast = document.querySelector('.iziToast');
													_izitoast2.default.hide(toast);
													console.log(r);
													// populate the signup object with these details
													_auth2.AuthFlow.User.name = r.name;
													_auth2.AuthFlow.User.email = r.email;
													_auth2.AuthFlow.User.image = r.picture.data.url;
													_auth2.AuthFlow.User.imageHeight = r.picture.data.height;
													_auth2.AuthFlow.User.imageWidth = r.picture.data.width;
													_auth2.AuthFlow.User.migrate = "facebook";
													_auth2.AuthFlow.User.token = resp.authResponse.accessToken;
													console.log("Authflow.User: ", _auth2.AuthFlow.User);
													_auth2.AuthFlow.Set("emailSignup");
													// log the user in...
												});
											} else {
												// the user did not accept the app...
												console.log("The user did not allow the app to access facebook: ", resp);
												_auth2.AuthFlow.Set("emailSignup");
											}
										}, { scope: 'public_profile,email' });
										// console.log(response.authResponse);
									} else {
										// this is where you should log the user in...
										console.log(response.authResponse);
										FB.api("/me?fields=name,email", function (r) {
											_auth2.AuthFlow.User.migrate = "facebook";
											_auth2.AuthFlow.User.email = r.email;
											_auth2.AuthFlow.User.token = response.authResponse.accessToken;
											_auth2.AuthFlow.LoginHandler().then(function () {
												var toast = document.querySelector('.iziToast');
												_izitoast2.default.hide(toast);
												if (_modal2.default.open) {
													_modal2.default.close();
												}
												console.log(window.location.pathname);
												if (window.location.pathname == "/authenticate/") {
													// redirect to home page...
													window.location.assign("/");
												}
												var event = new Event("loggedin");
												document.dispatchEvent(event);
												_mithril2.default.redraw();
											}).catch(function () {
												var toast = document.querySelector('.iziToast');
												_izitoast2.default.hide(toast);
												_izitoast2.default.error({
													title: 'Error',
													message: 'Login was unsuccessful',
													position: 'center' // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
												});
											});
											console.log(r);
										});
									}
								});
							}
						},
						(0, _mithril2.default)(
							"span",
							{ "class": "dib v-mid w2 h2" },
							(0, _mithril2.default)("img", { src: "/assets/img/facebook.png", alt: "facebook" })
						),
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid flex pa2 justify-center flex-auto", style: "flex:1" },
							"Signup with facebook"
						)
					),
					(0, _mithril2.default)(
						"a",
						{
							"class": "bg-white db mb2 pa2 br2 ba b--black-20 link flex flex-row justify-start pointer",
							onclick: function onclick() {
								console.log("Login with Google...");
								_izitoast2.default.show({
									title: "SIGNUP",
									message: "Please wait...",
									image: "/assets/img/svg/rings-loader.svg",
									position: "center",
									progressBar: false,
									timeout: false
								});
								gapi.load("client:auth2", function () {
									// Initialize the client with API key and People API, and initialize OAuth with an
									// OAuth 2.0 client ID and scopes (space delimited string) to request access.
									gapi.client.init({
										apiKey: "AIzaSyAXlmK39TqbZk1ZL7w9QIaSfzFehHPzssU",
										discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
										clientId: "263066866150-1dlrcl4jb5tvohibiit1uqcut18f8o8c.apps.googleusercontent.com",
										scope: 'profile email'
									}).then(function () {
										// Listen for sign-in state changes.
										console.log("getAuthInstance");
										gapi.auth2.getAuthInstance().isSignedIn.listen(function (isSignedIn) {
											// When signin status changes, this function is called.
											// If the signin status is changed to signedIn, we make an API call.
											if (isSignedIn) {
												// Make an API call to the People API, and print the user's given name.
												/// sign up shhould take place here...
												gapi.client.people.people.get({
													'resourceName': 'people/me',
													// 'requestMask.includeField': 'person.names',
													'personFields': "emailAddresses,names"
												}).then(function (response) {
													console.log(response);
													_auth2.AuthFlow.User.name = response.result.names[0].givenName + " " + response.result.names[0].familyName;
													_auth2.AuthFlow.User.email = response.result.emailAddresses[0].value;
													_auth2.AuthFlow.User.migrate = "google";
													console.log('Hello, ' + response.result.names[0].givenName);
													_izitoast2.default.hide(document.querySelector('.iziToast'));
													_auth2.AuthFlow.Set("emailSignup");
												}, function (reason) {
													console.log(reason);
													console.log('Error: ' + reason.result.error.message);
													_izitoast2.default.hide(document.querySelector('.iziToast'));
												});
											} else {
												_izitoast2.default.hide(document.querySelector('.iziToast'));
												console.log("Not Signed in...");
											}
										});

										// Handle the initial sign-in state.
										// updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
										if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
											// DO LOGIN
											// get email and verify a token...
											// Make an API call to the People API, and print the user's given name.
											console.log("make api call");
											gapi.client.people.people.get({
												'resourceName': 'people/me',
												// 'requestMask.includeField': 'person.names'
												'personFields': "emailAddresses,names"
											}).then(function (response) {
												_auth2.AuthFlow.User.migrate = "google";
												_auth2.AuthFlow.User.token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
												_auth2.AuthFlow.User.name = response.result.names[0].givenName + " " + response.result.names[0].familyName;
												_auth2.AuthFlow.User.email = response.result.emailAddresses[0].value;
												_auth2.AuthFlow.LoginHandler().then(function () {
													_izitoast2.default.hide(document.querySelector('.iziToast'));
													if (_modal2.default.open) {
														_modal2.default.close();
													}
													// console.log(window.location.pathname);
													if (window.location.pathname == "/authenticate/") {
														// redirect to home page...
														window.location.assign("/merchants");
													}
													var event = new Event("loggedin");
													document.dispatchEvent(event);
													_mithril2.default.redraw();
												}).catch(function () {
													_izitoast2.default.hide(document.querySelector('.iziToast'));
													_izitoast2.default.error({
														title: 'Error',
														message: 'Login was unsuccessful',
														position: 'center' // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
													});
												});
												console.log(r);
												console.log('Hello, ' + response.result.names[0].displayName, _auth2.AuthFlow.User.email);
												_izitoast2.default.hide(document.querySelector('.iziToast'));
											}, function (reason) {
												console.log(reason);
												console.log('Error: ' + reason.result.error.message);
												_izitoast2.default.hide(document.querySelector('.iziToast'));
											});
										} else {

											gapi.auth2.getAuthInstance().signIn();
										}
									});
								});
								// GoogleAuth = gapi.auth2.GoogleAuth
							}
						},
						(0, _mithril2.default)(
							"span",
							{ "class": "dib v-mid w2 h2" },
							(0, _mithril2.default)(_svgIcons.SVGIcons, { type: "google" })
						),
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid pa2 justify-center flex flex-auto" },
							"Signup with Google"
						)
					),
					(0, _mithril2.default)(
						"span",
						{ "class": "or relative pa3 tc" },
						(0, _mithril2.default)(
							"span",
							{ "class": "gray pv2" },
							"or"
						)
					),
					(0, _mithril2.default)(
						"a",
						{
							onclick: function onclick() {
								return _auth2.AuthFlow.Set("emailSignup");
							},
							"class": "pointer bg-custom-red br2 db mv2 white pa3 br1 ba no-underline w-100"
						},
						(0, _mithril2.default)(
							"span",
							{ "class": "dib v-mid pr2" },
							(0, _mithril2.default)(_svgIcons.SVGIcons, { type: "email" })
						),
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid" },
							"Signup with Email"
						)
					),
					(0, _mithril2.default)("p", { "class": "w-100 bb b--light-gray" }),
					(0, _mithril2.default)(
						"div",
						{ "class": "cf" },
						(0, _mithril2.default)(
							"span",
							{ "class": "custom-gray fl pv2" },
							"Already have an account?"
						),
						" ",
						(0, _mithril2.default)(
							"a",
							{
								"class": "dib fr pa2 custom-red no-underline ba br2 b--custom-red pointer",
								onclick: function onclick() {
									return _auth2.AuthFlow.Set("login");
								}
							},
							"login"
						)
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UploadProfilePic = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _svgIcons = __webpack_require__(3);

var _auth = __webpack_require__(4);

var _constants = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadProfilePic = exports.UploadProfilePic = {
	state: {
		uploading: false,
		uploadedImage: {},
		uploaded: false
	},
	UploadFile: function UploadFile(e) {
		return new Promise(function (resolve, reject) {
			var files = e.target.files || e.dataTransfer.files;

			var file = files[0];
			var reader = new FileReader();
			reader.onload = function () {
				return function (e) {
					console.log(_constants.IMAGESERVER);
					_mithril2.default.request({
						method: "POST",
						url: _constants.IMAGESERVER + "/upload",
						data: {
							Type: "image",
							Content: e.target.result
						}
					}).then(function (resp) {
						_auth.AuthFlow.User.image = resp.url;
						resolve(resp);
					}).catch(function (err) {
						reject(err);
					});
				};
			}();
			reader.readAsDataURL(file);
		});
	},
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "tc pa-modal" },
			(0, _mithril2.default)(
				"h3",
				null,
				"Add your profile photo"
			),
			(0, _mithril2.default)(
				"p",
				{ "class": "w-100 dib" },
				"Put a face to your name! We'll add this to your profile, and share it with merchants and customers"
			),
			UploadProfilePic.state.uploading ? (0, _mithril2.default)(_svgIcons.SVGIcons, { type: "loader" }) : (0, _mithril2.default)(
				"span",
				{ "class": "w4 h4 tc overflow-hidden dib" },
				(0, _mithril2.default)("img", { "class": _auth.AuthFlow.User.migrate == "facebook" ? "dib" : " dib",
					style: _auth.AuthFlow.User.migrate == "facebook" ? "width: " + _auth.AuthFlow.User.imageWidth + "; height: " + _auth.AuthFlow.User.imageHeight : "",
					alt: "",
					src: _auth.AuthFlow.User.image ? _auth.AuthFlow.User.image : "/assets/img/avatar.jpg"
				})
			),
			_auth.AuthFlow.User.migrate != "facebook" ? (0, _mithril2.default)(
				"a",
				{
					"class": "bg-facebook-blue db  mb2 mt2 white pa3 br2 ba link w-100 flex flex-row justify-center "
				},
				(0, _mithril2.default)(
					"span",
					{ "class": "dib v-mid pr2  " },
					(0, _mithril2.default)(_svgIcons.SVGIcons, { type: "facebook" })
				),
				(0, _mithril2.default)(
					"strong",
					{ "class": "dib v-mid " },
					"Use Facebook Photo"
				)
			) : "",
			(0, _mithril2.default)(
				"label",
				{ "for": "profile_picture",
					"class": "bg-white w-100 dib mv2 ba b--custom-gray custom-gray pa3 br2 no-underline pointer"
				},
				(0, _mithril2.default)(
					"span",
					{ "class": "dib v-mid pr2" },
					(0, _mithril2.default)("img", { "class": "dib v-mid w1 h1", src: "/assets/img/svg/upload.svg" })
				),
				(0, _mithril2.default)(
					"strong",
					{ "class": "dib v-mid" },
					"Upload Photo",
					(0, _mithril2.default)("input", { name: "profile_picture", id: "profile_picture", type: "file", "class": "dn",
						onchange: function onchange(e) {
							UploadProfilePic.state.uploading = true;

							UploadProfilePic.UploadFile(e).then(function (resp) {
								console.log("upload image response: ", resp);
								// update the user's image to the server
								_mithril2.default.request({
									method: "PUT",
									url: "/api/users/updateimage",
									data: _auth.AuthFlow.User
								}).then(function (resp) {
									UploadProfilePic.state.uploading = false;
									UploadProfilePic.state.uploaded = true;
								}).catch(function (err) {
									UploadProfilePic.state.uploading = false;
									console.log("Update image error: ", err);
								});
							}).catch(function (err) {
								UploadProfilePic.state.uploading = false;
							});
						} })
				)
			),
			_auth.AuthFlow.User.migrate == "facebook" || UploadProfilePic.state.uploaded ? (0, _mithril2.default)(
				"p",
				{
					"class": "green pointer mb0 mt3",
					onclick: function onclick() {
						return _auth.AuthFlow.Set("onSignupFlowCompletion");
					}
				},
				"NEXT \xBB"
			) : (0, _mithril2.default)(
				"p",
				{
					"class": "custom-gray pointer mb0 mt3",
					onclick: function onclick() {
						return _auth.AuthFlow.Set("onSignupFlowCompletion");
					}
				},
				"I'll do this later"
			)
		);
	}
};

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VerifyPhonenumber = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _auth = __webpack_require__(4);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerifyPhonenumber = exports.VerifyPhonenumber = {
	view: function view() {
		return (0, _mithril2.default)(
			"section",
			{ "class": "w-100 pa-modal" },
			(0, _mithril2.default)(
				"div",
				{ "class": "tc" },
				(0, _mithril2.default)(
					"div",
					{ "class": "" },
					(0, _mithril2.default)(
						"p",
						{ "class": "f3" },
						"Enter 4-digit code"
					),
					(0, _mithril2.default)(
						"p",
						{ "class": "f6" },
						"We sent an sms to +",
						_auth.AuthFlow.User.phone,
						". ",
						(0, _mithril2.default)("br", null),
						"Enter the code in that message."
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "tc mv2" },
						(0, _mithril2.default)(
							"div",
							{ "class": "tc dib pa3 ba b--light-gray bw1 br-100" },
							(0, _mithril2.default)("img", { "class": "h3 w3 dib", src: "/assets/img/svg/smartphone.svg" })
						)
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "tc" },
						(0, _mithril2.default)("input", {
							"class": "pa2 f3 ba br2 b--custom-gray gray-placeholder w4 mt3 tc",
							style: "outline: none",
							placeholder: "XXXX",
							type: "text",
							oninput: _mithril2.default.withAttr("value", function (v) {
								if (v == _auth.AuthFlow.VerificationCode) {
									_izitoast2.default.success({
										title: 'Success',
										message: 'Successful Phone Number Verification',
										position: 'topRight'
									});
									_auth.AuthFlow.Set("beforeJoining");
								} else {
									if (v.length > 3) {
										_izitoast2.default.error({
											title: 'Error',
											message: 'Incorrect Verification Code',
											position: 'topRight'
										});
									}
								}
							})
						}),
						(0, _mithril2.default)(
							"div",
							{ "class": "pv2 mt2" },
							(0, _mithril2.default)(
								"span",
								{ "class": "tc blue pointer db pa1", onclick: function onclick() {
										return _auth.AuthFlow.Set("addPhonenumber");
									} },
								"Change my number"
							),
							(0, _mithril2.default)(
								"span",
								{ "class": "tc blue pointer db ", onclick: function onclick() {
										return _auth.AuthFlow.VerifyPhonenumber(_auth.AuthFlow.User.phone);
									} },
								"Send code again"
							),
							(0, _mithril2.default)(
								"span",
								{ "class": "tc blue pointer db pa1", onclick: function onclick() {
										return console.log("Call the user...");
									} },
								"Call me instead"
							)
						),
						(0, _mithril2.default)("br", null),
						(0, _mithril2.default)("br", null),
						(0, _mithril2.default)(
							"p",
							{ "class": "custom-gray pointer mb0", onclick: function onclick() {
									_auth.AuthFlow.User = {};
									_auth.AuthFlow.Set("signup");
								} },
							"I don't want to continue"
						)
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OnSignupFlowCompletion = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OnSignupFlowCompletion = exports.OnSignupFlowCompletion = {

	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "tc " },
			(0, _mithril2.default)(
				"div",
				{
					"class": "",
					style: "background: white url('/assets/img/happy.jpeg') center no-repeat; background-size: cover"
				},
				(0, _mithril2.default)(
					"div",
					{ "class": "bg-black-80 ph3 pt6 pb4" },
					(0, _mithril2.default)("img", { "class": "w3 h3", src: "/assets/img/svg/checked.svg" }),
					(0, _mithril2.default)(
						"h3",
						{ "class": "white" },
						"You're all set!"
					),
					(0, _mithril2.default)(
						"p",
						{ "class": "white w5 lh-copy dib" },
						"You can now shop and showcase your goods for others to see on shop440"
					),
					(0, _mithril2.default)(
						"button",
						{ "class": "pointer bg-custom-red w5 dib mv2 white pa2 br2 ba b--red-custom no-underline",
							onclick: function onclick() {
								location.assign("/merchants/shops");
							} },
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid" },
							"Start Exploring"
						)
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WelcomeAfterSignup = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _auth = __webpack_require__(4);

var _svgIcons = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WelcomeAfterSignup = exports.WelcomeAfterSignup = {
	view: function view() {
		return (0, _mithril2.default)(
			"div",
			{ "class": "tc fw2" },
			(0, _mithril2.default)(
				"div",
				{
					"class": "",
					style: "background: white url('/assets/img/happy.jpeg') center no-repeat; background-size: cover"
				},
				(0, _mithril2.default)(
					"div",
					{ "class": "bg-black-80 ph3 pt6 pb2" },
					(0, _mithril2.default)(_svgIcons.SVGIcons, { type: "logo-white", "class": "h3" }),
					(0, _mithril2.default)(
						"h3",
						{ "class": "white f3 fw2" },
						"Welcome to shop440"
					),
					(0, _mithril2.default)(
						"p",
						{ "class": "w5 dib white lh-copy dib", fw2: true },
						"Shop440 merchants and customers are real people with real goods. That's why you'll have to confirm a few, quick details to activate your account."
					),
					(0, _mithril2.default)(
						"button",
						{
							onclick: function onclick() {
								return _auth.AuthFlow.Set("uploadProfilePic");
							},
							"class": "bg-custom-red w5 pointer dib mv2 white pa2 br2 ba b--custom-red no-underline "
						},
						(0, _mithril2.default)(
							"strong",
							{ "class": "dib v-mid fw2" },
							"Next - 1 step left"
						)
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmailSignup = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

var _auth = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailSignup = exports.EmailSignup = {
	view: function view() {
		return (0, _mithril2.default)(
			"section",
			{ "class": "pa-modal" },
			(0, _mithril2.default)(
				"div",
				{ "class": "overflow-hidden tc " },
				(0, _mithril2.default)(
					"p",
					{ "class": "db" },
					"Signup with \xA0",
					(0, _mithril2.default)(
						"a",
						{ "class": "blue", onclick: function onclick() {
								FB.getLoginStatus(function (response) {
									statusChangeCallback(response);
								});
							} },
						"Facebook"
					),
					"\xA0 or \xA0",
					(0, _mithril2.default)(
						"a",
						{ "class": "red" },
						"Google"
					)
				),
				(0, _mithril2.default)(
					"span",
					{ "class": "or relative pa3 tc" },
					(0, _mithril2.default)(
						"span",
						{ "class": "gray pv2" },
						"or"
					)
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "" },
					(0, _mithril2.default)("input", {
						"class": "pa3 mv2 ba b--black-20 br2 db f5 w-100 black-60 gray-placeholder",
						placeholder: "Name",
						type: "text",
						name: "name",
						value: _auth.AuthFlow.User.name,
						oninput: _mithril2.default.withAttr("value", function (val) {
							return _auth.AuthFlow.User.name = val;
						})
					}),
					(0, _mithril2.default)("input", {
						"class": "pa3 mv2 ba b--black-20 br2 db f5 w-100 black-60 gray-placeholder",
						placeholder: "Email address",
						type: "email",
						name: "email",
						value: _auth.AuthFlow.User.email,
						oninput: _mithril2.default.withAttr("value", function (val) {
							return _auth.AuthFlow.User.email = val;
						})
					}),
					(0, _mithril2.default)("input", {
						"class": "pa3 mv2 ba b--black-20 br2 db f5 w-100 black-60 gray-placeholder",
						placeholder: "Password",
						type: "password",
						name: "password",
						value: _auth.AuthFlow.User.password,
						oninput: _mithril2.default.withAttr("value", function (val) {
							return _auth.AuthFlow.User.password = val;
						})
					}),
					(0, _mithril2.default)("input", {
						"class": "pa3 mv2 ba b--black-20 br2 db f5 w-100 black-60 gray-placeholder",
						placeholder: "Repeat Password",
						type: "password",
						name: "repeat_password",
						oninput: _mithril2.default.withAttr("value", function (val) {
							return _auth.AuthFlow.User.repeat_password = val;
						})

					})
				),
				(0, _mithril2.default)(
					"div",
					{ "class": "tl flex" },
					(0, _mithril2.default)("input", { "class": "dib flex vmid mt2 mr2 ", type: "checkbox", name: "checked",
						value: _auth.AuthFlow.User.consent,
						oninput: _mithril2.default.withAttr("value", function (val) {
							return _auth.AuthFlow.User.consent = val;
						})
					}),
					(0, _mithril2.default)(
						"span",
						{ "class": "lh-copy dib flex-auto vmid" },
						"\xA0 I\u2019d like to receive marketing and policy communications from Shop440."
					)
				),
				(0, _mithril2.default)(
					"button",
					{
						onclick: function onclick() {
							if (!_auth.AuthFlow.User.email) {
								_izitoast2.default.error({
									title: 'Error',
									message: 'Email cannot be empty.'
								});
								return;
							}
							if (!_auth.AuthFlow.User.password) {
								_izitoast2.default.error({
									title: 'Error',
									message: 'Password is empty.'
								});
								return;
							}
							if (_auth.AuthFlow.User.repeat_password != _auth.AuthFlow.User.password) {
								_izitoast2.default.error({
									title: 'Error',
									message: 'Passwords do not match.'
								});
								return;
							}
							_auth.AuthFlow.Set("addPhonenumber");
						},
						"class": "bg-custom-red mv2 white pa3 br2 ba no-underline w-100 pointer"
					},
					(0, _mithril2.default)(
						"strong",
						{ "class": "dib v-mid" },
						"Sign up"
					)
				),
				(0, _mithril2.default)("p", { "class": "w-100 bb b--light-gray" }),
				(0, _mithril2.default)(
					"span",
					{ "class": "custom-gray " },
					"Already have a shop440 account?",
					" ",
					(0, _mithril2.default)(
						"a",
						{ "class": "blue pointer", onclick: function onclick() {
								return _auth.AuthFlow.Set("login");
							} },
						"Log in"
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BeforeJoining = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _auth = __webpack_require__(4);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeforeJoining = exports.BeforeJoining = {
	view: function view() {
		return (0, _mithril2.default)(
			"section",
			{ "class": "pa-modal" },
			(0, _mithril2.default)(
				"div",
				{ "class": "tl pt3 f6" },
				(0, _mithril2.default)(
					"h3",
					{ "class": " f3 ma0 fw4" },
					"Before you join"
				),
				(0, _mithril2.default)(
					"p",
					{ "class": "w-100 custom-gray lh-copy ma0 mt1 " },
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
				),
				(0, _mithril2.default)(
					"h3",
					{ "class": "mb0 mt3 fw4 f5" },
					"Shop440 Commitment"
				),
				(0, _mithril2.default)(
					"p",
					{ "class": "w-100 custom-gray lh-copy ma0 mt1" },
					"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
				),
				(0, _mithril2.default)(
					"h3",
					{ "class": "ma0 mt3 fw4 f5" },
					"Shop440 Terms of Service"
				),
				(0, _mithril2.default)(
					"p",
					{ "class": "w-100 custom-gray lh-copy mb4 mt1" },
					(0, _mithril2.default)(
						"div",
						{ "class": "" },
						"I also accept",
						" ",
						(0, _mithril2.default)(
							"a",
							{ href: "#!", "class": "custom-green" },
							"Terms of Service"
						),
						",\xA0",
						(0, _mithril2.default)(
							"a",
							{ href: "#!", "class": "custom-green" },
							"Payments Terms of service"
						),
						",",
						" ",
						(0, _mithril2.default)(
							"a",
							{ href: "#!", "class": "custom-green" },
							"Privacy Policy"
						),
						", and\xA0",
						(0, _mithril2.default)(
							"a",
							{ href: "#!", "class": "custom-green" },
							"Nondiscrimination Policy"
						),
						"."
					)
				),
				(0, _mithril2.default)("br", null),
				(0, _mithril2.default)(
					"a",
					{
						onclick: function onclick() {
							_izitoast2.default.show({
								title: "SIGNUP",
								message: "Please wait...",
								image: "/assets/img/svg/rings-loader.svg",
								position: "center",
								progressBar: false,
								timeout: false
							});
							_auth.AuthFlow.SignupHandler().then(function (res) {
								_izitoast2.default.hide(document.querySelector('.iziToast'));
								_auth.AuthFlow.Set("welcomeAfterSignup");
							}).catch(function (error) {
								_izitoast2.default.hide(document.querySelector('.iziToast'));
								_izitoast2.default.error({
									title: 'Error',
									message: 'Signup was unsuccessful',
									position: 'center' // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
								});
								console.log("Signup error: ", error);
							});
						},
						"class": "mr2 ph3 pv2 ba b--custom-green bg-custom-green white link bw1 br2 pointer"
					},
					"Accept"
				),
				(0, _mithril2.default)(
					"a",
					{
						"class": "ph3 pv2 hover-bg-custom-green hover-white ba b--custom-green custom-green no-underline bw1 br2 pointer",
						onclick: function onclick() {
							// redirect to homepage or close modal if user is on a modal page
							_auth.AuthFlow.Set("emailSignup");
						}
					},
					"Decline"
				),
				(0, _mithril2.default)("br", null),
				(0, _mithril2.default)("br", null)
			)
		);
	}
};

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddPhonenumber = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

var _auth = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddPhonenumber = exports.AddPhonenumber = {
	oninit: function oninit(vnode) {
		_auth.AuthFlow.GetCountriesAndPhoneCode();
	},
	state: { confirmbutton: false },
	view: function view(vnode) {
		// console.log(AuthFlow.PhoneCodes)
		// console.log(vnode.attrs.countries)
		var options = _auth.AuthFlow.PhoneCodes.map(function (country, i) {
			if (i === _auth.AuthFlow.SelectedPhoneCodeIndex) {
				return (0, _mithril2.default)(
					"option",
					{ "class": "pa2", selected: true },
					country.name,
					" (",
					country.callingCodes[0],
					")"
				);
			}

			return (0, _mithril2.default)(
				"option",
				{ "class": "pa2" },
				country.name,
				" (",
				country.callingCodes[0],
				")"
			);
		});
		return (0, _mithril2.default)(
			"section",
			{ "class": "pa-modal" },
			(0, _mithril2.default)(
				"div",
				{ "class": "tc" },
				(0, _mithril2.default)(
					"div",
					{ "class": "" },
					(0, _mithril2.default)(
						"p",
						{ "class": "f3" },
						"Add your phone number"
					),
					(0, _mithril2.default)(
						"p",
						{ "class": "f6" },
						"This is so your customers or merchants can reach you during a transaction"
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "tc" },
						(0, _mithril2.default)(
							"div",
							{ "class": "tc dib pa3 ba b--custom-gray bw1 br-100" },
							(0, _mithril2.default)("img", { "class": "h3 w3 dib", src: "/assets/img/svg/smartphone.svg" })
						)
					),
					(0, _mithril2.default)(
						"div",
						{ "class": "tc" },
						(0, _mithril2.default)(
							"p",
							{ "class": "tc custom-gray" },
							"Country"
						),
						(0, _mithril2.default)(
							"div",
							{ id: "countryselect" },
							(0, _mithril2.default)(
								"select",
								{
									"class": "w5 pa3 ba b--black-20 bg-white custom-gray br2",
									style: "outline: none",
									id: "countryselect",

									onchange: _mithril2.default.withAttr("selectedIndex", _auth.AuthFlow.SetPhoneCode)
								},
								options
							)
						),
						(0, _mithril2.default)(
							"p",
							{ "class": "tc custom-gray" },
							"Phone Number"
						),
						(0, _mithril2.default)(
							"div",
							{ "class": (AddPhonenumber.state.confirmbutton ? " b--black-20 " : " b--red ") + "ba bg-black-10 dib v-mid br2" },
							(0, _mithril2.default)(
								"span",
								{ "class": "pa2 br2 br--left dib v-mid" },
								_auth.AuthFlow.CurrentPhoneCode
							),
							(0, _mithril2.default)("input", {
								"class": "pa2 ba b--transparent br2 br--right",
								style: "outline: none",
								placeholder: "",
								oninput: _mithril2.default.withAttr("value", function (v) {
									if (v.length == 11 && v[0] == 0) {
										v = v.substr(1);
									}
									_auth.AuthFlow.User.raw_phone = v;
									if (v.length == 11 || v.length == 10) {

										_auth.AuthFlow.VerifyPhonenumberAvailability().then(function (response) {
											console.log("Enable the button o: ", response);
											AddPhonenumber.state.confirmbutton = true;
										}).catch(function (err) {
											console.log(err);
											console.log("Disable the button o");
											AddPhonenumber.state.confirmbutton = false;
										});
									} else {
										AddPhonenumber.state.confirmbutton = false;
									}
								})
							})
						),
						(0, _mithril2.default)(
							"a",
							{
								onclick: function onclick() {
									if (!AddPhonenumber.state.confirmbutton) {
										_izitoast2.default.error({
											title: 'Error',
											message: 'Invalid Phone Number'
										});
										return;
									}
									// console.log("length: ", AuthFlow.User.raw_phone.length, " value: ", AuthFlow.User.raw_phone);
									if (!_auth.AuthFlow.User.raw_phone) {
										_izitoast2.default.error({
											title: 'Error',
											message: 'Invalid Phone Number'
										});
										return;
									}
									if (_auth.AuthFlow.User.raw_phone.length != 11 && _auth.AuthFlow.User.raw_phone.length != 10) {
										_izitoast2.default.error({
											title: 'Error',
											message: 'Invalid Phone Number'
										});
										return;
									}
									if (_auth.AuthFlow.User.raw_phone.length == 10 && _auth.AuthFlow.User.raw_phone[0] == '0') {
										_izitoast2.default.error({
											title: 'Error',
											message: 'Invalid Phone Number'
										});
										return;
									}
									_auth.AuthFlow.User.phone = "+" + _auth.AuthFlow.CurrentPhoneCode + _auth.AuthFlow.User.raw_phone;
									_auth.AuthFlow.VerifyPhonenumber(_auth.AuthFlow.User.phone);

									_auth.AuthFlow.Set("verifyPhonenumber");
								},
								"class": "pointer bg-custom-red br2 db white pa3 br1 ba no-underline w-100 mv4"
							},
							(0, _mithril2.default)(
								"strong",
								{ "class": "dib v-mid " },
								"Confirm Phone Number"
							)
						),
						(0, _mithril2.default)(
							"p",
							{ "class": "custom-gray pointer mb0",
								onclick: function onclick() {
									_auth.AuthFlow.User = {};
									_auth.AuthFlow.Set("signup");
								} },
							"cancel signup"
						)
					)
				)
			)
		);
	}
};

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AuthFlow = undefined;

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

var _izitoast = __webpack_require__(1);

var _izitoast2 = _interopRequireDefault(_izitoast);

var _localforage = __webpack_require__(5);

var _localforage2 = _interopRequireDefault(_localforage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthFlow = exports.AuthFlow = {
	CurrentPage: "login", //uploadProfilePic
	User: {},
	PhoneCodes: [],
	CurrentPhoneCode: "234",
	SelectedPhoneCodeIndex: 162,
	VerificationCode: "",
	Set: function Set(page) {
		console.log(page);
		console.log(AuthFlow.User);
		AuthFlow.CurrentPage = page;
		_mithril2.default.redraw();
	},
	Get: function Get() {
		return AuthFlow.CurrentPage;
	},
	GetCountriesAndPhoneCode: function GetCountriesAndPhoneCode() {
		return _mithril2.default.request({
			method: "GET",
			url: "https://restcountries.eu/rest/v2/all?fields=name;callingCodes;cioc"
		}).then(function (resp) {
			console.log(resp);
			AuthFlow.PhoneCodes = resp;
			return AuthFlow.PhoneCodes;
			// m.redraw()
		}).catch(function (error) {
			console.error(error);
		});
	},
	GetPhoneCodes: function GetPhoneCodes() {
		return AuthFlow.PhoneCodes;
	},
	SetPhoneCode: function SetPhoneCode(index) {
		AuthFlow.CurrentPhoneCode = AuthFlow.PhoneCodes[index].callingCodes[0];
		AuthFlow.SelectedPhoneCodeIndex = index;
	},
	VerifyPhonenumber: function VerifyPhonenumber(phonenumber) {
		return _mithril2.default.request({
			method: "GET",
			url: "/api/users/verifyphone?p=" + phonenumber
		}).then(function (resp) {
			console.log(resp);
			AuthFlow.VerificationCode = resp.code;
		}).catch(function (error) {
			console.error(error);
		});
	},
	VerifyPhonenumberAvailability: function VerifyPhonenumberAvailability() {
		AuthFlow.User.phone = "+" + AuthFlow.CurrentPhoneCode + AuthFlow.User.raw_phone;
		// AuthFlow.User.phone = phonenumber;
		return _mithril2.default.request({
			method: "POST",
			url: "/api/users/checkphonenumber",
			data: AuthFlow.User
		}).then(function (response) {
			console.log("Verify Phone Number availablity response: ", response);
			return response;
		}).catch(function (err) {
			console.log("Error: ", err);
			throw err;
			// return err;
		});
	},
	SignupHandler: function SignupHandler() {
		return _mithril2.default.request({
			method: "POST",
			url: "/api/users/signup",
			data: AuthFlow.User
		}).then(function (resp) {
			_localforage2.default.setItem("user", resp.user).then(function () {
				window.sendinblue.identify(AuthFlow.User.email, {
					'FIRSTNAME': "" + AuthFlow.User.name.trim().split(" ")[0],
					'LASTNAME': "" + AuthFlow.User.name.trim().split(" ")[1],
					'SMS': "" + AuthFlow.User.phone,
					'MERCHANT': false
				});
				_izitoast2.default.success({
					title: 'Success',
					message: 'Successful Signup',
					position: 'topRight'
				});
				AuthFlow.Set("welcomeAfterSignup");
			});
		});
		// .catch(function(error) {
		// 	console.log("Signup Error: ", error)
		// 	iziToast.error({
		// 		theme: 'dark',
		// 		title: 'Error',
		// 		message: 'Signup was unsuccessful',
		// 		position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
		// 		progressBarColor: 'rgb(0, 255, 184)',
		// 	});
		// 	throw err
		// });
	},
	LoginHandler: function LoginHandler() {
		return _mithril2.default.request({
			method: "POST",
			url: "/api/users/login",
			data: AuthFlow.User
		}).then(function (resp) {
			// console.log(user)
			var user = resp.user;
			if (user) {
				window.sendinblue.identify(user.email, {
					'FIRSTNAME': "" + user.name.trim().split(" ")[0],
					'LASTNAME': "" + user.name.trim().split(" ")[1],
					'SMS': "" + user.phone
				});

				_localforage2.default.setItem("user", user).then(function (c) {
					_izitoast2.default.success({
						title: 'Success',
						message: 'Logged in successfully',
						position: 'topRight'
					});

					location.assign("/merchants/");
				});
			} else {
				_izitoast2.default.error({
					title: 'Error',
					message: 'Login was unsuccessful',
					position: 'topRight'
				});
			}
		}).catch(function (error) {
			_izitoast2.default.error({
				theme: 'dark',
				icon: 'icon-person',
				title: 'Error',
				message: 'Login was unsuccessful',
				position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
				progressBarColor: 'rgb(0, 255, 184)'
			});
			console.log("LoginError: ", error);
			throw error;
		});
	}
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.5.5
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

exports.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

exports.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

exports.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

exports.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support (#5572)
        // since Safari 10.1 shipped with fetch, we can use that to detect it
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs;
var dbContexts;
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve) {
        deferredOperation.resolve = resolve;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        if (forages[i]._dbInfo.db) {
            forages[i]._dbInfo.db.close();
            forages[i]._dbInfo.db = null;
        }
    }

    return _getConnection(dbInfo, false).then(function (db) {
        for (var j = 0; j < forages.length; j++) {
            forages[j]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback) {
    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (!dbInfo.db || err.name === 'InvalidStateError') {
            return _tryReconnect(dbInfo).then(function () {

                var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                callback(null, tx);
            });
        }

        callback(err);
    }
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Initialize a singleton container for all running localForages.
    if (!dbContexts) {
        dbContexts = {};
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
        };
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback retuns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        });
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {

                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && typeof localStorage.setItem === 'function';
    } catch (e) {
        return false;
    }
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = dbInfo.name + '/';

    if (dbInfo.storeName !== self._defaultConfig.storeName) {
        dbInfo.keyPrefix += dbInfo.storeName + '/';
    }

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error('Can\'t call config() after localforage ' + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var customDriverMethod = driverMethods[i];
                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 6:
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

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mithril = __webpack_require__(0);

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = {
	open: false,
	wide: false,
	close: function close() {
		Modal.open = false;
	},
	content: {},
	view: function view(vnode) {
		return (0, _mithril2.default)(
			"div",
			{
				"class": "fixed left-0 top-0 w-100 h-100 bg-black-80 overflow-auto pa3-ns db ",
				style: "z-index: 4"
			},
			(0, _mithril2.default)(
				"div",
				{ "class": " absolute z-3 right-0 top-0-ns pa3-ns" },
				(0, _mithril2.default)(
					"p",
					{ "class": "f1 mv0 pa1 gray white-ns pointer", onclick: Modal.close },
					"\xD7"
				)
			),
			(0, _mithril2.default)(
				"div",
				{ "class": "relative pa3-ns pa1 bg-white " + (Modal.wide ? " w-90-m w-80-l" : " w-70-m w-60-l"), style: "margin: auto;" },
				Modal.content.view ? (0, _mithril2.default)(Modal.content, null) : ""
			)
		);
	}
};

exports.default = Modal;

/***/ })

/******/ });
//# sourceMappingURL=authenticate-bundle.js.map