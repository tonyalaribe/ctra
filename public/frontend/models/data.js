import m from "mithril";
import izitoast from "iziToast";

export var Data = {
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
	Submit: function() {
		console.log(Data.data);
		console.log(JSON.stringify(Data.data));

		return m
			.request({
				method: "POST",
				url: "/api/items/create",
				data: Data.data
			})
			.then(function(result) {
				console.log(result);
				izitoast.success({
					title: "OK",
					message: "Successfully inserted record!"
				});
			});
	},
	GetAll: function() {
		console.log("get all");
		return m
			.request({
				method: "GET",
				url: "/api/items/all"
			})
			.then(function(result) {
				console.log(result);
				Data.items = result;
				return result;
			});
	},
	GetOne: function(id) {
		console.log("get all");
		return m
			.request({
				method: "GET",
				url: "/api/items/" + id
			})
			.then(function(result) {
				console.log(result);
				Data.item = result;
				return result;
			});
	}
};
