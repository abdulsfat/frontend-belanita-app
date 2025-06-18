import Image from "next/image";

export function VisionSection() {
  return (
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 py-8 px-4 md:px-20 mt-10 w-full">
        {/* Text Section */}
        <div className="flex flex-col justify-between items-start w-full md:w-[35%] gap-10 md:gap-16">
          <p className="bg-tertiary rounded-full px-4 md:px-5 py-1 border border-secondary text-sm md:text-md text-secondary">
            The Vision
          </p>
          <h1 className="text-black text-4xl md:text-6xl leading-snug">
            Every Women <br />
            Lives Safely
          </h1>
          <p className="text-sm md:text-lg font-light text-black leading-relaxed w-full md:w-[80%]">
            To create a world where every woman lives safely, maintains her
            dignity, and is free from all forms of violence and discrimination.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[40rem] h-64 md:h-96 rounded-3xl overflow-hidden">
          <Image
              src="/img-1.svg"
              alt="Hero Image"
              width={1080}
              height={1080}
              className="w-full h-full object-cover"
          />
        </div>
      </section>
  );
}
