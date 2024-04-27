document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("surveyForm");
    const listaEncuestas = document.getElementById("surveyList");

    cargarEncuestas();

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const pregunta1 = formulario.elements["question1"].value;
        const pregunta2 = formulario.elements["question2"].value;
        const pregunta3 = formulario.elements["question3"].value;

        if (pregunta1 && pregunta2 && pregunta3) {
            const encuesta = {
                pregunta1,
                pregunta2,
                pregunta3
            };

            agregarEncuestaLocalStorage(encuesta);
            agregarEncuestaLista(encuesta);
            formulario.reset();
        } else {
            alert("Necesitas responder todas las preguntas para enviar.");
        }
    });

    function agregarEncuestaLista(encuesta) {
        const elementoEncuesta = document.createElement("div");
        elementoEncuesta.classList.add("surveyItem");
        elementoEncuesta.innerHTML = `
            <p><strong>Pregunta 1:</strong> ${encuesta.pregunta1}</p>
            <p><strong>Pregunta 2:</strong> ${encuesta.pregunta2}</p>
            <p><strong>Pregunta 3:</strong> ${encuesta.pregunta3}</p>
            <button class="deleteBtn">Eliminar</button>
        `;
        listaEncuestas.appendChild(elementoEncuesta);

        elementoEncuesta.querySelector(".deleteBtn").addEventListener("click", function() {
            eliminarEncuestaLocalStorage(encuesta);
            elementoEncuesta.remove();
        });
    }

    function agregarEncuestaLocalStorage(encuesta) {
        let encuestas = JSON.parse(localStorage.getItem("encuestas")) || [];
        encuestas.push(encuesta);
        localStorage.setItem("encuestas", JSON.stringify(encuestas));
    }

    function eliminarEncuestaLocalStorage(encuesta) {
        let encuestas = JSON.parse(localStorage.getItem("encuestas")) || [];
        encuestas = encuestas.filter(item => !(item.pregunta1 === encuesta.pregunta1 && 
                                                item.pregunta2 === encuesta.pregunta2 && 
                                                item.pregunta3 === encuesta.pregunta3));
        localStorage.setItem("encuestas", JSON.stringify(encuestas));
    }

    function cargarEncuestas() {
        let encuestas = JSON.parse(localStorage.getItem("encuestas")) || [];
        encuestas.forEach(agregarEncuestaLista);
    }
});
