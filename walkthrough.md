# Reporte de Modificaciones - Funcionalidad "+ Nueva Fuente"

Se ha agregado y corregido la funcionalidad para agregar fuentes de información personalizadas en el formulario de registro de lluvias.

## Cambios Realizados

1. **Botón de Interfaz (`index.html`):**
   - Se añadió el botón `+ Nueva Fuente` (`#btnAddCustomSource`) junto a la etiqueta "Fuente de información", manteniendo la misma línea estética y funcional del botón `+ Nuevo Paraje / Localidad`.

2. **Lógica de Fuentes Personalizadas (`app.js`):**
   - **Manejo del Evento y Modal:** Se vinculó el evento click a `handleAddCustomSource()`, el cual despliega un cuadro de diálogo flotante (`showCustomPrompt`) solicitando al usuario el nombre de la nueva fuente u organismo.
   - **Persistencia Local (`localStorage`):** Se agregó la clave `CUSTOM_SOURCES_KEY` (`corrientes_custom_sources`) para guardar permanentemente las fuentes agregadas por el usuario.
   - **Carga y Selección Automática:** Al cargar la app o agregar una nueva fuente, esta se inserta automáticamente como una opción utilizable en el selector de fuentes (`#formSourceType`) y queda seleccionada de inmediato.
   - **Sincronización con Registros:** Las fuentes presentes en el historial de registros cargados también se incorporan dinámicamente a las opciones del desplegable.
   - **Actualización de `setFormSource()`:** Ajustada para que al editar un registro con una fuente personalizada, el selector posicione correctamente la fuente en el desplegable.

## Verificación

- Se verificó la sintaxis del marcado HTML y la lógica en `app.js`.
- La solución cumple con el flujo modal, persistencia y notificaciones flotantes integradas del sistema.
