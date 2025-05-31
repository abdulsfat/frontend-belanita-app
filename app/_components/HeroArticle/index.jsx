"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components";
import axios from "axios";

export function HeroArticle() {
    const [articleItems, setEventItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [error, setError] = useState(null);
    const slideDuration = 5000;
    const intervalRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEventsOnFeatured = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/article`,
                );
                const { data } = response.data;
                setEventItems(data.slice(0, 4));
                console.log(response.data, "iniiiiii");
            } catch (error) {
                console.error(error);
                setError("Error fetching events on featured.");
            }
        };

        fetchEventsOnFeatured();
    }, []);

    useEffect(() => {
        const startAutoplay = () => {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % articleItems.length,
                );
                setProgress(0);
            }, slideDuration);
        };

        if (!isPaused && articleItems.length > 0) {
            startAutoplay();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, articleItems.length]);

    useEffect(() => {
        if (!isPaused) {
            const progressInterval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 2 : 0));
            }, slideDuration / 50);

            return () => {
                clearInterval(progressInterval);
            };
        }
    }, [isPaused, currentIndex]);

    const handleDetailClick = (link) => {
        router.push(link);
    };

    if (error) {
        return (
            <section className="flex justify-center items-center h-[850px]">
                <p>{error}</p>
            </section>
        );
    }

    if (articleItems.length === 0) {
        return (
            <section className="flex justify-center items-center h-[850px]">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="relative w-full h-[42rem] rounded-4xl">
            <div className="relative rounded-4xl w-full h-full overflow-hidden">
                {articleItems.map((article, index) => (
                    <div
                        key={article.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className="relative w-full h-full overflow-hidden">
                            <div className="absolute inset-0 animate-zoomInFade">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${article.image}`}
                                    alt="Title"
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-black/40 w-full h-full absolute"></div>
                            <div className="mb-12 absolute inset-0 flex flex-col gap-6 justify-end items-start px-5 lg:px-12 py-4">
                                <div
                                    onClick={() =>
                                        handleDetailClick(
                                            `/article/${article.slug}`,
                                        )
                                    }
                                    className="flex-col flex gap-6 cursor-pointer"
                                >
                                    <p className="font-light text-sm bg-primary rounded-2xl px-6 py-1 w-max">
                                        {/* format tanggal bisa pakai dayjs atau date-fns */}
                                        25 Desember 2025
                                    </p>
                                    <h1 className="text-white text-xl lg:text-6xl lg:w-2/3 leading-16">
                                        {article.title}
                                    </h1>
                                    <h1 className="text-white font-thin text-xl lg:text-xl lg:w-2/4 leading-none">
                                        {article.content}
                                    </h1>
                                </div>
                                <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-2 mt-8 w-full">
                                    <ProgressBar
                                        currentIndex={currentIndex}
                                        progress={progress}
                                        topNewsLength={articleItems.length}
                                    />
                                    <div
                                        onClick={() =>
                                            handleDetailClick(
                                                `article/${article.slug}`,
                                            )
                                        }
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
                    </div>
                ))}
            </div>
        </section>
    );
}
