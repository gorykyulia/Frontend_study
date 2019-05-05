import VueRouter from 'vue-router'
import home from './pages/home'
import cars from './pages/cars'
import car from './pages/car'
import carFull from './pages/carFull'


export default new VueRouter({
  routes: [
    {
      path: '',
      component: home
    },
    {
      path: '/cars',
      component: cars
    },
    {
      path: '/car/:id',
      component: car,
      children: [
        {
          path: 'full',
          component: carFull,
          name: 'carFull'
        }
      ]
    }
  ],
  mode: 'history'
})