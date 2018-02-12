import m from "mithril";
import { TextInput } from "../TextInput.js";
import { ImageInput } from "../ImageInput.js";
import { Data } from "../../models/data.js";

export var DriversBio = {
	view: function() {
		return (
			<div class="mv4 pv4">
				<fieldset>
					<legend class="ph2">Driver's Bio</legend>

					<div class="tc dib w-100">
						<ImageInput
							label="Drivers Photograph"
							class=" dib w-50 "
							Value={Data.data.DriversBio.DriversPhotograph}
							Callback={v => (Data.data.DriversBio.DriversPhotograph = v)}
						/>
						<ImageInput
							label="Drivers Thumbprint"
							class=" dib w-50 "
							Value={Data.data.DriversBio.DriversThumbprint}
							Callback={v => (Data.data.DriversBio.DriversThumbprint = v)}
						/>
					</div>

					<TextInput
						label="First Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.FirstName = v)
						)}
					/>
					<TextInput
						label="Last Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.LastName = v)
						)}
					/>
					<TextInput
						label="Other Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.OtherName = v)
						)}
					/>
					<TextInput
						label="Gender"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.Gender = v)
						)}
					/>
					<TextInput
						label="Date of Birth"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.DateOfBirth = v)
						)}
					/>
					<TextInput
						label="Marital Status"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.MaritalStatus = v)
						)}
					/>
					<TextInput
						label="Office Address"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.OfficeAddress = v)
						)}
					/>
					<TextInput
						label="Residential Address"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.ResidentialAddress = v)
						)}
					/>
					<TextInput
						label="Phone Numbers"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.PhoneNumbers = v)
						)}
					/>
					<TextInput
						label="Occupation"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.Occupation = v)
						)}
					/>
					<TextInput
						label="Religion"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.Religion = v)
						)}
					/>
					<TextInput
						label="L.G.A. of Origin"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.LocalGovernmentOfOrigin = v)
						)}
					/>
					<TextInput
						label="State of Origin"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.StateOfOrigin = v)
						)}
					/>
					<TextInput
						label="Nationality"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.Nationality = v)
						)}
					/>
					<TextInput
						label="Name of NOK"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.NameOfNextOfKin = v)
						)}
					/>
					<TextInput
						label="Relationship with NOK"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.RelationshipWithNextOfKin = v)
						)}
					/>
					<TextInput
						label="Phone Number of NOK"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.DriversBio.PhoneNumberOfNextOfKin = v)
						)}
					/>
				</fieldset>
			</div>
		);
	}
};
