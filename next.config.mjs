/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [new URL('https://i.ibb.co.com/**'), new URL('https://avatar.vercel.sh/**'), new URL('https://i.ibb.co/**')],
    },

};

export default nextConfig;
