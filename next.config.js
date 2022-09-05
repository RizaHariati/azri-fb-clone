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
    FACEBOOK_CLIENT_ID: "553515166431945",
    FACEBOOK_CLIENT_SECRET: "d6cbbe226e46b5b36c7e57302d2759b0",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_URL2: "https://nextauthexample.vercel.app/",
    NEXTAUTH_SECRET: "Thisismysecretwhatisyours",
    KEYWORD_API: "615d134132c9c40bf2a39437",
    GOOGLE_KEY:
      "riza, hariati, rizahariati, website, portfolio, azricoding, facebook",
  },
};
