const { Builder, By, until } = require("selenium-webdriver");
const { takeScreenshot } = require("../utils/screenshotUtils");

(async function addAndRemoveProductFromCart() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Agregar producto al carrito
    await driver.get(
      "https://opencart.abstracta.us/index.php?route=product/product&product_id=43"
    );
    const addToCartButton = await driver.wait(
      until.elementLocated(By.id("button-cart")),
      5000
    );
    await addToCartButton.click();
    await driver.wait(until.elementLocated(By.css(".alert-success")), 5000);

    // Tomar captura de pantalla después de agregar el producto al carrito
    await takeScreenshot(driver, "add_and_remove_product", "after_add");

    // Ir al carrito de compras
    await driver.get(
      "https://opencart.abstracta.us/index.php?route=checkout/cart"
    );

    // Tomar captura de pantalla antes de intentar eliminar el producto del carrito
    await takeScreenshot(driver, "add_and_remove_product", "before_remove");

    // Espera hasta que el botón de eliminar producto esté presente y visible antes de hacer clic en él
    const removeButton = await driver.wait(
      until.elementLocated(
        By.css("button[data-toggle='tooltip'][onclick*='remove']")
      ),
      10000
    );
    await removeButton.click();

    // Espera hasta que se muestre el mensaje de confirmación después de eliminar el producto
    try {
      await driver.wait(until.elementLocated(By.css(".alert-warning")), 10000);
    } catch (error) {
      console.log("Warning message not found after removing product.");
    }

    // Tomar captura de pantalla después de eliminar el producto del carrito
    await takeScreenshot(driver, "add_and_remove_product", "after_remove");

    console.log("Product successfully added to cart and removed.");
  } finally {
    // await driver.quit();
  }
})();
