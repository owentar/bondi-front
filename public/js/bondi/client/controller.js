Bondi.module('Client', function(Client, App, Backbone, Marionette, $, _) {
    var Controller = Marionette.Controller.extend({
        initialize: function() {
            App.filters.show(new Client.Filters());
        }
    });

    Client.addInitializer(function() {
        Client.Controller = new Controller();
    });
});
