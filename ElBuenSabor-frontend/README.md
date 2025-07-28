🚀 Frontend de El Buen Sabor
✨ Características Principales
Menú Dinámico Multi-Sucursal: Explora una amplia variedad de productos y promociones que se actualizan dinámicamente según la sucursal seleccionada por el usuario.

Carrito de Compras Inteligente: Añade productos, ajusta cantidades y visualiza descuentos por promociones y métodos de pago aplicados en tiempo real.

Proceso de Checkout Completo: Flujo de compra guiado que permite seleccionar tipo de envío (Delivery/Take Away), gestionar domicilios y pagar de forma segura con Mercado Pago o en efectivo.

Autenticación y Autorización con Auth0:

Inicio/cierre de sesión seguro mediante Auth0, con soporte para login social (Google).

Control de acceso a rutas y funcionalidades basado en roles (CLIENTE, EMPLEADO, ADMIN) obtenidos desde el backend.

Paneles de Gestión por Rol:

Administrador: Control total sobre artículos, insumos, categorías, promociones, sucursales, usuarios, clientes y empleados. Acceso a reportes estadísticos.

Cajero: Visualización y gestión de pedidos en tiempo real, confirmación de pagos y coordinación de entregas.

Cocinero: Vista de pedidos pendientes en tiempo real, con acceso a recetas y la capacidad de marcar pedidos como listos.

Delivery: Interfaz para visualizar los pedidos asignados y marcarlos como entregados.

Página "Mis Pedidos": Los clientes pueden visualizar su historial de pedidos, el estado actual de cada uno y acceder a sus facturas.

Estadísticas y Reportes: Visualización de rankings de productos y clientes, y análisis de movimientos monetarios, con la opción de exportar los datos a Excel.

📦 Estructura del Proyecto
El frontend sigue una estructura modular para facilitar la mantenibilidad y escalabilidad:

src/
├── components/         # Componentes React reutilizables
│   ├── admin/          # Formularios y UI para paneles de administración
│   ├── auth/           # Componentes de autenticación (PrivateRoute, etc.)
│   ├── common/         # Componentes comunes (Header, Footer, etc.)
│   ├── products/       # Componentes de productos (ProductCard, DetalleModal)
│   └── (otros...)
├── context/            # Contextos de React para estado global (User, Cart, Sucursal)
├── hooks/              # Hooks personalizados (useWebSocket, useSearchableData)
├── pages/              # Vistas principales de la aplicación
├── services/           # Módulos para interactuar con la API RESTful
│   ├── apiClient.ts    # Configuración base de Axios y token auth
│   └── (servicios por entidad: PedidoService, ClienteService, etc.)
├── styles/             # Archivos SASS globales (variables, mixins)
├── types/              # Definiciones de tipos e interfaces TypeScript
├── App.tsx             # Componente raíz y configuración de rutas
└── main.tsx            # Punto de entrada de la aplicación

🛠️ Tecnologías Utilizadas
Framework Principal: React 18 con TypeScript

Gestor de Paquetes y Bundler: Vite

Componentes de UI: React Bootstrap

Estilos: SASS para un CSS modular y mantenible.

Enrutamiento: React Router DOM

Cliente HTTP: Axios

Gestión de Estado: React Context API

Autenticación: Auth0 React SPA SDK

Comunicación en Tiempo Real: SockJS y StompJS (para WebSockets)

Notificaciones: React Hot Toast

Iconografía: Font Awesome

Manipulación de Fechas: date-fns

🚀 Puesta en Marcha (Desarrollo)
Clona el repositorio:

git clone [URL_DEL_REPOSITORIO_FRONTEND]
cd el-buen-sabor-frontend

Instala las dependencias:

npm install

Variables de Entorno (.env):
Crea un archivo .env en la raíz del proyecto (el-buen-sabor-frontend/.env) y añade las siguientes variables con tu configuración específica:

VITE_API_URL=http://localhost:8080/api
VITE_AUTH0_DOMAIN=tu-dominio.us.auth0.com
VITE_AUTH0_CLIENT_ID=tu_client_id
VITE_AUTH0_AUDIENCE=https://api.elbuensabor.com
VITE_AUTH0_SCOPE=openid profile email
VITE_MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_mp

VITE_API_URL: URL base de tu API backend.

VITE_AUTH0_...: Credenciales de tu aplicación SPA y API en Auth0.

VITE_MERCADOPAGO_PUBLIC_KEY: Tu Public Key de Mercado Pago para el checkout.

Configuración de Auth0 (Dashboard):

Aplicación SPA:

Allowed Callback URLs: http://localhost:5173

Allowed Logout URLs: http://localhost:5173

Allowed Web Origins: http://localhost:5173

API:

Asegúrate de que el Identifier de tu API coincida con VITE_AUTH0_AUDIENCE.

Iniciar la Aplicación:

Asegúrate de que tu servidor backend de Spring Boot esté corriendo.

En la terminal, dentro de la carpeta el-buen-sabor-frontend:

npm run dev

La aplicación frontend se abrirá en http://localhost:5173.
