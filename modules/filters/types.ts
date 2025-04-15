export enum FilterTypeEnum {
  CHECHBOX = "checkbox",
  INPUT = "input",
  LOCATION_SEARCH = "search",
  RANGE = "range",
}

export type Filter = {
  label: string;
  name: string;
  active: boolean;
  type: FilterTypeEnum;
  options?: { label: string; value: string }[];
  value: any;
  visible?: boolean;
};

export type Location = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: string[] | number[];
};
