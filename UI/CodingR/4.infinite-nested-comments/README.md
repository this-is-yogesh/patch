1. how to delete the post of the main data
 -  function deleteReply(data, id) {
    return data
      .filter(data => data.id !== id)
      .map(item => {
        return {
          ...item,
          children: item?.children ? deleteReply(item.children, id) : [],
        };
      });
  }

  2. how to add a reply to the main data
   -  function addReply(data, id, replyBody) {
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

  3. There are several comments , explain the structure
  - all the comments are individual components meaning everyone of them have their own state variable , it is like this because we are using the parent component NestedComment recursively so each component is indpendent
  i verified it by putting       style={{
        backgroundColor: `#${
          Math.floor(Math.random() * 10).toString() +
          Math.floor(Math.random() * 10).toString() +
          Math.floor(Math.random() * 10).toString()
        }`,
      }} 


4. what is the logic of edit reply function
- we are basically mapping over the entire data and if the id the selected comment to edit matches with any object in our entire data then we just replace its desc with the current reply and if not means the selected comment must be one of the current item children , then we just return the item and we replace its children into further loop

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