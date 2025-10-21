import React from "react";
import { LastSales, UpcomingVisits, PopularServicesTable, TopEmployee } from "@/widgets/dashboard";
import { VisitsCard, NextVisitsEmptyCard } from "@/widgets/visits-card";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <LastSales />
        <UpcomingVisits />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VisitsCard visibleRows={4} />
        <NextVisitsEmptyCard />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <PopularServicesTable />
        <TopEmployee />
      </div>
    </div>
  );
};

export default HomePage;
