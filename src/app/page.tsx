import React from 'react';
import CepSearch from "@/components/cepSearch";

export default function Home() {

  return (
    <div className="h-screen flex justify-center p-20 bg-black">
      <CepSearch />
    </div>
  );
}