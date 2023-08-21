import { MapContainer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { districtData } from "../assets/manipur-districts";
import { GeoJSON as GeoJSONType } from "geojson";

function Home() {
  const center = [24.781431, 93.937454] as LatLngExpression;
  const position = [24.781431, 93.937454] as LatLngExpression;

  function getColor(Dist_Name: unknown): string | undefined {
    if (Dist_Name === "Bishnupur") {
      return "green";
    } else return "teal";
  }

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
          style={(feature) => ({
            fillColor: getColor(feature?.properties.Dist_Name), // getColor function
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
          })}
        />
      </MapContainer>
    </>
  );
}

export default Home;
