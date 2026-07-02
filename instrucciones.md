# FORMALIA - Especificaciones Técnicas y de Interfaz (UI/UX)

## 1. Lógica Central de Negocio (Business Rules)
Antes de diseñar cualquier vista, el sistema se rige por estas reglas inmutables del régimen NRUS (Nuevo Régimen Único Simplificado) y la operativa comercial:

* **Motor de Cálculo Mensual:** El sistema evalúa el mes calendario (día 1 al 30/31).
    * Ventas $\le$ S/ 5,000 Y Compras $\le$ S/ 5,000 = Categoría 1 (Paga S/ 20).
    * Ventas entre S/ 5,001 y S/ 8,000 O Compras entre S/ 5,001 y S/ 8,000 = Categoría 2 (Paga S/ 50).
    * Ventas o Compras $>$ S/ 8,000 = Alerta crítica de exceso de tope (fuera del NRUS).
* **Gestión del "Monedero" (Ventas Menores):** Las ventas $\le$ S/ 5.00 no exigen boleta individual. Se acumulan durante el día y el contador interno hace un "corte" automático diario a las 20:00 hrs (8:00 PM). **Al realizarse este corte, además de guardarse en el historial de ventas chicas, el sistema inserta automáticamente un registro en el CRUD de Ventas con la descripción "Ventas menores del [DD/MM/AAAA]" y el monto total acumulado.** Esto garantiza que dichas ventas se sumen de forma transparente al termómetro mensual del Dashboard.
* **Sistema de Gamificación y Scoring ("Índice de Confiabilidad"):** Las recompensas por completar misiones de formalización y mantener constancia en los registros se traducen en puntos para el perfil del usuario. Este índice va de 0 a 1000 puntos y se divide en 4 rangos matemáticos exactos con su respectiva codificación de color visual:
    * **Inicial:** 0 a 250 puntos (Color: Rojo).
    * **Activo:** 251 a 500 puntos (Color: Naranja).
    * **Seguro:** 501 a 850 puntos (Color: Amarillo).
    * **Socio Confiable:** 851 a 1000 puntos (Color: Verde).
* **Línea de Seguridad Legal (Restricciones del Sistema):**
    * FORMALIA **no** emite comprobantes oficiales a los servidores de SUNAT. Es un cuaderno de control ("Capa Estratégica").
    * FORMALIA **no** declara las compras a la SUNAT (el régimen NRUS no lo exige). Sin embargo, el registro en el sistema es obligatorio exclusivamente para uso interno: vigilar que no se excedan los topes mensuales y servir como escudo legal (sustento) ante decomisos de mercadería.
    * FORMALIA **no** genera la Clave SOL directamente (guía al usuario para hacerlo).
    * FORMALIA **no** procesa pagos de impuestos de forma directa (genera el PDF "Guía de Pago Fácil" para que el usuario pague en el banco/agente).

---

## 2. Reglas de Diseño y Sistema Visual (Design System)
El enfoque es estrictamente **Mobile-First** (optimizado para pantallas de celular), considerando que el usuario "Lucho" no tiene una laptop en su puesto de trabajo.

* **Paleta de Colores Principal:** * **Color Primario:** Azul corporativo moderno degradado a Verde agua (`linear-gradient(135deg, #1E3A8A, #10B981)`). Este gradiente representa la transición: de lo formal/estricto (azul) al crecimiento/esperanza (verde).
    * **Colores Semánticos:** Verde esmeralda (Éxito/Categoría 1), Ámbar/Naranja (Precaución/Categoría 2), Rojo carmesí (Peligro/Exceso de tope).
    * **Fondos:** Gris muy claro o blanco roto puro para maximizar el contraste y la legibilidad.
* **Tipografía:** Sans-serif limpia (ej. *Inter* o *Roboto*). Tamaños grandes y legibles. Cero jerga, textos cortos y directos.
* **Micro-interacciones (Animaciones sutiles):**
    * No abusar de movimientos bruscos. 
    * Usar un efecto de "latido" (pulsing) suave para el botón de acción principal o el nodo activo del Roadmap.
    * Transiciones suaves al llenar las barras de progreso del Dashboard.
    * Animación de "Check de éxito" (Lottie o SVG animado de 1 segundo) al registrar una Venta Rápida.

