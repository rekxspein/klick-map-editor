import { MapContainer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, Layer, LeafletEvent } from "leaflet";
import { districtData } from "../assets/manipur-districts";
import { Feature, GeoJSON as GeoJSONType, Geometry } from "geojson";

function Home() {
  const center = [24.781431, 93.937454] as LatLngExpression;
  const position = [24.781431, 93.937454] as LatLngExpression;

  const highlightFeature = (e: LeafletEvent) => {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      dashArray: "3",
      fillOpacity: 0.7,
    });
  };

  const resetHighlight = (e: LeafletEvent) => {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      dashArray: "",
      fillOpacity: 0.2,
    });
  };

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      // Other interactions...
    });
    feature.properties &&
      layer.bindPopup(`District: ${feature.properties.Dist_Name as unknown}`);
  };

  return (
    <>
      <MapContainer
        style={{
          margin: "30px",
          height: "80vh",
          width: "95vh",
          borderRadius: "1rem",
        }}
        center={center}
        zoom={9}
        scrollWheelZoom={true}
      >
        <Marker position={position}>
          <Popup>
            Hey!! You click me. <br />
          </Popup>
        </Marker>
        <GeoJSON
          data={districtData as GeoJSONType}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </>
  );
}

export default Home;
