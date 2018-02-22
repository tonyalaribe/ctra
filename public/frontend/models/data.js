import m from "mithril";
import izitoast from "izitoast";

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
	searchquery:"",
	searchdate: {},
	Search: function(){
		return m.request({
			url:"/api/items/search/"+Data.searchquery,
			method: "GET",
		})
	},
	SearchByDate: function() {
		if (!Data.searchdate.To || !Data.searchdate.To) {
			return izitoast.error({
				title: "Error",
				message: "Please fill out all search fields.",
				position: "topCenter"
			})
		}
		Data.searchdate.From = new Date(Data.searchdate.From)
		Data.searchdate.To = new Date(Data.searchdate.To)
		return m.request({
			method: "POST",
			url: "/api/items/search/bydate",
			data: Data.searchdate
		})
	},
	Submit: function() {
		console.log(Data.data);
		// console.log(JSON.stringify(Data.data));

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
