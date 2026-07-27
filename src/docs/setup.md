# Setup & Installation Guide

## Prerequisites

Ensure your local development environment meets the following requirements:

- Node.js: v20.x or higher
- Package Manager: npm (v10+), yarn, or pnpm

## Environment Variables

Create a .env.local file in the root directory and add the following configuration keys:
NEXT_PUBLIC_API_BASE_URL=https://wholesaler-core-v2.paraf.app/api/
NEXT_PUBLIC_IMAGE_BASE_URL=https://wholesaler-core-develop.web.parafacc.ir/

## Installation Steps

1. Clone the Repository:

   git clone https://github.com/Reza97312/customer-club-dashboard.git
   cd customer-club-dashboard

2. Install Dependencies:

   npm install

3. Run Development Server:

   npm run dev

   Open http://localhost:3000 in your browser to view the application.

4. Build for Production:

   npm run build
   npm run start

## Configuration for External Images

If you serve images from external backend hostnames using Next.js <Image />, ensure the hostname is declared in next.config.mjs:
/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'wholesaler-core-develop.web.parafacc.ir',
},
],
},
};

export default nextConfig;
