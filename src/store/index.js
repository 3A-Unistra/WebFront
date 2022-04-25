import { createStore,/*, storeKey*/ } from "vuex";

import axios from 'axios';
import router from '../router/index.js';
axios.defaults.baseURL =process.env.VUE_APP_PATH_API
/*const config = {
    headers: { 'Authorization': `Bearer ${this.state.token}` }
};*/

export default createStore ({
    state: {

        //Informations de l'user connecté:
        username: "",
        login: "",
        piece: 0,
        id:-1,

        loggedin: false,
        sameProfile: true,
        numberPlayers: 4,
        IsFollowing: false,

        //Informations du profil cliqué
        usernameProfil: "",
        loginProfil: "",
        pawnProfil: "",

        publicLobby: false  ,
        isHost: false,
        token: /*localStorage.getItem('user-token') ||*/ ''

    },

    actions: {
        createAccount:({commit},userInfos) => {
            commit;
            axios.post('/users/register',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function () {
                //console.log(response);
                router.push('/Login');
                return true;
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        postPost:({commit},idDuBoug) => {
            commit;
            axios.post('/users/getProfil',idDuBoug, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            }); 
        },

        checkLogin:({commit},userInfos) => {
            commit;
            axios.post('/users/login',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                const token = response.data.token
                localStorage.setItem('user-token', token) // store the token in localstorage
                commit('saveToken',token);
                console.log(localStorage.getItem('user-token'));
                console.log("date expiration en plus: "+ JSON.stringify(token));
                router.push('/post_login');

            })
            .catch(function(error) {
                localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                commit('saveToken',null);
                console.log(error);
            });
        },
        fetchAccessToken({ commit }) {
            commit('saveToken', localStorage.getItem('user-token'));
        },
        
        getUserProfile:({commit},userInfos) => {
            commit;
            const token = localStorage.getItem('user-token');

            console.log("voici le token:\n"+localStorage.getItem('user-token'));
            console.log("voici la date d'expiration du token:\n"+token.expiresIn);

            axios.post('/users/getProfile',userInfos, {
                headers: {
                     'Authorization': 'Bearer '+token,
                     'Content-Type': 'application/json'
                    }
            })
            .then(function (response) {
                console.log(response.data);
                console.log("on est dans le then avec "+token);

                commit('changeUsrnameProfil', response.data.username)
                commit('changeLoginProfil', response.data.login)
                commit('changePawnProfil', response.data.pawn)

                router.push('/profile');
            })
            .catch(function(error) {
                console.log(error);
            }); 
        },

        getIds:({commit},userNames) => {
            commit;
            axios.post('/users/get_ids',userNames, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data);
                axios.post('http://localhost:3000/api/users/is_follow',response.data, {
                
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(function(response) {
                    console.log(response.data);
                    return true;
                })
                .catch(function(error) {
                    console.log(error.data);
                    return false;
                });
            })
            .catch(function(error) {
                console.log(error.data);
                return false;
            });
        } ,

        getOwnId:({commit},username) => {
            commit;
            return axios.post('/users/getownid',username, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                commit('quickId',response.data.ownId)
                return response
            })
            .catch(function(error) {
                return error;
            });
        },

        changeNamePawn:({commit},userInfos) => {
            commit;
            axios.post('/users/editProfile',userInfos, {                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function () {
                router.push('/profile');
            })
            .catch(function(error) {
                console.log(error);
            }); 
        },

        Follow:({commit},userNames) => {
            commit;
            axios.post('/users/get_ids',userNames, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data.ownId );
                console.log(response.data.otherId );
                axios.post('/users/follow',response.data, {
                
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(function(response) {
                    console.log(response);
                    return true;
                })
                .catch(function(error) {
                    console.log(error);
                    return false;
                });
            })
            .catch(function(error) {
                console.log(error);
                return false;
            });
        } ,

        Unfollow:({commit},userNames) => {
            commit;
            axios.post('/users/get_ids',userNames, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data.ownId );
                console.log(response.data.otherId );
                axios.post('/users/unfollow',response.data, {
                
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(function(response) {
                    console.log(response);
                    return true;
                })
                .catch(function(error) {
                    console.log(error);
                    return false;
                });
            })
            .catch(function(error) {
                console.log(error);
                return false;
            });
        }

    },
    getters: {

    },
    mutations: {
        saveToken(state,token)
        {
            state.token =token
        },
        setHost(state,isHost)
        {
            state.isHost = isHost
        },
        setLobby(state,publicLobby)
        {
            state.publicLobby= publicLobby
        },
        quickId(state,id)
        {
            state.id = id
        },
        changeFollowState(state, newState)
        {
            state.IsFollowing = newState
        },
        clearUserData(state)
        {
            state.username = "",
            state.login = "",
            state.piece = 0,
            state.loggedin = false,
            state.token = '',
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible

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