function CustomNotification(options) {}

CustomNotification.prototype.apply = function(compiler) {
  compiler.plugin("done", () => {
    console.log("\n--- Done compiling! ---\n");
  });
};

module.exports = CustomNotification;
