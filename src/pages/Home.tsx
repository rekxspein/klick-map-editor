import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

function Home() {
  const center = [24.781431, 93.937454] as LatLngExpression;
  const position = [24.781431, 93.937454] as LatLngExpression;
  return (
    <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Hey!! You click me. <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Home;
