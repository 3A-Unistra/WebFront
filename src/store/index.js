import { createStore } from "vuex";

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
            axios.post('http://localhost:3000/api/users/register',userInfos, {
                
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