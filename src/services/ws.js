import createStore from '../store'

const socket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL_LOBBY+'/ws/lobby?token=' +createStore.getters.id);

export default socket;