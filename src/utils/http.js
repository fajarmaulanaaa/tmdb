import { API_KEY, BASE_URL } from '../config/tmdb';

export async function get(path, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}${path}?${query}`);

  if (!response.ok) {
    throw new Error(`Gagal mengambil data (status ${response.status})`);
  }
  return response.json();
}
