import './App.css';
import { useEffect, useState } from 'react';
import { client } from './api/client';
import { Combobox } from './components/Combobox';
import { Country, CountryName } from './types';
import { ThemeProvider } from './theme';
import { Header } from './components/Header';
import { Skeleton } from './components/ui/skeleton';

function App() {
  const [countryNames, setCountryNames] = useState<CountryName[]>([]);
  const [value, setValue] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  /** Fetch all country names */
  const fetchCountryNames = async () => {
    const { data }: { data: CountryName[] } = await client.get(
      '/all?fields=name'
    );
    if (data)
      setCountryNames(
        // Sort countries alphabetically
        data.sort((a, b) => {
          const { common: aCommonName } = a.name;
          const { common: bCommonName } = b.name;
          return aCommonName < bCommonName
            ? -1
            : aCommonName > bCommonName
            ? 1
            : 0;
        })
      );
  };

  /** Fetch by country name */
  const fetchByCountry = async (countryName: string) => {
    try {
      setIsFetching(true);
      const { data }: { data: Country[] } = await client.get(
        `/name/${countryName}?fields=name,currencies,flags,coatOfArms,car`
      );
      setSelectedCountry(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCountryNames();
  }, []);

  useEffect(() => {
    if (value) fetchByCountry(value);
  }, [value]);

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="text-primary dark:text-white h-full w-full">
        <Header />
        <div className="container mx-auto py-4">
          <h1 className="text-base font-semibold my-4 text-center md:text-left">
            CHOOSE A COUNTRY TO SEE ITS DETAILS
          </h1>
          <div className="text-center md:text-left">
            <Combobox
              options={countryNames.map(({ name: { common } }) => ({
                value: common,
                label: common,
              }))}
              value={value}
              onChange={(value: string) => setValue(value)}
            />
          </div>
          {selectedCountry && !isFetching ? (
            <div className="flex flex-col mt-14 flex-1 gap-8 md:flex-row mx-6 md:mx-auto">
              <div className="flex flex-col text-left basis-2/6 gap-2">
                <h1 className="text-4xl font-bold">
                  {selectedCountry.name.common}
                </h1>
                <div className="flex gap-2 items-center text-xl">
                  <b>Official Name:</b>
                  <span>{selectedCountry.name.official}</span>
                </div>
                <div className="flex gap-2 items-center text-xl">
                  <b>Currency Name:</b>
                  <span>
                    {getCurrencyName(selectedCountry.currencies) ?? 'N/A'}
                  </span>
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
                <b className="text-left md:text-center">Flag</b>
                {renderFlag(selectedCountry.flags)}
              </div>
              <div className="basis-2/6 flex flex-col">
                <b className="text-left md:text-center">Coat of Arms</b>
                {renderFlag({
                  ...selectedCountry.coatOfArms,
                  alt: 'coat of arms',
                })}
              </div>
            </div>
          ) : isFetching ? (
            <div className="flex flex-col space-y-3 mt-14 mx-6 md:mx-0">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/6" />
                <Skeleton className="h-4 w-2/6" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
