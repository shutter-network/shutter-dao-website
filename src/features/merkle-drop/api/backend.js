export async function fetchTokenEntitlement(address) {
  const response = await fetch(
    process.env.REACT_APP_API_URL + address.toString() + '.json'
  );

  if (!response.ok) {
    if(response.status === 404) {
      return []
    } else {
      const error = new Error(data.message);
      error.code = SERVER_ERROR_CODE;
      throw error;
    }
  } else {
    const data = await response.json();
    return data;
  }
}

export const SERVER_ERROR_CODE = "SERVER_ERROR_CODE";
