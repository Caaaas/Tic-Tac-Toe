<template>
	<div class="wrapper">
		<template v-if="$props.match.winner">
			<h1>Match finished! You {{ $props.match.winner === $props.player.id ? 'won! =D' :'lost :/' }}</h1>
			<button type="button" @click="$emit('newState', 'menu')">MENU</button>
			<button type="button" @click="$emit('newState', 'menu')">PLAY AGAIN</button>
			<!--
			<button type="button" @click="reset(); $emit('newState', 'menu')">REMATCH</button>
			-->
		</template>
		<p v-if="!$props.match.winner && $props.match.nextMove === $props.player.id">Your turn</p>
		<div class="match">
			<div
				v-for="(value, index) in 9"
				class="square"
				:class="'square' + index"
				:key="index"
				@click="makeMove(index)"
			>{{ getSquareMarker(index) }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MatchComponent",
	props: ["player", "match"],
	data: function() {
		return {};
	},
	methods: {
		makeMove: function(position) {
			// TODO client side validation to decrease load.
			this.$socket.client.emit("makeMove", position);
		},
		getSquareMarker: function(position) {
			if (this.$props.match.playArea[position] === false) return "";
			if (
				this.$props.match.playArea[position] ===
				this.$props.match.playerOne.id
			)
				return "X";
			return "O";
		}
	}
};
</script>

<style lang="less" scoped>
.wrapper {
	h1 {
	}

	.match {
		border: 1px solid blue;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		width: 300px;
		height: 300px;

		.square {
			border: 1px solid blue;
		}
	}
}
</style>