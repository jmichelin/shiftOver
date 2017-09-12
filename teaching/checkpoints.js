var name = "Window";
var alice = {
  name: "Alice",
  sayHi: function() {
    console.log(this.name + " says hi");
  }
};
var bob = { name: "Bob" };

setTimeout(alice.sayHi.call(bob), 1000);