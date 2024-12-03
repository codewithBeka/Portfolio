/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com', // Add this
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
