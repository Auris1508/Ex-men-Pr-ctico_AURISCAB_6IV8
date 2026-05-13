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

    // Paleta de colores: Verde, Morado, Azul
    const coloresPaleta = ["#22C55E", "#8B5CF6", "#3B82F6"];

    // Gráfica de barras
    new Chart(document.getElementById("barras"), {
      type: "bar",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Absoluta",
          data: valores,
          backgroundColor: coloresPaleta,
          borderColor: "#1F2937",
          borderWidth: 1,
          borderRadius: 12
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });

    // Diagrama de pastel
    new Chart(document.getElementById("pastel"), {
      type: "doughnut",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Relativa",
          data: Object.values(data.frecuencia_relativa),
          backgroundColor: coloresPaleta,
          borderColor: "white",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
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
          borderColor: "#8B5CF6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          fill: true,
          borderWidth: 2,
          pointBackgroundColor: "#22C55E",
          pointBorderColor: "white",
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  });
