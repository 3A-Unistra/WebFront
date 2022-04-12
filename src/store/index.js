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
        IsFollowing: false,
        pseudoClickedOn: "pla"
    },
    actions: {
        createAccount:({commit},userInfos) => {
            commit;
            axios.post('http://localhost:3000/api/users/register',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function () {
                //console.log(response);
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
                console.log(response.data);
                router.push('/post_login');

            })
            .catch(function(error) {
                console.log(error);
            });
        },

        getIds:({commit},userNames) => {
            commit;
            axios.post('http://localhost:3000/api/users/get_ids',userNames, {
                
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

        Follow:({commit},userNames) => {
            commit;
            axios.post('http://localhost:3000/api/users/get_ids',userNames, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data.ownId );
                console.log(response.data.otherId );
                axios.post('http://localhost:3000/api/users/follow',response.data, {
                
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
            axios.post('http://localhost:3000/api/users/get_ids',userNames, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data.ownId );
                console.log(response.data.otherId );
                axios.post('http://localhost:3000/api/users/unfollow',response.data, {
                
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
        updatePseudoClickedOn(state,newPCO) 
        {
            state.pseudoClickedOn = newPCO
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