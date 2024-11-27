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

  const renderFlag = (flags: Country['flags']) => {
    return flags.svg || flags.png ? (
      <img
        className="w-full mt-4 h-auto md:h-[345px]"
        src={flags.svg || flags.png}
        alt={flags.alt || 'N/A'}
      />
    ) : (
      <span className="text-left md:text-center">NO IMAGE AVAILABLE</span>
    );
  };

  return (
    <div className="flex flex-col mt-14 flex-1 gap-8 md:flex-row mx-6 md:mx-auto">
      <div className="flex flex-col text-left basis-2/6 gap-2">
        <h1 className="text-4xl font-bold">{selectedCountry.name.common}</h1>
        <div className="flex gap-2 items-center text-xl">
          <b>Official Name:</b>
          <span>{selectedCountry.name.official}</span>
        </div>
        <div className="flex gap-2 items-center text-xl">
          <b>Currency Name:</b>
          <span>{getCurrencyName(selectedCountry.currencies) ?? 'N/A'}</span>
        </div>
        <div className="flex gap-2 items-center text-xl">
          <b>Currency Symbol:</b>
          <span>
            {selectedCountry.currencies[
              `${getCurrencyName(selectedCountry.currencies)}`
            ]?.symbol ?? 'N/A'}
          </span>
        </div>
        <div className="flex gap-2 items-center text-xl">
          <b>Side of the road they drive on:</b>
          <span>{selectedCountry.car.side}</span>
        </div>
      </div>
      <div className="basis-2/6 flex flex-col">
        {/* <b className="text-left md:text-center">Flag</b>
        {renderFlag(selectedCountry.flags)} */}
        <CardImage
          title="Country Flag"
          description="A country flag is a symbol that represents a nation. It typically consists of a distinctive design, pattern, or combination of colors that hold specific cultural, historical, or political significance for the country it represents. Flags are often used for identification, ceremonial purposes, and expressions of national pride or unity."
          url={selectedCountry.flags.svg}
          alt={'country flag'}
        />
      </div>
      <div className="basis-2/6 flex flex-col">
        {/* {renderFlag({
          ...selectedCountry.coatOfArms,
          alt: 'coat of arms',
        })} */}
        <CardImage
          title="Coat of Arms"
          description={`A country's coat of arms is a visual design on a shield that represents the country and is a central part of its state emblem. Coats of arms are unique to a country, family, individual, organization, school, or corporation.`}
          url={selectedCountry.coatOfArms.svg}
          alt={'coat of arms'}
        />
      </div>
    </div>
  );
};
