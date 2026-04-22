import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SearchForm = ({ onSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cari balita anda disini</CardTitle>
        <CardDescription>Masukkan NIK serta nama balita anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nik">NIK Balita</FieldLabel>
              <Input
                type="number"
                name="nik"
                placeholder="NIK Balita"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Nama Balita</FieldLabel>
              <Input
                type="text"
                name="name"
                placeholder="Nama Balita"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Pos Balita</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={`Pilih Pos`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Pos 1</SelectItem>
                    <SelectItem value="2">Pos 2</SelectItem>
                    <SelectItem value="3">Pos 3</SelectItem>
                    <SelectItem value="4">Pos 4</SelectItem>
                    <SelectItem value="5">Pos 5</SelectItem>
                    <SelectItem value="6">Pos 6</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Button type="submit" className="flex items-center gap-1">
                Cari Balita
                <Search />
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
