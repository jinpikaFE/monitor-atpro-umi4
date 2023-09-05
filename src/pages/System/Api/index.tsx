import ExcelTable from '@/components/excelTable';
import {
  ActionType,
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { useRef } from 'react';
import { ApiEntity, editApi, getApiList } from '@/services/system';

const Department: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const modalFormRef = useRef<ProFormInstance>();

  const onSubmit = async (record?: ApiEntity) => {
    const val = await modalFormRef?.current?.validateFields();
    const relVal = {
      ...val,
    };

    if (record) {
      // 编辑
      const res = await editApi({
        ...relVal,
        id: record?.id,
      });
      if (res?.code === 200) {
        message.success('编辑成功');
        actionRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    }

    return Promise.reject();
  };
  const showModal = (record?: ApiEntity) => {
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
          <ProFormText label="Handle" name="handle" />
          <ProFormText label="标题" name="title" rules={[{ required: true, message: '请输入' }]} />
          <ProFormSelect
            label="请求类型"
            name="action"
            valueEnum={
              new Map([
                ['GET', 'GET'],
                ['POST', 'POST'],
                ['PUT', 'PUT'],
                ['DELETE', 'DELETE'],
                ['HEAD', 'HEAD'],
              ])
            }
          />
          <ProFormText label="请求地址" name="path" disabled />
        </ProForm>
      ),
    });
  };
  return (
    <PageContainer>
      <ExcelTable
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            hideInTable: true,
          },
          {
            title: '请求地址',
            dataIndex: 'path',
            hideInTable: true,
          },
          {
            title: '类型',
            dataIndex: 'action',
            hideInTable: true,
            valueType: 'select',
            valueEnum: new Map([
              ['GET', 'GET'],
              ['POST', 'POST'],
              ['PUT', 'PUT'],
              ['DELETE', 'DELETE'],
              ['HEAD', 'HEAD'],
            ]),
          },
          /** search */
          {
            title: '标题',
            dataIndex: 'title',
            hideInSearch: true,
          },
          {
            title: '请求类型',
            dataIndex: 'action',
            hideInSearch: true,
          },
          {
            title: '请求信息',
            dataIndex: 'path',
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
            render: (_, record: ApiEntity) => [
              <Button key="edit" type="link" onClick={() => showModal(record)}>
                编辑
              </Button>,
            ],
          },
        ]}
        requestFn={async (params) => {
          const data = await getApiList(params);
          return data;
        }}
        actionRef={actionRef}
        rowSelection={false}
        toolBarRenderFn={() => []}
      />
    </PageContainer>
  );
};

export default Department;
