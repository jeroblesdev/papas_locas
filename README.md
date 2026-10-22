# 🍟 Papas Locas - Landing Page

Página web interactiva para el negocio de comida rápida "Papas Locas". 

## 🚀 Características
*   **Diseño 100% Responsive:** Adaptado para celulares, tablets y computadoras.
*   **Carrito de Compras:** Permite a los usuarios sumar, restar y eliminar productos en tiempo real.
*   **Integración con WhatsApp:** Al finalizar el pedido, se genera un mensaje con el detalle exacto (productos, cantidades y total) y se envía directamente al número del negocio.
*   **Optimizado:** Uso de CSS Grid, Flexbox y JavaScript puro (Vanilla JS) sin dependencias externas.

## 🛠️ Tecnologías
*   HTML5
*   CSS3
*   JavaScript (ES6+)

## ⚙️ Configuración (Para el desarrollador)
Si necesitas actualizar el número de WhatsApp del negocio, dirígete al archivo `script.js`, busca la función `confirmarPedido()` y cambia la siguiente línea:

```javascript
const numeroWhatsApp = "591XXXXXXXX"; // Reemplazar con el número real
