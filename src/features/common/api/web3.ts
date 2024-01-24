/// Queries the default account. Returns undefined if wallet locked, or if website has no permission to query.
/// Compares two hex encoded addresses ignoring the checksum
export function sameAddress(address1, address2) {
  return address1.toLowerCase() === address2.toLowerCase();
}
