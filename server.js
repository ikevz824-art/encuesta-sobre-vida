function nextCategory() {
    // Si una pregunta no tiene respuesta, le asignamos un valor por defecto (3) 
    // para que el botón NUNCA se quede trabado.
    const cat = surveyCategories[currentCategoryIdx];
    cat.questions.forEach(q => {
        if (surveyAnswers[q.id] === undefined) {
            surveyAnswers[q.id] = 3; // Valor neutral por defecto
        }
    });

    if (currentCategoryIdx < surveyCategories.length - 1) {
        currentCategoryIdx++;
        renderCurrentCategory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        calculateAndShowResults();
    }
}
