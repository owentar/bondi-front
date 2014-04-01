@Bondi = do (Backbone, Marionette) ->
    
    App = new Marionette.Application

    App.addRegions
        mainRegion: "#main-region"

    App.reqres.setHandler "default:region", ->
        App.mainRegion

    App.commands.setHandler "register:instance", (instance, id) ->
        App.register instance, id
    
    App.commands.setHandler "unregister:instance", (instance, id) ->
        App.unregister instance, id

    App.on "initialize:after", ->
        Backbone.history.start() if Backbone.history

    App