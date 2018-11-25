---
---

var countries = {% include data.geojson %};
var map = L.map('map').setView([44.7779, 17.7165],  4);

var gl = L.mapboxGL({
    accessToken: "{{ site.mapbox_token }}",
    style: 'mapbox://styles/mapbox/light-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

function onCountryClick(e) {
    window.location = '/voyages/' + e.target.feature.properties.name.toLowerCase() + '/';
}

L.geoJson(countries, {
    onEachFeature: onEachFeature,
}).addTo(map);

function onEachFeature(feature, layer) {
    layer.bindTooltip(feature.properties.name);
    layer.on({
        click : onCountryClick,
    });
}

