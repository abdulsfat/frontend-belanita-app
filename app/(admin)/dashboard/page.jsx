
import AdminDashboardSection from "@/app/_components/Admin/AdminDashboardSection";

export const metadata = {
  title: "Belanita Dashboard Admin • Championing Women’s Rights",
  description: "Empowering Voices, Ensuring Equality for a Just and Inclusive Future.",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <AdminDashboardSection />
    </div>
  );
}
