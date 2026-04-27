import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from "@/lib/repository";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { ImmuTables } from "@/components/imunisasi/ImmuTables";
import { motion } from "framer-motion";

const renderSex = (val) => {
  if (val === "1") {
    return <Badge className="bg-cyan-100 text-cyan-700">Laki - laki</Badge>;
  } else {
    return <Badge className="bg-fuchsia-100 text-fuchsia-700">Perempuan</Badge>;
  }
};
const renderVal = (val) => {
  if (val !== "Belum") {
    return <Badge className="bg-green-100 text-green-700">{val}</Badge>;
  } else {
    return <Badge className="bg-amber-100 text-amber-700">{val}</Badge>;
  }
};

export const Imunisasi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnHelper = createColumnHelper();

  const allImmunizations = Array.from(
    new Set(data.flatMap((row) => row.imunisasi.map((item) => item.name))),
  );

  const dynamicColumns = allImmunizations.map((name) => {
    return columnHelper.accessor(
      (row) => {
        // Cari apakah row ini memiliki imunisasi tersebut
        const item = row.imunisasi.find((i) => i.name === name);
        return item?.value ? item.value : "Belum";
      },
      {
        id: name,
        header: name,
        cell: (info) => renderVal(info.getValue()),
      },
    );
  });

  const column = [
    columnHelper.display({
      id: "index",
      header: "No",
      cell: (info) =>
        info.table.getFilteredRowModel().rows.indexOf(info.row) + 1,
    }),
    columnHelper.accessor("name", {
      id: "balita_name",
      header: "Nama Balita",
      cell: (props) => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor("jk", {
      id: "jk",
      header: "Jenis Kelamin",
      cell: (props) => renderSex(props.getValue()),
    }),
    ...dynamicColumns,
  ];

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
      {/* <Header /> */}
      {loading ? (
        <motion.div
          key={`load`}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 flex justify-center"
        >
          <Spinner className="size-8" />
        </motion.div>
      ) : (
        <motion.div
          key={`table`}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:px-8 p-4"
        >
          <ImmuTables columns={column} data={data} />
        </motion.div>
      )}
    </section>
  );
};
