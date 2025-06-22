'use client'

import {Card} from "@/components";
import useArticleStore from "@/app/_stores/articleStore";
import {useEffect} from "react";

export function ArticleSection() {
    const {articles, fetchArticles} = useArticleStore();

    useEffect(() => {
        fetchArticles()
    }, []);

    return (
        <>
            {/* Headline */}
            <section className="flex flex-col items-center justify-center py-10 w-full px-4 md:px-8 mb-20 mt-10">
                <div className="text-center font-normal">
                    <h1 className="text-4xl md:text-7xl">Discover insightful perspectives <br/> in our latest article!
                    </h1>
                </div>
                <p className="w-full mt-4 font-light md:mt-4 text-center text-md md:text-3xl px-2">
                    Dive in and broaden your knowledge.
                </p>


                {/* Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 px-20 lg:grid-cols-3 gap-10 mt-8">
                    {articles
                        .slice(0, 3)
                        .map((item) => (
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
            </section>
        </>
    );
}
