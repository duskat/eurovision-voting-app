// Map of Eurovision countries to their ISO 3166-1 alpha-2 codes
export const countryToCode = {
  Albania: 'AL',
  Armenia: 'AM',
  Australia: 'AU',
  Austria: 'AT',
  Azerbaijan: 'AZ',
  Belgium: 'BE',
  Croatia: 'HR',
  Cyprus: 'CY',
  Czechia: 'CZ',
  Denmark: 'DK',
  Estonia: 'EE',
  Finland: 'FI',
  France: 'FR',
  Georgia: 'GE',
  Germany: 'DE',
  Greece: 'GR',
  Iceland: 'IS',
  Ireland: 'IE',
  Israel: 'IL',
  Italy: 'IT',
  Latvia: 'LV',
  Lithuania: 'LT',
  Luxembourg: 'LU',
  Malta: 'MT',
  Moldova: 'MD',
  Netherlands: 'NL',
  Norway: 'NO',
  Poland: 'PL',
  Portugal: 'PT',
  Romania: 'RO',
  'San Marino': 'SM',
  Serbia: 'RS',
  Slovenia: 'SI',
  Spain: 'ES',
  Sweden: 'SE',
  Switzerland: 'CH',
  Ukraine: 'UA',
  'United Kingdom': 'GB',
};

// Convert country code to flag emoji
export const getCountryFlag = (countryName) => {
  const code = countryToCode[countryName];
  if (!code) return '';

  // Convert country code to flag emoji
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
};
