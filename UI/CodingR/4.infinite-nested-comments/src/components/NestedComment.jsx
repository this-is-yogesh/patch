import { useState } from "react";
function NestedComment({ data, setData }) {
  const [showReply, setShowReply] = useState(0);
  const [reply, setReply] = useState("");
  const [editedComment, setEditedComment] = useState({});

  function toggleReply(id) {
    if (!id) {
      setShowReply(null);
      return;
    }
    setShowReply(prev => {
      if (prev === id) {
        return null;
      } else {
        return id;
      }
    });
  }

  function deleteReply(data, id) {
    return data
      .filter(data => data.id !== id)
      .map(item => {
        return {
          ...item,
          children: item?.children ? deleteReply(item.children, id) : [],
        };
      });
  }

  function deletePost(id) {
    setData(prevData => deleteReply(prevData, id));
  }

  function addReply(data, id, replyBody) {
    return data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          children: [replyBody, ...item.children],
        };
      }
      return {
        ...item,
        children: item.children ? addReply(item.children, id, replyBody) : [],
      };
    });
  }

  function editEntireBody(data, id, replyBody) {
    return data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          desc: replyBody,
        };
      }
      return {
        ...item,
        children:
          item?.children?.length > 0
            ? editEntireBody(item.children, id, replyBody)
            : [],
      };
    });
  }

  function postReply(id) {
    let replyBody = {
      id: Date.now(),
      desc: reply,
      author: "Vishal",
      timestamp: new Date().toISOString(),
      children: [],
    };
    setData(prev => addReply(prev, id, replyBody));
    setReply("");
    setShowReply(null);
  }

  function editFunction(data, id) {
    let realComment = data.find(d => {
      if (d.id === id) {
        return { ...d };
      } else {
        return d?.children?.length > 0 ? editFunction(d.children, id) : [];
      }
    });
    if (realComment) {
      setReply(realComment.desc);
      setEditedComment(realComment);
    }

    console.log(realComment, "realComment");
  }
  function editComment(id) {
    toggleReply(id);
    editFunction(data, id);
    // setData(prev => editFunction(prev, id));
  }
  function editReply(id) {
    setData(prev => editEntireBody(prev, id, reply));
    toggleReply(id);
    // console.log(body, "editedComment***");
  }
  return (
    <div className="main_nested_comment">
      {data.map((d, index) => (
        <div key={d.id} className="individual_comment">
          <div className="desc_and_buttons">
            <span className="desc_span">
              {d.author} :{d.desc}
            </span>
            <div className="buttons_div">
              <button onClick={() => toggleReply(null)}>cancel</button>
              <button onClick={() => deletePost(d.id)}>delete</button>
              <button onClick={() => editComment(d.id)}>edit</button>
              <button onClick={() => toggleReply(d.id)}>reply</button>
            </div>
          </div>
          {d.id === showReply && (
            <div className="post_reply_div">
              <textarea
                value={reply}
                onChange={e => {
                  setReply(e.target.value);
                }}
                onKeyUp={e => {
                  if (e.key === "Enter") {
                    if (editedComment) {
                      editReply(d.id);
                    } else {
                      postReply(d.id);
                    }
                  }
                }}
                placeholder="Write your reply..."
              ></textarea>
              <button
                className="post_reply_button"
                onClick={
                  editedComment ? () => editReply(d.id) : () => postReply(d.id)
                }
              >
                {editedComment ? "Edit Reply" : "Post reply"}
              </button>
            </div>
          )}
          <div style={{ paddingLeft: "10px" }}>
            {d?.children?.length > 0 && (
              <NestedComment data={d.children} setData={setData} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NestedComment;
