Bondi.module('Client', function(Client, App, Backbone, Marionette, $, _) {
    Client.Filters = Marionette.ItemView.extend({
        template: '#filters_template'
    });
});
