import "../styles/Switch.css";

type switchProps = {
  on: boolean;
  toggle: () => void;
  labelName: string;
};

export default function Switch({ on, toggle, labelName }: switchProps) {
  console.log(on, toggle);
  return (
    <div className="switch">
      <div className="switch_input">
        <input
          type="checkbox"
          checked={on}
          onChange={toggle}
          role="switch"
          aria-checked={on}
          aria-label={labelName}
        />
        <span className="slider" />
        <span>{labelName}</span>
      </div>
    </div>
  );
}
