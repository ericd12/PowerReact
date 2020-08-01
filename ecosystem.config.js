
module.exports = {
    apps : [{
      name: 'index',
      cwd: './client/src/index',
      script: 'npm',
      args: 'start',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },{
      name: 'server',
      cwd: './server',
      script: 'node',
      args: 'start server.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }]
  };
