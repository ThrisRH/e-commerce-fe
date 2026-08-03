
export const sortAttributeValues = (values) => {
  if (!Array.isArray(values)) return [];

  return [...values].sort((a, b) => {
    const nameA = a.attribute_name?.toLowerCase() || "";
    const nameB = b.attribute_name?.toLowerCase() || "";

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    const valA = a.value?.toString().toLowerCase() || "";
    const valB = b.value?.toString().toLowerCase() || "";

    if (valA < valB) return -1;
    if (valA > valB) return 1;

    return 0;
  });
};


export const filterAttributeValuesByAttributes = (
  values,
  allowedAttributes,
) => {
  if (!Array.isArray(values) || !Array.isArray(allowedAttributes)) return [];

  const allowedIds = allowedAttributes.map((attr) =>
    typeof attr === "object" ? attr.id : attr,
  );

  const filtered = values.filter((v) => allowedIds.includes(v.attribute_id));
  return sortAttributeValues(filtered);
};
