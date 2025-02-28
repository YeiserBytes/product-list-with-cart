# Product List with Cart Application

![Vista principal de la aplicación](preview.jpg)

## Mi Proyecto

Este es mi solución para el desafío de Frontend Mentor de crear una aplicación de lista de productos con carrito de compras. He desarrollado esta aplicación para mejorar mis habilidades de desarrollo frontend, poniendo especial énfasis en la experiencia del usuario y la arquitectura del código.

## Screenshots del Proyecto

![Vista de la aplicación final](./Screenshot.png)
- ✅ Aumentar/disminuir la cantidad de cada producto en el carrito
- ✅ Modal de confirmación de pedido
- ✅ Opción para iniciar un nuevo pedido
- ✅ Diseño totalmente responsivo para móvil y escritorio
- ✅ Estados visuales para elementos interactivos (hover, focus)
- ✅ Cálculo automático de totales
- ✅ Persistencia de datos del carrito entre sesiones

## Mi Proceso

### Tecnologías Utilizadas

- HTML5 semántico
- CSS personalizado con enfoque mobile-first
- JavaScript ES6+
- React.js como framework principal
- Context API para el manejo del estado
- Styled Components para los estilos
- Vite como herramienta de construcción

### Lo Que He Aprendido

Durante este proyecto, logré profundizar mi conocimiento en:

- Gestión eficiente del estado con React Context API
- Creación de hooks personalizados para lógica reutilizable
- Técnicas de renderizado condicional para diferentes estados de la UI
- Implementación de una experiencia de usuario intuitiva para el proceso de compra
- Optimización del rendimiento en aplicaciones React

```jsx
// Ejemplo del hook personalizado que creé para el manejo del carrito
function useCart() {
  const [items, setItems] = useState([]);

  const addToCart = (product, quantity) => {
    // Lógica para añadir al carrito con verificación de duplicados
  };

  // Otros métodos útiles: removeItem, updateQuantity, clearCart, etc.

  return { items, addToCart, /* otros métodos */ };
}
```

### Problemas y Soluciones

Me enfrenté al reto de mantener sincronizado el estado del carrito con el almacenamiento local para la persistencia de datos. Lo resolví implementando un efecto personalizado que guarda los cambios del carrito en localStorage y los recupera al iniciar la aplicación.

## Cómo Ejecutar Este Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/mi-usuario/product-list-with-cart.git
   cd product-list-with-cart
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## Futuras Mejoras

Planeo seguir mejorando este proyecto con:

- [x] Implementar animaciones para mejorar la experiencia del usuario
- [ ] Añadir un sistema de filtrado y búsqueda de productos
- [ ] Integrar una API de pagos simulada
- [ ] Mejorar la accesibilidad con pruebas WCAG
- [ ] Añadir tests unitarios y de integración

## Reflexiones

Este proyecto me ha permitido aplicar principios de diseño de interfaces y desarrollo de componentes reutilizables. Ha sido una excelente oportunidad para practicar la implementación de patrones de arquitectura frontend modernos.

---

Proyecto basado en un desafío de [Frontend Mentor](https://www.frontendmentor.io)
