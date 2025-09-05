import { CarProps, FilterProps } from "@/types";


export async function fetchCars(filters: FilterProps)
 {  const { manufacturer, year, fuel, limit, model } = filters;
  // Получаем 15 моделей Porsche
  const modelsRes = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/porsche?format=json"
  );

  if (!modelsRes.ok) {
    throw new Error(`Ошибка API: ${modelsRes.status}`);
  }

  const modelsData = await modelsRes.json();
  const models = modelsData.Results.slice(0, 6);

  // Используем один пример VIN для всех моделей
  const vinExample = "3VWFE21C04M000001";
  const vinRes = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vinExample}?format=json`
  );

  if (!vinRes.ok) {
    throw new Error(`Ошибка API VIN: ${vinRes.status}`);
  }

  const vinData = await vinRes.json();
  const vinInfo = vinData.Results[0];

  // Присваиваем каждому автомобилю конкретные года, чтобы они не менялись
  const fixedYears = [
    1995, 1998, 2001, 2004, 2007,
    2010, 2012, 2014, 2016, 2017,
    2018, 2019, 2020, 2021, 2022
  ];

  const enriched = models.map((model: any, index: number) => ({
    ...model,
    Year: fixedYears[index], // фиксированные года
    Engine: vinInfo.EngineCylinders + " cyl / " + vinInfo.DisplacementCC + " cc",
    Body: vinInfo.BodyClass,
    Transmission: vinInfo.TransmissionStyle,
    Fuel: vinInfo.FuelTypePrimary,
  }));

  return enriched;
}


export const calculateCarRent = (Year: string, Engine: string, Body: string, Make_Name: string) => {
  const basePrice = 40; // базовая цена аренды

  // 1. Возраст машины
  const age = new Date().getFullYear() - Number(Year);
  const ageFactor = age * 1.5; // старые машины дороже/учитываем страховку

  // 2. Объём двигателя (из Engine)
  const engineCCMatch = Engine.match(/(\d+)\s*cc/);
  const engineCC = engineCCMatch ? Number(engineCCMatch[1]) : 1500; 
  const engineFactor = engineCC / 1000 * 5; // чем мощнее двигатель, тем дороже аренда

  // 3. Тип кузова
  let bodyFactor = 0;
  if (Body.includes('Hatchback') || Body.includes('Liftback')) bodyFactor = 5;
  if (Body.includes('SUV') || Body.includes('Coupe')) bodyFactor = 15;

  // 4. Премиальный бренд
  const brandFactor = Make_Name === 'Porsche' ? 20 : 0;

  // Общая цена
  const rentalRate = basePrice + ageFactor + engineFactor + bodyFactor + brandFactor;

  return rentalRate.toFixed(0);
};


export const updateSearchParams = (type: string, value: string) => {

const searchParams = new URLSearchParams(window.location.search)


    
        searchParams.set(type, value)
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`
return newPathname;
}
