module.exports = {
  apps: [
    {
      name: "media-server",
      script: "index.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
