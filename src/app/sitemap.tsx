import { getPages } from "@/app/dashboard/actions/getPages";

// Define the type for individual page data
interface Page {
    url: string;
    updatedAt?: Date;
    // Add other properties that might come from getPages
}

// Define the type for sitemap entries
interface SitemapEntry {
    url: string;
    lastModified: Date;
}

export default async function sitemap(): Promise<SitemapEntry[]> {
    // Fetch the pages using the getPages function
    const getPage = await getPages({});

    // Map the pages to create a sitemap structure
    const pages = getPage?.map((page: Page) => {
        return {
            url: `https://www.intuitionlabs.com.ng${page.url}`,
            lastModified: page?.updatedAt || new Date()
        };
    });

    // Return the sitemap array including static base pages
    return [
        {
            url: 'https://www.intuitionlabs.com.ng',
            lastModified: new Date()
        },
        ...(pages || [])
    ];
}