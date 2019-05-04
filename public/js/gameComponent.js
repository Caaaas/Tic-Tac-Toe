var gameComponent = new Vue({
    el: '#gameWrapper',
    data: {
        active: false,
    },
    methods: {
        makeMove: function(pos) {
            console.log("pos: " + pos)
        },
        setActive: function(state) {
            this.active = state;
        }
    }
})

socket.on("move made", function() {
    console.log("made move!")
})