const userToken = JSON.parse(localStorage.getItem('own-id'));
const socket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL_LOBBY+'/ws/lobby?token=' + userToken);

export default socket;