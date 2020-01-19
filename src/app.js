import 'mapbox-gl/dist/mapbox-gl.css';
import './app.css';
import React, {Component} from 'react';
import {render} from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import FlowMapLayer from '@flowmap.gl/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward, faPause, faStepForward, faStopwatch, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
//import Tooltip from 'react-bootstrap/Tooltip'

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

const processData = () => {
  console.log('Hello')
}


class Map extends Component {
  
  componentDidMount() {
    processData();
    // ...
  }
  
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



class Timebar extends Component {
  render() {
    return (
    <div className='fixed w-full bottom'>
      <div className='flex-parent flex-parent--row flex-parent--center-cross'>
        <div className="tooltip">
          <button className='flex-child py12 px18 border-r border--gray-light bg-white bg-green-light-on-hover cursor-pointer round-l'>
            <FontAwesomeIcon icon={faBackward} className="color-green" />
          </button>
          <span className="tooltiptext">Step back</span>
        </div>
        <div className="tooltip">
          <button className='flex-child py12 px18 border-r border--gray-light bg-white bg-green-light-on-hover cursor-pointer'>
            <FontAwesomeIcon id="ppeButton-i" icon={faPause} className="color-green" />
          </button>
          <span className="tooltiptext">Play/Pause</span>
        </div>
        <div className="tooltip">
          <button className='flex-child py12 px18 border-r border--gray-light bg-white bg-green-light-on-hover cursor-pointer'>
            <FontAwesomeIcon icon={faForward} className="color-green" />
          </button>
          <span className="tooltiptext">Step forward</span>
        </div>
        <div className="tooltip">
          <button className='flex-child py12 px18 border-r border--gray-light bg-white bg-green-light-on-hover cursor-pointer btna active' id='neeButton'>
            <FontAwesomeIcon icon={faStepForward} className="color-green" />
          </button>
          <span className="tooltiptext">Skip day</span>
        </div>
        <div className='flex-child flex-child--no-shrink py12 px12 border-r border--gray-light bg-white'>
          <span id="date">01/01/2018&nbsp;00:00</span>
        </div>
        <div className="tooltip">
          <div className='flex-parent py12 px18 border-r border--gray-light bg-white' >
          <FontAwesomeIcon icon={faStopwatch} className="color-green" />
            <div className='select-container w60'>
              <select id="resolution" className='select select--s' defaultValue='4'>
                <option value="1">15min</option>
                <option value="4">1hr</option>
                <option value="12">3hrs</option>
                <option value="96">1day</option>
              </select>
              <div className='select-arrow'></div>
            </div>
          </div>
        <span className="tooltiptext">Resolution</span>
      </div>
        <div className='flex-child pb6 px18 border-r border--gray-light flex-child--grow bg-white w-full'>
          <input id='slider' className="slider w-full h12 bg-darken10 round-full" type='range' min='0' max='35071' step='1'/>
          <div className="grid txt-xs mx-neg12 my-neg2 flex-parent--space-between-main">
            <p>01-Jan</p>
            <p>01-Feb</p>
            <p>01-Mar</p>
            <p>01-Apr</p>
            <p>01-May</p>
            <p>01-Jun</p>
            <p>01-Jul</p>
            <p>01-Aug</p>
            <p>01-Sep</p>
            <p>01-Oct</p>
            <p>01-Nov</p>
            <p>01-Dec</p>
            <p>01-Jan</p>
          </div>
        </div>
        <div className='range py24 px12 border-r border--gray-light bg-white round-r' id="speed-div">
          <FontAwesomeIcon icon={faTachometerAlt} className="color-green" />
          <div className="tooltip range">
            <input id="speed" className="pl6" type='range' min='1' max='10' step='1' />
            <span className="tooltiptext" id="speed-toltip">5 frames/sec</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

  
render(<Map />, document.getElementById('map'));
render(<Timebar />, document.getElementById('timebar'));
  
  