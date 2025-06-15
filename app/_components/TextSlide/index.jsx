import { ParallaxSlider } from "@/app/_components/Parallax";

export function TextSlide({ text, style }) {
    return (
        <>
            <div className="select-none mt-5">
                <div className="w-full border-b-2 border-t-2 border-black">
                    <h1 className={style}>
                        <ParallaxSlider repeat={6} baseVelocity={1}>
                            <span className="px-12">{text}</span>
                            <span className="spacer">🌸</span>
                        </ParallaxSlider>
                    </h1>
                </div>
            </div>
        </>
    );
}
