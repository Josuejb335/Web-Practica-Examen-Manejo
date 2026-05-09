# 📖 Guía de Desarrollo

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Visitar en navegador
# http://localhost:3000
```

## Comandos Principales

```bash
npm run dev      # Servidor desarrollo (hot reload)
npm run build    # Build producción
npm start        # Ejecutar build producción
npm run lint     # Linting (si está configurado)
```

## Estructura de Componentes

### Componentes del Examen
- `components/exam/ExamScreen.tsx` - Orquestador principal
- `components/exam/QuestionCard.tsx` - Tarjeta pregunta
- `components/exam/AnswerButton.tsx` - Botón respuesta individual
- `components/exam/ProgressBar.tsx` - Barra de progreso

### Componentes de Inicio
- `components/home/HomeScreen.tsx` - Pantalla inicial
- `components/home/WheelPicker.tsx` - Selector tipo wheel

### Componentes de Resultados
- `components/results/ResultScreen.tsx` - Pantalla final

### Componentes UI
- `components/ui/LoadingSpinner.tsx` - Loader animado

## API Routes

### `/api/questions/count`
```typescript
// GET - Retorna total de preguntas disponibles
Response: { total: number }
```

### `/api/exam`
```typescript
// GET /api/exam?amount=20
// Retorna preguntas aleatorias con respuestas mezcladas
Response: {
  total: number,
  questions: ShuffledQuestion[]
}
```

## Tipos TypeScript

Todos los tipos están en `lib/types.ts`:

```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  topic: string;
}

interface ShuffledQuestion extends Question {
  correctIndex: number; // Índice de respuesta correcta después del shuffle
}

interface ExamAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}
```

## Convenciones de Código

### Nombre de Archivos
- Componentes: `PascalCase.tsx`
- Utilitarios: `camelCase.ts`
- Rutas API: `route.ts`

### Imports
```typescript
// Absolutas (usando alias @/*)
import { Component } from '@/components/...'
import { shuffleAnswers } from '@/lib/utils'

// Relativas solo cuando es dentro de mismo directorio
import { ChildComponent } from './Child'
```

### Componentes
```typescript
'use client'; // Si necesita estado/eventos

import { FC } from 'react';
import type { ComponentProps } from './types';

interface Props {
  prop1: string;
  prop2?: number;
}

export function ComponentName({ prop1, prop2 }: Props) {
  return <div>{prop1}</div>;
}
```

### Animaciones
```typescript
// Siempre usar spring physics
<motion.div
  animate={{ opacity: 1 }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 30,
  }}
/>

// AnimatePresence para animaciones de salida
<AnimatePresence mode="wait">
  {condition && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

## Estilos

### Tailwind CSS
- Mobile-first: `md:` media query
- Colores personalizados: `indigo-500`, `green-500`, `red-500`
- Bordes: `rounded-2xl`, `rounded-3xl`

```tsx
className={`
  px-4 py-3 rounded-2xl border transition-all
  ${isActive ? 'bg-indigo-500 text-white' : 'bg-white'}
`}
```

### CSS Global
- `app/globals.css` - Estilos base y Tailwind

## Flujo de Datos

```
HomeScreen
  ├─ WheelPicker (selecciona cantidad)
  └─ onClick → navega a /exam?amount=X

ExamScreen
  ├─ fetch /api/exam?amount=X
  ├─ renderiza QuestionCard
  ├─ QuestionCard renderiza AnswerButton x4
  ├─ onClick AnswerButton → ExamScreen.handleAnswer()
  └─ respuesta correcta/incorrecta → siguiente pregunta

ResultScreen
  ├─ calcula stats
  └─ botón repetir o volver inicio
```

## Estado Global

No hay estado global. Cada pantalla maneja su propio estado:

- `HomeScreen`: `selectedAmount`
- `ExamScreen`: `questions`, `currentIndex`, `answers`, `showResult`
- `ResultScreen`: Props del padre

## Performance Tips

1. **Lazy Loading**
   ```tsx
   const Component = dynamic(() => import('./Component'), {
     loading: () => <Spinner />
   });
   ```

2. **Memoización**
   ```tsx
   const MemoComponent = memo(Component);
   ```

3. **Suspense**
   ```tsx
   <Suspense fallback={<Loading />}>
     <AsyncComponent />
   </Suspense>
   ```

4. **Evitar re-renders**
   - Usar `useCallback` para props que son funciones
   - Usar `useMemo` para cálculos costosos

## Debugging

### Next.js DevTools
- Abierto automáticamente en desarrollo
- Panel derecha muestra componentes

### Console Logs
```typescript
console.log('Debug:', variable);
console.time('myTimer');
// ... código
console.timeEnd('myTimer'); // Muestra tiempo de ejecución
```

### Network Tab
- Ver peticiones a `/api/exam` y `/api/questions/count`
- Verificar payloads y respuestas

## Testing

```bash
# Build y verificar que no hay errores
npm run build

# Correr dev server
npm run dev

# Probar flujos:
# 1. Seleccionar preguntas
# 2. Responder correctamente
# 3. Responder incorrectamente
# 4. Ver resultados
# 5. Repetir examen
```

## Deployment

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel login
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Otras plataformas
- Railway, Render, Heroku: Solo necesitan `npm install` y `npm start`

## Troubleshooting

### Build falla con TypeScript
- Verificar que no haya `any` types
- Correr `npm run build` localmente

### Animaciones no fluidas
- Verificar que Framer Motion está instalado
- Usar `transform` y `opacity` en lugar de otras propiedades

### WheelPicker no responde
- Verificar eventos mouse/touch
- Abrir DevTools → Console para errores

### API retorna 404
- Verificar rutas en `app/api/`
- El archivo debe ser `route.ts` exactamente

## Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## Contacto/Soporte

Para problemas o sugerencias, abre un issue o contacta al desarrollador.

---

**Happy coding! 🚀**
