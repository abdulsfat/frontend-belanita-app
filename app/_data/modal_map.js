"use client";

import CreateArticleModal from "@/app/_components/Modal/CreateArticleModal";
import EmergencyModal from "@/app/_components/Modal/EmergencyModal";
import CheckoutModal from "@/app/_components/Modal/CheckoutModal";

export const getModalComponent = (modalType, props) => {
    switch (modalType) {
        case "CREATE_ARTICLE":
            return <CreateArticleModal {...props} />;
        case "EMERGENCY":
            return <EmergencyModal {...props} />;
        case "CHECKOUT":
            return <CheckoutModal {...props} />;
        default:
            return null;
    }
};
