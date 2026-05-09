import { NextRequest, NextResponse } from 'next/server';
import { shuffleAnswers } from '@/lib/utils';

const mockQuestions = [
  {
    id: 1,
    question: "¿Cuál es la velocidad máxima permitida en zona urbana?",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    topic: "Límites de velocidad"
  },
  {
    id: 2,
    question: "¿Qué significa una línea amarilla discontinua en la carretera?",
    options: ["Se puede adelantar", "No se puede adelantar", "Carril especial", "Zona de construcción"],
    topic: "Señales viales"
  },
  {
    id: 3,
    question: "¿A qué distancia debe mantener su vehículo del que lo precede?",
    options: ["Un segundo de distancia", "Dos segundos de distancia", "Tres segundos de distancia", "Medio segundo"],
    topic: "Distancia de seguridad"
  },
  {
    id: 4,
    question: "¿Cuándo debe usar las luces de emergencia?",
    options: ["Cuando el vehículo está averiado en la carretera", "En lluvia", "En niebla", "Siempre"],
    topic: "Equipamiento del vehículo"
  },
  {
    id: 5,
    question: "¿Qué indica una línea blanca continua?",
    options: ["Prohibido cambiar de carril", "Se puede cambiar de carril", "Carril exclusivo", "Estacionamiento permitido"],
    topic: "Señales viales"
  },
  {
    id: 6,
    question: "¿Cuál es la edad mínima para obtener licencia de conducir?",
    options: ["18 años", "16 años", "17 años", "21 años"],
    topic: "Requisitos legales"
  },
  {
    id: 7,
    question: "¿Qué debe hacer al acercarse a un semáforo en rojo?",
    options: ["Detener completamente el vehículo", "Disminuir la velocidad", "Tocar la bocina", "Cambiar de carril"],
    topic: "Señales de tránsito"
  },
  {
    id: 8,
    question: "¿Cómo debe actuar ante un peatón cruzando la calle?",
    options: ["Ceder el paso y detener si es necesario", "Tocar la bocina para que se apure", "Cambiar de carril", "Mantener la velocidad"],
    topic: "Seguridad de peatones"
  },
  {
    id: 9,
    question: "¿Cuál es el alcohol permitido en sangre para conducir?",
    options: ["0% (cero tolerancia)", "0.05%", "0.1%", "0.2%"],
    topic: "Conducción responsable"
  },
  {
    id: 10,
    question: "¿Qué significa una señal de triángulo rojo?",
    options: ["Peligro", "Prohibición", "Información", "Obligación"],
    topic: "Señales de tránsito"
  },
  {
    id: 11,
    question: "¿Cómo debe usar el cinturón de seguridad?",
    options: ["Abrochado en todo momento mientras conduce", "Solo en carreteras", "Solo en autopistas", "Cuando hay tráfico"],
    topic: "Equipamiento de seguridad"
  },
  {
    id: 12,
    question: "¿Qué debe hacer si se le apaga el motor mientras conduce?",
    options: ["Encender las luces de emergencia y acercarse al borde", "Tocar la bocina", "Frenar de golpe", "Cambiar de marcha"],
    topic: "Procedimientos de emergencia"
  },
  {
    id: 13,
    question: "¿Cuándo se deben usar los limpiaparabrisas?",
    options: ["Cuando llueve o hay visibilidad reducida", "Solo de noche", "Cada hora", "Nunca en ciudad"],
    topic: "Equipamiento del vehículo"
  },
  {
    id: 14,
    question: "¿Qué es un carril exclusivo?",
    options: ["Carril reservado para determinado tipo de vehículos", "Carril para estacionar", "Carril de emergencia", "Carril para bicicletas"],
    topic: "Elementos de la carretera"
  },
  {
    id: 15,
    question: "¿Cómo debe proceder en una rotonda?",
    options: ["Ceder el paso a vehículos que vienen de la derecha", "Acelerar para entrar primero", "Tocar la bocina", "Frenar completamente"],
    topic: "Intersecciones"
  },
  {
    id: 16,
    question: "¿Qué debe llevar obligatoriamente en el vehículo?",
    options: ["Triángulos de emergencia, chaleco reflectivo, linterna", "Solo documentos", "Solo combustible", "Nada especial"],
    topic: "Equipamiento del vehículo"
  },
  {
    id: 17,
    question: "¿Cómo reaccionar ante un freno repentino del vehículo de adelante?",
    options: ["Frenar suavemente, manteniendo el control", "Frenar de golpe", "Cambiar de carril bruscamente", "Tocar la bocina"],
    topic: "Técnicas de conducción"
  },
  {
    id: 18,
    question: "¿Qué indica una línea de borde blanca?",
    options: ["El borde del carril", "Parada obligatoria", "Carril exclusivo", "Zona de peatones"],
    topic: "Señales viales"
  },
  {
    id: 19,
    question: "¿Está permitido usar el teléfono mientras se conduce?",
    options: ["No, es peligroso y está prohibido", "Sí, si es manos libres", "Solo en semáforos", "Solo en atascos"],
    topic: "Conducción responsable"
  },
  {
    id: 20,
    question: "¿Qué edad debe tener un niño para viajar en asiento delantero?",
    options: ["Mínimo 12 años", "Mínimo 10 años", "Mínimo 8 años", "No hay restricción"],
    topic: "Pasajeros infantiles"
  },
  {
    id: 21,
    question: "¿Cómo debe conducir en un paso de peatones?",
    options: ["Reducir velocidad y estar preparado para frenar", "Acelerar para cruzar rápido", "Tocar la bocina", "Mantener velocidad"],
    topic: "Seguridad de peatones"
  },
  {
    id: 22,
    question: "¿Qué significa una flecha en el pavimento?",
    options: ["Indica la dirección obligatoria del carril", "Zona de estacionamiento", "Límite de velocidad", "Cruce peatonal"],
    topic: "Señales viales"
  },
  {
    id: 23,
    question: "¿Cuándo se debe usar las luces bajas?",
    options: ["De noche y cuando hay mala visibilidad", "Siempre de día", "Solo en autopista", "Nunca"],
    topic: "Iluminación del vehículo"
  },
  {
    id: 24,
    question: "¿Cuál es la distancia segura para adelantar?",
    options: ["Mínimo 1.5 metros lateralmente", "Cualquier distancia", "0.5 metros", "2 metros"],
    topic: "Técnicas de adelantamiento"
  },
  {
    id: 25,
    question: "¿Qué debe hacer si ve un vehículo de emergencia con sirena?",
    options: ["Orillarse a la derecha y ceder el paso", "Acelerar", "No hacer nada", "Frenar de golpe"],
    topic: "Procedimientos de emergencia"
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const amount = parseInt(searchParams.get('amount') || '20');

  if (amount < 1 || amount > mockQuestions.length) {
    return NextResponse.json(
      { error: `Amount must be between 1 and ${mockQuestions.length}` },
      { status: 400 }
    );
  }

  // Get random questions
  const shuffledQuestions = shuffleArray(mockQuestions);
  const selected = shuffledQuestions.slice(0, amount);

  // Shuffle answers for each question
  const questionsWithShuffledAnswers = selected.map(shuffleAnswers);

  return NextResponse.json({
    total: amount,
    questions: questionsWithShuffledAnswers,
  });
}
