import { createStore } from "vuex";
console.log(process.env) // remove this after you've confirmed it working

const axios = require('axios');

export default createStore ({
    state: {
        username1: "dd",
        username2: ""
    },
    actions: {
        createAccount:({commit},userInfos) => {
            commit;
            console.log(userInfos);
            axios.post(process.env.PATH_API,userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        } 

    },
    getters: {

    },
    mutations: {
        rentreusrname(state, newusername) {
            state.username1 = newusername;     
        }
    },
    modules: {

    }
})