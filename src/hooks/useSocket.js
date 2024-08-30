import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket = io();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendSocketMessage = (message) => {
    if (socket) {
      socket.emit("chat message", message);
    }
  };

  return { isConnected, sendSocketMessage, socket };
};
