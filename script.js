fetch("resultados.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("estadisticas").innerHTML = `
      <p><strong>Media:</strong> ${data.media}</p>
      <p><strong>Mediana:</strong> ${data.mediana}</p>
      <p><strong>Moda:</strong> ${data.moda}</p>
    `;

    const colores = Object.keys(data.frecuencia_color);
    const valores = Object.values(data.frecuencia_color);

    // Gráfica de barras
    new Chart(document.getElementById("barras"), {
      type: "bar",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Absoluta",
          data: valores,
          backgroundColor: ["#f4d03f", "#58d68d", "#f0f3f4"]
        }]
      }
    });

    // Diagrama de pastel
    new Chart(document.getElementById("pastel"), {
      type: "pie",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Relativa",
          data: Object.values(data.frecuencia_relativa),
          backgroundColor: ["#f4d03f", "#58d68d", "#f0f3f4"]
        }]
      }
    });

    // Polígono de frecuencias
    new Chart(document.getElementById("poligono"), {
      type: "line",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Acumulada",
          data: Object.values(data.frecuencia_acumulada),
          borderColor: "#3498db",
          fill: false
        }]
      }
    });
  });
