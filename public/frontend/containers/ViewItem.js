import m from "mithril";
import { Data } from "../models/data.js";

export var ViewItem = {
	oncreate: function(vnode) {
		console.log(vnode.attrs.id);
		Data.GetOne(vnode.attrs.id);
	},
	view: function() {
		let vo_data = Data.item.VehicleOwnersBio;
		let VehicleOwnersBio = {
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

		let drivers_data = Data.item.DriversBio;
		let DriversBio = {
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

		let v_data = Data.item.VehicleDetails;
		let VehicleParticulars = {
			"Registration Number": v_data.RegistrationNumber,
			"Type of Vehicle": v_data.TypeOfVehicle,
			"Vehicle License Number": v_data.VehicleLicenseNumber,
			"Chasis Number": v_data.ChasisNumber,
			"Engine Number": v_data.EngineNumber,
			"Insurance Number": v_data.InsuranceNumber
		};

		let g_data = Data.item.GuarantorsBio;
		let GuarantorsBio = {
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

		console.log(Object.entries(VehicleOwnersBio).forEach(([k, v]) => v));
		return (
			<section class="tc ph6 pb5 " style="min-height:90vh">
				<div class="bg-gray cf pa3">
					<button class="fr pv2 ph3 bg-white shadow-4 ">Print</button>
				</div>
				<section class="pv3 cf">
					<div class="dib  ba pa3 fl" style="width:49%">
						<h3>Vehicle Owner Bio Data</h3>
						<div>
							<div>
								<div class="cf tc">
									<div class=" pa2 tc w-50 dib ">
										<label class="dib tc">
											<img
												src={
													Data.item.VehicleOwnersBio.OwnersPassport
														? Data.item.VehicleOwnersBio.OwnersPassport
														: "//placehold.it/200x200"
												}
												class="w-100 bg-light-gray db h4"
												alt=""
												style="min-height:20px"
											/>
										</label>
										<strong class="db f5 ma0 pa2">Owner's Passport</strong>
									</div>
								</div>
							</div>
							{Object.entries(VehicleOwnersBio).map(([key, value]) => {
								return (
									<div class="cf pv2">
										<div class="w-30 tl fl pr1">
											<strong>{key}</strong>
										</div>
										<div class="w-70 tl fl">
											<span class="fw6 ttu lh-copy">{value}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div class="dib  ba pa3 fr" style="width:49%">
						<h3>Drivers Bio Data</h3>
						<div>
							<div>
								<div class="cf">
									<div class=" pa2 tc w-50 fl">
										<label class="dib tc">
											<img
												src={
													Data.item.DriversBio.DriversPhotograph
														? Data.item.DriversBio.DriversPhotograph
														: "//placehold.it/200x200"
												}
												class="w-100 bg-light-gray db"
												alt=""
												style="min-height:20px"
											/>
										</label>
										<strong class="db f5 ma0 pa2">Drivers Photograph</strong>
									</div>
									<div class=" pa2 tc w-50 fl ">
										<label class="dib tc">
											<img
												src={
													Data.item.DriversBio.DriversThumbprint
														? Data.item.DriversBio.DriversThumbprint
														: "//placehold.it/200x200"
												}
												class="w-100 bg-light-gray db h4"
												alt=""
												style="min-height:20px"
											/>
										</label>
										<strong class="db f5 ma0 pa2">Drivers Thumbprint</strong>
									</div>
								</div>
							</div>
							{Object.entries(DriversBio).map(([key, value]) => {
								return (
									<div class="cf pv2">
										<div class="w-30 tl fl pr1">
											<strong>{key}</strong>
										</div>
										<div class="w-70 tl fl">
											<span class="fw6 ttu lh-copy">{value}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
				<section class="pv3 cf">
					<div class="dib  ba pa3 fl" style="width:49%">
						<h3>Vehicle Particulars</h3>
						<div>
							<div>
								<div class="cf tc">
									<div class=" pa2 tc w-50 dib ">
										<label class="dib tc">
											<img
												src={
													Data.item.VehicleDetails.PhotographOfVehicle
														? Data.item.VehicleDetails.PhotographOfVehicle
														: "//placehold.it/200x200"
												}
												class="w-100 bg-light-gray db h4"
												alt=""
												style="min-height:20px"
											/>
										</label>
										<strong class="db f5 ma0 pa2">Photograph of Vehicle</strong>
									</div>
								</div>
							</div>
							{Object.entries(VehicleParticulars).map(([key, value]) => {
								return (
									<div class="cf pv2">
										<div class="w-30 tl fl pr1">
											<strong>{key}</strong>
										</div>
										<div class="w-70 tl fl">
											<span class="fw6 ttu lh-copy">{value}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div class="dib  ba pa3 fr" style="width:49%">
						<h3>Guarantors Bio Data</h3>
						<div>
							<div>
								<div class="cf">
									<div class=" pa2 tc w-50 fl">
										<label class="dib tc">
											<img
												src={
													Data.item.GuarantorsBio.GuarantorsPassport
														? Data.item.GuarantorsBio.GuarantorsPassport
														: "//placehold.it/200x200"
												}
												class="w-100 bg-light-gray db"
												alt=""
												style="min-height:20px"
											/>
										</label>
										<strong class="db f5 ma0 pa2">Guarantors Passport</strong>
									</div>
									<div class=" pa2 tc w-50 fl ">
										<label class="dib tc">
											<img
												src={
													Data.item.GuarantorsBio.GuarantorsIdentity
														? Data.item.GuarantorsBio.GuarantorsIdentity
														: "//placehold.it/200x200"
												}
												class="w-100 bg-light-gray db h4"
												alt=""
												style="min-height:20px"
											/>
										</label>
										<strong class="db f5 ma0 pa2">Guarantors Identity</strong>
									</div>
								</div>
							</div>
							{Object.entries(GuarantorsBio).map(([key, value]) => {
								return (
									<div class="cf pv2">
										<div class="w-30 tl fl pr1">
											<strong>{key}</strong>
										</div>
										<div class="w-70 tl fl">
											<span class="fw6 ttu lh-copy">{value}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
				<div class="bg-gray cf pa3">
					<button class="fr pv2 ph3 bg-white shadow-4 ">Print</button>
				</div>
			</section>
		);
	}
};
