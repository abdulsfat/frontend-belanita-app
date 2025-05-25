import Image from "next/image";

export function VisionSection() {
  return (
    <>
      <section className="flex items-center justify-between py-4  w-full px-8 mt-10 ">
        <div className="flex flex-col justify-between items-start w-[35%]  gap-16">
          <p className="bg-tertiary rounded-full px-5  border border-secondary text-md text-secondary">
            The Vision
          </p>
          <h1 className="text-black  text-6xl ">
            Every Women <br /> Lives Safely
          </h1>
          <p className="text-lg font-light text-black w-[80%] leading-5">
            To create a world where every woman lives safely, maintains her
            dignity, and is free from all forms of violence and discrimination.
          </p>
        </div>

        <div className=" rounded-3xl ">
          {/* <p>tes</p> */}
          <Image
            width={850}
            height={800}
            src="/Image.png"
            alt="Hero Image"
            className="rounded-3xl"
          />
        </div>
      </section>
    </>
  );
}
