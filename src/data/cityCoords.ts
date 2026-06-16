// Hand-verified coordinates for every HQ city in vcDirectory.json.
// Keyed by the exact `location` string so VcMap can look up directly.
export const cityCoords: Record<string, [number, number]> = {
  "Menlo Park, US":      [37.4530, -122.1817],
  "San Francisco, US":   [37.7749, -122.4194],
  "Palo Alto, US":       [37.4419, -122.1430],
  "Mountain View, US":   [37.3861, -122.0839],
  "Boston, US":          [42.3601,  -71.0589],
  "New York, US":        [40.7128,  -74.0060],
  "Chicago, US":         [41.8781,  -87.6298],
  "Alexandria, US":      [38.8048,  -77.0469],
  "Kirkland, US":        [47.6769, -122.2060],
  "Truckee, US":         [39.3280, -120.1833],
  "London, UK":          [51.5074,   -0.1278],
  "Stockholm, Sweden":   [59.3293,   18.0686],
  "Berlin, Germany":     [52.5200,   13.4050],
  "Munich, Germany":     [48.1351,   11.5820],
  "Vienna, Austria":     [48.2082,   16.3738],
  "Zurich, Switzerland": [47.3769,    8.5417],
  "Toronto, Canada":     [43.6532,  -79.3832],
};
