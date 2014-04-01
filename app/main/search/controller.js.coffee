@Bondi.module "MainApp.Search", (Search, App, Backbone, Marionette, $, _) ->

    class Search.Controller extends App.Controllers.Base
        initialize: (options) ->
            filter = App.request "filter:new"

            @layout = @getLayoutView()

            @listenTo @layout, "show", =>
                @filterRegion filter
                @mapRegion()

            @show @layout

        filterRegion: (filter) ->
            filterView = @getFilterView filter

            @listenTo filterView, "address:selected", (place) =>
                @mapView.centerMap place

            @layout.filter.show filterView

        mapRegion: ->
            @mapView = @getMapView()
            @layout.map.show @mapView

        getFilterView: (filter) ->
            new Search.FilterView
                model: filter

        getMapView: ->
            new Search.MapView()

        getLayoutView: ->
            new Search.Layout()
