import PunkEffectButton2 from '@/components/ButtonDy/PunkEffectButton2';
import ExcelTable from '@/components/excelTable';
import {
  ActionType,
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, message } from 'antd';
import { useRef } from 'react';
import { DepartmentEntity, createDept, delDept, editDept, getDept } from '@/services/system';

const Department: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const modalFormRef = useRef<ProFormInstance>();

  const onSubmit = async (record?: DepartmentEntity) => {
    const val = await modalFormRef?.current?.validateFields();
    const relVal = {
      ...val,
    };

    if (record) {
      // 编辑
      const res = await editDept({
        ...relVal,
        deptId: record?.deptId,
      });
      if (res?.code === 200) {
        message.success('编辑成功');
        actionRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    }
    // 新建
    const res = await createDept({ ...relVal });
    if (res?.code === 200) {
      message.success('新建成功');
      actionRef?.current?.reload();
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const showModal = (record?: DepartmentEntity) => {
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
          <ProFormTreeSelect
            label="上级部门"
            name="parentId"
            request={async () => {
              const res = await getDept();
              return res?.data;
            }}
            rules={[{ required: true, message: '请选择' }]}
            fieldProps={{
              fieldNames: {
                value: 'deptId',
                label: 'deptName',
              },
            }}
          />
          <ProFormText
            label="部门名称"
            name="deptName"
            rules={[{ required: true, message: '请输入' }]}
          />
          <ProFormText label="负责任" name="leader" required />
          <ProFormText label="联系电话" name="phone" fieldProps={{ maxLength: 11 }} />
          <ProFormText label="邮箱" name="email" />
          <ProFormDigit label="排序" name="sort" fieldProps={{ precision: 0 }} />
          <ProFormSelect
            label="部门状态"
            name="status"
            valueEnum={
              new Map([
                [2, '正常'],
                [1, '停用'],
              ])
            }
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
            title: '部门名称',
            dataIndex: 'deptName',
            hideInTable: true,
          },
          {
            title: '部门状态',
            dataIndex: 'status',
            hideInTable: true,
            valueType: 'select',
            valueEnum: new Map([
              [2, '正常'],
              [1, '停用'],
            ]),
          },
          /** search */
          {
            title: '部门名称',
            dataIndex: 'deptName',
            hideInSearch: true,
          },
          {
            title: '排序',
            dataIndex: 'sort',
            hideInSearch: true,
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInSearch: true,
            valueEnum: new Map([
              [2, '正常'],
              [1, '停用'],
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
            render: (_, record: DepartmentEntity) => [
              <Button key="edit" type="link" onClick={() => showModal(record)}>
                编辑
              </Button>,
              <Popconfirm
                key="delete"
                placement="topRight"
                title="确定要删除吗?"
                onConfirm={async () => {
                  const res = await delDept({ ids: record?.deptId ? [record?.deptId] : undefined });
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
          const data = await getDept(params);
          return data;
        }}
        pagination={false}
        rowKey="deptId"
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

export default Department;
