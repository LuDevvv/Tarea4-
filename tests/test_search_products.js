const { Builder, By, Key, until } = require("selenium-webdriver");
const { takeScreenshot } = require("../utils/screenshotUtils");

(async function searchAndInteractWithProduct() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://opencart.abstracta.us/");

    // Tomar captura de pantalla antes de realizar la búsqueda
    await takeScreenshot(driver, "search_and_interact", "before_search");

    // Ubica el campo de búsqueda e ingresa el nombre del producto
    const searchInput = await driver.findElement(By.name("search"));
    await searchInput.sendKeys("Iphone", Key.RETURN);

    // Espera a que los resultados de búsqueda se carguen
    await driver.wait(until.elementLocated(By.css(".product-layout")), 5000);

    // Ahora, puedes interactuar con los resultados de la búsqueda
    // Por ejemplo, hacer clic en un producto para ver sus detalles o agregarlo al carrito

    console.log("Product successfully found and actions can be performed.");

    // Tomar captura de pantalla después de realizar la búsqueda
    await takeScreenshot(driver, "search_and_interact", "after_search");
  } catch (e) {
    console.log(e);
    // await driver.quit();
  }
})();
