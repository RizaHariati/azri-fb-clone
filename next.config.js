/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "img.dummyapi.io",
      "randomuser.me",
      "source.unsplash.com",
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "fyirebasestorage.googlelapis.com",
      "facebook.com",
    ],
  },
  env: {
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_URL2: "https://nextauthexample.vercel.app/",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    KEYWORD_API: process.env.KEYWORD_API,
    GOOGLE_KEY: process.env.GOOGLE_KEY,
    SECRET_GOOGLE_VERIFICATION: process.env.SECRET_GOOGLE_VERIFICATION,
  },
};
