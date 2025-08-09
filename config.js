// 配置文件 - 管理不同环境的API端点
const config = {
  // 开发环境
  development: {
    apiUrl: 'http://localhost:3001/api/ai'
  },
  // 生产环境 - 使用 Vercel 部署的 API
  production: {
    apiUrl: '/api/ai' // 使用相对路径，指向 Vercel 部署的 API
  }
};

// 根据当前环境选择配置
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? config.development : config.production;

// 导出配置
window.APP_CONFIG = currentConfig;
