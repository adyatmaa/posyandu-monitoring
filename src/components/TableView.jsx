import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

export const TableView = ({ data }) => {
  const renderBadge = (status) => {
    const stunting = ["Pendek", "S.Pendek"];

    if (stunting.includes(status)) {
      return <Badge className="bg-red-100 text-red-700">Stunting</Badge>;
    } else if (status === "Normal") {
      return <Badge className="bg-green-100 text-green-700">Normal</Badge>;
    } else if (status === "Tinggi") {
      return <Badge className="bg-green-100 text-green-700">Baik</Badge>;
    } else {
      return "";
    }
  };
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Judul</CardTitle>
        <CardDescription>Desc</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="px-4">No</TableHead>
                <TableHead className="px-4">Bulan</TableHead>
                <TableHead className="px-4">Berat Badan</TableHead>
                <TableHead className="px-4">Tinggi Badan</TableHead>
                <TableHead className="px-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.timbang.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="px-4">{i + 1}</TableCell>
                    <TableCell className="px-4">{item.month}</TableCell>
                    <TableCell className="px-4">{item.bb}</TableCell>
                    <TableCell className="px-4">{item.tb}</TableCell>
                    <TableCell className="px-4">
                      {renderBadge(item.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
