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
    path: '/Forget',
    component: Forget,
  },
  
  /**  @ appel des fichiers du component */
  /* appel du fichier inscription du component */
  {
    path:'/signup',
    name: 'SignUp',
    component: ()=>import ('../components/SignUp.vue')
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
    accueil: 'Home',
    component: ()=>import ('../components/Home.vue')
  },
  /* appel du fichier MP forget du component */
  {
    path:'/forget',
    name: 'Forget',
    component: ()=>import ('../components/ForgetPassword.vue')
  },
  /* appel du fichier post login du component */
  {
    path:'/post_login',
    name:'Post Login',
    component: ()=>import ('../views/PostLogin.vue')
  },
  {
    path:'/after_game',
    name:'AfterGame',
    component: ()=>import ('../views/AfterGame.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export { routes };

export default router
