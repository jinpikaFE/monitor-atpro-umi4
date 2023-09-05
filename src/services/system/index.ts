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
