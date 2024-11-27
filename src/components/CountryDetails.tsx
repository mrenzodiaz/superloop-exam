import { Country } from '@/types';
import React from 'react';
import { CardImage } from './CardImage';

type CountryDetailsProps = {
  selectedCountry: Country;
};

export const CountryDetails = ({ selectedCountry }: CountryDetailsProps) => {
  const getCurrencyName = (currencies: Country['currencies']): string => {
    return Object.keys(currencies)[0];
  };

  return (
    <div className="flex flex-col mt-14 flex-1 gap-8 lg:flex-row mx-6 lg:mx-auto">
      <div className="flex flex-col text-left basis-2/6 gap-4 max-w-[480px] lg:max-w-full mx-auto lg:mx-0">
        <h1 className="text-4xl font-bold">{selectedCountry.name.common}</h1>
        <div className="flex gap-2 items-start text-xl">
          <b>Official Name:</b>
          <span>{selectedCountry.name.official}</span>
        </div>
        <div className="flex gap-2 items-start text-xl">
          <b>Currency Name:</b>
          <span>{getCurrencyName(selectedCountry.currencies) ?? 'N/A'}</span>
        </div>
        <div className="flex gap-2 items-start text-xl">
          <b>Currency Symbol:</b>
          <span>
            {selectedCountry.currencies[
              `${getCurrencyName(selectedCountry.currencies)}`
            ]?.symbol ?? 'N/A'}
          </span>
        </div>
        <div className="flex gap-2 items-start text-xl">
          <b>Driving Side:</b>
          <span className="capitalize">{selectedCountry.car.side}</span>
        </div>
      </div>
      <div className="basis-2/6 flex flex-col">
        <CardImage
          title="Country Flag"
          description="A country flag is a symbol that represents a nation. It typically consists of a distinctive design, pattern, or combination of colors that hold specific cultural, historical, or political significance for the country it represents. Flags are often used for identification, ceremonial purposes, and expressions of national pride or unity."
          url={selectedCountry.flags.svg}
          alt={'country flag'}
          isFlag
        />
      </div>
      <div className="basis-2/6 flex flex-col">
        <CardImage
          title="Coat of Arms"
          description={`A country's coat of arms is a visual design on a shield that represents the country and is a central part of its state emblem. Coats of arms are unique to a country, family, individual, organization, school, or corporation.`}
          url={selectedCountry.coatOfArms.svg}
          alt={'coat of arms'}
          isFlag={false}
        />
      </div>
    </div>
  );
};
