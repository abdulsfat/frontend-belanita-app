'use client';

import { Card, Pagination } from "@/components";
import { useEffect, useState } from "react";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";

export default function Merchendise() {
    const [currentPage, setCurrentPage] = useState(1);

    const { merchandises, fetchMerchandises } = useMerchandiseStore()

    const itemsPerPage = 9;

    useEffect(() => {
        fetchMerchandises()
    }, []);

    const totalPages = Math.ceil(merchandises.length / itemsPerPage);

    const displayedItems = merchandises.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col justify-between">
            {/* Banner */}
            <div className="w-full mx-auto">
                <img
                    src="/complaints.png"
                    alt="We Will Not Be Silenced"
                    className="rounded-3xl shadow-lg w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover mb-10 transition-all"
                />
            </div>

            {/* Deskripsi */}
            <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 mb-28">
                <div className="w-full md:w-2/3">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 leading-snug">
                        Discover your passion <br /> with us.
                    </h2>
                </div>
                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <p className="text-sm sm:text-md md:text-lg text-gray-800 leading-relaxed">
                        Unleash your inner strength and make a statement with our exclusive range of accessories.
                        Each piece is designed to inspire, empower, and celebrate your unique journey towards equality
                        and self-expression. Find the perfect accessory that resonates with your passion and showcases
                        your commitment to women's rights.
                    </p>
                </div>
            </div>

            {/* Section Card */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {displayedItems.map((item) => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        price={item.price}
                        stock={item.stock}
                        slug={`merchendise/${item.slug}`}
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
        </div>
    );
}
