<template>
	<div class="wrapper">
        <p>Waiting for an opponent...</p>
        <p>Queue time: </p>
	</div>
</template>

<script>
export default {
	name: "WaitingForOpponentComponent",
	data: function() {
        return {
        }
	},
	methods: {
		cancelRandomQueue: function() {
			this.$socket.client.emit("cancelPlayVsRandom");
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