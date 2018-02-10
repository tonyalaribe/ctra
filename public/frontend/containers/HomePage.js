import m from "mithril";
import flatpickr from "flatpickr";
import { Data } from "../models/data.js";

export var HomePage = {
	oncreate: function() {
		Data.GetAll();
		flatpickr(document.getElementById("fromDate"), {});
		flatpickr(document.getElementById("toDate"), {});
	},
	view: function() {
		return (
			<section class="tc ph6 pb5 " style="min-height:90vh">
				<div class="bg-gray cf pa3">
					<button class="fr pv2 ph3 bg-white shadow-4 ">Refresh List</button>
				</div>
				<table class="f6 w-100  center ba b--black-20 bg-white" cellspacing="0">
					<thead class="tc">
						<tr class="bg-near-white">
							<th class="fw6 bb b--black-20  pa3 ">S/N</th>
							<th class="fw6 bb b--black-20  pa3 ">Name</th>
							<th class="fw6 bb b--black-20  pa3 ">Reg. No.</th>
							<th class="fw6 bb b--black-20  pa3 ">Vehicle No.</th>
							<th class="fw6 bb b--black-20  pa3 ">Form No.</th>
							<th class="fw6 bb b--black-20  pa3 ">Actions</th>
						</tr>
					</thead>
					<tbody class="lh-copy">
						{Data.items.map(function(item) {
							return (
								<tr>
									<td class="pv3 pr3 bb b--black-20">{item.ID}</td>
									<td class="pv3 pr3 bb b--black-20">
										{item.DriversBio.FirstName + " " + item.DriversBio.LastName}
									</td>
									<td class="pv3 pr3 bb b--black-20">
										{item.VehicleDetails.RegistrationNumber}
									</td>
									<td class="pv3 pr3 bb b--black-20">
										{item.VehicleDetails.VehicleLicenseNumber}
									</td>
									<td class="pv3 pr3 bb b--black-20">
										{item.MetaData.FormNumber}
									</td>
									<td class="pv3 pr3 bb b--black-20">
										<a
											class="link bg-green white pv2 ph3 br2 pointer"
											oncreate={m.route.link}
											href={"/item/" + item.ID}
										>
											view
										</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		);
	}
};
