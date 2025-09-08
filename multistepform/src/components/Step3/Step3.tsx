export default function Step3() {
  return (
    <fieldset>
      <legend style={{ textAlign: "center" }}>Financial Information</legend>
      <div className="inputlabel">
        <label htmlFor="bankaccount">Bank Account :</label>
        <input type="text" id="bankaccount" />
      </div>
      <div style={{ height: "20px" }} />
      <div className="inputlabel">
        <label htmlFor="balance">Balance :</label>
        <input type="text" id="balance" />
      </div>
    </fieldset>
  );
}
