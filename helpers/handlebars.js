// https://stackoverflow.com/questions/41423727/handlebars-registerhelper-serverside-with-expressjs
// https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs

var register = function(Handlebars) {
	var helpers = {
		// put all of your helpers inside this object
		increment: function(value) {
			console.log("increment");
			return value + 4;
		},
		bar: function() {
			return "BAR";
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		for (var prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// just return helpers object if we can't register helpers here
		return helpers;
	}
};

module.exports.register = register;
module.exports.helpers = register(null);
