export default {
  path: '/sys',
  name: 'sys',
  icon: 'setting',
  routes: [
    {
      path: '/sys',
      redirect: '/sys/department',
    },
    {
      name: 'department',
      path: '/sys/department',
      component: './System/Department',
    },
    {
      name: 'api',
      path: '/sys/api',
      component: './System/Api',
    },
    {
      name: 'menuManage',
      path: '/sys/menuManage',
      component: './System/MenuManage',
    },
  ],
};
