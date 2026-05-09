# Examen Manejo - Práctica Teórica

Aplicación web moderna para practicar el examen teórico de manejo de Costa Rica. Construida con **Next.js 15**, **TypeScript**, **Tailwind CSS** y **Framer Motion**.

## Inicio Rápido

### Requisitos
- Node.js 18+ (recomendado 20+)

### Instalación

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Build Producción

```bash
npm run build
npm start
```

##  Uso

1. **Selecciona preguntas** - Usa el wheel picker para elegir cantidad
2. **Responde** - Lee la pregunta y selecciona la mejor opción
3. **Feedback instantáneo** - Verde si correcto, rojo si incorrecto
4. **Resultados** - Ve tu puntuación y repite si quieres

##  Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Next.js | 16.2 | Framework web |
| React | 19.0 | UI library |
| TypeScript | 5.0+ | Type safety |
| Tailwind CSS | 4.0 | Estilos |
| Framer Motion | 11.5 | Animaciones |

##  Estructura

```
web/
├── app/
│   ├── api/                    # API routes
│   ├── exam/                   # Página examen
│   ├── globals.css             # Estilos globales
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Página inicio
├── components/
│   ├── exam/                   # Componentes examen
│   ├── home/                   # Componentes inicio
│   ├── results/                # Componentes resultados
│   └── ui/                     # Componentes base
├── lib/
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Funciones utils
└── public/                     # Archivos estáticos
```



MIT - Libre para usar y modificar

---
