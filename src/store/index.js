import { createStore/*, storeKey*/ } from "vuex";

const axios = require('axios');
import router from '../router/index.js';

export default createStore ({
    state: {
        username: "",
        login: "",
        piece: 0,
        loggedin: false,
        sameProfile: true,
        numberPlayers: 4,
        IsFollowing: true
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
        },
        checkLogin:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/login',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                router.push('/post_login');

            })
            .catch(function(error) {
                console.log(error);
            });
        }  

    },
    getters: {

    },
    mutations: {
        clearUserData(state)
        {
            state.username = "",
            state.login = "",
            state.piece = 0,
            state.loggedin = false

        },
        rentreusrname(state, newusername)
        {
            state.username = newusername;     
        },
        gettingin(state,loggedin)
        {
            state.loggedin = loggedin;
        },
        checkingSameProfile(state,newSameProfile)
        {
            state.sameProfile = newSameProfile;
        }
    },
    modules: {

    }
})