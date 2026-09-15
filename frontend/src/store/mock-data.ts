import {
  CircleDollarSign,
  Package,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  productCount: number;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  minStock: number;
  categoryId: string;
};

export type CartLine = { id: string; name: string; price: number; qty: number };

export type SaleItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type Sale = {
  id: string;
  code: string;
  date: string;
  customer: string;
  method: "Efectivo" | "Tarjeta" | "QR";
  items: SaleItem[];
};

export type StockMovement = {
  id: string;
  date: string;
  productName: string;
  type: "entrada" | "salida";
  quantity: number;
  reason: string;
  user: string;
};

export const categories: Category[] = [
  {
    id: "c1",
    name: "Bebidas",
    description: "Gaseosas, jugos y aguas",
    color: "sky",
    icon: "CupSoda",
    productCount: 24,
  },
  {
    id: "c2",
    name: "Abarrotes",
    description: "Productos secos y conservas",
    color: "amber",
    icon: "ShoppingBasket",
    productCount: 58,
  },
  {
    id: "c3",
    name: "Limpieza",
    description: "Detergentes y desinfectantes",
    color: "emerald",
    icon: "SprayCan",
    productCount: 19,
  },
  {
    id: "c4",
    name: "Snacks",
    description: "Galletas, papas y dulces",
    color: "rose",
    icon: "Cookie",
    productCount: 31,
  },
  {
    id: "c5",
    name: "Lácteos",
    description: "Leche, yogurt y quesos",
    color: "violet",
    icon: "Milk",
    productCount: 14,
  },
  {
    id: "c6",
    name: "Panadería",
    description: "Pan del día y repostería",
    color: "orange",
    icon: "Croissant",
    productCount: 9,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Coca-Cola 2L",
    sku: "BEB-0012",
    price: 12.5,
    stock: 48,
    minStock: 12,
    categoryId: "c1",
  },
  {
    id: "p2",
    name: "Agua Vital 600ml",
    sku: "BEB-0031",
    price: 5,
    stock: 6,
    minStock: 20,
    categoryId: "c1",
  },
  {
    id: "p3",
    name: "Jugo Del Valle 1L",
    sku: "BEB-0044",
    price: 9.9,
    stock: 22,
    minStock: 10,
    categoryId: "c1",
  },
  {
    id: "p4",
    name: "Arroz Grano de Oro 1kg",
    sku: "ABA-0102",
    price: 8.5,
    stock: 120,
    minStock: 30,
    categoryId: "c2",
  },
  {
    id: "p5",
    name: "Aceite Fino 900ml",
    sku: "ABA-0118",
    price: 14.9,
    stock: 9,
    minStock: 15,
    categoryId: "c2",
  },
  {
    id: "p6",
    name: "Fideo Lazo 400g",
    sku: "ABA-0140",
    price: 6.2,
    stock: 64,
    minStock: 20,
    categoryId: "c2",
  },
  {
    id: "p7",
    name: "Detergente Ola 800g",
    sku: "LIM-0203",
    price: 18.9,
    stock: 27,
    minStock: 10,
    categoryId: "c3",
  },
  {
    id: "p8",
    name: "Lavandina Patito 1L",
    sku: "LIM-0219",
    price: 7.5,
    stock: 3,
    minStock: 12,
    categoryId: "c3",
  },
  {
    id: "p9",
    name: "Papas Fritas Kiss 120g",
    sku: "SNK-0305",
    price: 10,
    stock: 41,
    minStock: 15,
    categoryId: "c4",
  },
  {
    id: "p10",
    name: "Galleta Oreo 6u",
    sku: "SNK-0322",
    price: 7.8,
    stock: 11,
    minStock: 18,
    categoryId: "c4",
  },
  {
    id: "p11",
    name: "Chocolate Sublime",
    sku: "SNK-0340",
    price: 4.5,
    stock: 76,
    minStock: 20,
    categoryId: "c4",
  },
  {
    id: "p12",
    name: "Leche PIL 1L",
    sku: "LAC-0401",
    price: 8.2,
    stock: 33,
    minStock: 24,
    categoryId: "c5",
  },
  {
    id: "p13",
    name: "Yogurt Frutado 1L",
    sku: "LAC-0417",
    price: 14,
    stock: 7,
    minStock: 12,
    categoryId: "c5",
  },
  {
    id: "p14",
    name: "Queso Menonita 500g",
    sku: "LAC-0428",
    price: 32.9,
    stock: 15,
    minStock: 8,
    categoryId: "c5",
  },
  {
    id: "p15",
    name: "Pan Marraqueta x6",
    sku: "PAN-0501",
    price: 3,
    stock: 90,
    minStock: 40,
    categoryId: "c6",
  },
  {
    id: "p16",
    name: "Torta Chocolate 1/2",
    sku: "PAN-0512",
    price: 45,
    stock: 4,
    minStock: 5,
    categoryId: "c6",
  },
];

