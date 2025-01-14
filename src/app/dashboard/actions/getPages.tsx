type Page = {
    id: string;
    url: string;
    title: string;
    isPublished: boolean;
    rank: number;
    views: number;
    createdAt: Date;
    updatedAt: Date;
};

type PageWithRanking = {
    url: string;
    title: string;
    seoScore: number | null;
};

type GetPages = {
    searchTerm?: string;
    sortBy?: 'rank' | 'views';
    orderBy?: 'asc' | 'desc';
};

export const getPages = async ({
    searchTerm,
    sortBy = 'rank',
    orderBy = 'desc'
}: GetPages): Promise<PageWithRanking[]> => {
    try {
        // Define the base pages
        const basePages = [
            { url: '/', title: 'Home' },
            { url: '/products', title: 'Products' },
            { url: '/pricing', title: 'Pricing' }
        ];

        // Filter and sort the base pages
        const filteredPages = basePages
            .filter(page =>
                searchTerm ? page.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
            )
            .sort((a, b) => {
                if (sortBy === 'rank') {
                    return orderBy === 'asc' ? a.url.localeCompare(b.url) : b.url.localeCompare(a.url);
                }
                return 0; // Default sorting by URL
            });

        // Calculate SEO score for each page
        const pagesWithRanking: PageWithRanking[] = filteredPages.map(page => {
            const seoScore = calculateSEOScore({
                rank: Math.random() * 100, // Replace with actual logic if needed
                views: Math.random() * 1000 // Replace with actual logic if needed
            });

            return {
                url: page.url,
                title: page.title,
                seoScore
            };
        });

        return pagesWithRanking;
    } catch (error) {
        console.log("GET_PAGES_ERROR", error);
        return [];
    }
};

// Helper function to calculate SEO score
const calculateSEOScore = ({
    rank,
    views
}: {
    rank: number;
    views: number;
}): number => {
    const rankWeight = 0.6;
    const viewsWeight = 0.4;

    const normalizedRank = Math.min(rank / 100, 1); // Normalize rank to 0-1
    const normalizedViews = Math.min(views / 1000, 1); // Normalize views to 0-1

    return (normalizedRank * rankWeight + normalizedViews * viewsWeight) * 100;
};
