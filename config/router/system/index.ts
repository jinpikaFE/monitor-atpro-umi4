export default {
  path: '/sys',
  name: '系统设置',
  icon: 'setting',
  routes: [
    {
      path: '/sys',
      redirect: '/sys/department',
    },
    {
      name: '部门管理',
      path: '/sys/department',
      component: './System/Department',
    },
  ],
};
