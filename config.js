// 配置文件 - 管理不同环境的API端点
const config = {
  // 开发环境
  development: {
    apiUrl: 'http://localhost:3001/api/ai'
  },
  // 生产环境 - 使用外部API服务
  production: {
    apiUrl: 'https://your-api-service.com/api/ai' // 需要替换为实际的API服务
  }
};

// 根据当前环境选择配置
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? config.development : config.production;

// 导出配置
window.APP_CONFIG = currentConfig;
