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
      iD: 2,
      className: "test",
    });
  };

  const resetHighlight = (e: LeafletEvent) => {
    const layer = e.target;
    e.target.setStyle(layer.setStyle(e.target.feature));
    console.log("ASDSD", e.target.feature);
    // layer.setStyle({
    //   weight: 3,
    //   dashArray: "6",
    //   fillOpacity: 0.2,
    //   className: "test123",
    // });
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
    <div>
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
    </div>
  );
}

export default Home;
