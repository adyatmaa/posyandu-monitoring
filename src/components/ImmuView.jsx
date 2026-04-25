import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Baby, CheckCircle, CircleAlert, Syringe } from "lucide-react";
import { Badge } from "./ui/badge";

export const ImmuView = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histori Imunisasi</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Card className="bg-green-100">
            <CardContent>
              {/* Head */}
              <div className="flex items-center gap-4">
                <Baby className="bg-green-200 rounded-full size-12 p-2.5 text-green-700" />
                <h1 className="font-semibold text-lg uppercase">{data.name}</h1>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lists */}
        {data.imunisasi.map((item, i) => {
          return (
            <div key={i} className="relative pb-4">
              <div className="absolute left-2.75 top-0 h-full border-l-2 border-gray-300"></div>
              {item.value ? (
                <CheckCircle className="absolute z-10 bg-green-600 text-gray-200 size-6 p-1 rounded-full" />
              ) : (
                <CircleAlert className="absolute z-10 bg-amber-600 text-gray-200 size-6 p-1 rounded-full" />
              )}
              <div className="pl-12">
                <Card className="border-gray-300 border">
                  <CardContent className="flex justify-between items-start gap-3">
                    <div className="flex items-start gap-3">
                      <Syringe className="rounded-lg bg-green-200 text-green-700 h-12 w-12 p-3" />
                      <div className="">
                        <h1 className="text-lg font-medium text-wrap flex items-center gap-4">
                          {item.name}{" "}
                          {item.value ? (
                            <Badge className="bg-green-100 text-green-700">
                              Selesai
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700">
                              Belum Imunisasi
                            </Badge>
                          )}
                        </h1>
                        <h2 className="text-gray-600">
                          {item.value && `Diberikan pada : ${item.value}`}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
