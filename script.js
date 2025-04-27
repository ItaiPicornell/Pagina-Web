document.getElementById('formulario-suscripcion').addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (!validarNombre(nombre)) {
        alert('El nombre no debe contener números ni estar vacío.');
        return;
    }

    if (!validarCorreo(correo)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    try {
        const respuesta = await fetch('https://webdigitalizacion.netlify.app/suscribir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo })
        });

        const data = await respuesta.json();

        if (data.success) {
            document.getElementById('mensaje-confirmacion').classList.remove('oculto');

            console.log('Formulario enviado:', {
                nombre: nombre,
                correo: correo
            });

            setTimeout(() => {
                window.location.href = 'confirmacion.html';
            }, 2000);
        } else {
            alert('Hubo un error al suscribirse.');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error de conexión.');
    }
});

function validarNombre(nombre) {
    const expresion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return expresion.test(nombre) && nombre.length > 0;
}

function validarCorreo(correo) {
    const expresion = /\S+@\S+\.\S+/;
    return expresion.test(correo);
}
