"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
    {
        question: "What is Belanita?",
        answer:
            "At Belanita, we stand for women’s rights and swift justice. Derived from \"bela wanita\" (defend women), our mission is to ensure every woman’s voice is heard and her rights upheld. Through rapid response to complaints and issues, we are dedicated to creating a safer and more equitable world for all women.",
    },
    {
        question: "How can Belanita help defend your rights?",
        answer:
            "At Belanita, we are dedicated to ensuring every woman’s voice is heard. Our name, derived from \"bela wanita,\" signifies our commitment to addressing complaints and issues swiftly and effectively. Join us in our mission to create a safer, more just society for all women.",
    },
    {
        question: "What makes Belanita different in advocating for women's rights?",
        answer:
            "Belanita combines rapid action with deep compassion. We don’t just hear complaints — we act on them, support victims, and raise awareness through education and advocacy. Our all-women-led team brings lived experience and relentless drive to protect and empower.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 md:px-16  mx-auto">
            <h2 className="text-4xl md:text-6xl leading-snug  mb-12">FAQs: Your Questions <br/> Answered</h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 rounded-2xl p-10"
                    >
                        <button
                            className="flex justify-between items-center w-full text-left"
                            onClick={() => toggle(index)}
                        >
                            <span className="text-xl font-normal text-gray-800">{faq.question}</span>
                            {openIndex === index ? (
                                <Minus className="text-gray-500" />
                            ) : (
                                <Plus className="text-gray-500" />
                            )}
                        </button>

                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    key="content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="mt-4 text-gray-700">{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
