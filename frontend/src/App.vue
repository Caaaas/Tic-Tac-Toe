<template>
	<div id="app">
		<MainMenuComponent v-if="state === 'menu'" @newState="newState" />
		<WaitingForOpponentComponent v-if="state === 'waitingForOpponent'" @newState="newState" />
		<MatchComponent v-if="state === 'match'" @newState="newState" :player="player" :match="match" />
	</div>
</template>

<script>
import MainMenuComponent from "./Components/MainMenuComponent.vue";
import WaitingForOpponentComponent from "./Components/WaitingForOpponentComponent.vue";
import MatchComponent from "./Components/MatchComponent.vue";
export default {
	name: "App",
	components: {
		MainMenuComponent,
		WaitingForOpponentComponent,
		MatchComponent
	},
	sockets: {
		connect() {
			console.log("socketConnected");
		},
		joinedRandomQueue() {
			this.$emit("newState", "waitingForOpponent");
		},
		player(player) {
			this.player = player;
		},
		newMatch(match) {
			this.newState("match");
			this.match = match;
		},
		newMove: function(match) {
			this.match = match;
		},
		matchFinished: function(match) {
			this.match = match;
		}
	},
	data: function() {
		return {
			state: "menu",
			player: null,
			match: null
		};
	},
	methods: {
		newState: function(state) {
			this.state = state;
		},
		reset: function() {
			this.player = null;
			this.match = null;
		}
	}
};
</script>

<style lang="less">
@import (css)
	url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap");
html,
body {
	font-family: "Roboto", sans-serif;
	padding: 0;
	margin: 0;
}

* {
	box-sizing: border-box;
}
</style>

<style lang="less" scoped>
#app {
	font-family: "Roboto", sans-serif;
	background-color: #212121;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>