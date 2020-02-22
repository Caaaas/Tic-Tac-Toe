<template>
	<div class="wrapper">
		<p>Name:</p>
		<input type="text" v-model="name" />

		<button type="button" @click="playRandom()">PLAY VS RANDOM</button>
		<button type="button" @click="joinLobby()">JOIN LOBBY</button>
		<button type="button" @click="createLobby()">CREATE LOBBY</button>
	</div>
</template>

<script>
export default {
	name: "MainMenuComponent",
	data: function() {
		return {
			name: "SomeRandomName"
		};
	},
	sockets: {
        
    },
	methods: {
		playRandom: function() {
			this.$socket.client.emit("playRandom", this.name);
		}
	}
};
</script>

<style lang="less" scoped>
.wrapper {
	p {
		padding: 0;
		margin: 0;
	}

	button {
		display: block;
		width: 100%;
	}
}
</style>