import { ChartView } from "@/components/ChartView";
import { Header } from "@/components/Header";
import { ImmuView } from "@/components/ImmuView";
import { SearchForm } from "@/components/SearchForm";
import { SkeletonCard } from "@/components/SkeletonCard";
import { TableView } from "@/components/TableView";
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
    <section>
      <Header />
      {loading ? (
        <div className="p-12 flex justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="p-4">
          <div className={`grid gap-4 ${isDataFound ? "md:grid-cols-2" : ""}`}>
            <SearchForm onSubmit={handleSubmit} />
            {isDataFound && <ChartView data={selected} />}
            {isDataFound && <TableView data={selected} />}
            {isDataFound && <ImmuView data={selected} />}
          </div>

          {error && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <CircleX />
                </EmptyMedia>
                <EmptyTitle>Data tidak ada</EmptyTitle>
                <EmptyDescription>
                  tidak ada data yang cocok dengan
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      )}
    </section>
  );
};
