import tingle from "tingle.js";

export function isEmptyObject(obj) {
	for (var v in obj) {
		if (obj.hasOwnProperty(v)) {
			return false;
		}
	}
	return true;
}

// instanciate new modal
export var modal = new tingle.modal({
	footer: false,
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["tc"],
	onOpen: function() {
		console.log("modal open");
	},
	onClose: function() {
		console.log("modal closed");
	},
	beforeClose: function() {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
		// return false; // nothing happens
	}
});