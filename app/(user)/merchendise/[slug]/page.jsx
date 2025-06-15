"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, TextSlide } from "@/components";
import { formatDate } from "@/app/_utils/dateFormatter";
import {getDetailMerch, getRandomMerchExceptSlug} from "@/app/_services/merchService";


export default function DetailMerchandisePage() {
    const { slug } = useParams();
    const [merch, setMerch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedMerch, setRelatedMerch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Slug:", slug); // debug slug
                const detail = await getDetailMerch(slug);
                console.log("Detail:", detail); // debug response
                setMerch(detail);

                const others = await getRandomMerchExceptSlug(slug);
                setRelatedMerch(others);
            } catch (error) {
                console.error("Gagal mengambil data merch:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);


    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!merch) return <div className="text-center py-20 text-red-500">Merchandise tidak ditemukan.</div>;

    return (
        <div className="py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col justify-between items-center">
            {/* Gambar utama */}
            <div className="w-full mx-auto">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${merch.image}`}
                    alt={merch.name}
                    className="rounded-3xl shadow-lg h-[32rem] w-full object-cover mb-10"
                />
            </div>

            <p className="font-light text-center text-white mb-10 text-sm bg-black rounded-2xl px-6 py-1 w-max">
                {formatDate(merch.created_at)}
            </p>

            {/* Nama + Harga */}
            <div className="mb-10 w-[80%] text-center">
                <h2 className="lg:text-6xl text-2xl font-normal text-gray-900 leading-tight">
                    {merch.name}
                </h2>
                <p className="text-lg font-semibold text-purple-700 mt-4">
                    Rp {Number(merch.price).toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-600 mt-1">Stok: {merch.stock}</p>
            </div>

            {/* Deskripsi */}
            <div className="w-[60%] mb-10">
                <p className="text-md text-gray-800 whitespace-pre-line leading-9">
                    {merch.description}
                </p>
            </div>

            {/* More */}
            <TextSlide text={"More Merchandise • More Merchandise •"} style="text-[max(2em,3vw)]" />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {relatedMerch.map((item) => (
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
        </div>
    );
}
