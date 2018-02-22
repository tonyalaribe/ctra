import m from "mithril";
import flatpickr from "flatpickr";
import { Data } from "../models/data.js";
import {SVGIcons} from "../../shared/components/svgIcons";

export var HomePage = {
	oncreate: function() {
		Data.GetCount().then(function(resp){
			resp = resp/Data.PerPage;
			Data.count = Array(resp).fill(0, 0, resp);
			Data.GetAll();
		}).catch(function(err) {
			console.log(err);
		});
		flatpickr(document.getElementById("fromDate"), {});
		flatpickr(document.getElementById("toDate"), {});
	},
	view: function() {
		return (
			<section class="tc ph6 pb5 " style="min-height:90vh">
				<div class="bg-gray cf pa3">
					<button class="fr pv2 ph3 bg-white shadow-4 ba b--transparent pointer">Refresh List</button>
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
				{Data.count.length?

				<div class="">
					<p class="dib w2 pa1 br3 br--left ba white bg-green pointer"onclick={()=> {
						console.log("previous clicked", Data.count);
						if ((Data.Page - 1) > 0){
							--Data.Page;
							Data.GetAll();
						}
					}}>‹</p>
					{Data.count.map(function(v,i){
						return (
							<p class={(Data.Page == i+1?"bg-white green ":"white bg-green ")+" dib w2 pa1 ba pointer"}
							onclick={()=> {
								Data.Page = i+1
								Data.GetAll();
							}}>{i+1}</p>
						)
					})}
					<p class="dib w2 pa1 br3 br--right ba white bg-green pointer"onclick={()=> {
						console.log("Next clicked");
						if ((Data.Page + 1) <= Data.count.length){
							++Data.Page;
							Data.GetAll();
						}
					}}>›</p>
				</div>:""}
			</section>
		);
	}
};
