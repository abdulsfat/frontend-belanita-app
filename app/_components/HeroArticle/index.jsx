"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components";
import useArticleStore from "@/app/_stores/articleStore";
import { getArticles } from "@/app/_services/articleService";

export function HeroArticle() {
    const { articles, setArticles } = useArticleStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const intervalRef = useRef(null);
    const slideDuration = 5000;

    const topArticles = articles.slice(0, 4);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (err) {
                setError("Gagal memuat artikel.");
            }
        };

        if (articles.length === 0) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (!isPaused && topArticles.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % topArticles.length);
                setProgress(0);
            }, slideDuration);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPaused, topArticles.length]);

    useEffect(() => {
        if (!isPaused) {
            const progressInterval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 2 : 0));
            }, slideDuration / 50);
            return () => clearInterval(progressInterval);
        }
    }, [isPaused, currentIndex]);

    const handleDetailClick = (slug) => {
        router.push(`/article/${slug}`);
    };

    if (error) {
        return (
            <section className="flex justify-center items-center h-[850px]">
                <p>{error}</p>
            </section>
        );
    }

    if (topArticles.length === 0) {
        return (
            <section className="flex justify-center items-center h-[850px]">
                <p>Loading...</p>
            </section>
        );
    }

    const active = topArticles[currentIndex];

    return (
        <section className="relative w-full h-[42rem] rounded-4xl">
            <div className="relative rounded-4xl w-full h-full overflow-hidden">
                <div className="absolute inset-0 animate-zoomInFade">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${active.image}`}
                        alt={active.title}
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="bg-black/40 w-full h-full absolute"></div>

                <div className="mb-12 absolute inset-0 flex flex-col gap-6 justify-end items-start px-5 lg:px-12 py-4">
                    <div
                        onClick={() => handleDetailClick(active.slug)}
                        className="flex-col flex gap-6 cursor-pointer"
                    >
                        <p className="font-light text-sm bg-primary rounded-2xl px-6 py-1 w-max">
                            {new Date(active.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <h1 className="text-white text-xl lg:text-5xl lg:w-2/3 leading-16">
                            {active.title}
                        </h1>
                        <h1 className="text-white font-thin text-xl lg:text-lg line-clamp-2 lg:w-2/4 leading-5">
                            {active.content}
                        </h1>
                    </div>

                    <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-2  w-full">
                        <ProgressBar
                            currentIndex={currentIndex}
                            progress={progress}
                            topNewsLength={topArticles.length}
                        />
                        <div
                            onClick={() => handleDetailClick(active.slug)}
                            className="lg:ms-4 flex w-full gap-2 items-center cursor-pointer"
                        >
                            <p className="text-sm font-light text-white">
                                Baca Selengkapnya
                            </p>
                            <div className="flex justify-center items-center rounded-full h-5 w-5 md:h-8 md:w-8 border border-white">
                                <ArrowRight className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
