import createStore from '../store'

const socket = new WebSocket('ws://'+process.env.VUE_APP_WEBSOCKET_URL+':80/ws/lobby?token=' +createStore.getters.id);
export default socket;