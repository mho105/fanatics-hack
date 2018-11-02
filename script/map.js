const {DeckGL, HexagonLayer} = deck;
const deckgl = new DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1Ijoia2llcmFuZmFuYXRpY3MiLCJhIjoiY2puenU4Y2VoMGV4azNqbWI5c3RmYmZmcyJ9.piT8kx5cVqDkwthx-zLngw',
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5
});
let data = null;
const OPTIONS = ['radius', 'coverage', 'upperPercentile'];
const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];
const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};
OPTIONS.forEach(key => {
  document.getElementById(key).oninput = renderLayer;
});
function renderLayer () {
  const options = {};
  OPTIONS.forEach(key => {
    const value = document.getElementById(key).value;
    document.getElementById(key + '-value').innerHTML = value;
    options[key] = Number(value);
  });
  const hexagonLayer = new HexagonLayer({
    id: 'heatmap',
    colorRange: COLOR_RANGE,
    data,
    elevationRange: [0, 1000],
    elevationScale: 250,
    extruded: true,
    getPosition: d => d,
    lightSettings: LIGHT_SETTINGS,
    opacity: 1,
    ...options
  });
  deckgl.setProps({
    layers: [hexagonLayer]
  });
}
//d3.csv('http://10.0.75.1:8081/data.csv')
  //.then(response => {
  var raw = [
    { lng: -0.198465, lat: 51.505538 },
    { lng: -0.178838, lat: 51.491836 },
    { lng: -0.205590, lat: 51.514910 },
    { lng: -0.208327, lat: 51.514952 },
    { lng: -0.206022, lat: 51.496572 },
    { lng: -0.193610, lat: 51.500788 },
    { lng: -0.173519, lat: 51.495171 },
    { lng: -0.163542, lat: 51.492497 },
    { lng: -0.211980, lat: 51.513659 },
    { lng: -0.199786, lat: 51.515900 }
  ];
  data = raw.map(d => [Number(d.lng), Number(d.lat)]);
  renderLayer();
//});