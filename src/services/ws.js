const userToken = JSON.parse(localStorage.getItem('user-token')); // mettre own-id en localhost et user-token pour mai
const socket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL_LOBBY+'/ws/lobby?token=' + userToken);

export default socket;
