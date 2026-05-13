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
    const coloresSecundarios = ["#DCF4E8", "#EDE9FE", "#DBEAFE"];

    // Gráfica de línea (Frecuencia Acumulada)
    new Chart(document.getElementById("poligono"), {
      type: "line",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Acumulada",
          data: Object.values(data.frecuencia_acumulada),
          borderColor: "#22C55E",
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: "#22C55E",
          pointBorderColor: "white",
          pointBorderWidth: 3,
          pointRadius: 7,
          pointStyle: "circle",
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.2,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#22C55E",
              font: { size: 11, weight: "600" },
              padding: 10
            }
          }
        },
        scales: {
          y: {
            ticks: { color: "#6B7280", font: { size: 10 } },
            grid: { color: "rgba(34, 197, 94, 0.1)" }
          },
          x: {
            ticks: { color: "#6B7280", font: { size: 10 } }
          }
        }
      }
    });

    // Gráfica de barras (Frecuencia Absoluta)
    new Chart(document.getElementById("barras"), {
      type: "bar",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Absoluta",
          data: valores,
          backgroundColor: coloresPaleta,
          borderColor: "#8B5CF6",
          borderWidth: 2,
          borderRadius: 20,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.2,
        indexAxis: "y",
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#8B5CF6",
              font: { size: 11, weight: "600" },
              padding: 10
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#6B7280", font: { size: 10 } },
            grid: { color: "rgba(139, 92, 246, 0.1)" }
          },
          y: {
            ticks: { color: "#6B7280", font: { size: 10 } }
          }
        }
      }
    });

    // Diagrama de doughnut (Frecuencia Relativa)
    new Chart(document.getElementById("pastel"), {
      type: "doughnut",
      data: {
        labels: colores,
        datasets: [{
          label: "Frecuencia Relativa",
          data: Object.values(data.frecuencia_relativa),
          backgroundColor: coloresPaleta,
          borderColor: "white",
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#3B82F6",
              font: { size: 11, weight: "600" },
              padding: 10
            }
          }
        }
      }
    });
  });
