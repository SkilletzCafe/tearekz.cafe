interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export function buildFullAddress(location: Location): string {
  return `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
}
