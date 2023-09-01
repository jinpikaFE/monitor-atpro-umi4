import { request } from '@umijs/max';

const REACT_MONITOR_URL = process.env.REACT_MONITOR_URL;

export async function getMonitorList(params: Partial<Monitor.MonitorParams> & Global.PageParams) {
  return request('/v1/mgb/monitor', {
    method: 'get',
    params,
    baseURL: REACT_MONITOR_URL,
  });
}

export async function getMonitorScreen(params: { id: string }) {
  return request(`/v1/mgb/monitor/screen/${params?.id}`, {
    method: 'get',
    baseURL: REACT_MONITOR_URL,
  });
}

export async function getFileMap(data: { projectName: string; fileName: string }) {
  return request('/api/v1/files/get', {
    method: 'post',
    data,
  });
}
