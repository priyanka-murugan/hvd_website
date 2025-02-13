import { withContentlayer } from "next-contentlayer";
import mdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"], // ✅ Ensuring MDX support
  experimental: {
    mdxRs: true,
  },
};

// ✅ Apply MDX support
const withMDX = mdx({
  extension: /\.mdx?$/,
});

// ✅ Correctly compose `withMDX` and `withContentlayer`
export default withContentlayer(withMDX(nextConfig));
