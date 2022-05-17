import { createStore,/*, storeKey*/ } from "vuex";

import axios from 'axios';
import router from '../router/index.js';
axios.defaults.baseURL =process.env.VUE_APP_API_URL
/*const config = {
    headers: { 'Authorization': `Bearer ${this.state.token}` }
};*/


export default createStore({
    state: {

        //Informations de l'user connecté:
        username: "",
        login: "",
        piece: 0,
        id: -1,

        loggedin: false,
        sameProfile: true,
        numberPlayers: 4,
        IsFollowing: false,

        gameToken:"",

        //Informations du profil cliqué
        usernameProfil: "",
        loginProfil: "",
        pawnProfil: Math.floor(Math.random()*7),

        publicLobby: false  ,
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
        starterMoney: -1, 
        nomPage: ''
    },
    actions: {
       createAccount:({commit},userInfos) => {
            commit;
            return  new Promise(((resolve, reject) => axios.post('/users/register',userInfos, {                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function () {
                //console.log(response);
                router.push('/Login');
                resolve()
                return true
                
            })
            .catch(function(error) {
                reject(error)
            })));
        },
        checkLogin:({commit},userInfos) => {
            commit;
            return  new Promise(((resolve, reject) => axios.post('/users/login',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                commit('quickId',response.data.id);
                localStorage.setItem('user-token', JSON.stringify(response.data.token)); // store the token in localstorage
                localStorage.setItem('own-id', JSON.stringify(response.data.userid)); // store the id in localstorage

                router.push('/post_login');
                resolve()
            })
            .catch(function(error) {
                localStorage.removeItem('user-token')
                reject(error)
            })));
        },

        // infos comprend le chemin de destination pour réutiliser la méthode
        // et l'id de la personne faisant la requête
        verifRequest:({commit},infos) => {
            commit;
            axios.post('/users/verifToken', infos,{
                headers: {
                     'Authorization': 'Bearer '+localStorage.getItem('user-token'),
                     'Content-Type': 'application/json'
                    }
            })
            .then(function (response) {
                //console.log(response.data);
                if (response.data.success_value === true) {
                    console.log("on est dans le then, allant vers"+'/'+infos.destPath);

                    router.push('/'+infos.destPath);
                } else {
                    console.log("token expiré");
                    router.push('/');
                    commit('clearUserData');
                }
                
            })
            .catch(function(error) {
                console.log(error.message);
                router.push('/login');
                commit('clearUserData');
            });
        },

        // méthode qui est lancée à chaque refresh
        // vérifie si le token est valide
        // valide: recharge les values dans le state
        // invalide: vide localstorage et renvoie au login
        verifToken:({commit},infos) => {
            commit;
            axios.post('/users/verifToken', infos,{
                headers: {
                     'Authorization': 'Bearer '+localStorage.getItem('user-token'),
                     'Content-Type': 'application/json'
                    }
            })
            .then(function (response) {
                //console.log(response.data);
                if (response.data.success_value === true) {
                    console.log("token encore valide");
                    commit('quickId', localStorage.getItem('own-id')); // on remet l'id
                    console.log(localStorage.getItem('own-id'))
                    commit('gettingin',true); // on se dit connecté
                    commit('rentreusrname',localStorage.getItem('own-username')); // on remet l'username

                } else {
                    console.log("token expiré");
                    router.push('/login');
                    commit('clearUserData');
                }
                
            })
            .catch(function(error) {
                console.log(error.message);
                console.log("token expiré dans error");
                router.push('/login');
                commit('clearUserData');
            });
        },
        
        getUserProfile:({commit},userInfos) => {
            commit;
            const token = localStorage.getItem('user-token');

           //console.log("voici le token:\n"+localStorage.getItem('user-token'));

            axios.post('/users/getProfile',userInfos, {
                headers: {
                     'Authorization': 'Bearer '+token,
                     'Content-Type': 'application/json'
                    }
            })
            .then(function (response) {
                //console.log(response.data);
                if (response.data.success === true) {
                    commit('changeUsrnameProfil', response.data.username)
                    commit('changeLoginProfil', response.data.login)
                    commit('changePawnProfil', response.data.pawn)

                    router.push('/profile');
                }
                
            })
            .catch(function(error) {
                console.log(error.message);
                router.push('/login');

            }); 
        },

        getIds:({commit},userNames) => {
            commit;
            axios.post('/users/get_ids',userNames, {
                
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('user-token'),
                'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                axios.post('/users/is_follow',response.data, {
                
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(function() {
                    commit('changeFollowState',true);
                })
                .catch(function() {
                    console.log("pas de relation");
                    commit('changeFollowState',false);
                });
            })
            .catch(function(error) {
                console.log(error.message);
                return false;
            });
        } ,

        // accéder au moment d'édit un profil
        changeNamePawn:({commit},userInfos) => {
            commit;
            axios.post('/users/editProfile',userInfos, {                
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('user-token'),
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
                    'Authorization': 'Bearer '+localStorage.getItem('user-token'),
                    'Content-Type': 'application/json'
                   }
            })
            .then(function (response) {
                axios.post('/users/follow',response.data, {
                
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('user-token'),
                    'Content-Type': 'application/json'
                }
                })
                .then(function() {
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
                'Authorization': 'Bearer '+localStorage.getItem('user-token'),
                'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                axios.post('/users/unfollow',response.data, {
                
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('user-token'),
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
            return  new Promise(((resolve, reject) => axios.post('/users/forget',userInfos, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function () {
                //console.log(response);
                router.push('/Login');
                resolve()
            })
            .catch(function(error) {
                reject(error)
            })));
        },
        checkreset:({commit},userInfos) => {
            commit;
            return  new Promise(((resolve, reject) => axios.post('/users/:token',userInfos, {  
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })  
            .then(function() {
                router.push('/Login');
                resolve()
            })
            
            .catch(function(error) {
                reject(error)

            })));
        },          

    },
    getters: {
    id: state => state.id
    },
    mutations: {

        // LOBBY MUTATIONS
        setHost(state,isHost)
        {
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

        ajoutJoueur(state, index){
            state.this.$set(this.listeSalons[index].nbPlayers,this.listeSalons[index].nbPlayers);
        },
        setLobby(state, publicLobby) {
            state.publicLobby = publicLobby
        },



        //  LOGIN & REFRESH MUTATIONS
        quickId(state, id) {
            state.id = id
        },
        clearUserData(state) {
            state.username = "",
            state.login = "",
            state.piece = 0,
            state.loggedin = false,
            state.token = '',
            localStorage.removeItem('user-token'),
            localStorage.removeItem('own-id'),
            localStorage.removeItem('own-username'),
            localStorage.removeItem('username-profil')

        },
        rentreusrname(state, newusername) {
            state.username = newusername;
        },
        gettingin(state, loggedin) {
            state.loggedin = loggedin;
        },


        //  PROFIL MUTATIONS
        setPiece(state, piece) {
            state.piece = piece
        },
        
        changeFollowState(state, newState) {
            state.IsFollowing = newState
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
        },
        changePage(state, newPage) {
            state.nomPage = newPage;
        }

    },
    modules: {

    }
})