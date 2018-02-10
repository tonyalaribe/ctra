import m from "mithril";
import { FormWizard } from "../components/RegistrationForm/FormWizard.js";
import { Data } from "../models/data.js";

export var NewDriverPage = {
	oncreate: function() {},
	view: function() {
		return (
			<section class="tc ph6 ">
				<div class="bg-gray cf pa3">
					<button
						class="fr pv2 ph3 bg-white shadow-4 "
						onclick={() => Data.Submit()}
					>
						Save
					</button>
				</div>
				<section class="pv3">
					<FormWizard />
				</section>
				<div class="bg-gray cf pa3">
					<button
						class="fr pv2 ph3 bg-white shadow-4 "
						onclick={() => Data.Submit()}
					>
						Save
					</button>
				</div>
			</section>
		);
	}
};
