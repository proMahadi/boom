import React from "react";
import { Helmet } from "react-helmet-async";
import LineChart from "../components/Line";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const Home = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCIP2gFBWK0kxyEL5OFarGGfwlSkaiqC2c",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  console.log(markers,"selected lat lng")

  
  const results =markers.map((marker)=>getGeocode({location:{lat:marker.lat,lng:marker.lng}}))
  console.log(results[0],"results")


  // const results = getGeocode({location:{lat:markers.lat,lng:markers.lng}})

 

  const onMapClick = React.useCallback((e) => {
    console.log(e.latLng.lat(),"latitude")
    console.log(e.latLng.lng(),"longitude")
    setMarkers((current) => [
      // ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarkers((current) => [
      // ...current,
      {
        lat,
        lng,
        time: new Date(),
      },
    ]);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <>
      <Helmet>
        <title>this is home page</title>
      </Helmet>
      {/* <LineChart/> */}

      <div>
        {/* <Locate panTo={panTo} /> */}
        <Search panTo={panTo} />

        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
          streetView={true}
        >
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              // icon={{
              //   url: `/bear.svg`,
              //   origin: new window.google.maps.Point(0, 0),
              //   anchor: new window.google.maps.Point(15, 15),
              //   scaledSize: new window.google.maps.Size(30, 30)
              // }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>
                  <span role="img" aria-label="bear">
                    🐻
                  </span>{" "}
                  Alert
                </h2>
                {/* <p>Spotted {formatRelative(selected.time, new Date())}</p> */}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
};

export default Home;

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
};

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };
  

  return (
    <div className="search">
      
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
            <ul>
              {status === "OK" &&
                data.map((mapData) => (
                  // console.log(mapData,"map")
                  <li onClick={()=>handleSelect(mapData.description)} key={mapData.id}>
                    <button>{mapData.description}</button>
                  </li>
                ))}
            </ul>
    </div>
  );
};
