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
  handleInput: (id: number) => void;
};

function Tree(props: treeProps) {
  const {
    folderData,
    handleExpand,
    linearObj,
    handlePlus,
    takeInputPlus,
    handleInput,
  } = props;

  return (
    <>
      {folderData.map(folder => {
        const icon = folder.type === "folder" ? "🗂️" : "📄";
        return (
          <div
            onClick={event => handleExpand(event, folder.id)}
            className="tree"
            key={folder.id}
          >
            <div>
              <span>{icon}</span>
              <span>{folder.name}</span>
              {folder.type === "folder" && (
                <span onClick={e => handlePlus(e, folder.id)}>
                  {linearObj[folder.id]?.addMore ? "➖" : "➕"}
                </span>
              )}

              {linearObj[folder.id]?.addMore && (
                <div onClick={e => e.stopPropagation()} className="add__item">
                  <label>Name</label>
                  <input onChange={e => takeInputPlus(e, folder.id)} />
                  <select onChange={e => takeInputPlus(e, folder.id)}>
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                  </select>
                  <button onClick={() => handleInput(folder.id)}>Save</button>
                </div>
              )}
            </div>

            <div className="tree-item">
              {linearObj[folder.id]?.expanded && (
                <Tree
                  folderData={linearObj[folder.id]?.children || []}
                  {...{
                    handleExpand,
                    linearObj,
                    handlePlus,
                    takeInputPlus,
                    handleInput,
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function fetchChildren(
  data: dataType[],
  accumulator: structuredObj
): structuredObj {
  for (const curr of data) {
    const cloned: dataType = {
      ...curr,
      children: [...curr.children],
      expanded: false,
    };
    accumulator[curr.id] = cloned;
    if (curr.children.length) {
      fetchChildren(curr.children, accumulator);
    }
  }
  return accumulator;
}

export default function NestedFolder({
  folderData,
}: {
  folderData: dataType[];
}) {
  const [linearObj, setLinearObj] = useState(() => {
    return fetchChildren(folderData, {});
  });

  const [textInput, setTextInput] = useState<string>("");
  const [selectInput, setSelectInput] = useState<"file" | "folder">("file");

  function handleExpand(event: React.MouseEvent, id: number) {
    event.stopPropagation();
    setLinearObj(prev => ({
      ...prev,
      [id]: { ...prev[id], expanded: !prev[id].expanded },
    }));
  }

  function handlePlus(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setLinearObj(prev => ({
      ...prev,
      [id]: { ...prev[id], addMore: !prev[id].addMore },
    }));
  }

  function takeInputPlus(e: React.ChangeEvent, id: number) {
    const target = e.currentTarget as HTMLInputElement | HTMLSelectElement;
    if (target.tagName === "INPUT") {
      setTextInput(target.value);
    } else if (target.tagName === "SELECT") {
      if (target.value === "file" || target.value === "folder") {
        setSelectInput(target.value);
      }
    }
  }

  function handleInput(id: number) {
    setLinearObj(prev => {
      const newLinearObj = { ...prev };
      const parent = { ...newLinearObj[id] };

      const newChild: dataType = {
        id: Object.keys(prev).length + 1,
        name: textInput || "untitled",
        type: selectInput,
        children: [],
        expanded: false,
      };

      parent.children = [...parent.children, newChild];
      newLinearObj[id] = parent;
      newLinearObj[newChild.id] = newChild;

      return newLinearObj;
    });

    setTextInput("");
    setSelectInput("file");
    setLinearObj(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        addMore: !prev[id].addMore,
        expanded: true,
      },
    }));
  }
  function findParent(id: number, linearObj: structuredObj): dataType | null {
    for (const key in linearObj) {
      if (linearObj[key].children.some(child => child.id === id)) {
        return linearObj[key];
      }
    }
    return null;
  }
  return (
    <div className="main-comp">
      <Tree
        folderData={Object.values(linearObj).filter(
          node => !findParent(node.id, linearObj)
        )}
        handleExpand={handleExpand}
        linearObj={linearObj}
        handlePlus={handlePlus}
        takeInputPlus={takeInputPlus}
        handleInput={handleInput}
      />
    </div>
  );
}
