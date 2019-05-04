var mainComponent = new Vue({
    el: '#mainWrapper',
    data: {
        active: true,
        inQueue: false,
    },
    methods: {
        playRandom: function() {
            socket.emit("play vs random");
        },
        setActive: function(state) {
            this.active = state;
        },
        setInQueue: function(state) {
            this.inQueue = state;
        }
    }
})

socket.on("new game", function() {
    mainComponent.setActive(false);
    mainComponent.setInQueue(false);
    gameComponent.setActive(true);
})

socket.on("joined random queue", function() {
    mainComponent.setInQueue(true);
})