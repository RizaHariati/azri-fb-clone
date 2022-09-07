// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const links = [
    {
      url: "/",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: "/main/home",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: "/profile",
      changefreq: "daily",
      priority: 0.7,
    },
  ];
  const stream = new SitemapStream({
    hostname: `https://${req.headers.host}`,
  });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
