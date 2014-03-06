Bondi = (function(Backbone, Marionette) {
    var App = new Marionette.Application();

    App.addRegions({
        filters: '#filters',
        map: '#map'
    });

    App.addInitializer(function(options) {
    });

    return App;
})(Backbone, Marionette);