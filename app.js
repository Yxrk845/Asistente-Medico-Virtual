// Cuando el documento esté listo, escuchar el clic en el botón de "Iniciar Diagnóstico"
document.getElementById("start-diagnosis-btn").addEventListener("click", function() {
    // Ocultar la pantalla principal
    document.getElementById("main-screen").style.display = "none";
    // Mostrar la pantalla de diagnóstico
    document.getElementById("diagnosis-screen").style.display = "block";
});

// Lógica del formulario de síntomas
document.getElementById("symptom-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener los síntomas ingresados
    const symptomInput = document.getElementById("symptoms").value;
    const symptoms = symptomInput.split(",").map(s => s.trim().toLowerCase());

    // Diagnósticos posibles basados en los síntomas
    const diagnoses = inferDiagnosis(symptoms);

    // Mostrar resultado de diagnóstico
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>Posible Diagnóstico</h2>`;

    if (diagnoses.length > 0) {
        diagnoses.forEach(diagnosis => {
            resultDiv.innerHTML += `<p>${diagnosis.diagnosis}</p>`;
        });
    } else {
        resultDiv.innerHTML += `<p>No se encontraron coincidencias. Consulta con un médico.</p>`;
    }

    // Mostrar medicamentos sugeridos
    const medicationsDiv = document.getElementById("medications");
    medicationsDiv.innerHTML = `<h2>Recomendaciones</h2>`;

    if (diagnoses.length > 0) {
        diagnoses.forEach(diagnosis => {
            medicationsDiv.innerHTML += `<p>${diagnosis.medications}</p>`;
        });
    } else {
        medicationsDiv.innerHTML += `<p>No hay recomendaciones de medicamentos.</p>`;
    }
});

// Función para inferir diagnóstico y sugerir medicamentos basado en síntomas
function inferDiagnosis(symptoms) {
    const diagnoses = [];

    // Reglas simples de inferencia y medicamentos recomendados
    if (symptoms.includes("fiebre") && symptoms.includes("tos") && symptoms.includes("fatiga")) {
        diagnoses.push({
            diagnosis: "Posible diagnóstico: Gripe o resfriado.",
            medications: "Recomendaciones de DocBot: Paracetamol, Antigripales, Miel con limón."
        });
    }

    if (symptoms.includes("dolor de cabeza") && symptoms.includes("fiebre") && symptoms.includes("rigidez de cuello")) {
        diagnoses.push({
            diagnosis: "Posible diagnóstico: Meningitis. Consulta a un médico inmediatamente.",
            medications: "Recomendaciones de DocBot: Ninguno. Requiere atención médica urgente."
        });
    }

    if (symptoms.includes("dolor de pecho") && symptoms.includes("dificultad para respirar")) {
        diagnoses.push({
            diagnosis: "Posible diagnóstico: Infarto o problema cardíaco. Consulta a emergencias.",
            medications: "Recomendaciones de DocBot: Ninguno. Requiere atención médica urgente."
        });
    }

    if (symptoms.includes("fiebre") && symptoms.includes("dolor de garganta")) {
        diagnoses.push({
            diagnosis: "Posible diagnóstico: Infección de garganta.",
            medications: "Recomendaciones de DocBot: Ibuprofeno, Amoxicilina (con receta médica), Pastillas para la garganta."
        });
    }

    if (symptoms.includes("dolor abdominal") && symptoms.includes("náuseas") && symptoms.includes("vómito")) {
        diagnoses.push({
            diagnosis: "Posible diagnóstico: Intoxicación alimentaria.",
            medications: "Recomendaciones de DocBot: Hidratación oral, Antieméticos, Sales de rehidratación."
        });
    }

    return diagnoses;
}
