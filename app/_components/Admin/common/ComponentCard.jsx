import React from "react";
import Button from "@/app/_components/Admin/ui/button/Button";

const ComponentCard = ({
                           title,
                           children,
                           className = "",
                           desc = "",
                           action,
                           onclick,
                           startIcon,
                       }) => {
    return (
        <div
            className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="px-6 py-5">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                        {title}
                    </h3>
                    {desc && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {desc}
                        </p>
                    )}
                </div>
                {action && (
                    <div className="px-6 py-5">
                        <Button startIcon={startIcon} onClick={onclick} size="sm">
                            {action}
                        </Button>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                <div className="space-y-6">{children}</div>
            </div>
        </div>
    );
};

export default ComponentCard;
