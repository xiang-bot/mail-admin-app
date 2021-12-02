const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'category',
  }],
};

export default function getMenuRoute(role, routes) {
  // window.console.log(routes);
  // 这里的role就是证明你是普通还是管理员的身份;
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  // window.console.log(allowRoutesName);
  const resultRoutes = routes.filter((r) => {
    // window.console.log(r);
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      // window.console.log(obj);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
// 这里主要是你设置你的权限 不同的人进入 有不同的页面展示;
