"use client";

import { Card, HeroArticle, Pagination } from "@/components";
import { useEffect, useState } from "react";
import useArticleStore from "@/app/_stores/articleStore";

export default function Article() {
    const [currentPage, setCurrentPage] = useState(1);
    const { articles, fetchArticles } = useArticleStore();

    const itemsPerPage = 9;

    useEffect(() => {
        fetchArticles()
    }, []);

    const totalPages = Math.ceil(articles.length / itemsPerPage);

    const displayedItems = articles.slice(
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
