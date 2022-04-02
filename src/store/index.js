import { createStore/*, storeKey*/ } from "vuex";

const axios = require('axios');
import router from '../router/index.js';

export default createStore ({
    state: {
        username1: "",
        loggedin: false
    },
    actions: {
        createAccount:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/register',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                router.push('/Login');
            })
            .catch(function(error) {
                console.log(error);
            });
        } 

    },
    getters: {

    },
    mutations: {
        rentreusrname(state, newusername)
        {
            state.username1 = newusername;     
        },
        gettingin(state,loggedin)
        {
            state.loggedin = loggedin;
        }
    },
    modules: {

    }
})