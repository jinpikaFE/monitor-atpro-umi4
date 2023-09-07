import server from '@/server';

const REACT_MONITOR_URL = process.env.REACT_MONITOR_URL;

export async function uploadFile(data?: any) {
  return server.request({
    url: '/v1/upload',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: REACT_MONITOR_URL,
  });
}
