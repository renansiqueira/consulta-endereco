import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    console.log(this.props.google);
    if (!this.props.google) {
      return <div>Buscando...</div>;
    }

    return (
      <div
        style={{
          position: "relative",
          height: "calc(40vh - 20px)"
        }}
      >
        <Map 
          style={{}} 
          google={this.props.google} 
          zoom={15}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"Localização"}
          />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAgrpKgZBVRPk9RSvYkpih6lGEsZGSMc0Q",
  v: "3.30"
})(MapContainer);
