import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './App.scss';

var myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -43]
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
});
//L.marker([50.505, 30.57], { icon: myIcon }).addTo(map);

class App extends React.Component {
  state = {
    location: {
      lat: 0.7,
      lng: 0.4
    },
    haveUsersLocation: false,
    zoom: 2
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 14
        });
      },
      () => {
        console.log('location detected by ip');
        fetch('http://ip-api.com/json/')
          .then(res => res.json())
          .then(location => {
            this.setState({
              location: {
                lat: location.lat,
                lng: location.lon
              },
              haveUsersLocation: true,
              zoom: 14
            });
          });
      }
    );
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <Map className='map' center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {this.state.haveUsersLocation ? (
          <Marker position={position} icon={myIcon}>
            <Popup>
              You are here. <br /> Aren't you?.
            </Popup>
          </Marker>
        ) : (
          ''
        )}
      </Map>
    );
  }
}

export default App;
