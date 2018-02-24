import m from "mithril";
import {Data} from "../models/data";
import Chartist from "chartist";

var Analytics = {
    oncreate: function() {
        Data.GetCount().then(function(res){
            Data.count = res;
            Data.GetWeekAnalysis().then(function(resp){
                console.log(resp.series[0]);
                document.getElementById("weekcount").innerText = resp.series[0].reduce((a,b)=> a+b, 0);
                document.getElementById("todaycount").innerText = resp.series[0][0];
                // Initialize a Line chart in the container with the ID chart2
                new Chartist.Bar('#chart2', resp, {
                    seriesBarDistance: 15,
                    axisY: {
                      type: Chartist.AutoScaleAxis,
                      onlyInteger: true
                    }
                  });
            }).catch(function(err){
                console.log(err);
            })
        })
    },
    view: function(vnode) {
        return (
            <section class="ph4-l ph2">
                <div class="ph5-ns">
                    <p class="black-80 tl f3-ns f4 b">TOTAL REGISTERED: <span class="blue">{Data.count}</span></p>
                    <p class="black-80 tl f3-ns f4 b">TOTAL REGISTERED (WEEK): <span class="blue" id="weekcount"></span></p>
                    <p class="black-80 tl f3-ns f4 b">TOTAL REGISTERED (TODAY): <span class="blue" id="todaycount"></span></p>
                </div>
                <div class="ph5-ns">
                    <div class="ct-chart ct-golden-section" id="chart2"></div>
                </div>
                {/* <table class="f6 w-100  center ba b--black-20 bg-white" cellspacing="0">
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
                        <tr>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                        </tr>
                    </tbody>
                </table> */}
            </section>
        )
    }
}

export default Analytics;