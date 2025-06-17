// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'
import remarkCallout from '@r4ai/remark-callout';

// https://astro.build/config
export default defineConfig({
    integrations: [
        mdx({
            remarkPlugins: [remarkCallout]
        })
    ],
    markdown: {
        remarkPlugins: [remarkCallout]
    },
    trailingSlash: "always",
    site: "https://fantasy.yijun.hu"
});
