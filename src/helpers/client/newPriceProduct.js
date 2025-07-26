function newPriceProduct(products) {
  let products1 = products.map((item) => {
    let oldPrice = item.price - (item.price * item.discountPercentage) / 100;

    item["oldPrice"] = oldPrice.toFixed(0);
    return item;
  });

  return products1;
}

module.exports = newPriceProduct;
