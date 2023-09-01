import {
  ProCard,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import PerformanceTable from './components/performanceTable'
import { MonitorContext, MonitorType } from './context'
import { Space } from 'antd'
import { getFirstDayOfMonth } from '@/utils/date'
import { formatToDateTime } from '@/utils/dateUtil'
import Unhandledrejection from './components/unhandledrejection'
import ErrorInfo from './components/errorInfo'
import XhrInfo from './components/xhrInfo'
import Resource from './components/resource'
import PerformanceCharts from './components/chartComponents/performanceCharts'
import UvTable from './components/uvTable'
import { useReactive } from 'ahooks'
import PvTable from './components/pvTable'

const Home: React.FC = () => {
  const FormVal = useReactive<MonitorType>({
    apikeyType: undefined,
    username: undefined,
    rangeTime: [getFirstDayOfMonth(new Date()), formatToDateTime(new Date())],
    uuid: undefined
  })


  return (
    <MonitorContext.Provider
      value={{
        apikeyType: FormVal.apikeyType,
        rangeTime: FormVal.rangeTime,
        username: FormVal.username,
        uuid: FormVal.uuid
      }}
    >
      <ProCard style={{ marginBottom: 16 }}>
        <Space>
          <ProFormSelect
            placeholder="项目名称"
            fieldProps={{
              fieldNames: {
                label: 'name',
                value: 'name'
              },
              onChange: val => {
                FormVal.apikeyType = val
              },
              value: FormVal.apikeyType,
              style: { minWidth: 200 }
            }}
            request={async () => {
              // const res = await getApikeyList()
              // if (res?.code === 200) {
              //   return res?.data?.list
              // }
              return []
            }}
          />
          <ProFormDateTimeRangePicker
            fieldProps={{
              value: FormVal.rangeTime,
              onChange: (_, dateString) => {
                FormVal.rangeTime = dateString
              }
            }}
          />
          <ProFormText
            placeholder="用户名"
            allowClear
            fieldProps={{
              value: FormVal.username,
              onChange: e => {
                FormVal.username = e?.target?.value
              }
            }}
          />
          <ProFormText
            placeholder="访客标识"
            allowClear
            fieldProps={{
              value: FormVal.uuid,
              onChange: e => {
                FormVal.uuid = e?.target?.value
              }
            }}
          />
        </Space>
      </ProCard>
      <PerformanceCharts />
      <ProCard ghost gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <PvTable />
      </ProCard>
      <ProCard ghost gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <UvTable />
      </ProCard>
      <ProCard ghost gutter={[16, 16]}>
        <PerformanceTable />
      </ProCard>
      <ProCard ghost gutter={[16, 16]}>
        <ProCard ghost colSpan={12}>
          <ErrorInfo />
        </ProCard>
        <ProCard ghost colSpan={12}>
          <Unhandledrejection />
        </ProCard>
      </ProCard>
      <ProCard ghost gutter={[16, 16]} wrap style={{ marginBottom: 16 }}>
        <XhrInfo />
      </ProCard>
      <ProCard ghost gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Resource />
      </ProCard>
    </MonitorContext.Provider>
  )
}

export default Home
