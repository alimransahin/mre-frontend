/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "avatar.iran.liara.run",
      "i.ibb.co",
      "i.ibb.co.com",
    ], // Add Unsplash domain here for image optimization
  },
};

module.exports = nextConfig;
