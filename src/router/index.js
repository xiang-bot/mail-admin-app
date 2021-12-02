import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '@/store';
import getMenuRoute from '@/utils/permission';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 上面的10-14 是处理路由报错的方法

const ayncRouterMap = [{
  path: '/',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'line-chart',
      hidden: false,
    },
    component: () => import('../views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      icon: 'area-chart',
      hidden: false,
    },
    component: () => import('../views/page/productAdd.vue'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '新增商品',
      icon: 'file-add',
      hidden: true,
    },
    component: () => import('../views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'category',
    meta: {
      title: '类目管理',
      icon: 'line-chart',
      hidden: false,
    },
    component: () => import('../views/page/category.vue'),
  },
  ],
}];

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/index',
  meta: {
    title: '首页',
    icon: 'home',
    hidden: false,
  },
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
      icon: 'box-plot',
      hidden: false,
    },
    component: () => import('../views/page/index.vue'),
    // 上面是异步进行加载 也是懒加载的方法;
  }],
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    hidden: true,
  },
  component: Login,
},
];

const router = new VueRouter({
  routes,
});

// 这里主要是你刷新页面 必须要从登录页面进去
// eslint-disable-next-line consistent-return
let isAddRoutes = false;
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      // 上面是如果你的上面信息没有就要到login页面
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(store.state.user.role, ayncRouterMap);
        store.dispatch('changMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
