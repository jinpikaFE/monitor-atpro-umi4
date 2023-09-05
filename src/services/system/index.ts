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
