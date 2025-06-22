"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import CountUp from "react-countup";

export const CardCalculate = ({
                                  title = "Title",
                                  total = "0",
                                  icon: Icon,
                                  trend = "up",
                                  percentage = "0.00%",
                              }) => {
    const isUp = trend === "up";
    const TrendIcon = isUp ? ArrowUpIcon : ArrowDownIcon;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                {Icon && <Icon className="text-gray-800 size-6 dark:text-white/90" />}
            </div>

            {/* Text & badge */}
            <div className="flex items-end justify-between mt-5">
                <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        <CountUp
                            end={Number(total)}
                            duration={1.2}
                            separator=","
                            preserveValue={true}
                        />
                    </h4>
                </div>

                <Badge
                    color={isUp ? "success" : "warning"}
                    className="flex items-center gap-1"
                >
                    <TrendIcon
                        className={isUp ? "text-green-500" : "text-red-500"}
                        size={16}
                    />
                    <span className="text-gray-800 dark:text-white/90">{percentage}</span>
                </Badge>
            </div>
        </div>
    );
};
