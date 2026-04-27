import React, { useState } from "react";
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
} from "../ui/select";

export const SearchForm = ({ onSubmit }) => {
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [pos, setPos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ nik, name, pos });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cari balita anda disini</CardTitle>
        <CardDescription>Masukkan NIK serta nama balita anda</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between h-full"
        >
          <FieldGroup className="mb-6">
            <Field>
              <FieldLabel htmlFor="nik">NIK Balita</FieldLabel>
              <Input
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                type="number"
                name="nik"
                placeholder="NIK Balita"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Nama Balita</FieldLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="Nama Balita"
              />
            </Field>
            <Field>
              <FieldLabel>Pos Balita</FieldLabel>
              <Select value={pos} onValueChange={(e) => setPos(e)}>
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
          </FieldGroup>
          <Field>
            <Button type="submit" className="flex items-center gap-1">
              Cari Balita
              <Search />
            </Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
