import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_API_BASE,{
    autoConnect: false,
    auth: {
      token: "abcd"
    }
});