---

## 3. Especificaciones de Interfaces (18 Vistas Totales)

### A. Pantallas de Acceso y Configuración

#### 1. Landing Page (Página de Inicio)
* **Funcionalidad:** Escaparate del producto.
* **Visual:** Header con logo, ilustración limpia de un comerciante con su celular, propuesta de valor clara y botones CTA (Call to Action).
* **Conexión:** Redirige a *Login* o *Onboarding*.
* **Valor de Negocio:** Conversión de visitantes a usuarios registrados.

#### 2. Login (Inicio de Sesión)
* **Funcionalidad:** Acceso para usuarios recurrentes.
* **Visual:** Fondo limpio, input de correo, input de contraseña, botón principal (Gradiente Azul-Verde) "Ingresar". Opción "Olvidé mi contraseña".
* **Conexión:** Lleva directamente al *Dashboard*.

#### 3. Onboarding Multifase (Registro Inteligente)
* **Funcionalidad:** Captura de datos iniciales en 1 sola interfaz dinámica tipo *stepper* (paso a paso).
* **Visual y Lógica:**
    * *Paso 1:* Correo y creación de contraseña (con confirmación de contraseña).
    * *Paso 2:* DNI, Nombres y Dirección (Domicilio Fiscal).
    * *Paso 3:* Lienzo (Canvas) blanco para dibujar la firma con el dedo.
    * *Paso 4 (Bifurcación):* Pregunta "¿Ya tienes RUC 10?". Si ingresa el RUC, la base de datos marca la Misión 1 del Roadmap como completada. Si selecciona "Aún no tengo", marca la Misión 1 como pendiente.
* **Conexión:** Al finalizar, inyecta los datos en el Perfil y redirige al *Dashboard*.
* **Valor de Negocio:** Reduce la fricción de entrada pidiendo los datos poco a poco en lugar de un formulario gigante.

---

### B. Pantallas de Operación Diaria

#### 4. Dashboard (Centro de Mando)
* **Funcionalidad:** Vista principal que resume el estado del negocio en el mes seleccionado.
* **Restricciones:** No muestra datos históricos a menos que se cambie el selector de mes.
* **Visual:**
    * Selector `Select` superior (Mes: "Junio 2026").
    * Tarjeta **"Ventas"**: Muestra el monto en curso según el filtro (incluyendo ventas chicas y las normales). Contiene el botón “Ver Historial” y al hacer clic, lleva a la pantalla “Ventas (Gestión de Boletas Mayores)”. Contiene botón "Agregar", que permite registrar una venta, abriendo directamente el modal “Modal de Formulario de Nueva Venta”, la cual también se guardará en el crud de ventas (mostrará una alerta flotante que indique que la venta se ha registrado), y actualizará la tarjeta "Ventas" con una micro-animación.
    * Tarjeta pequeña **"Monedero de hoy"**: Muestra el monto en curso del día para ventas menores o iguales a 5 soles. Al hacer clic, abre el modal *Historial Monedero*. Contiene botón "+" para agregar una venta chica mostrando la interfaz “Venta Rápida”.
    * **Termómetro Ventas:** Barra de progreso visual (Verde $\rightarrow$ Naranja $\rightarrow$ Roja).
    * **Termómetro Compras:** Barra de progreso visual.
    * Tarjeta **"Proyección SUNAT"**: Muestra el pago estimado (S/ 20 o S/ 50) y botón "Generar Guía" si el mes ya cerró.
* **Conexión:** Desde aquí se accede a todas las demás pantallas mediante un Bottom Navigation Bar (Barra inferior de navegación).
* **Valor de Negocio:** Es el "analgésico" del usuario. Le da control y paz mental en 5 segundos.

