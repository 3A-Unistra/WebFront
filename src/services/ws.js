import createStore from '../store'

const socket = new WebSocket('ws://monopoly.schawnndev.fr:80/ws/lobby?token=' +createStore.getters.id);
export default socket;