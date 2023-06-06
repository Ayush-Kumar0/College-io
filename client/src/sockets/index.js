export default async function socketInit(socket) {
    if (socket) {
        socket.on('connect', () => {
            console.log(socket.id);
            console.log('connected');
        });
    }
}