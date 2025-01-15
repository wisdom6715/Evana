import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
    return[
        {
            url: 'https://intuitionlabs.com.ng',
            lastModified: new Date()
        },
        {
            url: 'https://intuitionlabs.com.ng/landingPage/products'
        },
        {
            url: 'https://intuitionlabs.com.ng/landingPage/cost'
        }
    ]

}