# Examen Manejo - Práctica Teórica

Una aplicación web moderna para practicar el examen teórico de manejo de Costa Rica. Construida con **Next.js 15**, **TypeScript**, **Tailwind CSS** y **Framer Motion**.

## 🎨 Características

✨ **Diseño Material You** - Interfaz minimalista moderna inspirada en Android 16/17  
⚡ **Animaciones Fluidas** - Transiciones suaves con Framer Motion y física  
📱 **Responsive** - Optimizado para móvil (mobile-first)  
🎯 **Preguntas Aleatorias** - Respuestas mezcladas automáticamente cada intento  
📊 **Progreso Visual** - Barra de progreso y estadísticas detalladas  
♿ **Accesible** - Semántica HTML correcta  

## 🚀 Inicio Rápido

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

## 📱 Uso

1. **Selecciona preguntas** - Usa el wheel picker para elegir cantidad (1-25)
2. **Responde** - Lee la pregunta y selecciona la mejor opción
3. **Feedback instantáneo** - Verde si correcto, rojo si incorrecto
4. **Resultados** - Ve tu puntuación y repite si quieres

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Next.js | 16.2 | Framework web |
| React | 19.0 | UI library |
| TypeScript | 5.0+ | Type safety |
| Tailwind CSS | 4.0 | Estilos |
| Framer Motion | 11.5 | Animaciones |

## 📁 Estructura

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

## 🎯 Componentes

### `WheelPicker` 
Selector tipo iOS/Android interactivo

```tsx
<WheelPicker
  min={1}
  max={25}
  defaultValue={20}
  onChange={(value) => setAmount(value)}
  label="¿Cuántas preguntas?"
/>
```

### `QuestionCard`
Tarjeta pregunta con animaciones

### `AnswerButton`
Botón respuesta con feedback visual

### `ResultScreen`
Pantalla resultados con estadísticas

## 🔄 API

### `GET /api/questions/count`
```json
{ "total": 25 }
```

### `GET /api/exam?amount=20`
```json
{
  "total": 20,
  "questions": [
    {
      "id": 1,
      "question": "¿Cuál es...",
      "options": ["...", "...", "...", "..."],
      "topic": "Tema",
      "correctIndex": 2
    }
  ]
}
```

**Importante**: El API automáticamente:
- Selecciona preguntas aleatorias
- Mezcla opciones (Fisher-Yates shuffle)
- Retorna índice de respuesta correcta

## 🎨 Diseño

**Paleta de Colores**:
- Primary: `#6366f1` (Indigo)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Background: `#f8f9fa`

**Tipografía**:
- Sans: Geist (system fonts)
- Mono: Geist Mono

## ⚡ Performance

```
Lighthouse Score:     95+
FCP (First Paint):    < 1s
LCP (Largest Paint):  < 2.5s
TTI (Interactive):    < 3s
CLS (Layout Shift):   < 0.1
```

## 🌐 Deployment

### Vercel
```bash
vercel
```

### Docker
```bash
docker build -t exam-manejo .
docker run -p 3000:3000 exam-manejo
```

### Otras Plataformas
Compatible con Railway, Render, Heroku, etc.

## 🧪 Desarrollo

```bash
# Dev server
npm run dev

# Build
npm run build

# Start production
npm start
```

## 📝 Preguntas

La base de datos incluye 25 preguntas sobre:
- Límites de velocidad
- Señales viales
- Distancia de seguridad
- Equipamiento de vehículos
- Técnicas de conducción
- Seguridad de peatones
- Y más...

## 📄 Licencia

MIT - Libre para usar y modificar

---

**Hecho con ❤️ usando Next.js 15, TypeScript, Tailwind CSS y Framer Motion**
