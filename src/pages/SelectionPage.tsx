const GeoJSONSelectionPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Select a GeoJSON File</h1>
      <br></br>
      <input type="radio" id="Manipur" name="Manipur" value="Manipur" />
      <label htmlFor="Manipur"> Manipur</label>
      <br></br>
      <a href="/" className="simple-button">
        Back
      </a>
      <a href="/editor" className="simple-button">
        Proceed
      </a>
    </div>
  );
};

export default GeoJSONSelectionPage;
