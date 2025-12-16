const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (username) => {
  console.log(`Hello ${username} and welcome to the events in nodejs`);
});

eventEmitter.emit("greet", "Sunny");
