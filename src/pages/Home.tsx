import { MapContainer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { districtData } from "../assets/manipur-districts";
import { GeoJSON as GeoJSONType } from "geojson";

function Home() {
  const center = [24.781431, 93.937454] as LatLngExpression;
  const position = [24.781431, 93.937454] as LatLngExpression;
  return (
    <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
      <Marker position={position}>
        <Popup>
          Hey!! You click me. <br />
        </Popup>
      </Marker>
      <GeoJSON data={districtData as GeoJSONType} />
    </MapContainer>
  );
}

export default Home;
