const userId = JSON.parse(localStorage.getItem('own-id'))
const socket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL_LOBBY+'/ws/lobby?token=' + userId);
//ws://monopoly.schwanndev.fr/ws/lobby?token=8119e870-60d5-4934-aa29-814c169eb099

export default socket;