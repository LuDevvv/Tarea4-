const { Builder, By, until } = require("selenium-webdriver");
const { takeScreenshot } = require("../utils/screenshotUtils");

(async function addProductToCart() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://opencart.abstracta.us/");

    // Tomar captura de pantalla antes de agregar el producto al carrito
    await takeScreenshot(driver, "add_to_cart_home", "before_add");

    // Espera hasta que un producto esté presente en la página de inicio
    await driver.wait(until.elementLocated(By.css(".product-layout")), 5000);

    // Encuentra cualquier producto en la página de inicio y haz clic en él para ver detalles
    const product = await driver.findElement(By.css(".product-layout"));
    await product.click();

    // Espera hasta que el botón "Add to Cart" esté presente y visible antes de hacer clic en él
    await driver.wait(until.elementLocated(By.id("button-cart")), 5000);
    const addToCartButton = await driver.findElement(By.id("button-cart"));
    await addToCartButton.click();

    // Espera hasta que se muestre el mensaje de éxito después de hacer clic en "Add to Cart"
    await driver.wait(until.elementLocated(By.css(".alert-success")), 5000);

    console.log("Product successfully added to cart from the home page.");

    // Tomar captura de pantalla después de agregar el producto al carrito
    await takeScreenshot(driver, "add_to_cart_home", "after_add");
  } finally {
    // await driver.quit();
  }
})();
