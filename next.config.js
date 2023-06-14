/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['vibeup-perfil-images.s3.amazonaws.com', 'vibeup-post-images.s3.amazonaws.com', 'res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
