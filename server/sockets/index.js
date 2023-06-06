const jwt = require('jsonwebtoken');

// Get cookies from socket request from user
async function getCookies(socket, next) {
    try {
        socket.cookies = {};
        let cookieArr = await socket.handshake.headers.cookie.split('; ');
        await cookieArr.forEach(async element => {
            const [name, value] = await element.split('=');
            socket.cookies[name] = value;
        });
    } catch (err) {
        console.log(`Error while getting Cookies`, err);
    }
    await next();
}
// Fetch user details from the auth-token
async function fetchUser(socket, next) {
    const token = (socket.cookies) ? socket.cookies['auth-token'] : undefined;
    if (!token) {
        socket.user = null;
        return console.log('auth-token not found');
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = data.user;
        next();
    } catch (err) {
        socket.user = null;
        return console.log('Error while verifying user before socket connection.');
    }
}

const onlineUsers = new Map();
module.exports = (io) => {
    // Middlewares
    io.use(getCookies);
    io.use(fetchUser);

    // On Connection
    io.on('connection', async (socket) => {
        // console.log(socket.id, socket.user.name);

        // // Sending all online users when someone connects to server
        // socket.on('get-online-users', async () => {
        //     const data = Array.from(onlineUsers, ([key, value]) => {
        //         return { _id: key, name: value.name };
        //     });
        //     socket.emit('receive-online-users', data);
        // });

        // // Sending a new user if he joins
        // if (!onlineUsers.has(socket.user.id)) {
        //     socket.broadcast.emit('new-user', { _id: socket.user.id, name: socket.user.name });
        //     onlineUsers.set(socket.user.id, { name: socket.user.name, socketid: socket.id });
        // }

        // // Deleting a user if he disconnects
        // socket.on('disconnect', async () => {
        //     onlineUsers.delete(socket.user.id);
        //     socket.broadcast.emit('user-left', socket.user.id);
        // });

        // // Receiving the sent message
        // socket.on('send-msg', async ({ to, msg, time }) => {
        //     const from = socket.user.id;
        //     // console.log(from, to);
        //     const newMessage = new Message({
        //         msg: msg,
        //         sender: from,
        //         time: time
        //     });
        //     // Finding room
        //     Room.find({ $or: [{ users: [from, to] }, { users: [to, from] }] })
        //         .then(async room => {
        //             if (room.length < 1)
        //                 return;
        //             // console.log(room);
        //             room = room[0];
        //             newMessage.roomid = room._id;
        //             // console.log(newMessage);
        //             // Saving message
        //             newMessage.save()
        //                 .then(async message => {
        //                     room.messages.push(message._id);
        //                     // console.log(message);
        //                     // Updating room
        //                     room.save()
        //                         .then(async room => {
        //                             socket.emit('get-sent-msg-id', { _id: message._id, time: time });
        //                             if (onlineUsers.has(to)) {
        //                                 // Sending message to destination when receiver is online
        //                                 const socketid = onlineUsers.get(to).socketid;
        //                                 const fromName = onlineUsers.get(to).name;
        //                                 // console.log(socketid, message._id);
        //                                 io.to(socketid).emit('receive-msg', { _id: message._id, from, msg, time, fromName });
        //                             }
        //                             // Incrementing the number of unseen messages
        //                             User.findById(to)
        //                                 .then(async user => {
        //                                     try {
        //                                         let updateUnseenPromise = await user.rooms.map(async element => {
        //                                             if (element.other.toString() === from) {
        //                                                 element.unseen += 1;
        //                                             }
        //                                             return element;
        //                                         });
        //                                         user.rooms = await Promise.all(updateUnseenPromise);
        //                                         user.save()
        //                                             .then()
        //                                             .catch(err => { console.log('Error while updating the useen value', err); });
        //                                     } catch (err) {
        //                                         console.log('Error while increasing the count of offline user', err);
        //                                     }
        //                                 })
        //                                 .catch(err => { console.log('Error while finding receiving user', err); });
        //                         })
        //                         .catch(err => { console.log('Error while updating room', err); });
        //                 })
        //                 .catch(err => { console.log('Error while saving message', err); });
        //         })
        //         .catch(err => { console.log('Error while finding room', err); });
        // });
    });
}