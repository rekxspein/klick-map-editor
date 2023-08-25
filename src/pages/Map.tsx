import { useState } from "react";
import { MapContainer as LeafletMap, GeoJSON } from "react-leaflet";
import { districtData } from "../assets/manipur-districts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON as GeoJSONType } from "geojson";
import { ChromePicker, Color } from "react-color";

function CustomMap() {
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
    [key: string]: Color;
  }>({});
  const [pickerPosition, setpickerPosition] = useState<{
    left: any;
    top: any;
  }>();
  console.log("DistricColll", districtColors);
  function getColor(districtName: string) {
    return districtColors[districtName] || "teal";
  }

  //this defines the final style
  function style(feature: any) {
    return {
      fillColor: getColor(feature?.properties.Dist_Name),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      className: feature?.properties.Dist_Name,
    };
  }

  function coloringFeature(e: any) {
    const districtName = e.target.feature.properties.Dist_Name;
    setCurrentDist(districtName);
    // setshowColorPicker((showColorPicker) => !showColorPicker);
    setshowColorPicker(true);
    const mouseX = e.originalEvent.clientX;
    const mouseY = e.originalEvent.clientY;
    console.log("Mouse", mouseX);

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
    // e.target.setStyle(style(e.target.feature));
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
        height: "80vh",
        width: "95vh",
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
          zoom={8}
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
          <ChromePicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor.hex);
              const updatedColors = { ...districtColors };
              updatedColors[currentDist] = newColor.hex;
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

export default CustomMap;