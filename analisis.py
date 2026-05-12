import pandas as pd
import json

# Leer CSV
df = pd.read_csv("datos.csv")

# Limpiar datos
df["velocidad"] = pd.to_numeric(df["velocidad"], errors="coerce")

# Calcular estadísticas
media = df["velocidad"].mean()
mediana = df["velocidad"].median()
moda = df["velocidad"].mode()[0]

# Frecuencias
frecuencia_color = df["color"].value_counts()
frecuencia_relativa = df["color"].value_counts(normalize=True)
frecuencia_acumulada = df["color"].value_counts().cumsum()

# Guardar resultados en JSON
resultados = {
    "media": round(media, 2),
    "mediana": round(mediana, 2),
    "moda": round(moda, 2),
    "frecuencia_color": frecuencia_color.to_dict(),
    "frecuencia_relativa": frecuencia_relativa.to_dict(),
    "frecuencia_acumulada": frecuencia_acumulada.to_dict(),
}

with open("resultados.json", "w") as f:
    json.dump(resultados, f)

print("✅ Análisis completado. Archivo resultados.json generado.")
