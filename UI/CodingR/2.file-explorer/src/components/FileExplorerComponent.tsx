import type { DataType } from "../contants/data";
interface FileExplorerPropsType {
  data: DataType;
}

export default function FileExplorerComponent({ data }: FileExplorerPropsType) {
  return (
    <div>
      <div>
        <span>{data.type === "folder" ? "🗂️" : "📁"}</span>
        <span>{data.name}</span>
      </div>
      <div style={{ paddingLeft: "20px" }}>
        {data?.children &&
          data.children.map((d, index) => (
            <div key={d.id + index}>
              <FileExplorerComponent data={d} />
            </div>
          ))}
      </div>
    </div>
  );
}
