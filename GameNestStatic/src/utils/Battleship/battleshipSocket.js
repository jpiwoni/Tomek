import { toast } from 'react-toastify';

let connection = null;

const getSocket = (lobbyId, user) => {
    if (user && !connection) {
        const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}?username=${user.user}&lobbyId=${lobbyId}`);

        // Connection opened
        socket.addEventListener("open", (event) => {
            console.log("Connected to server");
        });

        // Error handling
        socket.addEventListener("error", (error) => {
            console.log("WebSocket error:", error);
            toast.error("WebSocket connection error. Please try again later.");
        });

        socket.addEventListener("close", (event) => {
            console.log("WebSocket connection closed:", event);
            toast.error("WebSocket connection closed. Please try again later.");
        });

        // Save the socket reference
        connection = socket;
    }
    return connection;
}

export default getSocket;