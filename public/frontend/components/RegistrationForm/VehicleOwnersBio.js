import m from "mithril";
import { TextInput } from "../TextInput.js";
import { ImageInput } from "../ImageInput.js";
import { Data } from "../../models/data.js";

export var VehicleOwnersBio = {
	view: function() {
		return (
			<div class="mv4 pv4">
				<fieldset>
					<legend class="ph2">Vehicle Owner's Bio</legend>

					<div class="tc dib w-100">
						<ImageInput
							label="Owners Passport"
							class=" dib w-50-ns w-100 "
							Value={Data.data.VehicleOwnersBio.OwnersPassport}
							Callback={v => (Data.data.VehicleOwnersBio.OwnersPassport = v)}
						/>
					</div>
					<TextInput
						label="First Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.FirstName = v)
						)}
					/>
					<TextInput
						label="Last Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.LastName = v)
						)}
					/>
					<TextInput
						label="Other Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.OtherName = v)
						)}
					/>
					<TextInput
						label="Gender"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.Gender = v)
						)}
					/>
					<TextInput
						label="Date of Birth"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.DateOfBirth = v)
						)}
					/>
					<TextInput
						label="Marital Status"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.MaritalStatus = v)
						)}
					/>
					<TextInput
						label="Office Address"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.OfficeAddress = v)
						)}
					/>
					<TextInput
						label="Residential Address"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.ResidentialAddress = v)
						)}
					/>
					<TextInput
						label="Phone Numbers"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.PhoneNumbers = v)
						)}
					/>
					<TextInput
						label="Occupation"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.Occupation = v)
						)}
					/>
					<TextInput
						label="Religion"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.Religion = v)
						)}
					/>
					<TextInput
						label="L.G.A. of Origin"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.LocalGovernmentOfOrigin = v)
						)}
					/>
					<TextInput
						label="State of Origin"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.StateOfOrigin = v)
						)}
					/>
					<TextInput
						label="Nationality"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.Nationality = v)
						)}
					/>
					<TextInput
						label="Name of NOK"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.NameOfNextOfKin = v)
						)}
					/>
					<TextInput
						label="Relationship with NOK"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.RelationshipWithNextOfKin = v)
						)}
					/>
					<TextInput
						label="Phone Number of NOK"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.VehicleOwnersBio.PhoneNumberOfNextOfKin = v)
						)}
					/>
				</fieldset>
			</div>
		);
	}
};
