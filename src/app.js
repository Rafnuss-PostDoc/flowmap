import React, {Component} from 'react';
import {render} from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import FlowMapLayer from '@flowmap.gl/core';

// Set your mapbox token here
//require('dotenv').config()
//const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
const MAPBOX_TOKEN = "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g"


const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 0
};

class Root extends Component {
  

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    const flowMapLayer = new FlowMapLayer({
      id: 'flow-map-layer',
      locations: [{id:0, lat:0, lon:0},{ id:1, lat:1, lon:1}],   // either array of location areas or a GeoJSON feature collection
      flows: [{origin:0, dest:1, count:10}],       // array of Flow objects
      getLocationId: l => l.id,
      getLocationCentroid: l => [l.lat, l.lon],
      getFlowOriginId: f => f.origin,
      getFlowDestId: f => f.dest,
      getFlowMagnitude: f => f.count,
    });

    return (
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[flowMapLayer]}
      >
        < StaticMap 
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={mapStyle}
        />
      </DeckGL>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));

