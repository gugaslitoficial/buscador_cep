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
        <div className="flex flex-col items-center p-5 w-1/2">
        <h1 className='text-white font-bold text-5xl mb-20'>Buscador de CEP:</h1>
        <input
            type="text"
            className="p-4 border-green-600 border-2 rounded-xl mb-6 w-full"
            placeholder="Digite o CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
        />
        <button
            onClick={handleSearch}
            className="bg-green-600 text-white p-3 rounded hover:bg-green-800 text-base font-semibold"
        >
            Buscar
        </button>
        {result && (
            <div className="mt-10 p-1 border-green-600 border-4 rounded text-white w-1/2">
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