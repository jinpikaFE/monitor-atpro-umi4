// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'dev',
      REACT_BASE_URL: '',
      REACT_MONITOR_URL: 'http://127.0.0.1:8083',
    },
  },
});
