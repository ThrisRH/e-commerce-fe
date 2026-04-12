/**
 * Sorts an array of attribute values alphabetically by attribute name, then by value.
 * @param {Array} values - The list of attribute value objects.
 * @returns {Array} - The sorted list.
 */
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

/**
 * Filters attribute values based on a list of allowed attribute IDs.
 * @param {Array} values - All available attribute values.
 * @param {Array} allowedAttributes - List of attributes (or IDs) that are allowed.
 * @returns {Array} - Filtered and sorted list.
 */
export const filterAttributeValuesByAttributes = (values, allowedAttributes) => {
  if (!Array.isArray(values) || !Array.isArray(allowedAttributes)) return [];
  
  const allowedIds = allowedAttributes.map(attr => 
    typeof attr === 'object' ? attr.id : attr
  );

  const filtered = values.filter(v => allowedIds.includes(v.attribute_id));
  return sortAttributeValues(filtered);
};
