const userId = JSON.parse(localStorage.getItem('own-id'))
const socket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL_LOBBY+'/ws/lobby?token=' + userId);

export default socket;
