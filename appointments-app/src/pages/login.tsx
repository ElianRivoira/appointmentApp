import React from 'react'

const login = () => {
  return (
    <div>
      <nav>
        <button>Reservar</button>
        <button>Mis Reservas</button>
        <button>Mi Cuenta</button>
      </nav>
      <div>
        <h3>Iniciar Sesión</h3>
        <form>
          <label htmlFor="username">Usuario</label>
          <input type="text" name='username' id='username' />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name='password' id='password' />
          <button>¿Olvidaste tu contraseña?</button>
          <button>Ingresar</button>
          <button>¿No tenés cuenta? Registrate</button>
        </form>
      </div>
    </div>
  )
}

export default login