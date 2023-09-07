import ExcelTable from '@/components/excelTable';
import {
  ActionType,
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, Tree, message } from 'antd';
import { useRef } from 'react';
import {
  UserEntity,
  createUser,
  delUser,
  editUser,
  getDept,
  getRoleList,
  getUserList,
} from '@/services/system';
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2';
import { useAsyncEffect, useReactive } from 'ahooks';
import FormUploadNew from '@/components/formUploadNew';
import { PlusOutlined } from '@ant-design/icons';

const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const modalFormRef = useRef<ProFormInstance>();
  const departmentInfo = useReactive<{ list: any[]; selected: string }>({
    list: [],
    selected: '',
  });

  useAsyncEffect(async () => {
    const res = await getDept();
    departmentInfo.list = res?.data;
  }, []);
  //   const reduceMenuList = (data: DepartmentEntity[]): DepartmentEntity[] => {
  //     return data?.map((item) => ({
  //       key: item?.deptId,
  //       label: item?.deptName,
  //       children: item?.children ? reduceMenuList(item?.children) : undefined,
  //     }));
  //   };

  const onSubmit = async (record?: UserEntity) => {
    const val = await modalFormRef?.current?.validateFields();
    const relVal = {
      ...val,
      avatar: val?.avatar?.[0],
    };

    if (record) {
      // 编辑
      const res = await editUser({
        ...relVal,
        userId: record?.userId,
      });
      if (res?.code === 200) {
        message.success('编辑成功');
        actionRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    }
    // 新建
    const res = await createUser({
      ...relVal,
    });
    if (res?.code === 200) {
      message.success('新建成功');
      actionRef?.current?.reload();
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const showModal = (record?: UserEntity) => {
    Modal.confirm({
      title: record ? '编辑' : '添加',
      onOk: async () => onSubmit(record),
      okText: '确定',
      cancelText: '取消',
      width: 800,
      content: (
        <ProForm
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          submitter={false}
          layout="horizontal"
          initialValues={{
            ...record,
            avatar: record?.avatar ? [record?.avatar] : undefined,
          }}
          formRef={modalFormRef}
        >
          <ProFormText label="用户昵称" name="nickName" rules={[{ required: true }]} />
          <FormUploadNew
            formItemProps={{
              label: '头像',
              name: 'avatar',
            }}
            required
            uploadProps={
              {
                accept: '.bmp,.jpg,.png,.jpeg',
                children: (
                  <>
                    <div>
                      <PlusOutlined style={{ color: '#40a9ff' }} />
                      <div style={{ marginTop: 8, color: '#40a9ff' }}>上传图片</div>
                    </div>
                  </>
                ),
                listType: 'picture-card',
                maxCount: 1,
              } as any
            }
            isDragger={false}
          />
          <ProFormTreeSelect
            label="所属部门"
            name="deptId"
            request={async () => {
              const res = await getDept();
              return res?.data;
            }}
            fieldProps={{
              fieldNames: {
                value: 'deptId',
                label: 'deptName',
              },
            }}
            allowClear
            rules={[{ required: true, message: '请选择' }]}
          />
          <ProFormText
            label="手机号码"
            name="phone"
            rules={[{ required: true }]}
            fieldProps={{
              maxLength: 11,
            }}
          />
          <ProFormText
            label="邮箱"
            name="email"
            rules={[{ required: true }, { type: 'email', message: '请输入正确邮箱' }]}
          />
          <ProFormText label="用户名称" name="username" rules={[{ required: true }]} />
          {!record && <ProFormText label="用户密码" name="password" rules={[{ required: true }]} />}
          <ProFormSelect
            label="状态"
            name="status"
            valueEnum={
              new Map([
                ['2', '正常'],
                ['1', '停用'],
              ])
            }
          />
          <ProFormSelect
            mode="multiple"
            label="角色"
            name="roleIds"
            request={async () => {
              const res = await getRoleList({
                pageIndex: 1,
                pageSize: 10000,
              });
              return res?.data?.list;
            }}
            fieldProps={{
              fieldNames: {
                value: 'roleId',
                label: 'roleName',
              },
            }}
            allowClear
          />
          <ProFormTextArea label="备注" name="remark" />
        </ProForm>
      ),
    });
  };
  return (
    <PageContainer>
      <ExcelTable
        columns={[
          {
            title: '部门名称',
            dataIndex: 'deptName',
            hideInTable: true,
          },
          {
            title: '用户名称',
            dataIndex: 'username',
            hideInTable: true,
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            hideInTable: true,
          },
          {
            title: '用户状态',
            dataIndex: 'status',
            hideInTable: true,
            valueEnum: new Map([
              [2, '正常'],
              [1, '停用'],
            ]),
          },
          /** search */
          {
            title: '序号',
            dataIndex: 'userId',
            hideInSearch: true,
          },
          {
            title: '用户名',
            dataIndex: 'username',
            hideInSearch: true,
          },
          {
            title: '昵称',
            dataIndex: 'nickName',
            hideInSearch: true,
          },
          {
            title: '部门',
            dataIndex: 'dept',
            hideInSearch: true,
            render(dom, entity) {
              return entity?.dept?.deptName || '';
            },
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            hideInSearch: true,
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInSearch: true,
            valueEnum: new Map([
              ['2', '正常'],
              ['1', '停用'],
            ]),
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            hideInSearch: true,
            valueType: 'dateTime',
          },
          {
            title: '操作',
            key: 'option',
            valueType: 'option',
            render: (_, record: UserEntity) => [
              <Button key="edit" type="link" onClick={() => showModal(record)}>
                编辑
              </Button>,
              <Popconfirm
                key="delete"
                placement="topRight"
                title="确定要删除吗?"
                onConfirm={async () => {
                  const res = await delUser({ ids: record?.userId ? [record?.userId] : undefined });
                  if (res?.code === 200) {
                    message.success('删除成功');
                    actionRef?.current?.reloadAndRest?.();
                    return Promise.resolve();
                  }
                  return Promise.reject();
                }}
                okText="确定"
                okType="danger"
                cancelText="取消"
              >
                <Button type="link" danger key="delete">
                  删除
                </Button>
              </Popconfirm>,
            ],
          },
        ]}
        params={{ deptId: departmentInfo?.selected }}
        requestFn={async (params) => {
          const data = await getUserList(params);
          return data;
        }}
        rowKey="userId"
        actionRef={actionRef}
        rowSelection={false}
        toolBarRenderFn={() => [
          <PunkEffectButton2 key="add" onClick={() => showModal()}>
            添加
          </PunkEffectButton2>,
        ]}
        tableRender={(_, dom) => (
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Tree
              style={{ width: 256, marginTop: 32, marginLeft: 16 }}
              treeData={departmentInfo?.list}
              fieldNames={{ title: 'deptName', key: 'deptId' }}
              onSelect={(selectedKeys) => {
                console.log(selectedKeys);
                departmentInfo.selected = selectedKeys?.[0] as string;
              }}
            />
            {/* <Menu
              onSelect={(e) => (departmentInfo.selected = e.key)}
              style={{ width: 256 }}
              mode="inline"
              items={reduceMenuList(departmentInfo?.list) as any[]}
            /> */}
            <div
              style={{
                flex: 1,
              }}
            >
              {dom}
            </div>
          </div>
        )}
      />
    </PageContainer>
  );
};

export default User;
