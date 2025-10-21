# Buda Portfolio API

Buda Portfolio API es una aplicación backend desarrollada con **TypeScript y Express**, que permite calcular el valor total de un portafolio de criptomonedas en una moneda fiat (CLP, PEN o COP), utilizando precios en tiempo real obtenidos desde **Buda.com**.

El proyecto incluye una interfaz web para realizar las pruebas fácilmente y una documentación Swagger con todos los endpoints.

---

## Enlace de producción

- **Frontend (calculadora web):** [https://buda-ytf2.vercel.app](https://buda-ytf2.vercel.app)  
- **Documentación Swagger:** [https://buda-ytf2.vercel.app/api/docs](https://buda-ytf2.vercel.app/api/docs)  
- **Endpoint principal de API:** [https://buda-ytf2.vercel.app/api](https://buda-ytf2.vercel.app/api)

---

## Características principales

- Cálculo en tiempo real usando el valor `last_price` desde el API público de Buda.
- Conversión de múltiples criptomonedas hacia monedas fiat (CLP, PEN, COP).
- Documentación completa con Swagger (OpenAPI 3.0).
- Interfaz web simple y funcional para pruebas.
- Arquitectura modular y escalable.

---

## Endpoints principales

### `GET /api`
Verifica que la API esté en funcionamiento.

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "message": "API Buda funcionando correctamente"
}
