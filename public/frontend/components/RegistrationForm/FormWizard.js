import m from "mithril";
import { MetaData } from "./MetaData.js";
import { VehicleOwnersBio } from "./VehicleOwnersBio.js";
import { DriversBio } from "./DriversBio.js";
import { GuarantorsBio } from "./GuarantorsBio.js";
import { VehicleDetails } from "./VehicleDetails.js";

export var FormWizard = {
	start: 0,
	view: function() {
		return (
			<section>
				<MetaData />
				<VehicleDetails />
				<VehicleOwnersBio />
				<DriversBio />
				<GuarantorsBio />
			</section>
		);
	}
};
