import { toast } from 'react-toastify';

let connection = null;

const getSocket = (lobbyId, user) => {
    if (user && !connection) {
        const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}?username=${user.user}&lobbyId=${lobbyId}`);

        // Connection opened
        socket.addEventListener("open", (event) => {
            const message = {
                type: "connect",
                lobbyId: lobbyId,
            };
            socket.send(JSON.stringify(message));
            console.log("Connected to server");
        });

        // Listen for messages
        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            console.log("Message from server ", event.data);
            if (message.type && message.type === "error") {
                toast.error(message.message);
            }
        });

        // Error handling
        socket.addEventListener("error", (error) => {
            console.log("WebSocket error:", error);
            console.log("TEST");
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