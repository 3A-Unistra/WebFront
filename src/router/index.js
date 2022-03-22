import { createRouter, createWebHistory } from 'vue-router'
// importation des components à travers les views
import Login from '../views/LoginV.vue'
import Inscription from '../views/InscriptionV.vue'
import Forget from '../views/ForgetV.vue'


const routes = [
  {
    name: 'Login',
    path: '/login', 
    component: Login, 
    //charge le fichier du component
  },
  {
    name: 'Inscription',
    path: '/inscription',
    component: Inscription,
  },
  {
    name: 'Forget',
    path: '/forget',
    component: Forget,
  },
  
  /**  @ appel des fichiers du component */
  /* appel du fichier inscription du component */
  {
    path:'/inscription',
    name: 'Inscription',
    component: ()=>import ('../components/Inscription.vue')
  },

  {
    path:'/lobby',
    name: 'Lobby',
    component: ()=>import ('../components/Lobby.vue')
  },

  {
    path:'/profile',
    name: 'Profile',
    component: ()=>import ('../components/Profile.vue')
  },

  /* appel du fichier login du component */
  {
    path:'/login',
    name: 'Login',
    component: ()=>import ('../components/Login.vue')
  },
  {
    path:'/',
    accueil: 'Accueil',
    component: ()=>import ('../components/Accueil.vue')
  },
  /* appel du fichier MP forget du component */
  {
    path:'/forget',
    name: 'Forget',
    // component: ()=>import ('../components/ForgetPassword.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router