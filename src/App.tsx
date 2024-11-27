import './App.css';
import { useEffect, useState } from 'react';
import { client } from './api/client';
import { Combobox } from './components/Combobox';
import { Country, CountryName } from './types';
import { ThemeProvider } from './theme';
import { Header } from './components/Header';
import { CountryDetails } from './components/CountryDetails';
import { Loading } from './components/Loading';

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="text-gray-700 dark:text-gray-300 h-full w-full">
        <Header />
        <div className="container mx-auto py-10">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold my-4 text-center md:text-left">
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
          </div>
          {selectedCountry && !isFetching ? (
            <CountryDetails selectedCountry={selectedCountry} />
          ) : isFetching ? (
            <Loading />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
