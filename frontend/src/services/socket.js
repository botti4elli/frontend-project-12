import { io } from 'socket.io-client';
const socket = io(); // По умолчанию подключается к тому же origin
export default socket;
