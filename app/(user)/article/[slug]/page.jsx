"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDetailArticles, getRandomArticlesExceptSlug } from "@/app/_services/articleService";
import { Card, TextSlide } from "@/components";
import {formatDate} from "@/app/_utils/dateFormatter";

export default function DetailArticle() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await getDetailArticles(slug);
                setArticle(detail);

                const others = await getRandomArticlesExceptSlug(slug);
                setRelatedArticles(others);
            } catch (error) {
                console.error("Gagal mengambil artikel:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!article) return <div className="text-center py-20 text-red-500">Artikel tidak ditemukan.</div>;

    return (
        <div className="py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col justify-between items-center">
            <div className="w-full mx-auto">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${article.image}`}
                    alt={article.title}
                    className="rounded-3xl shadow-lg h-[32rem] w-full object-cover mb-10"
                />
            </div>

            <p className="font-light text-center text-white mb-10 text-sm bg-black rounded-2xl px-6 py-1 w-max">
                {formatDate(article.created_at)}
            </p>

            <div className="mb-10 w-[80%]">
                <h2 className="lg:text-6xl text-2xl text-center font-normal text-gray-900 leading-tight">
                    {article.title}
                </h2>
            </div>

            <div className="w-[60%] mb-10">
                <p className="text-md  text-gray-800 whitespace-pre-line leading-9">
                    {article.content}
                </p>
            </div>

            <TextSlide text={"More Article   •   More Article "} style="text-[max(2em,3vw)]" />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {relatedArticles.map((item) => (
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
        </div>
    );
}
