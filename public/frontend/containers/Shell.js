import m from "mithril";
import flatpickr from "flatpickr";
import {SVGIcons} from "../../shared/components/svgIcons";
import {Data} from "../models/data";

export var Shell = {
	oncreate: function() {
		flatpickr(document.getElementById("fromDate"), {});
		flatpickr(document.getElementById("toDate"), {});
	},
	view: function(vnode) {
		return (
			<section class="bg-near-white  f6 fw3 navy">
				<div class="bg-dark-blue white-80 shadow-4 fixed w-100 z-3">
					<div class="ph5 pa3 cf">
						<a class="link dib ph2 pv2 " oncreate={m.route.link} href="/">
							home
						</a>
						<a
							class="link dib ph2 pv2 "
							oncreate={m.route.link}
							href="/analytics"
						>
							analytics
						</a>
						<div class="dib pl4">
							<span class=" dib ph2 pv2 ">search:</span>
							<form class="dib pl3 w5 relative">
								<input
									type="text"
									class="bg-white br4 bw0 pv2 pl3 pr4 w-100 f6 dib"
									placeholder="form number, name, slot number, etc"
									style="outline: none"
									oninput={m.withAttr("value", function(value){
										Data.searchquery = value;
									})}
								/>
								<p class="mv0 dib w1 h1 absolute pointer" style="top: 0.5rem; right:0.5rem"
								onclick={() => {
									console.log("Search button clicked")
									Data.Search()
									.then(function(resp){
										console.log(resp);
									}).catch(function(err){
										console.log(err);
									})
								}}>
									<SVGIcons type="search"/>
								</p>
							</form>
						</div>
						<div class="dib fr pv2">
							<a
								class="bw0 bg-dark-red shadow-4 pv2 ph3  br2 white-90 pointer grow link"
								style="background-color:#5889FF"
								oncreate={m.route.link}
								href="/registration"
							>
								New Registration
							</a>
						</div>
					</div>
				</div>
				<section class="pa4 tc ">
					<div class="pv4" />
					<div class="dib bb b--gray pa2 pb3">
						<div class="dib pr3">
							<span class="dib pr2">From: </span>
							<input
								type="text"
								id="fromDate"
								class="pv2 ph3 br2 bw1 ba b--gray dib "
							/>
						</div>

						<div class="dib ">
							<span class="dib pr2">To: </span>
							<input
								type="text"
								id="toDate"
								class="pv2 ph3 br2 bw1 ba b--gray dib "
							/>
						</div>

						<div class="dib ml3">
							<button class="bw0  shadow-4 pv2 ph3  br2 pointer grow ma2">
								Search
							</button>
							<button class="bw0 shadow-4 pv2 ph3  br2  pointer grow ma2">
								Clear
							</button>
						</div>
					</div>
				</section>
				{vnode.children}
			</section>
		);
	}
};
