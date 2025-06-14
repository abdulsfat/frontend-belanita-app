'use client'

import {Card, Pagination} from "@/components";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Merchendise() {
    const [currentPage, setCurrentPage] = useState(1);
    const [articleItems, setArticleItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 9;

    useEffect(() => {
        const fetchMerch = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/merchandise`,
                    {
                        params: {
                            page: currentPage,
                            limit: itemsPerPage,
                        },
                    }
                );

                console.log(response);
                const { data } = response.data;
                setArticleItems(data);
                setTotalCount(data.length);
            } catch (error) {
                console.error("Error fetching merch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMerch();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const displayedItems = articleItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className=" py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col justify-between items-center">
            {/* banner */}
            <div className="w-full mx-auto">
                <img
                    src="/complaints.png"
                    alt="We Will Not Be Silenced"
                    className="rounded-3xl shadow-lg h-[32rem] w-full object-cover mb-10"
                />
            </div>

            {/* tulisan*/}
            <div className=" w-full grid grid-flow-col grid-rows-3 gap-10 items-start mb-28 justify-between">
                <div className="col-span-2 row-span-4">
                    <h2 className="text-7xl font-normal text-gray-900 leading-tight">
                        Discover your passion <br/> with us.
                    </h2>
                </div>
                <div className="row-span-3">
                    <p className="text-md text-gray-800">
                        Unleash your inner strength and make a statement with our exclusive range of accessories. Each piece is designed to inspire, empower, and celebrate your unique journey towards equality and self-expression. Find the perfect accessory that resonates with your passion and showcases your commitment to women's rights.
                    </p>
                </div>
            </div>

            {/* merch section */}
            {/* Card Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {/* Dynamic Cards */}
                {displayedItems.map((item) => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        content={item.description}
                        created_at={item.created_at}
                        slug={`merch/${item.slug}`}
                    />
                ))}

            </section>
            <hr className="h-[1px] my-10 bg-black/20 border-0 "/>
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
