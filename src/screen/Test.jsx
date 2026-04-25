import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "@/lib/repository";
import React, { useEffect, useState } from "react";

export const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res);
      } catch (error) {
        console.error(`Error`, error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>tes data</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Pos</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Anak Ke</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item[1]}</TableCell>
                <TableCell>{item.jan_status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
