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
  ],
};
