module.exports = {
  apps: [
    {
      name: 'appBlockVerification',
      script: './dist/appBlockVerification.js',
      merge_logs: false,
      combine_logs: false,
      max_restarts: 10,
      instances: 'max',
      max_memory_restart: '1G',
      exec_mode: 'cluster',
      error_file: `/var/app/logs/pm2/${new Date().toISOString().replace(/[:.]/g, '-')}-error.log`,
      out_file: `/var/app/logs/pm2/${new Date().toISOString().replace(/[:.]/g, '-')}-out.log`,
    },
  ],
};
