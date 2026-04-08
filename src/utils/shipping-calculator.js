/**
 * Calculate shipping fee based on subtotal and total quantity of items.
 * Rules:
 * - Total > 4,000,000 VND: 0 (Free shipping)
 * - Base fee: 35,000 VND
 * - Each item: +6,000 VND (starts from first item or additional? User: "giá cơ bản là 35k thêm mỗi item là thêm 6k")
 *   - interpretation: 35k + (count * 6k). 
 *     Example: 1 item = 35k + 6k = 41k. 
 *     Actually, if base is 35k, adding 1 item should probably be 35 + 6 if the base is 0-indexed, 
 *     but usually "base price" is for the first "unit of work".
 *     Let's assume: 35000 + (totalQuantity * 6000) capped at 50,000.
 *     BUT wait, user said "giá cơ bản là 35k thêm mỗi item là thêm 6k".
 *     If I have 1 item, is it 35k or 41k? 
 *     Let's compare: 
 *     If 1 item = 35k, 2 items = 41k, 3 items = 47k.
 *     This makes more sense for a 50k cap.
 * - Max shipping fee: 50,000 VND.
 */
export const calculateShippingFee = (subtotal, items) => {
  if (subtotal >= 4000000) return 0;
  
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  if (totalQuantity === 0) return 0;
  
  // Base 35k covers the first item, each ADDITIONAL item adds 6k
  const fee = 35000 + (totalQuantity - 1) * 6000;
  
  return Math.min(fee, 50000);
};
