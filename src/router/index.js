import {
  createRouter,
  createWebHistory
} from 'vue-router';
import Home from '../views/Home.vue';
import Covid from '../views/Covid.vue';

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/covid',
  name: 'Covid',
  component: Covid
},


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
