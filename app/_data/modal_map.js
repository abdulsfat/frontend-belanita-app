"use client";

import CreateArticleModal from "@/app/_components/modal/CreateArticleModal";
import EmergencyModal from "@/app/_components/modal/EmergencyModal";
import CheckoutModal from "@/app/_components/modal/CheckoutModal";

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
