import { ChartView } from "@/components/balita/ChartView";
import { Header } from "@/components/layout/Header";
import { ImmuView } from "@/components/balita/ImmuView";
import { SearchForm } from "@/components/balita/SearchForm";
import { SkeletonCard } from "@/components/balita/SkeletonCard";
import { TableView } from "@/components/balita/TableView";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { getData } from "@/lib/repository";
import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";

export const Index = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = ({ nik, name, pos }) => {
    setIsSearching(true);
    const search = data.find(
      (item) =>
        item.nik === nik &&
        item.pos === pos &&
        item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );

    if (search) {
      setSelected(search || null);
      setError(null);
    } else {
      setSelected(null);
      setError("Data gk ketemu");
      toast.error("Data tidak ditemukan");
    }
  };

  const isDataFound = !!selected;

  return (
    <>
      {/* <Header /> */}
      <section className={isDataFound ? "" : ""}>
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 flex justify-center"
          >
            <Spinner className="size-8" />
          </motion.div>
        ) : (
          <div className="p-4">
            <motion.section
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="my-4 text-center"
            >
              <h1 className="text-3xl font-medium">Pencarian Data Balita</h1>
              <h2 className="text-base font-light">
                Pantau tumbuh kembang balita anda disini
              </h2>
            </motion.section>
            <div
              className={`grid gap-4 ${isDataFound ? "grid-cols-1 md:grid-cols-2" : "md:w-120 mx-auto mt-20 md:mt-10"}`}
            >
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className=""
              >
                <SearchForm onSubmit={handleSubmit} />
              </motion.div>
              {isDataFound && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ChartView data={selected} />
                </motion.div>
              )}
              {isDataFound && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <TableView data={selected} />
                </motion.div>
              )}
              {isDataFound && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <ImmuView data={selected} />
                </motion.div>
              )}
            </div>

            {error && (
              <Empty className="bg-white mt-4 p-4 w-fit mx-auto">
                <EmptyHeader>
                  <EmptyMedia>
                    <CircleX size={32} />
                  </EmptyMedia>
                  <EmptyTitle className="text-lg">
                    Data tidak ditemukan
                  </EmptyTitle>
                  <EmptyDescription>
                    Tidak ada data yang cocok. Harap periksa kembali dengan
                    teliti, atau hubungi Posyandu desa untuk kelengkapan data
                    balita.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        )}
      </section>
    </>
  );
};
