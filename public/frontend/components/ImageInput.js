import m from "mithril";

export var ImageInput = {
	image: "",
	ProcessInput: function(e, Callback) {
		console.log(e);
		let file = e.target.files[0];
		var reader = new FileReader();

		reader.addEventListener(
			"load",
			function(e) {
				Callback(reader.result);
				m.redraw()
				// preview.src = reader.result;
			},
			false
		);

		if (file) {
			reader.readAsDataURL(file);
		}
	},
	view: function({ attrs }) {
		return (
			<div class={" pa2 tc " + attrs.class}>
				<label class="dib tc">
					<img src={attrs.Value} class="w5 h5 bg-light-gray db" alt="" />
				</label>
				<strong class="db f4 ma0 pa2">{attrs.label}</strong>
				<input
					type="file"
					class="pv2 ph3 br2 bw1 ba b--gray db w-100 tc"
					placeholder="oad fd"
					onchange={e => ImageInput.ProcessInput(e, attrs.Callback)}
				/>
			</div>
		);
	}
};
