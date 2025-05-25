"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#632C91",

    transition: {
      type: "spring",
      stiffness: 500,
      damping: 60,
      mass: 1,
      duration: 0.5,
    },
  },
  tap: { scale: 0.95 },
};

const backgroundVariants = {
  hover: {
    // scale: 5,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 60,
      mass: 1,
      duration: 0.5,
    },
  },
  tap: { scale: 0.95 },
};

export const ButtonEmergency = () => {
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="flex flex-row justify-center items-center bg-tertiary rounded-3xl px-5 pe-1 p-1 hover:text-white"
    >
      Emergency Call
      <motion.div
        variants={backgroundVariants}
        whileHover="hover"
        whileTap="tap"
        className="ms-2 bg-secondary rounded-full p-2"
      >
        <Phone className="stroke-tertiary" />
      </motion.div>
    </motion.button>
  );
};
