"use client";

import CreateArticleModal from "@/app/_components/Modal/CreateArticleModal";
import EmergencyModal from "@/app/_components/Modal/EmergencyModal";
import CheckoutModal from "@/app/_components/Modal/CheckoutModal";
import DetailComplaintModal from "@/app/_components/Modal/DetailComplaintModal";
import CreateMerchModal from "@/app/_components/Modal/CreateMerchModal";
import CreateCategoryModal from "@/app/_components/Modal/CreateCategoryModal";
import EditProfileModal from "@/app/_components/Modal/EditProfileModal";
import TopUpModal from "@/app/_components/Modal/TopUpModal";

export const getModalComponent = (modalType, props) => {
    switch (modalType) {
        case "CREATE_ARTICLE":
            return <CreateArticleModal {...props} />;
        case "EDIT_PROFILE":
            return <EditProfileModal {...props} />;
        case "CREATE_MERCH":
            return <CreateMerchModal {...props} />;
        case "TOP_UP":
            return <TopUpModal {...props} />;
        case "CREATE_CATEGORY":
            return <CreateCategoryModal {...props} />;
        case "EMERGENCY":
            return <EmergencyModal {...props} />;
        case "COMPLAINT":
            return <DetailComplaintModal {...props} />;
        case "CHECKOUT":
            return <CheckoutModal {...props} />;
        default:
            return null;
    }
};
