import { createStore/*, storeKey*/ } from "vuex";

const axios = require('axios');
import router from '../router/index.js';

export default createStore ({
    state: {
        username: "",
        loggedin: false,
        sameProfile: true
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
        checkName:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/login',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                router.push('/Lobby');

            })
            .catch(function(error) {
                console.log(error);
            });
        },
        changeNamePawn:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/edit',userInfos, {
                
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