import Image from "next/image";
import {Card, HeroArticle} from "@/components";


export default function Article() {
  return (
    <main className="py-4 px-8 mt-20">
        {/* Head Section */}
        <HeroArticle/>
        {/* Card Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {/*    Card Item    */}
            <Card title="Overcoming Challenges in Women's Education Access in Rural Areas"
                  desc="Discussing the hurdles faced by women in rural areas in accessing quality education and solutions to overcome them."
                    thumbnail="/img-1.svg"
            /><Card title="Overcoming Challenges in Women's Education Access in Rural Areas"
                  desc="Discussing the hurdles faced by women in rural areas in accessing quality education and solutions to overcome them."
                    thumbnail="/img-1.svg"
            /><Card title="Overcoming Challenges in Women's Education Access in Rural Areas"
                  desc="Discussing the hurdles faced by women in rural areas in accessing quality education and solutions to overcome them."
                    thumbnail="/img-1.svg"
            /><Card title="Overcoming Challenges in Women's Education Access in Rural Areas"
                  desc="Discussing the hurdles faced by women in rural areas in accessing quality education and solutions to overcome them."
                    thumbnail="/img-1.svg"
            />
        </section>
    </main>
  );
}
