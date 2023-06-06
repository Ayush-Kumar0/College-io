export default async function socketInit(socket) {
    if (socket) {
        socket.on('connect', () => {
            console.log('connected');
        });
        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    }
}