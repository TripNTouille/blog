---
---

var countries = {% include data.geojson %};
var map = L.map('map').setView([44.7779, 17.7165],  4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

