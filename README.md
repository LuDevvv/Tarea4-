# Tarea 4 - Automatización de pruebas con Selenium WebDriver

Este proyecto consiste en una serie de scripts de automatización de pruebas utilizando Selenium WebDriver para realizar pruebas en un sitio web de demostración de OpenCart.

## Requisitos previos

- Node.js
- npm (administrador de paquetes de Node.js)
- Chrome WebDriver (o el controlador adecuado para tu navegador de elección)

## Configuración del entorno

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando npm:

3. Asegúrate de tener el controlador WebDriver correspondiente instalado y configurado en tu sistema.

## Scripts disponibles

### Test de búsqueda de productos (`test_add_product_to_card.js`)

### Test de búsqueda de productos (`test_search_products.js`)

Este script realiza una búsqueda de un producto en el sitio web de OpenCart y verifica que los resultados sean correctos.

### Test de agregado y eliminación de productos del carrito (`test_add_and_remove_product_from_cart.js`)

Este script agrega un producto al carrito de compras, verifica que se haya agregado correctamente y luego lo elimina del carrito.

### Test de revisión del carrito de compras (`test_review_shopping_cart.js`)

Este script agrega los dos primeros productos disponibles en la página de inicio al carrito de compras y luego revisa los detalles del carrito.

### Test de visualización de detalles del producto (`test_view_product_details.js`)

Este script abre los detalles de un producto en el sitio web de OpenCart y verifica que la imagen se pueda abrir y cerrar correctamente.

## Ejecución de los scripts

Para ejecutar cualquiera de los scripts de prueba, simplemente ejecuta el siguiente comando en la terminal:

Reemplaza `nombre_del_script.js` por el nombre del archivo del script que deseas ejecutar.

Ejemplo:

`node test_review_shopping_cart.js`
