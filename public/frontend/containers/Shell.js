import m from "mithril";
import flatpickr from "flatpickr";
import {SVGIcons} from "../../shared/components/svgIcons";
import {Data} from "../models/data";
import izitoast from "izitoast";

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
							<form action="#!" class="dib pl3 w5 relative">
								<input
									type="text"
									class="bg-white br4 bw0 pv2 pl3 pr4 w-100 f6 dib"
									placeholder="form number, name, slot number, etc"
									style="outline: none"
									value={Data.searchquery}
									oninput={m.withAttr("value", function(value){
										Data.searchquery = value;
									})}
									// onkeypress={(e)=>{
									// 	console.log("pressed: ", e);
									// }}
								/>
								<button type="submit" class="ba b--transparent bg-white mv0 dib w1 h1 absolute pointer pa0" style="top: 0.5rem; right:0.5rem"
								onclick={(e) => {
									e.preventDefault()
									console.log("Search button clicked")
									if (!Data.searchquery) {
										izitoast.error({
											title: "Error",
											message: "No word to search",
											position: "topCenter"
										})
										return
									}
									Data.Search()
									.then(function(resp){
										console.log(resp);
										if (resp.length) {
											if (m.route.get() != "/"){
												m.route.set("/");
											}
											Data.items = resp;
										} else {
											izitoast.error({
												title: "Error",
												message: "No Result found",
												position: "topCenter"
											})
										}
									}).catch(function(err){
										console.log(err);
									})
								}}>
									<SVGIcons type="search"/>
								</button>
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
								oninput={m.withAttr("value", function(value){
									Data.searchdate.From = value;
								})}
							/>
						</div>

						<div class="dib ">
							<span class="dib pr2">To: </span>
							<input
								type="text"
								id="toDate"
								class="pv2 ph3 br2 bw1 ba b--gray dib "
								oninput={m.withAttr("value", function(value){
									Data.searchdate.To = value;
								})}
							/>
						</div>

						<div class="dib ml3">
							<button class="bw0  shadow-4 pv2 ph3  br2 pointer grow ma2"
							onclick={function() {
								console.log(Data.searchdate);
								Data.SearchByDate().then(function(resp){
									console.log(resp);
									Data.items = resp;
								}).catch(function(err){
									console.log(err);
								})
							}}>
								Search
							</button>
							<button class="bw0 shadow-4 pv2 ph3  br2  pointer grow ma2"
							onclick={() => {
								Data.searchdate = {}
								document.getElementById("toDate").value = "";
								document.getElementById("fromDate").value = "";
							}}>
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
