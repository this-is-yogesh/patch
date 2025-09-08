export default function Step1() {
  return (
    <fieldset>
      <legend style={{ textAlign: "center" }}>Personal Information</legend>
      <div className="inputlabel">
        <label htmlFor="firstname">FirstName :</label>
        <input type="text" id="firstname" />
      </div>
      <div style={{ height: "20px" }} />
      <div className="inputlabel">
        <label htmlFor="lastname">LastName :</label>
        <input type="text" id="lastname" />
      </div>
    </fieldset>
  );
}
