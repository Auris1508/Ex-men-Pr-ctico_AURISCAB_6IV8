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
          borderWidth: 2,
          borderRadius: 20,
          borderSkipped: false,
          shadow: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: "y",
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#374151",
              font: { size: 12, weight: "600" },
              padding: 20
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#6B7280" },
            grid: { color: "rgba(0, 0, 0, 0.05)" }
          },
          y: {
            ticks: { color: "#6B7280" }
          }
        }
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
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#374151",
              font: { size: 12, weight: "600" },
              padding: 15
            }
          }
        }
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
          backgroundColor: "rgba(139, 92, 246, 0.2)",
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
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#374151",
              font: { size: 12, weight: "600" },
              padding: 15
            }
          }
        },
        scales: {
          y: {
            ticks: { color: "#6B7280" },
            grid: { color: "rgba(0, 0, 0, 0.05)" }
          },
          x: {
            ticks: { color: "#6B7280" }
          }
        }
      }
    });
  });
