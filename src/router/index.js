import { createRouter, createWebHistory } from 'vue-router'
// importation des components à travers les views
import Login from '../views/LoginV.vue'
import Inscription from '../views/InscriptionV.vue'
import Forget from '../views/ForgetV.vue'


const routes = [
  {
    name: 'Login',
    path: '/', 
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
  /* appel du fichier login du component */
  {
    path:'/',
    name: 'Login',
    component: ()=>import ('../components/Login.vue')
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
