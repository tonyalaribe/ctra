import m from "mithril";
import { TextInput } from "../TextInput.js";
import { ImageInput } from "../ImageInput.js";
import { Data } from "../../models/data.js";

export var GuarantorsBio = {
	view: function() {
		return (
			<div class="mv4 pv4">
				<fieldset>
					<legend class="ph2">Guarantor's Bio</legend>

					<div class="tc dib w-100">
						<ImageInput
							label="Guarantors Passport"
							class=" dib w-50 "
							Value={Data.data.GuarantorsBio.GuarantorsPassport}
							Callback={v => (Data.data.GuarantorsBio.GuarantorsPassport = v)}
						/>
						<ImageInput
							label="Guarantors Identity"
							class=" dib w-50 "
							Value={Data.data.GuarantorsBio.GuarantorsIdentity}
							Callback={v => (Data.data.GuarantorsBio.GuarantorsIdentity = v)}
						/>
					</div>

					<TextInput
						label="First Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.FirstName = v)
						)}
					/>
					<TextInput
						label="Last Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.LastName = v)
						)}
					/>
					<TextInput
						label="Other Name"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.OtherName = v)
						)}
					/>
					<TextInput
						label="Gender"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.Gender = v)
						)}
					/>
					<TextInput
						label="Date of Birth"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.DateOfBirth = v)
						)}
					/>
					<TextInput
						label="Marital Status"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.MaritalStatus = v)
						)}
					/>
					<TextInput
						label="Office Address"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.OfficeAddress = v)
						)}
					/>
					<TextInput
						label="Residential Address"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.ResidentialAddress = v)
						)}
					/>
					<TextInput
						label="Phone Numbers"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.PhoneNumbers = v)
						)}
					/>
					<TextInput
						label="Occupation"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.Occupation = v)
						)}
					/>
					<TextInput
						label="Religion"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.Religion = v)
						)}
					/>
					<TextInput
						label="L.G.A. of Origin"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.LocalGovernmentOfOrigin = v)
						)}
					/>
					<TextInput
						label="State of Origin"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.StateOfOrigin = v)
						)}
					/>
					<TextInput
						label="Nationality"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.GuarantorsBio.Nationality = v)
						)}
					/>
				</fieldset>
			</div>
		);
	}
};
