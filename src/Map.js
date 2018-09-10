import React, { Component } from "react";
import axios from "axios";

export default class Map extends Component{
  state = {
    venues: [],
    allMarkers: [],
    allVenues: []
  };
  // when component mount get venues
  componentDidMount() {
    this.getVenues();
  }

  showMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJNIlzjcDai_TiK7QIGcwC4QUcKL1qcQk&callback=initMap"
    );
    window.initMap = this.initMap;
  };
  // this function calls API foursquare
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "TP2NCTHO3CVDPJZVVCTJFLXKK3HAME4FNBDQ4ET4HUPM01Y3",
      client_secret: "DNTCQLR15LPXGLJP44I1EMUPU5255P5DL4KLZ42MO31USIR4",
      query: "food",
      near: "Opole",
      v: "20182507"
    };
    // receive the data and store it venues state this is asynchr request after
    // order render my map
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items
          },
          this.showMap()
        );
      })
      .catch(error => {
        console.log("17.928600ERROR! " + error);
      });
  };
  // creating a map
  initMap = () => {
    17.9286;
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 50.66773, lng: 17.9286 },
      zoom: 13
    });
    // create infowindow
    let infowindow = new window.google.maps.InfoWindow();

    // loop throught markers to create them from venues array from state
    this.state.venues.map((myMarker ) => {

    let contentString = `<h4>${myMarker.venue.name}</h4><p>Address: ${myMarker.venue.location.formattedAddress}</p>`;

      // create a marker:
      let marker = new window.google.maps.Marker({
        position: {
          lat: myMarker.venue.location.lat,
          lng: myMarker.venue.location.lng
        },
        map: map,
        title: myMarker.venue.name,


      });
      this.state.allMarkers.push(marker);


      // on click on marker
      marker.addListener("click", function() {
        infowindow.setContent(contentString);
        // open infowindow on click
        infowindow.open(map, marker);

        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      }
      );
    });
  };

updateVenues = (newLocations) => {
  this.setState({venues: newLocations})
}
  render() {
    return (
<div className="App">

  <main>
    <div id="map">


</div>

    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
