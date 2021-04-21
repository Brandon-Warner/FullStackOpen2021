import React from "react";

const Message = ({ message }) => {
  const messageStyle = {
    color: "green",
    background: "lightGrey",
    fontSize: "20",
    borderStyle: "solid",
    borderRadius: "5",
    padding: "10",
    marginBottom: "20",
  };

  if (message === null) {
    return null;
  }
  return (
    <div style={messageStyle} className='message'>
      {message}
    </div>
  );
};

export default Message;
