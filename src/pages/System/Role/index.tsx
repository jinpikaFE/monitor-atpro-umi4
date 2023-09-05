import ExcelTable from '@/components/excelTable';
import {
  ActionType,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, message } from 'antd';
import { useRef } from 'react';
import {
  RoleEntity,
  createRole,
  delRole,
  editRole,
  getMenuList,
  getRoleList,
} from '@/services/system';
import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2';

const Role: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const modalFormRef = useRef<ProFormInstance>();

  const onSubmit = async (record?: RoleEntity) => {
    const val = await modalFormRef?.current?.validateFields();
    const relVal = {
      ...val,
    };

    if (record) {
      // 编辑
      const res = await editRole({
        ...relVal,
        roleId: record?.roleId,
      });
      if (res?.code === 200) {
        message.success('编辑成功');
        actionRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    }
    // 新建
    const res = await createRole({
      ...relVal,
    });
    if (res?.code === 200) {
      message.success('新建成功');
      actionRef?.current?.reload();
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const showModal = (record?: RoleEntity) => {
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
            menuIds: record?.sysMenu ? record?.sysMenu?.map((item) => item?.menuId) : undefined,
          }}
          formRef={modalFormRef}
        >
          <ProFormText label="角色名称" name="roleName" rules={[{ required: true }]} />
          <ProFormText label="权限字符" name="roleKey" rules={[{ required: true }]} />
          <ProFormDigit label="角色排序" name="roleSort" fieldProps={{ precision: 0 }} />
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
          <ProFormTreeSelect
            label="权限设置"
            name="menuIds"
            request={async () => {
              const res = await getMenuList();
              return res?.data;
            }}
            fieldProps={{
              treeCheckable: true,
              fieldNames: {
                value: 'menuId',
                label: 'title',
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
            title: '角色名称',
            dataIndex: 'roleName',
            hideInTable: true,
          },
          {
            title: '状态',
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
            dataIndex: 'roleId',
            hideInSearch: true,
          },
          {
            title: '角色名称',
            dataIndex: 'roleName',
            hideInSearch: true,
          },
          {
            title: '权限字符',
            dataIndex: 'roleKey',
            hideInSearch: true,
          },
          {
            title: '排序',
            dataIndex: 'roleSort',
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
            render: (_, record: RoleEntity) => [
              <Button key="edit" type="link" onClick={() => showModal(record)}>
                编辑
              </Button>,
              <Popconfirm
                key="delete"
                placement="topRight"
                title="确定要删除吗?"
                onConfirm={async () => {
                  const res = await delRole({ ids: record?.roleId ? [record?.roleId] : undefined });
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
        requestFn={async (params) => {
          const data = await getRoleList(params);
          return data;
        }}
        rowKey="roleId"
        actionRef={actionRef}
        rowSelection={false}
        toolBarRenderFn={() => [
          <PunkEffectButton2 key="add" onClick={() => showModal()}>
            添加
          </PunkEffectButton2>,
        ]}
      />
    </PageContainer>
  );
};

export default Role;
