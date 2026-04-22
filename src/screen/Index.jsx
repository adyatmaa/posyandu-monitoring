import { ChartView } from "@/components/ChartView";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { TableView } from "@/components/TableView";
import React from "react";

export const Index = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`ok`);
  };

  return (
    <section>
      <Header />
      <div className="p-4 space-y-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <SearchForm onSubmit={handleSubmit} />
          </div>
          <div className="">
            <ChartView />
          </div>
        </div>
        <div>
          <TableView />
        </div>
      </div>
    </section>
  );
};
