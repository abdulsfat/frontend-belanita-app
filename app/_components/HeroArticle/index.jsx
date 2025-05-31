"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroArticle() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    // const [eventItems, setEventItems] = useState<EventsType[]>([]);
    const slideDuration = 5000;
    const router = useRouter();
    // const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchEventsOnFeatured = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/events/on/featured`,
    //             );
    //             const { data } = response.data;
    //             setEventItems(data.slice(0, 4));
    //         } catch (error) {
    //             setError("Error fetching events on featured.");
    //         }
    //     };
    //
    //     fetchEventsOnFeatured();
    // }, []);

    // useEffect(() => {
    //     const startAutoplay = () => {
    //         intervalRef.current = setInterval(() => {
    //             setCurrentIndex(
    //                 (prevIndex) => (prevIndex + 1) % eventItems.length,
    //             );
    //             setProgress(0);
    //         }, slideDuration);
    //     };
    //
    //     if (!isPaused && eventItems.length > 0) {
    //         startAutoplay();
    //     }
    //
    //     return () => {
    //         if (intervalRef.current) {
    //             clearInterval(intervalRef.current);
    //         }
    //     };
    // }, [isPaused, eventItems.length]);

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

    // const handleDetailClick = (link: string) => {
    //     router.push(link);
    // };

    // if (error) {
    //     return (
    //         <section className="flex justify-center items-center h-[850px]">
    //             <p>{error}</p>
    //         </section>
    //     );
    // }

    return (
        <section className="relative w-full h-[42rem] rounded-4xl">
            <div className="relative rounded-4xl w-full h-full overflow-hidden">
                {/*{eventItems.map((event, index) => (*/}
                    <div
                        // key={event.slug}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out
                        opacity-100"
                        // ${
                        //     index === currentIndex ?  : "opacity-0"
                        // }`}
                    >
                        <div className="relative w-full h-full overflow-hidden">
                            <div
                                className="absolute inset-0 animate-zoomInFade"
                                // className={`absolute inset-0 ${
                                //     index === currentIndex
                                //         ? "animate-zoomInFade"
                                //         : ""
                                // }`}
                            >
                                <Image
                                    // src={`${process.env.NEXT_PUBLIC_APP_URL}${event.thumbnail}`}
                                    src="/img-1.svg"
                                    alt="Title"
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-black/40 w-full h-full absolute"></div>
                            <div className="mb-32 absolute inset-0 flex flex-col gap-6 justify-end items-start px-5 lg:px-20 py-4">
                                <div
                                    // onClick={() =>
                                    //     handleDetailClick(
                                    //         `/event/${event.slug}`,
                                    //     )
                                    // }
                                    className="flex-col flex gap-6 cursor-pointer"
                                >
                                    <h1 className="text-white text-xl lg:text-4xl lg:w-2/3">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                                    </h1>
                                    <h1 className="text-white text-xl lg:text-4xl lg:w-2/3">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto eligendi, quia rerum ut velit!
                                    </h1>
                                </div>
                                {/*<div*/}
                                {/*    className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-2 mt-8 w-full">*/}
                                {/*    <ProgressBar*/}
                                {/*        currentIndex={currentIndex}*/}
                                {/*        progress={progress}*/}
                                {/*        topNewsLength={eventItems.length}*/}
                                {/*    />*/}
                                {/*    <div*/}
                                {/*        onClick={() =>*/}
                                {/*            handleDetailClick(*/}
                                {/*                `kegiatan/${event.slug}`,*/}
                                {/*            )*/}
                                {/*        }*/}
                                {/*        className="lg:ms-4 flex w-full gap-2 items-center cursor-pointer"*/}
                                {/*    >*/}
                                {/*        <p className="text-sm font-light text-white">*/}
                                {/*            Baca Selengkapnya*/}
                                {/*        </p>*/}
                                {/*        <div className="flex justify-center items-center rounded-full h-5 w-5 md:h-8 md:w-8 border border-white">*/}
                                {/*            <ArrowRight className="h-5 w-5 text-white" />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                {/*))}*/}
            </div>
        </section>
    );
}
