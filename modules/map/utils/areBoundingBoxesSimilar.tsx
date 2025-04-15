function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the Earth in km
  const toRad = (angle: number) => angle * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getBoundingBoxCenter(bbox: number[]) {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  return [(minLat + maxLat) / 2, (minLon + maxLon) / 2];
}

export default function areBoundingBoxesSimilar(
  bbox1: number[],
  bbox2: number[],
  threshold = 150
) {
  const [lat1, lon1] = getBoundingBoxCenter(bbox1);
  const [lat2, lon2] = getBoundingBoxCenter(bbox2);

  const distance = haversineDistance(lat1, lon1, lat2, lon2);
  return distance <= threshold;
}
