const ol2d = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([25, 20], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3
  })
});


let ol3d;


function _doToggle() {
  ol3d.setEnabled(!ol3d.getEnabled());
}


function toggle3D() { // eslint-disable-line no-unused-vars
  if (!ol3d) {
    const s = window.lazyLoadCesium();
    s.onload = function() {
      init3D();
      _doToggle();
    };
  } else {
    _doToggle();
  }
}


function init3D() {
  ol3d = new olcs.OLCesium({map: ol2d});
  const scene = ol3d.getCesiumScene();
  const terrainProvider = new Cesium.CesiumTerrainProvider({
    url: '//assets.agi.com/stk-terrain/world'
  });
  scene.terrainProvider = terrainProvider;
}
