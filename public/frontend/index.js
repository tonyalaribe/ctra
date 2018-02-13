import m from "mithril";

import { HomePage } from "./containers/HomePage.js";
import { NewDriverPage } from "./containers/NewDriverPage.js";
import { ViewItem } from "./containers/ViewItem.js";
import { Shell } from "./containers/Shell.js";
import { Data } from "./models/data.js";
import {Analytics} from "./containers/analytics";

var root = document.getElementById("appContainer");

m.route.prefix("#!");

m.route(root, "/", {
	"/": {
		view: function(vnode) {
			return m(Shell, m(HomePage, vnode.attrs));
		}
	},
	"/registration": {
		view: function(vnode) {
			return m(Shell, m(NewDriverPage, vnode.attrs));
		}
	},
	"/item/:id": {
		view: function(vnode) {
			return m(Shell, m(ViewItem, vnode.attrs));
		}
	},
	"/analytics": {
		view: function(vnode) {
			return m(Shell, m(Analytics, vnode.attrs));
		}
	}
});
