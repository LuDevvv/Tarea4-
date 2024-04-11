const { Builder, By, until } = require("selenium-webdriver");
const { takeScreenshot } = require("../utils/screenshotUtils");

(async function reviewShoppingCart() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://opencart.abstracta.us/");

    // Tomar captura de pantalla antes de agregar los productos al carrito
    await takeScreenshot(driver, "review_shopping_cart", "before_add");

    // Espera hasta que los productos estén presentes en la página de inicio
    await driver.wait(until.elementLocated(By.css(".product-layout")), 10000);

    // Encuentra los dos primeros elementos de productos disponibles
    const products = await driver.findElements(
      By.css(".product-layout .product-thumb")
    );

    // Verifica si hay al menos dos productos disponibles en la página de inicio
    if (products.length >= 2) {
      // Agrega los dos primeros productos al carrito
      for (let i = 0; i < 2; i++) {
        const currentProduct = await driver.findElements(
          By.css(".product-layout .product-thumb")
        );

        // Hacer clic en el producto para ir a su página de detalles
        await currentProduct[i].click();

        // Espera hasta que el botón "Add to Cart" esté presente y visible antes de hacer clic en él
        await driver.wait(until.elementLocated(By.id("button-cart")), 5000);
        const addToCartButton = await driver.findElement(By.id("button-cart"));
        await addToCartButton.click();

        // Espera hasta que se muestre el mensaje de éxito después de hacer clic en "Add to Cart"
        await driver.wait(until.elementLocated(By.css(".alert-success")), 5000);

        // Regresar a la página de inicio para agregar el siguiente producto
        await driver.get("https://opencart.abstracta.us/");

        // Espera hasta que los productos estén presentes en la página de inicio antes de continuar
        await driver.wait(
          until.elementLocated(By.css(".product-layout")),
          10000
        );
      }
    }

    // Tomar captura de pantalla después de agregar los productos al carrito
    await takeScreenshot(driver, "review_shopping_cart", "after_add");

    // Ir al carrito de compras para revisar los detalles
    await driver.get(
      "https://opencart.abstracta.us/index.php?route=checkout/cart"
    );

    // Espera hasta que la página de detalles del carrito esté completamente cargada
    await driver.wait(until.titleIs("Shopping Cart"), 10000);

    // Tomar captura de pantalla después de llegar al carrito de compras
    await takeScreenshot(driver, "review_shopping_cart", "after_review");
  } finally {
    // await driver.quit();
  }
})();
