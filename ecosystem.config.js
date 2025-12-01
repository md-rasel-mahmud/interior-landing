module.exports = {
  apps: [
    {
      name: "interior-landing",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      max_memory_restart: "1G",
      autorestart: true,
      instances: 1,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
