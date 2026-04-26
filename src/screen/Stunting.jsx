import { Header } from "@/components/Header";
import { KidTables } from "@/components/stunting/KidTables";
import { Badge } from "@/components/ui/badge";
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
    columnHelper.accessor("name", {
      header: "Nama Balita",
      cell: (props) => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor("jk", {
      header: "Jenis Kelamin",
      cell: (props) => renderSex(props.getValue()),
    }),
    columnHelper.accessor(
      (row) => `${row.birth_date}/${row.birth_month}/${row.birth_year}`,
      {
        id: "fullBirthDate",
        header: "Tanggal Lahir",
        cell: (props) => props.getValue(),
      },
    ),
    columnHelper.accessor("timbang", {
      header: "Status Gizi",
      cell: (props) => {
        const isStunting = props.row.original.timbang.some(
          (item) => item.status === "Pendek" || item.status === "S.Pendek",
        );

        return (
          <Badge
            className={
              isStunting
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }
          >
            {isStunting ? "Stunting" : "Normal"}
          </Badge>
        );
      },
      filterFn: (row, columnId, filterVal) => {
        if (!filterVal) return true;

        const data = row.original.timbang;
        const isStunting = data.some(
          (item) => item.status === "Pendek" || item.status === "S.Pendek",
        );
        const status = isStunting ? "Stunting" : "Normal";

        return status === filterVal;
      },
    }),
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderSex = (val) => {
    if (val === "1") {
      return <Badge className="bg-sky-100 text-sky-700">Laki - laki</Badge>;
    } else {
      return <Badge className="bg-rose-100 text-rose-700">Perempuan</Badge>;
    }
  };

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
    <section>
      <Header />
      {loading ? (
        <div className="p-12 flex justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="p-4">
          <KidTables columns={column} data={data} />
        </div>
      )}
    </section>
  );
};
