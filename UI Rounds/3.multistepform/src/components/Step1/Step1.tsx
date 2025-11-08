type propsType = {
  inputs: { firstName: ""; lastName: "" };
  onChange: (e: React.ChangeEvent) => void;
};
const Step1: React.FC<propsType> = ({ inputs, onChange }) => {
  const { firstName, lastName } = inputs;
  return (
    <fieldset>
      <legend style={{ textAlign: "center" }}>Personal Information</legend>
      <div className="inputlabel">
        <label htmlFor={"firstName"}>FirstName :</label>
        <input
          type="text"
          id={"firstName"}
          value={firstName}
          onChange={onChange}
        />
      </div>
      <div style={{ height: "20px" }} />
      <div className="inputlabel">
        <label htmlFor={"lastName"}>LastName :</label>
        <input
          type="text"
          id={"lastName"}
          value={lastName}
          onChange={onChange}
        />
      </div>
    </fieldset>
  );
};

export default Step1;
