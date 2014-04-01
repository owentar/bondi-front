@Bondi.module "MainApp.Search", (Search, App, Backbone, Marionette, $, _) ->

    class Search.Layout extends Marionette.Layout
        template: "#layout_template"

        regions:
            filter: "#filters"
            map: "#map"

    class Search.FilterView extends Marionette.ItemView
        template: "#filter_template"

        ui:
            address: "input#address"
            bus: "select#bus"

        events:
            "click button#search": "onSearch"

        onRender: ->
            @renderAutocomplete()
            @ui.bus.chosen
                width: '100px'

        onNewAddress: ->
            @triggerMethod "address:changed", @ui.address.val() if @ui.address.val().length > 5

        onSearch: ->
            # TODO: serialize form to model and trigger search event

        renderAutocomplete: ->
            autocomplete = new google.maps.places.Autocomplete @ui.address[0],
                componentRestrictions: { "country": "ar" }

            google.maps.event.addListener autocomplete, "place_changed", =>
                place = autocomplete.getPlace()
                @trigger "address:selected", place

    class Search.MapView extends Marionette.ItemView
        template: "#map_template"
        className: "map-container"

        onRender: ->
            @map = new google.maps.Map @el,
                zoom: 13
                center: new google.maps.LatLng -34.61, -58.42
                mapTypeControl: false
                panControl: false
                zoomControl: false
                streetViewControl: false

        centerMap: (place) ->
            @map.panTo place.geometry.location
            @map.setZoom 15 
            