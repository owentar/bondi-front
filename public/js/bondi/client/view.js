Bondi.module('Client', function(Client, App, Backbone, Marionette, $, _) {
    Client.Filters = Marionette.ItemView.extend({
        template: '#filters_template',

        ui: {
            address: 'input#address',
            bus: 'select#bus'
        },

        onShow: function() {
            this.ui.bus.chosen();
        }
    });
});
