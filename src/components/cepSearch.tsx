'use client'

import React, { useState } from 'react';

    interface CepResponse {
        cep: string;
        logradouro: string;
        bairro: string;
        localidade: string;
        uf: string;
        erro?: boolean;
    }

    const CepSearch = () => {
    const [cep, setCep] = useState('');
    const [result, setResult] = useState<CepResponse | null>(null);

    const handleSearch = async () => {
        if (cep.length === 8) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro na resposta da API');
            const data: CepResponse = await response.json();
            setResult(data);
          } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao buscar o CEP.');
          }
        } else {
          alert('Por favor, insira um CEP válido com 8 dígitos.');
        }
      };

    return (
        <div className="flex flex-col items-center p-1 sm:p-5 w-full max-w-full md:w-4/5 lg:w-3/4 xl:w-1/2">
        <h1 className='text-white font-bold text-xl sm:text-4xl md:text-4xl xl:text-5xl 2xl:text-6xl mb-10 md:mb-16 xl:mb-20'>Buscador de CEP:</h1>
        <input
            type="text"
            className="p-3 md:p-3 2xl:p-5 border-green-600 border-2 rounded-xl mb-4 md:mb-7 lg:mb-8 xl:mb-10 w-full"
            placeholder="Digite o CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
        />
        <button
            onClick={handleSearch}
            className="bg-green-600 text-white p-2 md:p-3 2xl:p-4 rounded hover:bg-green-800 text-base font-semibold"
        >
            Buscar
        </button>
        {result && (
            <div className="mt-8 md:mt-10 p-2 border-green-600 border-4 rounded text-white w-full sm:w-3/4 lg:w-1/2 xl:w-2/3 2xl:w-1/2 text-center text-sm md:text-base xl:text-lg">
            {result.erro ? (
              <p>CEP não encontrado.</p>
            ) : (
              <div>
                <p><strong>Logradouro:</strong> {result.logradouro}</p>
                <p><strong>Bairro:</strong> {result.bairro}</p>
                <p><strong>Cidade:</strong> {result.localidade}</p>
                <p><strong>Estado:</strong> {result.uf}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default CepSearch;