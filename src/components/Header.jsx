import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div>
        <h1 className="text-2xl font-medium">Posyandu Balita Wadungasih</h1>
        <h2 className="text-base">
          Monitoring data balita pada Posyandu Desa Wadungasih
        </h2>
      </div>
      <div className="flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/stunting`}>Stunting</Link>
      </div>
    </header>
  );
};
