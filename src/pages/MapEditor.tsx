import { useState } from "react";
import { MapContainer as LeafletMap, GeoJSON } from "react-leaflet";
import { districtData } from "../assets/manipur-districts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Feature, GeoJSON as GeoJSONType } from "geojson";
import { ChromePicker, Color } from "react-color";
import { useLinkStore } from "../store";

function MapEditor() {
  const [selected, setSelected] = useState<{
    province: string;
    count: number;
  }>({
    province: "",
    count: 0,
  });
  const [color, setColor] = useState<Color>("");
  const [showColorPicker, setshowColorPicker] = useState(false);
  const [currentDist, setCurrentDist] = useState("");
  const [districtColors, setDistrictColors] = useState<{
    [key: string]: { color: string; link: string };
  }>({});
  const [pickerPosition, setpickerPosition] = useState<{
    left: any;
    top: any;
  }>();
  // const cuurentLink = useLinkStore((state: any) => state.link);
  const { link, setLink } = useLinkStore();

  function getColor(districtName: string) {
    return districtColors[districtName]?.color || "#00abab";
  }

  //this defines the final style
  function style(feature: Feature) {
    return {
      fillColor: getColor(feature?.properties?.Dist_Name),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      className: feature?.properties?.Dist_Name,
    };
  }

  function coloringFeature(e: any) {
    const districtName = e.target.feature.properties.Dist_Name;
    setCurrentDist(districtName);
    setshowColorPicker(true);

    const mouseX = e.originalEvent.clientX;
    const mouseY = e.originalEvent.clientY;

    const pickerPosition = {
      left: mouseX + 60, // Adjust this value for horizontal positioning
      top: mouseY + 80, // Adjust this value for vertical positioning
    };
    setpickerPosition(pickerPosition);
  }

  function highlightFeature(e: any) {
    const layer = e.target;
    const {
      State_Name: NAME_2,
      Dist_Name: NAME_3,
      Dist_Code: COUNT,
    } = e.target.feature.properties;
    setSelected({
      province: `${NAME_3} District, ${NAME_2}`,
      count: COUNT,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }
  function resetHighlight() {
    setSelected({
      province: "",
      count: 0,
    });
  }
  function onEachFeature(_feature: any, layer: any) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: coloringFeature,
    });
  }
  return (
    <div
      style={{
        margin: "30px",
        height: "100vh",
        width: "100vh",
        borderRadius: "1rem",
      }}
    >
      <div className="panel__header">
        <h1>Uploaded Map</h1>
        <p>Hover on any district for details. Click for more options.</p>
      </div>
      <div className="panel__map">
        {!selected.province && (
          <div className="hover-info">Hover over a District</div>
        )}
        {selected.province && (
          <div className="info">
            <strong>{selected.province}</strong>
            <span>District Code:{selected.count}</span>
          </div>
        )}
        <LeafletMap
          style={{ width: "100%", height: "100%" }}
          zoom={9}
          zoomControl={true}
          scrollWheelZoom={false}
          maxZoom={12}
          center={[24.781431, 93.937454]}
        >
          {districtData && (
            <GeoJSON
              data={districtData as GeoJSONType}
              style={style}
              onEachFeature={onEachFeature}
            />
          )}
        </LeafletMap>
      </div>
      {showColorPicker && (
        <div
          className="color-picker-container"
          style={{
            position: "absolute",
            left: pickerPosition?.left,
            top: pickerPosition?.top,
          }}
        >
          <div className="mui-input">
            <input
              type="url"
              value={link}
              id="link-input"
              className="mui-input__field"
              placeholder="paste your link"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <label htmlFor="link-input" className="mui-input__label">
              Add Link
            </label>
          </div>
          <ChromePicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor.hex);
              const updatedColors = { ...districtColors };
              console.log(updatedColors);
              updatedColors[currentDist] = {
                color: newColor.hex,
                link: link,
              }; //setting
              setDistrictColors(updatedColors);
            }}
          />
          <div
            className="close-button"
            onClick={() => setshowColorPicker(false)}
          >
            <span className="close-icon">×</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapEditor;
