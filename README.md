# El Buen Sabor - Frontend

![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=vite)
![Sass](https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=sass)
![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-593D88.svg?style=for-the-badge&logo=react-bootstrap)
![Auth0](https://img.shields.io/badge/Auth0-EB5424.svg?style=for-the-badge&logo=auth0)

---

## 📝 Descripción del Proyecto
Este repositorio contiene el código fuente del frontend para la aplicación web **"El Buen Sabor"**. Desarrollado como una **Aplicación de Página Única (SPA)** con React y TypeScript, este proyecto ofrece una experiencia de usuario fluida e interactiva.

La aplicación se comunica con una API RESTful de backend para proporcionar un sistema de gestión de pedidos de comida completo, incluyendo vistas especializadas y actualizadas en **tiempo real** para los diferentes roles del negocio (Clientes, Cajeros, Cocineros, etc.).

---

## ✨ Características Principales
- **Menú y Búsqueda Inteligente**: Explora productos, filtra por categorías y utiliza una barra de búsqueda global para encontrar artículos rápidamente.
- **Carrito de Compras Persistente**: El carrito está vinculado a la cuenta del usuario, guardando su contenido entre sesiones. Incluye un modal para gestionar cantidades y eliminar productos fácilmente.
- **Proceso de Checkout Avanzado**: Un flujo de compra completo que permite seleccionar sucursal, tipo de envío (Delivery/Take Away), gestionar domicilios y pagar de forma segura a través de **Mercado Pago**.
- **Cálculo de Descuentos Dinámico**: El sistema aplica automáticamente promociones (2x1, combos, porcentajes) y descuentos por forma de pago directamente en el checkout.
- **Autenticación y Perfil de Usuario**:
    -   Inicio de sesión seguro mediante **Auth0**, con soporte para login social (Google).
    -   Protección de rutas basada en roles (`CLIENTE`, `ADMIN`, `EMPLEADO`).
    -   Perfil de usuario editable, incluyendo un gestor completo de domicilios integrado.
- **Vistas de Empleado por Rol (En Tiempo Real)**:
    -   **Cajero**: Visualiza y aprueba nuevos pedidos que llegan al instante.
    -   **Cocinero**: Recibe los pedidos aprobados en su panel, puede consultar recetas y marcar los pedidos como listos.
    -   **Delivery**: Accede a una vista con los pedidos asignados para su entrega.
    -   Todas las vistas se actualizan automáticamente mediante **WebSockets**.
- **Panel de Administración Completo**:
    -   **Gestión de Catálogo**: ABMC de Artículos Insumo y Manufacturados.
    -   **Gestión de Categorías**: ABMC de rubros y sub-rubros.
    -   **Gestión de Promociones**: ABMC de promociones con diferentes tipos y asignación por sucursal.
    -   **Gestión de Sucursales**: ABMC de locales del negocio.
    -   **Gestión de Usuarios**: Activación/desactivación de clientes y usuarios.
- **Módulo de Estadísticas**:
    -   Visualización de rankings de productos más vendidos y de clientes con más compras.
    -   Reporte de movimientos monetarios (ingresos, costos y ganancias).
    -   Todos los reportes son filtrables por fecha y **exportables a Excel**.

---

## 📦 Estructura del Proyecto
El frontend sigue una estructura modular para facilitar la mantenibilidad y escalabilidad:

```
src/
├── assets/                  # Activos estáticos (imágenes, logos)
├── components/              # Componentes React reutilizables
│   ├── admin/               # Formularios y UI para el panel de administración
│   ├── auth/                # Componentes de autenticación (PrivateRoute, etc.)
│   ├── common/              # Componentes comunes (Header, Footer, SucursalSelector)
│   ├── cart/                # Componentes del carrito de compras
│   ├── pedidos/             # Componentes para visualizar pedidos
│   ├── products/            # Componentes de productos (Card, DetalleModal)
│   └── (otros...)
├── context/                 # Contextos de React para estado global (UserContext, CartContext)
├── hooks/                   # Hooks personalizados (ej. useWebSocket)
├── pages/                   # Componentes de página (vistas principales)
├── services/                # Módulos para interactuar con la API (Axios configurado)
├── styles/                  # Archivos SASS globales, variables y mixins
├── types/                   # Definiciones de tipos e interfaces TypeScript
├── App.tsx                  # Componente raíz y configuración de rutas
└── main.tsx                 # Punto de entrada de la aplicación (renderizado y providers)
```

---

## 🛠️ Tecnologías Utilizadas
- **Framework Principal**: React 18 con Vite.
- **Lenguaje**: TypeScript.
- **Componentes de UI**: React Bootstrap y SASS.
- **Enrutamiento**: React Router DOM v6.
- **Gestión de Estado**: React Context API.
- **Cliente HTTP**: Axios.
- **Comunicación en Tiempo Real**: SockJS y StompJS.
- **Autenticación**: Auth0 React SPA SDK.
- **Iconografía**: Font Awesome.
- **Sliders/Carruseles**: Swiper.js.
- **Manipulación de Fechas**: `date-fns`.
- **Notificaciones**: `react-hot-toast`.

---

## 🚀 Puesta en Marcha (Desarrollo)

#### 1. Clona el repositorio
```bash
git clone [URL_DEL_REPOSITORIO_FRONTEND]
cd el-buen-sabor-frontend
```

#### 2. Instala las dependencias
Asegúrate de tener Node.js (v18 o superior) y npm instalados.
```bash
npm install
```

#### 3. Variables de Entorno (`.env`)
Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
```env
# URL de la API Backend
VITE_API_URL=http://localhost:8080/api

# Credenciales de Auth0
VITE_AUTH0_DOMAIN=tu-dominio.us.auth0.com
VITE_AUTH0_CLIENT_ID=tu_client_id_de_spa
VITE_AUTH0_AUDIENCE=tu_api_identifier

# Credenciales de Mercado Pago
VITE_MERCADOPAGO_PUBLIC_KEY=tu_public_key
```

#### 4. Configuración de Auth0 (Dashboard)
Ve a tu dashboard de Auth0 y configura una **Aplicación (Single Page Application)**:
- **Allowed Callback URLs**: `http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`

#### 5. Configuración de Roles en Auth0
Para que la protección de rutas y las vistas por rol funcionen, debes asignar los roles a tus usuarios de prueba directamente en el **metadata** de Auth0.
1.  Ve a **User Management > Users** en tu dashboard de Auth0.
2.  Selecciona el usuario que quieras que sea administrador o empleado.
3.  Ve a la pestaña **"Metadata"**.
4.  En la sección **`app_metadata`**, añade los roles. La estructura debe ser la siguiente:

    **Para un usuario Administrador:**
    ```json
    {
      "roles": ["ADMIN", "EMPLEADO"]
    }
    ```

    **Para un usuario Cajero:**
    ```json
    {
      "roles": ["EMPLEADO"],
      "rol_empleado": "CAJERO"
    }
    ```
> **Nota:** El backend leerá estos roles del token JWT para conceder los permisos adecuados. Un usuario sin roles en `app_metadata` será tratado como `CLIENTE` por defecto.

#### 6. Iniciar la Aplicación
Asegúrate de que tu servidor backend de Spring Boot esté corriendo.
```bash
npm run dev
```
La aplicación se iniciará en `http://localhost:5173`.
