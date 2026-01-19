import React from "react";
import { Navigate } from "react-router";

const ChatData = ({ c }) => {
  const { role, message } = c;

  if (role === "user") {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[75%] rounded-2xl bg-blue-600 px-4 py-2 text-sm text-white shadow-md">
          {message}
        </div>
      </div>
    );
  }

  let parsedMessage = null;
  try {
    parsedMessage = JSON.parse(message);
  } catch {
    return null;
  }

  if (parsedMessage?.type === "normal") {
    return (
      <div className="flex justify-start mb-3">
        <div className="max-w-[75%] rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-zinc-100 shadow-md">
          {parsedMessage.calm_reply}
        </div>
      </div>
    );
  }

  return <Navigate to="/questioning" state={parsedMessage} />;
};

export default ChatData;
