const normalizeAddress = (name) => {
  if (!name) return "";

  return name
    .replace(/^Thành phố\s+/i, "")
    .replace(/^Tỉnh\s+/i, "")
    .replace(/^Quận\s+/i, "")
    .replace(/^Huyện\s+/i, "")
    .replace(/^Phường\s+/i, "")
    .replace(/^Thị xã\s+/i, "")
    .replace(/^Thị trấn\s+/i, "")
    .replace(/^Xã\s+/i, "")
    .trim();
};

export default normalizeAddress;
