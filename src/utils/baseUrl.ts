// Define la URL base predeterminada
let baseUrl = 'http://localhost:8080'

// Verifica si estás en un entorno de producción
if (process.env.NODE_ENV === 'production') {
  // Asigna la URL base para el entorno de producción
  baseUrl = 'https://chatapp-u2kw.onrender.com'
}

export { baseUrl }
