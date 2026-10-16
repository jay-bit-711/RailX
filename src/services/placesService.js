/**
 * Automated first/last-mile discovery around station anchors.
 * Uses Places API (New) Nearby Search.
 * Key must be in VITE_GOOGLE_MAPS_KEY and restricted to the host domains.
 */

const KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

/**
 * Fetch places near a lat/lng within radius (meters).
 * Falls back gracefully if key missing or request fails (CORS / quota / restriction).
 */
export async function nearbyPlaces(lat, lng, radius = 8000, maxResults = 12) {
  if (!KEY) {
    return { error: 'VITE_GOOGLE_MAPS_KEY missing', places: [] };
  }

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.types,places.id'
      },
      body: JSON.stringify({
        includedTypes: ['locality', 'neighborhood', 'sublocality', 'bus_station', 'transit_station', 'point_of_interest'],
        maxResultCount: maxResults,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius
          }
        },
        rankPreference: 'DISTANCE'
      })
    });

    if (!res.ok) {
      const text = await res.text();
      return { error: `Places ${res.status}: ${text.slice(0, 200)}`, places: [] };
    }

    const data = await res.json();
    const places = (data.places || []).map((p) => ({
      id: p.id,
      name: p.displayName?.text || 'Place',
      address: p.formattedAddress || '',
      lat: p.location?.latitude,
      lng: p.location?.longitude,
      types: p.types || []
    }));

    return { places };
  } catch (err) {
    return { error: err.message || 'Places fetch failed', places: [] };
  }
}

/** Convenience: nearby by station code (looks up lat/lng from corridor data) */
export async function nearbyByStationCode(code, corridorLookup) {
  const station = corridorLookup(code);
  if (!station?.lat || !station?.lng) {
    return { error: 'Station missing lat/lng', places: [] };
  }
  return nearbyPlaces(station.lat, station.lng);
}
