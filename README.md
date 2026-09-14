<div align="center">

# 🏪 Colmado

### Sistema de Gestión de Inventario y Ventas

Un mini POS pensado como el colmado de tu barrio: rápido, directo y sin vueltas — controla productos, ventas e inventario desde una sola app.

[![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=flat-square&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-EF_Core-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![License](https://img.shields.io/badge/license-académico-lightgrey?style=flat-square)]()

_Proyecto académico de práctica — Programación II/III_

</div>

---

## 📋 Tabla de contenidos

- [📖 Descripción general](#-descripción-general)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Stack tecnológico](#️-stack-tecnológico)
- [🧱 Arquitectura del backend](#-arquitectura-del-backend)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [🗃️ Modelo de datos](#️-modelo-de-datos)
- [🚀 Instalación y ejecución](#-instalación-y-ejecución)
- [🗺️ Roadmap](#️-roadmap)
- [📄 Licencia](#-licencia)

---

## 📖 Descripción general

**Colmado** es un sistema de punto de venta (POS) simplificado para pequeños negocios: permite gestionar productos, categorías, registrar ventas con múltiples artículos, controlar el inventario y visualizar reportes del negocio, todo protegido por autenticación de usuario.

Construido con **arquitectura Onion** en el backend (separación estricta de capas) y un frontend en **React + TypeScript** consumiendo una API REST autenticada con **JWT**.

> 🎯 El corazón del sistema es la venta: cada venta afecta el stock en tiempo real, validando que no se venda más de lo disponible — la app garantiza consistencia entre lo que se vende y lo que queda en inventario.

---

## ✨ Funcionalidades

| Módulo                           | Descripción                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 🔐 **Autenticación**             | Registro e inicio de sesión con JWT.                                                                         |
| 📊 **Dashboard**                 | Ventas del día/mes, productos con stock bajo, gráfico de ventas por categoría.                               |
| 📦 **Productos**                 | CRUD completo con SKU, precio, stock y categoría.                                                            |
| 🏷️ **Categorías**                | CRUD simple para organizar el catálogo.                                                                      |
| 🛒 **Nueva venta**               | Carrito interactivo: agrega productos, ajusta cantidades y confirma — el stock se descuenta automáticamente. |
| 🧾 **Historial de ventas**       | Listado filtrable por fecha con detalle de cada venta.                                                       |
| 📥 **Movimientos de inventario** | Registro de entradas/ajustes manuales de stock.                                                              |
| 📈 **Reportes**                  | Ventas por período y productos más vendidos, con gráficos.                                                   |
| 📤 **Exportación**               | Exporta reportes a Excel, JSON o TXT (patrón Strategy).                                                      |
| 👤 **Perfil**                    | Datos del usuario autenticado.                                                                               |

---

## 🛠️ Stack tecnológico

<table>
<tr>
<td valign="top" width="33%">

**⚙️ Backend**

- .NET 10 / ASP.NET Core Web API
- Entity Framework Core 10
- ASP.NET Core Identity + JWT
- Newtonsoft.Json
- Scalar (docs OpenAPI)

</td>
<td valign="top" width="33%">

**🎨 Frontend**

- React 19 + TypeScript
- Vite
- React Router 8
- Axios
- Tailwind CSS 4 + shadcn/ui
- Recharts · Lucide Icons · Sonner

</td>
<td valign="top" width="33%">

**🗄️ Base de datos**

- SQL Server
- EF Core Migrations
- Repositorios + Unit of Work

</td>
</tr>
</table>

---

## 🧱 Arquitectura del backend

Arquitectura **Onion**, con dependencias fluyendo siempre hacia el centro (`Domain`):

```
┌─────────────────────────────────────────┐
│   Colmado.Presentation (Controllers)     │  ← API, middlewares
├─────────────────────────────────────────┤
│   Colmado.Infrastructure (EF Core)       │  ← Persistencia, repositorios, JWT
├─────────────────────────────────────────┤
│   Colmado.Application (Servicios)        │  ← Lógica de negocio, DTOs, Strategy
├─────────────────────────────────────────┤
│   Colmado.Domain (Entidades)             │  ← Entidades, enums, excepciones
└─────────────────────────────────────────┘
```

**Principios aplicados:**

- Repositorios + interfaces para acceso a datos.
- DTOs de entrada/salida (las entidades nunca se exponen directamente).
- Inyección de dependencias en todas las capas.
- Patrón **Strategy** para exportación de reportes.
- Excepciones de dominio tipadas (`NotFoundException`, `BadRequestException`, `ConflictException`) manejadas en un middleware global.
- **Regla de negocio central:** al confirmar una venta, se valida stock disponible por cada línea y se descuenta en una sola operación consistente — si algo falla, no se guarda nada.

---

## 📂 Estructura del proyecto

```
colmado/
├── backend/
│   ├── Colmado.Presentation/         # Controllers, Program.cs, middlewares
│   │   └── Controllers/              # Auth, Products, Categories, Sales,
│   │                                    StockMovements, Dashboard, Export
│   ├── Colmado.Application/          # Servicios, DTOs, validadores, Strategy
│   │   ├── Services/                  # ProductService, SaleService,
│   │   │                                DashboardService, ExportService
│   │   └── Strategy/                   # ExcelExportStrategy, JsonExportStrategy, TxtExportStrategy
│   ├── Colmado.Infrastructure/       # EF Core, repositorios, JWT, migraciones
│   ├── Colmado.Domain/               # Entidades, enums, excepciones de dominio
│   ├── .gitignore
│   └── Colmado.slnx
├── frontend/
│   └── src/
│       ├── colmado/
│       │   ├── layouts/               # AppShell, Sidebar
│       │   └── pages/                 # auth, dashboard, products, categories,
│       │                                 sales, inventory, reports, profile
│       ├── components/                # common, custom, ui (shadcn/ui)
│       ├── services/                  # auth, product, category, sale, export
│       ├── context/                    # AuthContext, ColmadoContext
│       └── hooks/, lib/, router/
└── README.md
```

---

## 🗃️ Modelo de datos

| Entidad         | Descripción                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| `User`          | Usuario autenticado del sistema.                                                          |
| `Product`       | Nombre, SKU, precio, stock actual, categoría, unidad de medida.                           |
| `Category`      | Categoría de producto.                                                                    |
| `Sale`          | Cabecera de venta: fecha, usuario, total.                                                 |
| `SaleItem`      | Línea de venta (producto, cantidad, precio unitario, subtotal) — relación 1:N con `Sale`. |
| `StockMovement` | Entradas/ajustes manuales de inventario.                                                  |

```
Sale (1) ───< (N) SaleItem (N) >─── (1) Product >─── (1) Category
```

---

## 🚀 Instalación y ejecución

### Requisitos previos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- SQL Server (local o remoto)

### Backend

```bash
cd backend
dotnet restore
```

Configura tu cadena de conexión en `Colmado.Presentation/appsettings.json` (`ConnectionStrings:DefaultConnection`), luego:

```bash
cd Colmado.Presentation
dotnet ef database update --project ../Colmado.Infrastructure
dotnet run
```

La API queda disponible en `https://localhost:5001`, con documentación interactiva de Scalar en `/scalar` durante desarrollo.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

---

## 📄 Licencia

Proyecto académico — Programación II/III.

<div align="center">

---

Hecho con 🏪 y ☕ para practicar arquitectura Onion y React

</div>
