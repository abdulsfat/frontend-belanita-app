'use client'

import Image from "next/image";
import {ButtonEmergency} from "@/app/_components";

export function CommunitySection() {
    return (
        <>
            <section className="flex flex-col items-center justify-center py-10 w-full px-8 mt-10 ">
                <div className="text-center">
                    <h1 className="text-6xl">Make Change Possible</h1>
                    <h1 className="text-6xl flex items-center justify-center mt-3">
                        With{" "}
                        <span className="px-4 flex items-center gap-2 ml-2">
              <Image src="/women.png" alt="img-women" width={50} height={50}/>
              <Image
                  src="/women-2.png"
                  alt="img-women"
                  width={50}
                  height={50}
              />
            </span>
                        <span className="ml-2">Belanita</span>
                    </h1>
                </div>
                <p className="w-96 mt-9 leading-5 text-center">
                    Join our community dedicated to safety and support, with over
                    <span className="font-bold text-secondary"> 26,000 </span> women
                    empowered and assisted.
                </p>
            </section>

            <section>
                <div className="bg-green-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 p-12">
                    {/*Card*/}
                    <div
                        className="flex flex-col items-center justify-center bg-primary rounded-2xl gap-12 text-center px-8 py-12">
                        <h1 className="text-3xl">Guaranteed Safety <br/> and Confidentiality</h1>
                        <Image
                            priority
                            src="/safety.svg"
                            height={120}
                            width={120}
                            alt="safety"
                        />
                        <p className="leading-none font-light">We ensure that every report you make is handled with
                            utmost safety and complete confidentiality.</p>
                    </div>
                    {/*Card End*/} {/*Card*/}
                    <div
                        className="flex flex-col items-center justify-center bg-primary rounded-2xl gap-12 text-center px-8 py-12">
                        <h1 className="text-3xl">Guaranteed Safety <br/> and Confidentiality</h1>
                        <Image
                            priority
                            src="/safety.svg"
                            height={120}
                            width={120}
                            alt="safety"
                        />
                        <p className="leading-none font-light">We ensure that every report you make is handled with
                            utmost safety and complete confidentiality.</p>
                    </div>
                    {/*Card End*/} {/*Card*/}
                    <div
                        className="flex flex-col items-center justify-center bg-primary rounded-2xl gap-12 text-center px-8 py-12">
                        <h1 className="text-3xl">Guaranteed Safety <br/> and Confidentiality</h1>
                        <Image
                            priority
                            src="/safety.svg"
                            height={120}
                            width={120}
                            alt="safety"
                        />
                        <p className="leading-none font-light">We ensure that every report you make is handled with
                            utmost safety and complete confidentiality.</p>
                    </div>
                    {/*Card End*/}

                </div>
            </section>

            <section className="flex items-center justify-between py-4  w-full px-12 mt-10 ">
                <div className="flex flex-col justify-between items-start w-[35%]  gap-8">
                    <h1 className="text-black  text-7xl ">
                        Report completed quickly.
                    </h1>
                    <p className="text-md font-light text-black w-[80%] leading-5">
                        Report your issue through the complaint form and receive a prompt response from our staff.
                    </p>
                    <ButtonEmergency/>
                </div>

                <div className="w-[54rem] rounded-3xl overflow-hidden">
                    <Image
                        src="/report.png"
                        alt="Hero Image"
                        width={2080}
                        height={2080}
                        className="w-full h-full object-cover"
                    />
                </div>

            </section>


        </>
    );
}
