import m from "mithril";
import { TextInput } from "../TextInput.js";
import { Data } from "../../models/data.js";

export var MetaData = {
	view: function() {
		return (
			<div class="mv4 pv4">
				<fieldset>
					<legend class="ph2">Registration Meta Data</legend>
					<TextInput
						label="Form Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.MetaData.FormNumber = v)
						)}
					/>
					<TextInput
						label="Slot Number"
						class="dib w-50"
						oninput={m.withAttr(
							"value",
							v => (Data.data.MetaData.SlotNumber = v)
						)}
					/>
				</fieldset>
			</div>
		);
	}
};
