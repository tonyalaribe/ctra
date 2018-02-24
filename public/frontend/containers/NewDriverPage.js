import m from "mithril";
import { FormWizard } from "../components/RegistrationForm/FormWizard.js";
import { Data } from "../models/data.js";
import izitoast from "izitoast";

export var NewDriverPage = {
	oncreate: function() {},
	ValidateSubmit: function(){
		var f = Data.data;
		console.log(f.VehicleDetails);
		if (!f.MetaData.FormNumber || !f.MetaData.SlotNumber) {
			izitoast.error({
				title: "Error",
				message: "Please fill out the Meta Data",
				position: "topCenter"
			})
			return;
		}
		if (!f.VehicleOwnersBio.FirstName || !f.VehicleOwnersBio.LastName || !f.VehicleOwnersBio.OtherName
		|| !f.VehicleOwnersBio.Gender || !f.VehicleOwnersBio.DateOfBirth || !f.VehicleOwnersBio.MaritalStatus
		|| !f.VehicleOwnersBio.OfficeAddress || !f.VehicleOwnersBio.ResidentialAddress || !f.VehicleOwnersBio.PhoneNumbers
		|| !f.VehicleOwnersBio.Occupation || !f.VehicleOwnersBio.Religion || !f.VehicleOwnersBio.LocalGovernmentOfOrigin
		|| !f.VehicleOwnersBio.StateOfOrigin || !f.VehicleOwnersBio.Nationality || !f.VehicleOwnersBio.NameOfNextOfKin
		|| !f.VehicleOwnersBio.RelationshipWithNextOfKin || !f.VehicleOwnersBio.PhoneNumberOfNextOfKin || !f.VehicleOwnersBio.OwnersPassport){
			izitoast.error({
				title: "Error",
				message: "Please fill Vehicle Owner's Data",
				position: "topCenter"
			})
			return;
		}
		if (!f.DriversBio.FirstName || !f.DriversBio.LastName || !f.DriversBio.OtherName
			|| !f.DriversBio.Gender || !f.DriversBio.DateOfBirth || !f.DriversBio.MaritalStatus
			|| !f.DriversBio.OfficeAddress || !f.DriversBio.ResidentialAddress || !f.DriversBio.PhoneNumbers
			|| !f.DriversBio.Occupation || !f.DriversBio.Religion || !f.DriversBio.LocalGovernmentOfOrigin
			|| !f.DriversBio.StateOfOrigin || !f.DriversBio.Nationality || !f.DriversBio.NameOfNextOfKin
			|| !f.DriversBio.RelationshipWithNextOfKin || !f.DriversBio.PhoneNumberOfNextOfKin || !f.DriversBio.DriversPhotograph
			// !f.DriversBio.DriversThumbprint
		) {
			izitoast.error({
				title: "Error",
				message: "Please fill out the Driver's Bio Data",
				position: "topCenter"
			})
			return;
		}
		if (!f.GuarantorsBio.FirstName || !f.GuarantorsBio.LastName || !f.GuarantorsBio.OtherName || 
			!f.GuarantorsBio.Gender || !f.GuarantorsBio.DateOfBirth || !f.GuarantorsBio.MaritalStatus || 
			!f.GuarantorsBio.OfficeAddress || !f.GuarantorsBio.ResidentialAddress || !f.GuarantorsBio.PhoneNumbers || 
			!f.GuarantorsBio.Occupation || !f.GuarantorsBio.Religion || !f.GuarantorsBio.LocalGovernmentOfOrigin || 
			!f.GuarantorsBio.StateOfOrigin || !f.GuarantorsBio.Nationality || !f.GuarantorsBio.GuarantorsPassport || 
			!f.GuarantorsBio.GuarantorsIdentity){
				izitoast.error({
					title: "Error",
					message: "Please fill out the Guarantor's Bio Data",
					position: "topCenter"
				})
				return;
			}
		if (!f.VehicleDetails.RegistrationNumber || !f.VehicleDetails.TypeOfVehicle || !f.VehicleDetails.VehicleLicenseNumber ||
			!f.VehicleDetails.ChasisNumber || !f.VehicleDetails.EngineNumber || !f.VehicleDetails.InsuranceNumber ||
			!f.VehicleDetails.PhotographOfVehicle){
				izitoast.error({
					title: "Error",
					message: "Please fill out the Guarantor's Bio Data",
					position: "topCenter"
				})
				return;
			}
		// add loader here...
		Data.Submit();
	},
	view: function() {
		return (
			<section class="tc ph6-l ph3-m ph1">
				<div class="bg-gray cf pa3">
					<button
						class="fr pv2 ph3 bg-white shadow-4 ba b--transparent"
						onclick={NewDriverPage.ValidateSubmit}
					>
						Save
					</button>
				</div>
				<section class="pv3">
					<FormWizard />
				</section>
				<div class="bg-gray cf pa3">
					<button
						class="fr pv2 ph3 bg-white shadow-4 ba b--transparent"
						onclick={NewDriverPage.ValidateSubmit}
					>Save</button>
				</div>
			</section>
		);
	}
};
