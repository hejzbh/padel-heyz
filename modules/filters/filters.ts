import { HomeSearchParams } from "@/app/page";
import { Filter, FilterTypeEnum } from "./types";

export const getFilters = (searchParams: HomeSearchParams): Filter[] => [
  {
    label: "Country, City or ZIP",
    name: "q",
    type: FilterTypeEnum.LOCATION_SEARCH,
    active: searchParams?.q ? true : false,
    value: searchParams.q,
    visible: true,
  },
  {
    label: "LAT",
    name: "lat",
    type: FilterTypeEnum.INPUT,
    active: searchParams?.lat ? true : false,
    value: searchParams.lat,
  },
  {
    label: "LON",
    name: "lon",
    type: FilterTypeEnum.INPUT,
    active: searchParams?.lon ? true : false,
    value: searchParams.lon,
  },
  {
    label: "BOUNDING",
    name: "boundingbox",
    type: FilterTypeEnum.INPUT,
    active: searchParams?.boundingbox ? true : false,
    value: searchParams.boundingbox,
  },
];

/*  {
    label: "Range",
    name: "range",
    type: FilterTypeEnum.RANGE,
    active: searchParams?.range ? true : false,
    value: searchParams.range,
    visible: true,
  },
  {
    label: "LAT",
    name: "lat",
    type: FilterTypeEnum.INPUT,
    active: searchParams?.lat ? true : false,
    value: searchParams.lat,
  },
  {
    label: "LON",
    name: "lon",
    type: FilterTypeEnum.INPUT,
    active: searchParams?.lon ? true : false,
    value: searchParams.lon,
  },
  {
    label: "LON",
    name: "lon",
    type: FilterTypeEnum.INPUT,
    active: searchParams?.lon ? true : false,
    value: searchParams.lon,
  }, */