#### 5. Venta Rápida (Interfaz "Estilo Yape")
* **Funcionalidad:** Registro exclusivo de ventas $\le$ S/ 5.00 con fricción cero.
* **Visual:** Minimalista. La mitad superior muestra el número que se va digitando. La mitad inferior es un teclado numérico grande. Dos botones: "Cancelar" (gris) y "Registrar Monto" (Verde).
* **Conexión:** Se abre desde el *Dashboard*. Al registrar, devuelve al usuario al *Dashboard* actualizando la tarjeta "Monedero de hoy" con una micro-animación.
* **Valor de Negocio:** Genera el hábito de registro diario sin causar pereza operativa.

#### 6. Roadmap Gamificado (El Camino a Empresario)
* **Funcionalidad:** Línea de tiempo visual con las misiones de formalización.
* **Restricciones:** Bloqueo condicional. No se puede acceder a la misión 3 si la 1 y 2 no están hechas.
* **Visual:** Camino sinuoso (estilo Candy Crush). Nodos grises (bloqueados), nodo pulsante (activo), nodos verdes con icono de check (completados).
* **Conexión:** Al hacer clic en un nodo activo, se abre el modal *Firma de Documentos* o las instrucciones del paso.
* **Valor de Negocio:** Mantiene la retención del usuario mediante psicología de logros (gamificación). Cada misión completada otorga puntos que suman directamente al "Índice de Confiabilidad" del usuario.

---

### C. Pantallas de Gestión y Registro (CRUDs)

#### 7. Ventas (Gestión de Boletas Mayores)
* **Funcionalidad:** Registro manual de ventas $>$ S/ 5.00 e integración automática del cierre de ventas menores diarias.
* **Visual:** Lista ordenada por fecha. Mostrará tanto las ventas ingresadas manualmente como el registro automático generado a las 8:00 PM ("Ventas menores del DD/MM/AAAA"). Botón flotante superior para "Nueva Venta". A lado de cada registro debe tener botones para eliminar y editar. Como debe ser en un crud. En la esquina inferior derecha, un FAB (Floating Action Button) circular con ícono de reloj/moneda que abre el modal *Historial Monedero*.
* **Conexión:** Alimenta directamente la barra de "Termómetro de Ventas" del *Dashboard*.

#### 8. Compras (Escudo Legal)
* **Funcionalidad:** Registro de facturas de proveedores.
* **Visual:** Lista ordenada. Botón "Registrar Factura" (pide RUC del proveedor, N° Factura y Monto). A lado de cada registro debe tener botones para eliminar y editar. Como debe ser en un crud.
* **Conexión:** Alimenta la barra de "Termómetro de Compras" del *Dashboard*.
* **Valor de Negocio:** Fomenta la exigencia de facturas en el mercado informal, protegiendo al comerciante de decomisos.

#### 9. Perfil del Usuario
* **Funcionalidad:** Edición de datos e índice de confianza.
* **Visual:** Foto/Avatar, Nombre, DNI, RUC. Sección para "Actualizar Firma". En la parte superior, un medidor gamificado circular o gráfica para el **"Índice de Confiabilidad"**, cuyo color se adaptará automáticamente al nivel actual (Rojo para Inicial, Naranja para Activo, Amarillo para Seguro, y Verde para Socio Confiable), acompañado del puntaje actual (ej. 750/1000).
* **Valor de Negocio:** Construye un historial de scoring alternativo basado en disciplina, altamente monetizable a futuro con entidades financieras.

#### 10. La Bóveda (Mis Documentos)
* **Funcionalidad:** Repositorio en la nube de documentos oficiales.
* **Restricciones:** Los documentos aquí son de solo lectura/descarga. Se generan en otras vistas (Roadmap o Dashboard).
* **Visual:** Estilo cuadrícula (Grid) o lista con iconos de PDF. Ej: "RUC_107xxxx.pdf", "Licencia_Municipal.pdf", "Pago_SUNAT_Junio.pdf". Botones de "Ver" y "Descargar/Compartir".
* **Valor de Negocio:** Elimina el pánico ante fiscalizaciones, teniendo los papeles a un clic de distancia.

---

### D. Componentes Flotantes y Modales (Overlays)

#### 11. Chatbot IA (Asistente Integrado)
* **Funcionalidad:** Resolución de dudas y traducción de jerga técnica.
* **Visual:** Burbuja flotante en las pantallas principales. Al hacer clic, se desliza un panel lateral (Drawer) o Pop-up con interfaz de chat.
* **Conexión:** Disponible de forma global. No interrumpe la navegación.

