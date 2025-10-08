/**
 * Creates a telephone URL for phone numbers
 */
export function createPhoneUrl(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `tel:+1${cleanPhone}`;
}

/**
 * Creates a Google Maps URL for a location
 */
export function createGoogleMapsUrl(businessName: string, address: string): string {
  const query = encodeURIComponent(`${businessName}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Creates a mailto URL
 */
export function createMailtoUrl(email: string, subject?: string): string {
  const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${subjectParam}`;
}
