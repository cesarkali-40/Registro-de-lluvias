# Reporte de Modificaciones - Informe Imprimible (Mejoras de Estilo) y Sincronizador Automático

Se han completado los ajustes en el sistema de impresión del reporte y se ha añadido un script de sincronización en tiempo real para mantener el dashboard al día con los cambios del servidor.

## Cambios Realizados

1. **Ajuste del Logotipo y Ancho de la Hoja:**
   - Se modificó la regla CSS del logotipo institucional en el reporte imprimible. Se configuró a `width: 100%` con un `max-height: 80px` y `object-fit: contain`. Esto asegura que el banner del logo abarque todo el ancho útil de la página de impresión en tamaño Oficio sin deformarse.

2. **Control de Saltos de Página (Separación de Departamentos):**
   - Se implementó la regla CSS de salto de página `page-break-after: always` y `break-after: page` para los contenedores de departamento (`.dept-container`).
   - Esto garantiza que **cada departamento comience en su propia página horizontal Oficio** de forma organizada, y que los meses correspondientes a cada departamento se ubiquen uno al lado del otro en esa misma hoja sin segmentar o romper la tabla a la mitad.

3. **Script Autoejecutable de Control de Cambios en Servidor (Auto-Watcher):**
   - Se programó un **observador automático en segundo plano** al final de [app.js](file:///C:/Users/Adrian/Documents/GitHub/Registro-de-lluvias/app.js).
   - Este script realiza una consulta ligera tipo `HEAD` al archivo `plantilla_registro_lluvias.csv` del servidor cada **8 segundos** para verificar si la fecha de modificación o tamaño del archivo ha cambiado (lo cual ocurre cuando se registran nuevos datos de lluvia desde otra pestaña, o si se modifica directamente el archivo en el disco).
   - En caso afirmativo, el dashboard muestra un cuadro de diálogo interactivo:
     *"Se han cargado nuevos datos de lluvia en el servidor (archivo CSV modificado). ¿Deseas actualizar el dashboard para mostrar los nuevos registros?"*
   - Al aceptar, el dashboard borra la caché local obsoleta, vuelve a leer el archivo CSV modificado del disco y actualiza al instante todos los gráficos, estadísticas y el mapa.

## Verificación

- La verificación con el agente web comprobó que al hacer clic en **"Generar Informe Imprimible (Oficio)"**, las tablas se estructuran correctamente una al lado de la otra (Mayo y Junio de forma paralela), sin errores de renderizado.
- Las modificaciones están totalmente implementadas en los archivos dentro de la carpeta:
  `C:\Users\Adrian\Documents\GitHub\Registro-de-lluvias`
