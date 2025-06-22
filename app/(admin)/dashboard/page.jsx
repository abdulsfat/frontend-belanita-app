
import AdminDashboardSection from "@/app/_components/Admin/AdminDashboardSection";

export const metadata = {
  title:
    "Belanita Dashboard | Belanita - Championing Women’s Rights",
  description: "This is Belanita Dashboard",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <AdminDashboardSection />
    </div>
  );
}
