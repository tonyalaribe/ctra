import m from "mithril";

var Analytics = {
    view: function(vnode) {
        return (
            <section class="">
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
                        <tr>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                            <td class="pv3 pr3 bb b--black-20">{}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}

export default Analytics;