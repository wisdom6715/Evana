import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            // Allow all user agents to crawl everything except the disallowed paths
            userAgent: '*',
            allow: ['/'],
            disallow: ['/dashboard', '/welcome', '/pricing']
        },
        sitemap: 'https://intuitionlabs.com.ng/sitemap.xml',
    };
}