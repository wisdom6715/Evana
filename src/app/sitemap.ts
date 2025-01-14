import { getPages } from "@/app/dashboard/actions/getPages"
export default async function sitemap() {

    // Fetch the pages using the getPages function
    const getPage = await getPages({});

    // Map the pages to create a sitemap structure
    const pages = getPage?.map((page: any) => {
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
        ...pages
    ];
}