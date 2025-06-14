"use client";

import {Card, HeroArticle, Pagination} from "@/components";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Article() {
    const [currentPage, setCurrentPage] = useState(1);
    const [articleItems, setArticleItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 9;

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/article`,
                    {
                        params: {
                            page: currentPage,
                            limit: itemsPerPage,
                        },
                    }
                );

                const { data } = response.data;
                setArticleItems(data);
                setTotalCount(data.length);
            } catch (error) {
                console.error("Error fetching article data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const displayedItems = articleItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="py-4 px-8 mt-20">
            {/* Head Section */}
            <HeroArticle/>
            {/* Card Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {/* Dynamic Cards */}
                {displayedItems.map((item) => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        content={item.content}
                        created_at={item.created_at}
                        slug={`article/${item.slug}`}
                    />
                ))}

            </section>
                <hr className="h-[1px] my-10 bg-black/20 border-0 "/>

            <div className="mb-20">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </main>
    );
}
