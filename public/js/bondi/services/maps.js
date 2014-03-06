Bondi.module('Maps', function(Maps, App, Backbone, Marionette, $, _) {

    Maps.AddressResolver = {
        find: function(address) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    alert(results[0].geometry.location);
                } else {
                    alert('Error trying to resolve the address: ' + address + '. ERROR: ' + status);
                }
            });
        }
    };
});
