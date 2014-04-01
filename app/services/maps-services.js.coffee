@Bondi.module "Maps", (Maps, App, Backbone, Marionette, $, _) ->
    
    class Maps.AddressResolver
        find: (address) ->
            deferred = $.Deferred()

            $.get "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=#{ address.replace(/\s+/g, '+') }"
                .done (response) ->
                    locations = _.map response.results, (result) -> { address: result.formatted_address, location: result.geometry.location }

                    deferred.resolve locations

            deferred.promise()


    Maps.addInitializer (options) ->
        @addressResolver = new Maps.AddressResolver()

        App.reqres.setHandler "resolve:address", (address) => @addressResolver.find address
