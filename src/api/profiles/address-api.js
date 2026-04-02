export const fetchProvinces = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/provinces`);
  if (!res.ok) {
    throw new Error("Failed to fetch provinces");
  }
  return res.json();
};

export const fetchDistricts = async (provinceCode) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/provinces/${provinceCode}?depth=2`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch districts");
  }
  return res.json();
};
