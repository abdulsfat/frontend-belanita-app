"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, TextSlide } from "@/components";
import { formatDate } from "@/app/_utils/dateFormatter";
import useArticleStore from "@/app/_stores/articleStore";
import CustomToast from "@/app/_components/Toast/CustomToast";

export default function DetailArticle() {
    const { slug } = useParams();
    const { getArticleBySlug, fetchArticles, articles } = useArticleStore();

    const [localArticle, setLocalArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const article = getArticleBySlug(slug);
        if (article) {
            setLocalArticle(article);
            setLoading(false);
        } else {
            fetchArticles()
                .then(() => {
                    const refreshed = useArticleStore.getState().getArticleBySlug(slug);
                    if (refreshed) {
                        setLocalArticle(refreshed);
                    } else {
                        CustomToast.error("Artikel tidak ditemukan");
                    }
                })
                .catch(() => {
                    CustomToast.error("Gagal mengambil data artikel");
                })
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!localArticle) return <div className="text-center py-20 text-red-500">Artikel tidak ditemukan.</div>;

    return (
        <div className="py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col justify-between items-center">
            <div className="w-full mx-auto">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${localArticle.image}`}
                    alt={localArticle.title}
                    className="rounded-3xl shadow-lg h-[32rem] w-full object-cover mb-10"
                />
            </div>

            <p className="font-light text-center text-white mb-10 text-sm bg-black rounded-2xl px-6 py-1 w-max">
                {formatDate(localArticle.created_at)}
            </p>

            <div className="mb-10 w-[80%]">
                <h2 className="lg:text-6xl text-2xl text-center font-normal text-gray-900 leading-tight">
                    {localArticle.title}
                </h2>
            </div>

            <div className="w-[60%] mb-10">
                <p className="text-md text-gray-800 whitespace-pre-line leading-9">
                    {localArticle.content}
                </p>
            </div>

            <TextSlide text={"More Article   •   More Article "} style="text-[max(2em,3vw)]" />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {articles
                    .filter((m) => m.slug !== slug)
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
        </div>
    );
}
