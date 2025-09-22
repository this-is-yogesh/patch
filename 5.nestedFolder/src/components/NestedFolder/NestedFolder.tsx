import type { dataType } from "../../types/types";
import "../../styles/NestedFolder.css";
import { useState } from "react";

type structuredObj = Record<number, dataType>;
type treeProps = {
  folderData: dataType[];
  handleExpand: (event: React.MouseEvent, id: number) => void;
  linearObj: structuredObj;
  handlePlus: (event: React.MouseEvent, id: number) => void;
  takeInputPlus: (event: React.ChangeEvent, id: number) => void;
};

export default function NestedFolder({
  folderData,
}: {
  folderData: dataType[];
}) {
  const [linearObj, setLinearObj] = useState(() => {
    const linearObjstructure = fetchChildren(folderData, {});
    console.log(linearObjstructure, "linobj*", folderData);
    return linearObjstructure;
  });

  function handleExpand(event: React.MouseEvent, id: number) {
    event.stopPropagation();
    setLinearObj(prev => {
      const copy = { ...prev };
      copy[id] = { ...copy[id], expanded: !copy[id].expanded };
      return copy;
    });
  }

  function handlePlus(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setLinearObj(prev => {
      let newLinearObj = { ...prev };
      let currentObj = {
        ...newLinearObj[id],
        addMore: !newLinearObj[id].addMore,
      };
      newLinearObj[id] = { ...currentObj };
      console.log(currentObj, "newLinear");
      return newLinearObj;
    });

    // currentChildren.push({
    //   id: Object.keys(linearObj).length + 1,
    //   name: "new file",
    //   type: "file",
    //   children: [],
    // });
    // newLinearObj[id].children = currentChildren;
    // setLinearObj(newLinearObj);
  }

  function takeInputPlus(e: React.ChangeEvent, id: number) {
    let event = e.currentTarget as HTMLInputElement;
    console.log(event.value, "val", e.currentTarget.tagName);
    
  }
  return (
    <div className="main-comp">
      <Tree
        folderData={folderData}
        handleExpand={handleExpand}
        linearObj={linearObj}
        handlePlus={handlePlus}
        takeInputPlus={takeInputPlus}
      />
    </div>
  );
}

function Tree(props: treeProps) {
  let { folderData, handleExpand, linearObj, handlePlus, takeInputPlus } =
    props;
  function FolderMapping(): React.ReactElement[] {
    return Object.values(folderData).map(folder => {
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
            <span onClick={e => handlePlus(e, folder.id)}>
              {linearObj[folder.id]?.addMore ? "➖" : "➕"}
            </span>
            {linearObj[folder.id]?.addMore && (
              <div onClick={e => e.stopPropagation()} className="add__item">
                <label>Name</label>
                <input onChange={e => takeInputPlus(e, folder?.id)} />
                <select onChange={e => takeInputPlus(e, folder?.id)}>
                  <option>File</option>
                  <option>Folder</option>
                </select>
                <button>Save</button>
              </div>
            )}
          </div>
          <div className="tree-item">
            {linearObj[folder.id]?.expanded && (
              <Tree
                folderData={folder.children}
                {...{ handleExpand, linearObj, handlePlus, takeInputPlus }}
              />
            )}
          </div>
        </div>
      );
    });
  }

  return <FolderMapping />;
}

function fetchChildren(
  data: dataType[],
  accumulatar: structuredObj
): structuredObj {
  return data.reduce<structuredObj>((_, curr) => {
    // const cloned: dataType = {
    //   ...curr,
    //   children: curr.children,
    //   expanded: false,
    // };

    accumulatar[curr.id] = curr;
    if (curr.children.length) {
      fetchChildren(curr.children, accumulatar);
    }
    return accumulatar;
  }, {});
}
