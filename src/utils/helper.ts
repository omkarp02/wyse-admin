import { useBoundStore } from "../store/store";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let persistedToken: string | null = null;

export const getToken = () => {
  if (!persistedToken) {
    const { token } = useBoundStore.getState();
    persistedToken = token;
    return token;
  } else {
    return persistedToken;
  }
};

export function slugify(text: string) {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading & trailing spaces
    .normalize("NFD") // Normalize accents (e.g., é → e)
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove duplicate hyphens
}
