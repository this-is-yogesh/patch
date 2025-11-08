type propsType = {
  inputs: { phone: ""; email: "" };
  onChange: (e: React.ChangeEvent) => void;
};
export default function Step2({ inputs, onChange }: propsType) {
  const { phone, email } = inputs;
  return (
    <fieldset>
      <legend style={{ textAlign: "center" }}>Contact Information</legend>
      <div className="inputlabel">
        <label htmlFor="phone">Phone :</label>
        <input type="text" id="phone" value={phone} onChange={onChange} />
      </div>
      <div style={{ height: "20px" }} />
      <div className="inputlabel">
        <label htmlFor="email">Email :</label>
        <input type="text" id="email" value={email} onChange={onChange} />
      </div>
    </fieldset>
  );
}
