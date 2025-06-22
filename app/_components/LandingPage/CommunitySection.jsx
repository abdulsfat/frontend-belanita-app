'use client'

import Image from "next/image";
import { ButtonEmergency } from "@/components";

export function CommunitySection() {
    return (
        <>
            {/* Headline */}
            <section className="flex flex-col items-center justify-center py-10 w-full px-4 md:px-8 mt-10">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl">Make Change Possible</h1>
                    <h1 className="text-4xl md:text-6xl flex items-center justify-center mt-3 flex-wrap">
                        With
                        <span className="px-4 flex items-center gap-2 ml-2">
              <Image src="/women.png" alt="img-women" width={40} height={40} />
              <Image src="/women-2.png" alt="img-women" width={40} height={40} />
            </span>
                        <span className="ml-2">Belanita</span>
                    </h1>
                </div>
                <p className="w-full max-w-md mt-6 md:mt-9 leading-6 text-center text-sm md:text-base px-2">
                    Join our community dedicated to safety and support, with over
                    <span className="font-bold text-secondary"> 26,000 </span> women
                    empowered and assisted.
                </p>
            </section>

            {/* Cards */}
            <section className="w-full px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-8">
                    {[
                        {
                            title: "Guaranteed Safety and Confidentiality",
                            desc:
                                "We ensure that every report you make is handled with utmost safety and complete confidentiality.",
                            img: "/safety.svg",
                        },
                        {
                            title: "Quick and Effective Response",
                            desc:
                                "Our team is ready to provide quick responses and effective solutions for every emergency report you submit.",
                            img: "/fast.svg",
                        },
                        {
                            title: "24/7 Professional Support",
                            desc:
                                "Our support services are available around the clock, with a professional team ready to assist you at any time.",
                            img: "/24hours.svg",
                        },
                    ].map((card, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center bg-primary rounded-2xl gap-6 md:gap-10 text-center px-6 py-10"
                        >
                            <h1 className="text-2xl md:text-3xl leading-snug">{card.title}</h1>
                            <Image priority src={card.img} height={100} width={100} alt="icon" />
                            <p className="leading-normal font-light text-sm md:text-base px-2">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>


        </>
    );
}
