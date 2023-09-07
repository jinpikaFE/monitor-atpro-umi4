import server from '@/server';

export type DepartmentQueryParams = {
  deptName?: string;
  deptId?: string;
  position?: string;
};

export type DepartmentEntity = {
  createBy?: number;
  /**
   * 编码
   */
  deptId?: number;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 路径
   */
  deptPath?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责人
   */
  leader?: string;
  /**
   * 上级部门
   */
  parentId?: number;
  /**
   * 手机
   */
  phone?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 状态
   */
  status?: number;
  updateBy?: number;
  children?: DepartmentEntity[];
};

/** 分页部门列表数据 */
export async function getDept(params?: DepartmentQueryParams) {
  return server.request({
    url: '/api/v1/dept',
    method: 'get',
    params,
  });
}

/** 添加部门 */
export async function createDept(data?: DepartmentEntity) {
  return server.request({
    url: '/api/v1/dept',
    method: 'post',
    data,
  });
}

/** 修改部门 */
export async function editDept(data?: DepartmentEntity) {
  return server.request({
    url: `/api/v1/dept/${data?.deptId}`,
    method: 'put',
    data,
  });
}

/** 删除部门 */
export async function delDept(data: { ids?: number[] }) {
  return server.request({
    url: `/api/v1/dept`,
    method: 'delete',
    data,
  });
}

export type ApiParams = {
  /**
   * 类型
   */
  action?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 页码
   */
  pageIndex?: number;
  /**
   * 页条数
   */
  pageSize?: number;
  /**
   * 地址
   */
  path?: string;
  /**
   * 标题
   */
  title?: string;
};

export type ApiEntity = {
  action?: string;
  createBy?: number;
  handle?: string;
  /**
   * 编码
   */
  id?: number;
  path?: string;
  title?: string;
  type?: string;
  updateBy?: number;
};

/** 获取接口管理列表 */
export async function getApiList(params?: ApiParams) {
  return server.request({
    url: '/api/v1/sys-api',
    method: 'get',
    params,
  });
}

/** 修改接口 */
export async function editApi(data?: ApiEntity) {
  return server.request({
    url: `/api/v1/sys-api/${data?.id}`,
    method: 'put',
    data,
  });
}

export type MenuParams = {
  code?: number;
  msg?: string;
  /**
   * 数据集
   */
  requestId?: string;
  status?: string;
};

export type MenuEntity = {
  /**
   * 请求方式
   */
  action?: string;
  apis?: number[];
  /**
   * 是否面包屑
   */
  breadcrumb?: string;
  /**
   * 组件
   */
  component?: string;
  createBy?: number;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 是否frame
   */
  isFrame?: string;
  /**
   * 编码
   */
  menuId?: number;
  /**
   * 菜单name
   */
  menuName?: string;
  /**
   * 菜单类型
   */
  menuType?: string;
  /**
   * 是否缓存
   */
  noCache?: boolean;
  /**
   * 上级菜单
   */
  parentId?: number;
  /**
   * 路径
   */
  path?: string;
  /**
   * id路径
   */
  paths?: string;
  /**
   * 权限编码
   */
  permission?: string;
  /**
   * 排序
   */
  sort?: number;
  sysApi?: ApiEntity[];
  /**
   * 显示名称
   */
  title?: string;
  updateBy?: number;
  /**
   * 是否显示
   */
  visible?: string;
};

/** Menu列表数据 */
export async function getMenuList(params?: MenuParams) {
  return server.request({
    url: '/api/v1/menu',
    method: 'get',
    params,
  });
}

/** 创建菜单 */
export async function createMenu(data?: MenuEntity) {
  return server.request({
    url: '/api/v1/menu',
    method: 'post',
    data,
  });
}

/** 修改菜单 */
export async function editMenu(data?: MenuEntity) {
  return server.request({
    url: `/api/v1/menu/${data?.menuId}`,
    method: 'put',
    data,
  });
}

/** 删除菜单 */
export async function delMenu(data: { ids?: number[] }) {
  return server.request({
    url: `/api/v1/menu`,
    method: 'delete',
    data,
  });
}

export type RoleParams = {
  /**
   * 页码
   */
  pageIndex?: number;
  /**
   * 页条数
   */
  pageSize?: number;
  /**
   * roleKey
   */
  roleKey?: string;
  /**
   * roleName
   */
  roleName?: string;
  /**
   * status
   */
  status?: string;
};

export type RoleEntity = {
  admin?: boolean;
  createBy?: number;
  dataScope?: string;
  deptIds?: number[];
  /**
   * 标记
   */
  flag?: string;
  menuIds?: number[];
  /**
   * 备注
   */
  remark?: string;
  /**
   * 角色编码
   */
  roleId?: number;
  /**
   * 角色代码
   */
  roleKey?: string;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 角色排序
   */
  roleSort?: number;
  /**
   * 状态 1禁用 2正常
   */
  status?: string;
  sysDept?: DepartmentEntity[];
  sysMenu?: MenuEntity[];
  updateBy?: number;
};

/** Role 列表数据 */
export async function getRoleList(params?: RoleParams) {
  return server.request({
    url: '/api/v1/role',
    method: 'get',
    params,
  });
}

/** 创建角色 */
export async function createRole(data?: RoleEntity) {
  return server.request({
    url: '/api/v1/role',
    method: 'post',
    data,
  });
}

/** 修改角色 */
export async function editRole(data?: RoleEntity) {
  return server.request({
    url: `/api/v1/role/${data?.roleId}`,
    method: 'put',
    data,
  });
}

/** 删除角色 */
export async function delRole(data: { ids?: number[] }) {
  return server.request({
    url: `/api/v1/role`,
    method: 'delete',
    data,
  });
}

export type UserParams = {
  /**
   * username
   */
  username?: string;
  deptId?: string;
};

export type UserEntity = {
  avatar?: string;
  createBy?: number;
  deptId?: number;
  email?: string;
  nickName?: string;
  password?: string;
  phone?: string;
  postId?: number;
  remark?: string;
  roleId?: number;
  sex?: string;
  status?: string;
  updateBy?: number;
  /**
   * 用户ID
   */
  userId?: number;
  username?: string;
};

/** user 列表数据 */
export async function getUserList(params?: UserParams) {
  return server.request({
    url: '/api/v1/sys-user',
    method: 'get',
    params,
  });
}

/** 创建用户 */
export async function createUser(data?: UserEntity) {
  return server.request({
    url: '/api/v1/sys-user',
    method: 'post',
    data,
  });
}

/** 修改用户 */
export async function editUser(data?: UserEntity) {
  return server.request({
    url: `/api/v1/sys-user`,
    method: 'put',
    data,
  });
}

/** 删除用户 */
export async function delUser(data: { ids?: number[] }) {
  return server.request({
    url: `/api/v1/sys-user`,
    method: 'delete',
    data,
  });
}
