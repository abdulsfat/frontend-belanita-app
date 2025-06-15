"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import TextArea from "@/app/_components/Form/input/TextArea";
import FileInput from "@/app/_components/Form/input/FileInput";
import Switch from "@/app/_components/Form/switch/Switch";

export default function ArticleModal({
                                         isOpen,
                                         onClose,
                                         item,
                                         onSave,
                                         mode = "edit",
                                     }) {
    const isViewMode = mode === "view";
    // const [isPublished, setIsPublished] = useState(false);
    //
    // useEffect(() => {
    //     setIsPublished(item.status === "published");
    // }, [item]);
    //
    // const handleSwitchChange = (checked) => {
    //     setIsPublished(checked);
    // };

    console.log(item);

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {isViewMode ? "Detail Article" : "Edit Article"}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        {isViewMode
                            ? "Here are the article details."
                            : "Update your details to keep your article up-to-date."}
                    </p>
                </div>

                <form className="flex flex-col">
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                            <div className="w-full">
                                {item?.image && (
                                    <Image
                                        width={580}
                                        height={500}
                                        className="w-full"
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
                                        alt={item.title || "Preview Image"}
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                                {!isViewMode && (
                                    <div className="">
                                        <FileInput />
                                    </div>
                                )}
                                {/*<Switch*/}
                                {/*    label={isPublished ? "Published" : "Draft"}*/}
                                {/*    defaultChecked={isPublished}*/}
                                {/*    onChange={handleSwitchChange}*/}
                                {/*    disabled={isViewMode}*/}
                                {/*/>*/}
                            </div>

                            <div>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    defaultValue={item?.title || ""}
                                    disabled={isViewMode}
                                />
                            </div>

                            <div>
                                <Label>Content</Label>
                                <TextArea
                                    value={item?.content || ""}
                                    rows={5}
                                    disabled={isViewMode}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        {!isViewMode && (
                            <div>
                            <Button size="sm" onClick={onSave}>
                                Save Changes
                            </Button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    );
}
