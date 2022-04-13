import { createStore,/*, storeKey*/ } from "vuex";

const axios = require('axios');
import router from '../router/index.js';

export default createStore ({
    state: {
        username: "",
        loggedin: false,
        sameProfile: true,
        pseudoClickedOn: "",
        usernameProfil: "",
        loginProfil: "",
        pawnProfil: ""
        
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
                return true;
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
                return response.data.name

            })
            .catch(function(error) {
                console.log(error);
            });
        },
        
        getUserProfile:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/getProfile',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data);
                commit('changeUsrnameProfil', response.data.username)
                commit('changeLoginProfil', response.data.login)
                commit('changePawnProfil', response.data.pawn)

                router.push('/profile');
            })
            .catch(function(error) {
                console.log(error);
            }); 
        },

        changeNamePawn:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/editProfile',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log("voici la reponse "+response);
                /*commit('PutInfosProfile', {
                    newUsrname : response.data.username,
                    newLogin : response.data.login,
                    newPawn : response.data.pawn
                });*/
                router.push('/profile');

            })
            .catch(function(error) {
                console.log(error);
            }); 
        },

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
        },
        changePawnProfil(state,newPawnProfil){
            state.pawnProfil = newPawnProfil;
        },
        changeUsrnameProfil(state,newUsProfil){
            state.usernameProfil = newUsProfil;
        },
        changeLoginProfil(state,newLoginProfil){
            state.loginProfil = newLoginProfil;
        }
        
    },
    modules: {

    }
})