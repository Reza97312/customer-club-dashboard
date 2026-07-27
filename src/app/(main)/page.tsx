import Banner from "@/src/features/banner/components/Banner";
import CustomerClub from "@/src/features/customer-club/components/CustomerClub";
import Levels from "@/src/features/levels/components/Levels";
import RecentActivities from "@/src/features/recent-activities/Components/RecentActivities";
import Specialty from "@/src/features/specialty/components/Specialty";
import Welcome from "@/src/features/welcome/components/Welcome";

export default function Home() {
  return (
    <div className=" w-full bg-gradient-to-b from-[#e3ebfc] to-[#e7e4f7] pb-20">
      <Welcome />
      <CustomerClub />
      <Levels />
      <Banner />
      <RecentActivities />
      <Specialty />
    </div>
  );
}
