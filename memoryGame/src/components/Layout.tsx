import "../styles/Layout.css";

function Layout() {
  return (
    <div className="skeleton_box">
      <div className="outer_box">
        {Array.from(new Array(12).fill(0), (value, index) => (
          <div className="mini_box">{index}</div>
        ))}
      </div>
    </div>
  );
}

export default Layout;