export const sales: Sale[] = [
  {
    id: "s1",
    code: "V-001284",
    date: "2026-08-19 10:42",
    customer: "Consumidor final",
    method: "Efectivo",
    items: [
      {
        productId: "p1",
        productName: "Coca-Cola 2L",
        quantity: 2,
        unitPrice: 12.5,
      },
      {
        productId: "p9",
        productName: "Papas Fritas Kiss 120g",
        quantity: 3,
        unitPrice: 10,
      },
    ],
  },
  {
    id: "s2",
    code: "V-001283",
    date: "2026-08-19 09:58",
    customer: "Rosa Villca",
    method: "QR",
    items: [
      {
        productId: "p4",
        productName: "Arroz Grano de Oro 1kg",
        quantity: 5,
        unitPrice: 8.5,
      },
      {
        productId: "p5",
        productName: "Aceite Fino 900ml",
        quantity: 2,
        unitPrice: 14.9,
      },
      {
        productId: "p6",
        productName: "Fideo Lazo 400g",
        quantity: 4,
        unitPrice: 6.2,
      },
    ],
  },
  {
    id: "s3",
    code: "V-001282",
    date: "2026-08-18 19:15",
    customer: "Minimarket Sur",
    method: "Tarjeta",
    items: [
      {
        productId: "p12",
        productName: "Leche PIL 1L",
        quantity: 12,
        unitPrice: 8.2,
      },
      {
        productId: "p13",
        productName: "Yogurt Frutado 1L",
        quantity: 6,
        unitPrice: 14,
      },
    ],
  },
  {
    id: "s4",
    code: "V-001281",
    date: "2026-08-18 17:03",
    customer: "Consumidor final",
    method: "Efectivo",
    items: [
      {
        productId: "p15",
        productName: "Pan Marraqueta x6",
        quantity: 10,
        unitPrice: 3,
      },
    ],
  },
  {
    id: "s5",
    code: "V-001280",
    date: "2026-08-18 12:27",
    customer: "Juan Pérez",
    method: "QR",
    items: [
      {
        productId: "p7",
        productName: "Detergente Ola 800g",
        quantity: 2,
        unitPrice: 18.9,
      },
      {
        productId: "p8",
        productName: "Lavandina Patito 1L",
        quantity: 3,
        unitPrice: 7.5,
      },
    ],
  },
  {
    id: "s6",
    code: "V-001279",
    date: "2026-08-17 16:44",
    customer: "Consumidor final",
    method: "Tarjeta",
    items: [
      {
        productId: "p16",
        productName: "Torta Chocolate 1/2",
        quantity: 1,
        unitPrice: 45,
      },
      {
        productId: "p11",
        productName: "Chocolate Sublime",
        quantity: 4,
        unitPrice: 4.5,
      },
    ],
  },
];

