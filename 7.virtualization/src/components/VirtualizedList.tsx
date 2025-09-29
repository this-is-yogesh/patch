const List: React.FC<{ listarray: any[] }> = function ({ listarray }) {
  console.log(listarray.length, "len**");
  return (
    <div className="item_layout">
      {Array.from({ length: listarray.length }, (_, index) => (
        <div key={index} className="item">
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default List;
