import type { dataType } from "../../types/types";
import "../../styles/NestedFolder.css";
import { useState } from "react";

type structuredObj = Record<number, dataType>;

function fetchChildren(
  data: dataType[],
  accumulatar: structuredObj
): structuredObj {
  return data.reduce<structuredObj>((_, curr) => {
    accumulatar[curr.id] = curr;
    if (curr.children.length) {
      fetchChildren(curr.children, accumulatar);
    }
    return accumulatar;
  }, {});
}

function Tree({
  folderData,
  handleExpand,
  linearObj,
}: {
  folderData: dataType[];
  handleExpand: (event: React.MouseEvent, id: number) => void;
  linearObj: structuredObj;
}) {
  function FolderMapping(): React.ReactElement[] {
    return folderData.map(folder => {
      let icon = folder.type === "folder" ? "🗂️" : "📁";
      return (
        <div
          onClick={event => {
            handleExpand(event, folder.id);
          }}
          className="tree"
          key={folder.id + folder.name}
        >
          <div>
            <span>{icon}</span>
            <span>{folder.name}</span>
          </div>
          <div className="tree-item">
            {linearObj[folder.id].expanded && (
              <Tree
                folderData={folder.children}
                handleExpand={handleExpand}
                linearObj={linearObj}
              />
            )}
          </div>
        </div>
      );
    });
  }

  return <FolderMapping />;
}

export default function NestedFolder({
  folderData,
}: {
  folderData: dataType[];
}) {
  const [linearObj, setLinearObj] = useState(() => {
    const linearObjstructure = fetchChildren(folderData, {});
    return linearObjstructure;
  });

  function handleExpand(event: React.MouseEvent, id: number) {
    event.stopPropagation()
    setLinearObj(prev => {
      const copy = { ...prev };
      copy[id] = { ...copy[id], expanded: !copy[id].expanded };
      return copy;
    });
  }
  return (
    <div className="main-comp">
      <Tree
        folderData={folderData}
        handleExpand={handleExpand}
        linearObj={linearObj}
      />
    </div>
  );
}
