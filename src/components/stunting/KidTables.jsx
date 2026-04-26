import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Field } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Label } from "../ui/label";

export const KidTables = ({ columns, data }) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const nameQuery =
    columnFilters.find((item) => item.id === "name")?.value || "";

  const onQueryChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((item) => item.id !== id)
        .concat({
          id,
          value,
        }),
    );

  const statusFilter = table.getColumn("timbang").getFilterValue() ?? "";

  return (
    <div>
      <div className="space-y-4">
        <h2>Daftar Balita</h2>

        {/* Filter */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Bar */}
          <Field className="md:col-span-2">
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder="Search by name..."
                value={nameQuery}
                onChange={(e) => onQueryChange("name", e.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          {/* Statuses */}
          <Field>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                table
                  .getColumn("timbang")
                  .setFilterValue(value === "Semua" ? "" : value);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Status Gizi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Semua">Semua Status</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Stunting">Stunting</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Tables */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="px-4" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="px-4" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Label>
            <Label>
              {table.getRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} rows
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
