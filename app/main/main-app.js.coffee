@Bondi.module "MainApp", (MainApp, App, Backbone, Marionette, $, _) ->

    class MainApp.Router extends Marionette.AppRouter
        appRoutes:
            "": "search",
            "search": "search"

    API =
        search: ->
            new MainApp.Search.Controller
    
    App.addInitializer ->
        new MainApp.Router
            controller: API