#### 12. Panel y Página de Notificaciones
* **Funcionalidad:** Centro de alertas preventivas con vista rápida y registro histórico completo.
* **Visual:** Ícono de campana en la barra superior (Navbar). Al pulsarlo, se despliega un menú flotante con la vista rápida de las notificaciones recientes (Ej: "Faltan 2 horas para el cierre del día"). En la parte inferior de este desplegable, incluye un botón que indica "Ver todas", el cual, al ser pulsado, redirige al usuario a la página completa de notificaciones.
* **Valor de Negocio:** La proactividad de la app. Actúa como el secretario personal que Lucho no puede pagar.

#### 13. Modal de Firma de Documentos
* **Funcionalidad:** Auto-rellenado y validación de seguridad.
* **Visual:** Pop-up que superpone la vista actual. Muestra una previsualización del documento (ej. Formulario FUT) con los datos ya inyectados. Requiere un input de contraseña para autorizar la incrustación de la firma gráfica. Animación de éxito (Check verde) al firmar.
* **Conexión:** Se activa desde el *Roadmap*. Al culminar, guarda el PDF en *La Bóveda*.

#### 14. Pop-up Historial del Monedero (7 Días)
* **Funcionalidad:** Visualización de los acumulados de Caja Chica recientes.
* **Visual:** Modal centrado. Lista de 7 filas.
    * *Días pasados (6 filas):* Monto estático + Etiqueta gris "Día finalizado".
    * *Día actual (1 fila superior):* Monto dinámico + Etiqueta resaltada (verde/azul) "En curso" + Texto: "Faltan X horas para las 8:00 PM".
* **Conexión:** Se abre desde la tarjeta del *Dashboard* o desde el FAB de la pantalla de *Ventas*.

#### 15. Modal de Formulario de Nueva Venta
* **Funcionalidad:** Interfaz para registrar manualmente una venta individual $>$ S/ 5.00 en el CRUD.
* **Visual:** Pop-up superpuesto a la lista de ventas. Contiene campos de entrada para la fecha de emisión, el monto exacto y detalles del cliente/descripción (opcional). En la parte inferior, dos botones: "Agregar" (Verde/Primario) y "Cancelar" (Gris/Secundario).
* **Conexión:** Se despliega al pulsar el botón "Nueva Venta" o "Agregar" desde la pantalla de *Ventas*.

#### 16. Modal de Formulario de Edición de Venta
* **Funcionalidad:** Interfaz para corregir o actualizar una venta previamente registrada.
* **Visual:** Idéntico al Pop-up de Nueva Venta, pero los campos de texto se renderizan pre-rellenados con la información del registro seleccionado. En la parte inferior, dos botones: "Aceptar" (Verde/Primario) para guardar los cambios y "Cancelar" (Gris/Secundario).
* **Conexión:** Se despliega exclusivamente al pulsar el botón "Editar" en un ítem específico de la lista de *Ventas*.

#### 17. Modal de Formulario de Nueva Compra
* **Funcionalidad:** Interfaz para registrar los datos de una factura de proveedor en el CRUD.
* **Visual:** Pop-up superpuesto a la lista de compras. Pide datos clave como RUC del proveedor, número de la factura, monto de compra y fecha. En la parte inferior, dos botones: "Agregar" (Verde/Primario) y "Cancelar" (Gris/Secundario).
* **Conexión:** Se despliega al presionar el botón "Registrar Factura" o "Agregar" en la pantalla de *Compras*.

#### 18. Modal de Formulario de Edición de Compra
* **Funcionalidad:** Interfaz para modificar detalles de una factura ya guardada en el sistema.
* **Visual:** Idéntico al Pop-up de Nueva Compra, cargando automáticamente la información (RUC, número, monto, etc.) de la factura a editar. En la parte inferior, contiene los botones "Aceptar" (Verde/Primario) y "Cancelar" (Gris/Secundario).
* **Conexión:** Se despliega al pulsar el botón "Editar" junto a un registro en la lista de *Compras*.