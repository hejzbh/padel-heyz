export const truncStr = (str: string, max: number) =>
  str.length > max ? `${str.slice(0, max)}...` : str;
