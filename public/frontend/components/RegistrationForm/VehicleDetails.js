import m from "mithril";
import { TextInput } from "../TextInput.js";
import { ImageInput } from "../ImageInput.js";
import { Data } from "../../models/data.js";

export var VehicleDetails = {
	view: function() {
		return (
			<div class="mv4 pv4">
				<fieldset>
					<legend class="ph2">Vehicle Details</legend>
					<div class="tc dib w-100">
						<ImageInput
							label="Vehicle's Photograph"
							class=" dib w-50 "
							Value={Data.data.VehicleDetails.PhotographOfVehicle}
							Callback={v => (Data.data.VehicleDetails.PhotographOfVehicle = v)}
						/>
					</div>
					<TextInput
						label="Registration Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleDetails.RegistrationNumber = v)
						)}
					/>
					<TextInput
						label="Type of Vehicle"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleDetails.TypeOfVehicle = v)
						)}
					/>
					<TextInput
						label="Vehicle License Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleDetails.VehicleLicenseNumber = v)
						)}
					/>
					<TextInput
						label="Chasis Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleDetails.ChasisNumber = v)
						)}
					/>
					<TextInput
						label="Engine Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleDetails.EngineNumber = v)
						)}
					/>
					<TextInput
						label="Insurance Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleDetails.InsuranceNumber = v)
						)}
					/>
				</fieldset>
			</div>
		);
	}
};
