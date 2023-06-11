const getCouponDiscountAmount = (plan, planType, coupon) => {
  if (coupon.amountType === "price") {
    const actualPrice = plan.price[`${planType}ly`] - coupon.amount;
    return { actualPrice, discountedPrice: coupon.amount };
  }
  if (coupon.amountType === "percentage") {
    const discountedPrice = Math.trunc(
      (plan.price[`${planType}ly`] / 100) * coupon.amount
    );
    const actualPrice = plan.price[`${planType}ly`] - discountedPrice;
    return { actualPrice, discountedPrice, discountPercentage: coupon.amount };
  }
};

export { getCouponDiscountAmount };
