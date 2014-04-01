@Bondi.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

    class Entities.Filter extends Backbone.Model
        defaults:
            address: null
            bus: null
            range: null

    App.reqres.setHandler "filter:new", -> new Entities.Filter()