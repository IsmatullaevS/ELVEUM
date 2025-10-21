import React from "react";
import LastSales from "@/widgets/dashboard/LastSales";
import UpcomingVisits from "@/widgets/dashboard/UpcomingVisits";
import VisitsList from "@/widgets/dashboard/VisitsList";
import PopularServicesTable from "@/widgets/dashboard/PopularServicesTable";
import TopEmployee from "@/widgets/dashboard/TopEmployee";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LastSales />
        <UpcomingVisits />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitsList />
        <div className="grid grid-cols-1 gap-6">
          <PopularServicesTable />
          <TopEmployee />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
