import Vue from "vue";
import Router from "vue-router";
import IdeaList from "./views/IdeaList.vue";
import Selected from "./views/Selected.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: IdeaList
    },
    {
      path: "/selected",
      name: "about",
      component: Selected
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
