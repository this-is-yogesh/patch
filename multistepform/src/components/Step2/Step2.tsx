export default function Step2() {
  return (
    <fieldset>
      <legend style={{ textAlign: "center" }}>Contact Information</legend>
      <div className="inputlabel">
        <label htmlFor="phone">Phone :</label>
        <input type="text" id="phone" />
      </div>
      <div style={{ height: "20px" }} />
      <div className="inputlabel">
        <label htmlFor="email">Email :</label>
        <input type="text" id="email" />
      </div>
    </fieldset>
  );
}
