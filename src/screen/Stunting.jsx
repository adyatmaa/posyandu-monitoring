import { KidTables } from "@/components/stunting/KidTables";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from "@/lib/repository";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

export const Stunting = () => {
  const columnHelper = createColumnHelper();
  const column = [
    columnHelper.display({
      id: "index",
      header: "No",
      cell: (info) =>
        info.table.getFilteredRowModel().rows.indexOf(info.row) + 1,
    }),
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2>Daftar anak stunting</h2>
      {loading ? (
        <div className="p-12 flex justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <KidTables columns={column} data={data} />
      )}
    </div>
  );
};
