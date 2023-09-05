import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2';
import ExcelTable from '@/components/excelTable';
import {
  ActionType,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
  ProFormDependency,
} from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, message } from 'antd';
import { useRef } from 'react';
import {
  MenuEntity,
  createMenu,
  delMenu,
  editMenu,
  getApiList,
  getMenuList,
} from '@/services/system';

const MenuManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const modalFormRef = useRef<ProFormInstance>();

  const onSubmit = async (record?: MenuEntity) => {
    const val = await modalFormRef?.current?.validateFields();
    const relVal = {
      ...val,
    };

    if (record) {
      // 编辑
      const res = await editMenu({
        ...relVal,
        menuId: record?.menuId,
      });
      if (res?.code === 200) {
        message.success('编辑成功');
        actionRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    }
    // 新建
    const res = await createMenu({ ...relVal });
    if (res?.code === 200) {
      message.success('新建成功');
      actionRef?.current?.reload();
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const showModal = (record?: MenuEntity) => {
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
          }}
          formRef={modalFormRef}
        >
          <ProFormRadio.Group
            label="菜单类型"
            name="menuType"
            valueEnum={
              new Map([
                ['M', '路由'],
                ['F', '组件'],
              ])
            }
            rules={[{ required: true, message: '请选择' }]}
          />
          <ProFormTreeSelect
            label="上级菜单"
            name="parentId"
            request={async () => {
              const res = await getMenuList();
              return res?.data;
            }}
            fieldProps={{
              fieldNames: {
                value: 'menuId',
                label: 'title',
              },
            }}
          />

          <ProFormText
            label="菜单标题"
            name="title"
            rules={[{ required: true, message: '请输入' }]}
          />
          <ProFormDigit label="排序" name="sort" fieldProps={{ precision: 0 }} />
          <ProFormDependency name={['menuType']}>
            {({ menuType }) => {
              if (menuType === 'M') {
                return (
                  <>
                    <ProFormText label="路由地址" name="path" required />
                    <ProFormSelect
                      label="菜单状态"
                      name="visible"
                      valueEnum={
                        new Map([
                          ['1', '显示'],
                          ['0', '隐藏'],
                        ])
                      }
                    />
                  </>
                );
              }
              if (menuType === 'F') {
                return (
                  <>
                    <ProFormText label="权限标识" name="permission" rules={[{ required: true }]} />
                  </>
                );
              }
              return null;
            }}
          </ProFormDependency>
          <ProFormSelect
            label="API权限"
            name="apis"
            mode="multiple"
            request={async () => {
              const res = await getApiList({
                pageIndex: 1,
                pageSize: 10000,
              });
              return res?.data?.list;
            }}
            fieldProps={{
              fieldNames: {
                value: 'id',
                label: 'title',
              },
            }}
          />
        </ProForm>
      ),
    });
  };
  return (
    <PageContainer>
      <ExcelTable
        columns={[
          {
            title: '菜单名称',
            dataIndex: 'title',
            hideInTable: true,
          },
          /** search */
          {
            title: '菜单名称',
            dataIndex: 'title',
            hideInSearch: true,
          },
          {
            title: '路由地址',
            dataIndex: 'path',
            hideInSearch: true,
          },
          {
            title: '排序',
            dataIndex: 'sort',
            hideInSearch: true,
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
            render: (_, record: MenuEntity) => [
              <Button key="edit" type="link" onClick={() => showModal(record)}>
                编辑
              </Button>,
              <Popconfirm
                key="delete"
                placement="topRight"
                title="确定要删除吗?"
                onConfirm={async () => {
                  const res = await delMenu({ ids: record?.menuId ? [record?.menuId] : undefined });
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
          const data = await getMenuList(params);
          return data;
        }}
        pagination={false}
        rowKey="menuId"
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

export default MenuManage;
