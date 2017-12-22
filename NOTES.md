# Ejercicio dev-challenge
Se utilizó:

* Create-React-App para ahorrar tiempo en el setup del frontend.
* SQLite3 para evitar la configuración de una base de datos dado que es un ejercicio demo.
* Se implementó GraphQL para las queries y Express como router del API
* ECMA6 con Babel

## Install
El frontend ya está buildeado por lo que solo hay que hacer el install del api.
```sh
yarn install
```
```sh
npm install
```

## Run
El backend corre en el root el build del frontend. Solo es necesario correr el backend.
```sh
yarn start
```
```sh
npm start
```

Acceder a http://localhost:4000/

### To-Do
* Modularizar el API, está todo en un archivo debido a la simpleza del mismo y los tiempos de desarollo.
* Filtro por fechas
* Rutas con multi-stop. Si bien se muestra el "desde" a la hora de elegir destino no hay lógica armada para estas rutas. Solo la ruta multi-stop más barata utilizando algoritmo de Dijkstra.
* Al hacer build del API no importa el Frontend dado que no es un producto desarrollado para producción.
* Integrar Flow en Frontend. GraphQL ya posee validación de los tipos de contenido recibidos/enviados.
* Separación de SSR y CSR en React.