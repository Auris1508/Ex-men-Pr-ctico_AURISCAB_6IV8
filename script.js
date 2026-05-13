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
          backgroundColor: ["#1E90FF", "#00CED1", "#4169E1"],
          borderColor: "#0F3460",
          borderWidth: 1
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
          backgroundColor: ["#1E90FF", "#00CED1", "#4169E1"],
          borderColor: "white",
          borderWidth: 1
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
          borderColor: "#00CED1",
          backgroundColor: "rgba(0, 206, 209, 0.1)",
          fill: true,
          borderWidth: 2,
          pointBackgroundColor: "#1E90FF",
          pointRadius: 4,
          tension: 0.3
        }]
      }
    });
  });
