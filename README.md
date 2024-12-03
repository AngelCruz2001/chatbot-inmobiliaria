# Chatbot - MVP para Iactive

Este proyecto es un **MVP (Producto Mínimo Viable)** desarrollado para **Iactive**, diseñado como una propuesta inicial para un chatbot interactivo que proporciona soporte automatizado a los usuarios. 

El objetivo principal es probar funcionalidades clave y obtener una mejor comprensión de los requerimientos finales para desarrollar un producto robusto y funcional.

---

## **Estado del proyecto**
- Este chatbot **aún no está conectado a un backend completo**.
- Los productos se muestran en **todos los mensajes** de manera estática, ya que no se ha definido completamente la lógica de respuestas dinámicas.
- Es una **propuesta inicial** para evaluación interna, y está sujeta a cambios basados en el feedback y los objetivos finales del cliente.

---

## **Características actuales**

### 1. **Chat interactivo**
- Permite a los usuarios enviar y recibir mensajes simulados.
- La comunicación está diseñada para trabajar con una API:
  `https://rag-muebleria-production.up.railway.app/chat`.

---

### 2. **Respuestas enriquecidas**
- Prototipo funcional para mostrar productos en un carrusel:
  - Nombre del producto.
  - Descripción.
  - Precio.
  - Imagen (URL estática).
  - Botones de acción como "Comprar" o "Ver detalles".
- **Nota**: Los datos son estáticos y representan un prototipo.

---

### 3. **Animaciones suaves**
- **Fade-in** y **fade-out** al abrir y cerrar el chatbot.
- Transiciones con `opacity` y `translate` para una experiencia de usuario más fluida.

---

### 4. **Avatares dinámicos**
- Generación automática de avatares para el usuario y el bot utilizando la **API de DiceBear**.
- Cada avatar es único y generado dinámicamente.

---

### 5. **Indicador de carga**
- Muestra un indicador visual de "pensando" mientras el bot procesa una respuesta.

---

### 6. **Scroll automático**
- Desplaza automáticamente hacia el último mensaje para mantener el contexto visible.

---

## **Tecnologías utilizadas**

### **Frontend**
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida y ligera.
- **Tailwind CSS**: Framework de diseño utilitario para estilos rápidos y consistentes.
- **TypeScript**: Mejora la calidad del código con tipado estático.

### **Otras tecnologías**
- **DiceBear API**: Generación dinámica de avatares.
- **gh-pages**: Despliegue en GitHub Pages.

---

## **Instalación**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
