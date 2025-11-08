type propsType = {
  inputs: { account: ""; balance: "" };
  onChange: (e: React.ChangeEvent) => void;
};
export default function Step3({ inputs, onChange }: propsType) {
  const { account, balance } = inputs;
  return (
    <fieldset>
      <legend style={{ textAlign: "center" }}>Financial Information</legend>
      <div className="inputlabel">
        <label htmlFor="account">Bank Account :</label>
        <input type="text" id="account" value={account} onChange={onChange} />
      </div>
      <div style={{ height: "20px" }} />
      <div className="inputlabel">
        <label htmlFor="balance">Balance :</label>
        <input type="text" id="balance" value={balance} onChange={onChange} />
      </div>
    </fieldset>
  );
}
