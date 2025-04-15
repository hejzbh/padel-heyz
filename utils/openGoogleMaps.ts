export const openGoogleMaps = (lat: number | string, lon: number | string) => {
  window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
};

export default openGoogleMaps;
