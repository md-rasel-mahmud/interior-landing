module.exports = {
  apps: [
    {
      name: "media-server",
      script: "src/backend/media/index.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
