
document.getElementById("buscarBtn").addEventListener("click", async () => {
  const presupuesto = parseFloat(document.getElementById("presupuesto").value);
  const personas = parseInt(document.getElementById("personas").value);
  const origen = document.getElementById("origen").value;

  const response = await fetch("dataset.json");
  const flights = await response.json();

  const viajes = findTrips(flights, presupuesto, personas, origen);

  mostrarResultados(viajes, presupuesto, personas);
});

function findTrips(flights, presupuesto, personas, origen) {
  const trips = [];

  for (const ida of flights) {
    if (origen && ida.origin !== origen) continue;

    for (const vuelta of flights) {
      if (vuelta.origin === ida.destination && vuelta.destination === ida.origin) {
        const total = (ida.price + vuelta.price) * personas;
        const disponible = Math.min(ida.availability, vuelta.availability);

        if (total <= presupuesto && disponible >= personas) {
          trips.push({
            ruta: `${ida.origin} ⇄ ${ida.destination}`,
            total: total.toFixed(2),
            salida: ida.date,
            regreso: vuelta.date,
            duracion: calcDuracion(ida.date, vuelta.date),
            precioPersona: (ida.price + vuelta.price).toFixed(2),
            cupos: disponible
          });
        }
      }
    }
  }
  return trips;
}

function calcDuracion(ida, vuelta) {
  const d1 = new Date(ida);
  const d2 = new Date(vuelta);
  const diff = Math.ceil((d2 - d1) / (1000*60*60*24));
  return `${diff} día${diff !== 1 ? "s" : ""}`;
}

function mostrarResultados(viajes, presupuesto, personas) {
  const div = document.getElementById("resultados");
  div.innerHTML = "";

  if (viajes.length === 0) {
    div.innerHTML = `<p>No encontramos viajes dentro de $${presupuesto} para ${personas} persona(s) 😢</p>`;
    return;
  }

  viajes.slice(0, 60).forEach(v => {
    div.innerHTML += `
      <div class="card">
        <h3>US$ ${v.total} total</h3>
        <p><strong>${v.ruta}</strong></p>
        <p>Salida: ${v.salida}</p>
        <p>Vuelta: ${v.regreso}</p>
        <p>Duración: ${v.duracion}</p>
        <p>Precio por persona: US$ ${v.precioPersona}</p>
        <p>Cupos disponibles: ${v.cupos}</p>
        <button>Ver detalles</button>
      </div>
    `;
  });
}
