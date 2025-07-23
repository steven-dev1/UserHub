# 🧑‍💻 User Management App

Aplicación web para gestionar usuarios, permitiendo listar, filtrar, agregar, editar y eliminar usuarios obtenidos desde una API o creados manualmente.

---

## 🚀 Stack usado y justificación

| Tecnología | Justificación |
| ---------- | ------------- |
|            |               |

| **Vite + React**      | Vite ofrece un entorno de desarrollo veloz y optimizado. React permite crear interfaces modulares y reutilizables. |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **TypeScript**        | Mejora la robustez del código mediante tipado estático, facilitando el mantenimiento y la escalabilidad.           |
| **Redux Toolkit**     | Facilita el manejo de estado global con una sintaxis simplificada y mejores prácticas integradas.                  |
| **Tailwind CSS**      | Sistema de utilidad para estilos rápidos, consistentes y responsivos.                                              |
| **ESLint + Prettier** | Garantizan un código limpio, consistente y fácil de leer.                                                          |

---

## 🛠 Instrucciones para correr la app

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/steven-dev1/UserHub
   cd UserHub
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. **Abre en tu navegador**

   ```bash
   http://localhost:5173
   ```

---

## 📦 Funcionalidades principales

- 🔍 Filtrado en tiempo real de usuarios
- 🔁 Paginación por usuarios obtenidos desde la API
- ➕ Agregar usuarios manualmente
- ✏️ Editar usuarios (de la API y manuales)
- ❌ Eliminar usuarios manuales
- 🧠 Estado global con Redux Toolkit

---

## 📁 Estructura del proyecto (resumen)

```
src/
│
├── components/         # Componentes reutilizables (Tabla, Formulario, Filtros, etc.)
├── redux/              # Slice de Redux con estados y acciones
├── types              # Definiciones TypeScript para los usuarios
├── utils              # Funciones auxiliares como fetchers o validadores
└── App.tsx             # Componente raíz
```

---

