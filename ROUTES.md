# 🗺️ Mapa de Rutas y Navegación

## Rutas de Next.js

```
/ (Homepage)
  └─ HomeScreen.tsx
  └─ WheelPicker.tsx

/exam (Examen)
  └─ ExamScreen.tsx
  │  ├─ QuestionCard.tsx
  │  ├─ AnswerButton.tsx
  │  ├─ ProgressBar.tsx
  │  └─ ResultScreen.tsx (al finalizar)
  └─ LoadingSpinner.tsx (loading)

/api/questions/count
  └─ GET → { total: 25 }

/api/exam?amount=20
  └─ GET → { questions: ShuffledQuestion[] }
```

## Flujo de Navegación

```
START
  ↓
[HOMEPAGE] /
  - WheelPicker (1-25)
  - HomeScreen layout
  - Botón "Comenzar Examen"
  ↓
  onClick → router.push(`/exam?amount=${selectedAmount}`)
  ↓
[EXAM PAGE] /exam?amount=20
  - Suspense + LoadingSpinner
  - Fetch /api/exam?amount=20
  - ExamScreen (orquestador)
  ↓
  [QUESTION LOOP]
    - QuestionCard mostrada
    - ProgressBar actualizado
    - AnswerButton x4
    ↓
    onClick → handleAnswer(selectedIndex)
      ├─ Validate correctness
      ├─ Animate feedback (1200ms delay)
      └─ currentIndex++
  ↓
  [FINALIZADO]
    - ExamScreen → isFinished = true
    - Renderiza ResultScreen
    ↓
    - Botón "Repetir" → resetea estado
    - Botón "Volver" → router.push('/')
    ↓
[BACK TO HOMEPAGE] /
```

## Componentes y Su Jerarquía

```
Root Layout
└─ app/layout.tsx (Server)
   └─ { children }
      ├─ / (Homepage - Server)
      │  └─ HomeScreen (Client)
      │     ├─ WheelPicker (Client)
      │     └─ StartButton
      │
      └─ /exam (Exam Page - Server)
         └─ Suspense
            └─ ExamContent (Client)
               └─ ExamScreen (Client)
                  ├─ LoadingSpinner (Client)
                  ├─ QuestionCard (Client)
                  │  ├─ ProgressBar (Client)
                  │  └─ AnswerButton x4 (Client)
                  └─ ResultScreen (Client)

API Routes:
├─ /api/questions/count
│  └─ GET → total
│
└─ /api/exam
   └─ GET → questions[]
```

## State Management

### HomeScreen
```typescript
const [selectedAmount, setSelectedAmount] = useState(20);
const [maxQuestions, setMaxQuestions] = useState<number | null>(null);
```

### ExamScreen
```typescript
const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [answers, setAnswers] = useState<boolean[]>([]);
const [showResult, setShowResult] = useState(false);
const [isFinished, setIsFinished] = useState(false);
```

### QuestionCard
```typescript
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
```

## Data Flow

```
USER SELECTS AMOUNT
  ↓
HomeScreen.selectedAmount = 20
  ↓
router.push('/exam?amount=20')
  ↓
ExamScreen mounted
  ├─ fetch('/api/exam?amount=20')
  ├─ setQuestions(response.questions)
  ↓
renderiza QuestionCard
  ├─ question: ShuffledQuestion (correctIndex ya establecido)
  ├─ options: string[] (ya shuffleadas)
  ↓
USER CLICKS ANSWER BUTTON
  ├─ AnswerButton.onClick()
  ├─ ExamScreen.handleAnswer(selectedIndex)
  ├─ isCorrect = selectedIndex === question.correctIndex
  ├─ answers.push(isCorrect)
  ├─ setShowResult(true)
  ├─ delay 1200ms
  ├─ currentIndex++
  ├─ setShowResult(false)
  ↓
AL FINALIZAR
  ├─ setIsFinished(true)
  ├─ renderiza ResultScreen
  ├─ correctCount = answers.filter(a => a).length
  ↓
USER CLICKS REPEAT
  ├─ handleRepeat()
  ├─ resetea estado
  ├─ re-fetch questions
```

## URL Patterns

### Static Routes
- `/` - Homepage
- `/exam` - Exam page

### Dynamic Routes (Query Params)
- `/exam?amount=20` - Exam con 20 preguntas
- `/exam?amount=1` - Exam con 1 pregunta
- `/exam?amount=25` - Exam con 25 preguntas

### API Routes
- `/api/questions/count` - GET total
- `/api/exam` - GET with query: `?amount=20`

## Navigation Patterns

### Router Push
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push(`/exam?amount=${selectedAmount}`);
router.push('/');
```

### Link Component
```typescript
import Link from 'next/link';

<Link href="/">Volver Inicio</Link>
```

## Suspense Boundaries

```
/exam page (Server Component)
  └─ <Suspense fallback={<LoadingSpinner />}>
     └─ <ExamContent /> (Client Component)
        └─ fetch + render
```

## Error Handling

### API Errors
```typescript
try {
  const response = await fetch('/api/exam?amount=' + amount);
  if (!response.ok) throw new Error('Failed');
  const data = await response.json();
} catch (err) {
  setError(err.message);
  // Show error UI
}
```

### Component Errors
- NextJS Error Boundary (builtin)
- User sees helpful message

## Performance Optimizations

### Route-based
- `/` - Static prerender
- `/exam?*` - Dynamic on demand

### Component-based
- Server Components → layout.tsx
- Client Components → apenas cuando necesario
- Suspense → loading states

### Data-based
- API caching → next/cache (si lo agregan)
- Client cache → useState
- Revalidation → on-demand

## Mobile Navigation

- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Touch-friendly buttons: `p-4`, `rounded-2xl`
- Scroll-picker swipe: drag support

## Deep Linking

Users can share:
- `/` - Link to homepage
- `/exam?amount=20` - Direct to exam with 20 questions

## Browser History

- Forward/Back buttons work correctly
- State managed in component (not localStorage)
- Each exam is fresh session

---

**Última actualización**: 2026-05-09
