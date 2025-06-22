"use client";

import { User, Package, Megaphone, FileText } from "lucide-react";
import { CardCalculate } from "@/app/_components/Admin/dashboard/CardCalculate";
import useUserStore from "@/app/_stores/userStore";
import useComplaintStore from "@/app/_stores/complaintStore";
import useArticleStore from "@/app/_stores/articleStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";
import { useEffect } from "react";

export default function AdminDashboardSection() {
    const { users, fetchUsers } = useUserStore();
    const { complaints, fetchComplaints } = useComplaintStore();
    const { articles, fetchArticles } = useArticleStore();
    const { merchandises, fetchMerchandises } = useMerchandiseStore();

    useEffect(() => {
        fetchUsers();
        fetchComplaints();
        fetchArticles();
        fetchMerchandises();
    }, []);

    // Data Dummy for previous stats
    const previousStats = {
        users: 4,
        complaints: 50,
        merchandises: 130,
        articles: 30,
    };

    const calculateTrend = (current, previous) => {
        const trend = current >= previous ? "up" : "down";
        const percentage =
            previous === 0
                ? "0%"
                : `${Math.abs(((current - previous) / previous) * 100).toFixed(2)}%`;
        return { trend, percentage };
    };

    const userTrend = calculateTrend(users.length, previousStats.users);
    const complaintTrend = calculateTrend(complaints.length, previousStats.complaints);
    const merchTrend = calculateTrend(merchandises.length, previousStats.merchandises);
    const articleTrend = calculateTrend(articles.length, previousStats.articles);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 xl:col-span-3">
                <CardCalculate
                    title="Users"
                    total={users.length}
                    icon={User}
                    trend={userTrend.trend}
                    percentage={userTrend.percentage}
                />
            </div>

            <div className="col-span-12 xl:col-span-3">
                <CardCalculate
                    title="Complaints"
                    total={complaints.length}
                    icon={Megaphone}
                    trend={complaintTrend.trend}
                    percentage={complaintTrend.percentage}
                />
            </div>

            <div className="col-span-12 xl:col-span-3">
                <CardCalculate
                    title="Merchandise"
                    total={merchandises.length}
                    icon={Package}
                    trend={merchTrend.trend}
                    percentage={merchTrend.percentage}
                />
            </div>

            <div className="col-span-12 xl:col-span-3">
                <CardCalculate
                    title="Articles"
                    total={articles.length}
                    icon={FileText}
                    trend={articleTrend.trend}
                    percentage={articleTrend.percentage}
                />
            </div>

            {/* Optional future components */}
            {/* <div className="col-span-12">
                <StatisticsChart />
            </div>
            <div className="col-span-12 xl:col-span-5">
                <DemographicCard />
            </div>
            <div className="col-span-12 xl:col-span-7">
                <RecentOrders />
            </div> */}
        </div>
    );
}
