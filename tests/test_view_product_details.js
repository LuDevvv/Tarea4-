const { Builder, By, until } = require("selenium-webdriver");
const { takeScreenshot } = require("../utils/screenshotUtils");

(async function viewProductDetails() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "https://opencart.abstracta.us/index.php?route=product/product&product_id=43"
    );

    // Tomar captura de pantalla antes de hacer clic en la imagen
    await takeScreenshot(driver, "view_product_details", "before_click");

    // Espera hasta que al menos una imagen esté presente en la descripción o hasta 10 segundos
    const image = await driver.wait(
      until.elementLocated(By.css(".image-additional img")),
      10000
    );

    console.log("Image is displayed in the product description.");

    // Clic en la imagen adicional para abrirla
    await image.click();

    // Espera hasta que la imagen se abra completamente
    await driver.wait(until.elementLocated(By.css(".mfp-figure")), 10000);

    console.log("Image opened successfully.");

    // Tomar captura de pantalla después de abrir la imagen
    await takeScreenshot(driver, "view_product_details", "after_open");

    // Espera hasta que el botón de cierre esté presente o hasta 5 segundos
    const closeButton = await driver.wait(
      until.elementLocated(By.css(".mfp-close")),
      5000
    );

    console.log("Close button is present.");

    // Clic en el botón de cierre para cerrar la imagen
    await closeButton.click();

    console.log("Image closed successfully.");

    // Tomar captura de pantalla después de cerrar la imagen
    await takeScreenshot(driver, "view_product_details", "after_close");

    console.log("Image can be opened and closed successfully.");
  } catch (e) {
    console.log(e);
    // await driver.quit();
  }
})();
