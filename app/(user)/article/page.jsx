"use client";

import { Card, HeroArticle, Pagination } from "@/components";
import { useEffect, useState } from "react";
import { getArticles } from "@/app/_services/articleService";

export default function Article() {
    const [currentPage, setCurrentPage] = useState(1);
    const [articleItems, setArticleItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 9;

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const data = await getArticles();
                setArticleItems(data);
            } catch (error) {
                console.error("Gagal mengambil artikel:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const totalPages = Math.ceil(articleItems.length / itemsPerPage);

    const displayedItems = articleItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="py-4 px-8 mt-20">
            <HeroArticle />

            {/* Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
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

            <hr className="h-[1px] my-10 bg-black/20 border-0" />

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
