const fs = require("fs");
const path = require("path");

/**
 * Toma una captura de pantalla y la guarda en una carpeta específica para el test.
 * @param {Object} driver El controlador de Selenium WebDriver.
 * @param {string} testName El nombre del test.
 * @param {number} step El número de paso de la prueba.
 */
async function takeScreenshot(driver, testName, step) {
  try {
    // Toma la captura de pantalla
    const screenshot = await driver.takeScreenshot();

    // Directorio donde se guardarán las capturas de pantalla para este test
    const screenshotsDir = path.join(__dirname, "screenshots", testName);

    // Verifica si el directorio existe, si no, lo crea
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Ruta completa del archivo de captura de pantalla
    const filePath = path.join(screenshotsDir, `step${step}.png`);

    // Guarda la captura de pantalla en el archivo
    fs.writeFileSync(filePath, screenshot, "base64");

    // Imprime un mensaje indicando que la captura de pantalla se ha guardado correctamente
    console.log(`Screenshot saved: ${filePath}`);
  } catch (error) {
    // Manejo de errores: imprime un mensaje de error si hay algún problema al tomar o guardar la captura de pantalla
    console.error("Error while taking screenshot:", error);
  }
}

module.exports = {
  takeScreenshot,
};
