const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
