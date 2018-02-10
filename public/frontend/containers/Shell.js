import m from "mithril";
import flatpickr from "flatpickr";

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
							<form class="dib pl3 w5">
								<input
									type="text"
									class="bg-white br4 bw0 pa2 w-100 f6 ph3"
									placeholder="form number, name, slot number, etc"
								/>
							</form>
						</div>
						<div class="dib fr pv2 ">
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
