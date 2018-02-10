import m from "mithril";

export var TextInput = {
	view: function({ attrs }) {
		return (
			<div class={"pa2 " + attrs.class}>
				<label class="db pa2">{attrs.label}</label>
				<input
					type="text"
					class="pv2 ph3 br2 bw1 ba b--gray db w-100"
					oninput={attrs.oninput}
				/>
			</div>
		);
	}
};
