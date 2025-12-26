function ListComponent({ data }) {
  console.log(data, "data");
  return (
    <div className="child_comp">
      <h3>{data[0]}</h3>
      <div className="child_body">
        {data[1].map(d => (
          <div className="child_description">{d}</div>
        ))}
      </div>
    </div>
  );
}
export default ListComponent;
