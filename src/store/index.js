import { createStore,/*, storeKey*/ } from "vuex";

const axios = require('axios');
import router from '../router/index.js';
axios.defaults.baseURL =process.env.VUE_APP_API_URL


export default createStore({
    state: {

        //Informations de l'user connecté:
        username: "",
        login: "",
        piece: 0,
        id: -1,
        token:"",

        loggedin: false,
        sameProfile: true,
        numberPlayers: 4,
        IsFollowing: false,

        gameToken:"",

        //Informations du profil cliqué
        usernameProfil: "",
        loginProfil: "",
        pawnProfil: Math.floor(Math.random()*7),

        publicLobby: false,
        isHost: false,  

        //liste des salons a afficher dans PostLobby
        listeSalons: [],
        //liste des joueurs dans un lobby
        listePlayers: [],
        //paramètre de la room
        auctions: false,
        doubleGO: false,
        buyFirstRound: false,
        timePerRound: -1,
        maxRound: -1,
        starterMoney: -1
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

        checkLogin:({commit},userInfos) => {
            commit;
            axios.post('/users/login',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data);
                commit('addToken', response.data.token)
                router.push('/post_login');

            })
            .catch(function(error) {
                console.log(error);
            });
        },
        
        getUserProfile:({commit},userInfos) => {
            commit;
            axios.post('/users/getProfile',userInfos, {
                
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

        getIds:({commit},userNames) => {
            commit;
            axios.post('/users/get_ids',userNames, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data);
                axios.post('/users/is_follow',response.data, {
                
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
        } , 
        checkforgot:({commit},userInfos) => {
            commit;
            axios.post('/users/forget',userInfos, {
                
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
        checkreset:({commit},userInfos) => {
            commit;
            axios.post('/users/reset/:token',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })  
            .then(function(response) {
                console.log(response);
                router.push('/Login');
            })
            
            .catch(function(error) {
                console.log(error);
            });
        },        
    

    },
    getters: {
    id: state => state.id
    },
    mutations: {
        setHost(state, isHost) {
            state.isHost = isHost
        },

        addToken(state,playerToken) {
            state.token = playerToken
        },  

        gameToken(state,gameToken) {
            state.gameToken =gameToken
        },

        createSalon(state, newSalon) {
            state.listeSalons.push(newSalon);
        },
        joinRoom(state, newPlayer) {
            state.listePlayers.push(newPlayer);
        },

        leaveRoom(state, index) {
            state.listePlayers.splice(index, 1);
        },

        //suppressionJoueur(state, index){
        //},
        ajoutJoueur(state, index){
            state.this.$set(this.listeSalons[index].nbPlayers,this.listeSalons[index].nbPlayers);
        },

        setPiece(state, piece) {
            state.piece = piece
        },
        setLobby(state, publicLobby) {
            state.publicLobby = publicLobby
        },
        quickId(state, id) {
            state.id = id
        },
        changeFollowState(state, newState) {
            state.IsFollowing = newState
        },
        clearUserData(state) {
            state.username = "",
                state.login = "",
                state.piece = 0,
                state.loggedin = false

        },
        rentreusrname(state, newusername) {
            state.username = newusername;
        },
        gettingin(state, loggedin) {
            state.loggedin = loggedin;
        },
        checkingSameProfile(state, newSameProfile) {
            state.sameProfile = newSameProfile;
        },
        changePawnProfil(state, newPawnProfil) {
            state.pawnProfil = newPawnProfil;
        },
        changeUsrnameProfil(state, newUsProfil) {
            state.usernameProfil = newUsProfil;
        },
        changeLoginProfil(state, newLoginProfil) {
            state.loginProfil = newLoginProfil;
        },
        changePhotoProfil(state, newPhotoProfil) {
            state.photoProfil = newPhotoProfil;
        }

    },
    modules: {

    }
})