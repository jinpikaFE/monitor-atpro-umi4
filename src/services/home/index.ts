import server from '@/server';

const REACT_MONITOR_URL = process.env.REACT_MONITOR_URL;

export async function getMonitorList(params: Partial<Monitor.MonitorParams> & Global.PageParams) {
  return server.request({
    url: '/v1/mgb/monitor',
    method: 'get',
    params,
    baseURL: REACT_MONITOR_URL,
  });
}

export async function getMonitorScreen(params: { id: string }) {
  return server.request({
    url: `/v1/mgb/monitor/screen/${params?.id}`,
    method: 'get',
    baseURL: REACT_MONITOR_URL,
  });
}

export async function getFileMap(data: { projectName: string; fileName: string }) {
  return server.request({
    url: '/api/v1/files/get',
    method: 'post',
    data,
  });
}
