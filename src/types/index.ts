export type CountryName = {
  name: {
    common: string;
    nativeName: {
      eng: {
        common: string;
        official: string;
      };
    };
    official: string;
  };
};

export type Country = {
  name: CountryName['name'];
  currencies: {
    [T: string]: {
      name: string;
      symbol: string;
    };
  };
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  car: {
    side: string;
    signs: string[];
  };
};