export const stockMovements: StockMovement[] = [
  {
    id: "m1",
    date: "2026-08-19 08:10",
    productName: "Coca-Cola 2L",
    type: "entrada",
    quantity: 48,
    reason: "Compra proveedor",
    user: "César D.",
  },
  {
    id: "m2",
    date: "2026-08-19 10:42",
    productName: "Papas Fritas Kiss 120g",
    type: "salida",
    quantity: 3,
    reason: "Venta V-001284",
    user: "Sistema",
  },
  {
    id: "m3",
    date: "2026-08-18 18:02",
    productName: "Leche PIL 1L",
    type: "entrada",
    quantity: 24,
    reason: "Compra proveedor",
    user: "Ana M.",
  },
  {
    id: "m4",
    date: "2026-08-18 15:31",
    productName: "Lavandina Patito 1L",
    type: "salida",
    quantity: 6,
    reason: "Merma / producto dañado",
    user: "César D.",
  },
  {
    id: "m5",
    date: "2026-08-17 11:20",
    productName: "Arroz Grano de Oro 1kg",
    type: "entrada",
    quantity: 100,
    reason: "Inventario inicial",
    user: "César D.",
  },
  {
    id: "m6",
    date: "2026-08-17 09:05",
    productName: "Yogurt Frutado 1L",
    type: "salida",
    quantity: 5,
    reason: "Vencimiento",
    user: "Ana M.",
  },
];

export const salesByCategory = [
  { name: "Abarrotes", total: 4820 },
  { name: "Bebidas", total: 3610 },
  { name: "Snacks", total: 2240 },
  { name: "Lácteos", total: 1980 },
  { name: "Limpieza", total: 1420 },
  { name: "Panadería", total: 860 },
];

export const salesTrend = [
  { day: "13 Ago", ventas: 1240, unidades: 86 },
  { day: "14 Ago", ventas: 1680, unidades: 104 },
  { day: "15 Ago", ventas: 2140, unidades: 138 },
  { day: "16 Ago", ventas: 1890, unidades: 121 },
  { day: "17 Ago", ventas: 2460, unidades: 152 },
  { day: "18 Ago", ventas: 2980, unidades: 176 },
  { day: "19 Ago", ventas: 2310, unidades: 143 },
];

export const saleTotal = (sale: Sale) =>
  sale.items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);

export const CURRENCY = "RD$";

export const money = (n: number) =>
  `${CURRENCY} ${n.toLocaleString("es-DO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const categoryName = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? "—";

export const lowStock = products.filter((p) => p.stock <= p.minStock);

export type AppNotification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "stock" | "venta" | "sistema";
  unread: boolean;
};

export const notifications: AppNotification[] = [
  {
    id: "n1",
    title: "Stock crítico: Aceite Girasol 1L",
    detail: "Quedan 4 unidades (mínimo 10). Registra una entrada.",
    time: "Hace 8 min",
    kind: "stock",
    unread: true,
  },
  {
    id: "n2",
    title: "Venta registrada V-1042",
    detail: `Consumidor final · ${money(1285)} en efectivo`,
    time: "Hace 25 min",
    kind: "venta",
    unread: true,
  },
  {
    id: "n3",
    title: "3 productos por reponer",
    detail: "Revisa las alertas de inventario del día.",
    time: "Hace 2 h",
    kind: "stock",
    unread: true,
  },
  {
    id: "n4",
    title: "Cierre de caja disponible",
    detail: "El resumen de ayer ya está listo en Reportes.",
    time: "Ayer",
    kind: "sistema",
    unread: false,
  },
];

export const summary = [
  {
    label: "Ventas de hoy",
    value: money(2310),
    delta: "+12.4% vs ayer",
    icon: CircleDollarSign,
    trend: "up" as const,
  },
  {
    label: "Ventas del mes",
    value: money(48920),
    delta: "+8.1% vs julio",
    icon: TrendingUp,
    trend: "up" as const,
  },
  {
    label: "Productos activos",
    value: "340",
    delta: "16 nuevos este mes",
    icon: Package,
    trend: "up" as const,
  },
  {
    label: "Stock bajo",
    value: String(lowStock.length),
    delta: "Requieren reposición",
    icon: TriangleAlert,
    trend: "down" as const,
  },
];
