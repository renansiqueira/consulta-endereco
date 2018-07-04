import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  render() {
    return (
      <div
        className="map-container"
      >
        <Map 
          google={this.props.google} 
          zoom={15}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
        >
          <Marker
            name={"Localização"}
          />
        </Map>
      </div>
    );
  }
}

const LoadingContainer = (props) => (
  <div></div>
)

export default GoogleApiWrapper({
  apiKey: "AIzaSyAgrpKgZBVRPk9RSvYkpih6lGEsZGSMc0Q",
  v: "3.30",
  LoadingContainer: LoadingContainer
})(MapContainer);
