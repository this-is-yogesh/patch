import { useState } from "react";
function NestedComment({ data }) {
  const [showReply, setShowReply] = useState(false);
  console.log(data, "data*");
  return (
    <div className="main_nested_comment">
      {data.map((d, index) => (
        <div key={d.id} className="individual_comment">
          <div className="desc_and_buttons">
            <span className="desc_span">
              {d.author} :{d.desc}
            </span>
            <button>cancel</button>
            <button>delete</button>
            <button onClick={() => setShowReply(!showReply)}>reply</button>
          </div>
          {showReply && (
            <div className="post_reply_div">
              <textarea
                onChange={() => {}}
                placeholder="Write your reply..."
              ></textarea>
              <button className="post_reply_button">Post reply</button>
            </div>
          )}
          <div style={{ paddingLeft: "10px" }}>
            {d.children.length > 0 && <NestedComment data={d.children} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NestedComment;
