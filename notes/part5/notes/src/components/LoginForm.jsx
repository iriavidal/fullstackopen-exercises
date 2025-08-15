/* eslint-disable react/prop-types */ // Desactiva la regla de ESLint que exige propTypes
import PropTypes from "prop-types";

// Definición del componente funcional "LoginForm".
// Se usan props desestructuradas para recibir las funciones y valores necesarios desde el componente padre.
const LoginForm = ({
  handleSubmit, // función que se ejecuta cuando se envía el formulario
  handleUsernameChange, // función que se ejecuta al cambiar el campo 'username'
  handlePasswordChange, // función que se ejecuta al cambiar el campo 'password'
  username, // valor actual del campo 'username' (estado controlado)
  password, // valor actual del campo 'password' (estado controlado)
}) => {
  // El componente devuelve JSX que representa el formulario de login
  return (
    <div>
      {/* Título del formulario */}
      <h2>Login</h2>

      {/* Formulario: onSubmit conecta el envío del formulario con la función handleSubmit */}
      <form onSubmit={handleSubmit}>
        {/* Contenedor del campo de usuario */}
        <div>
          username
          {/* Input controlado para el nombre de usuario.
              value toma el estado 'username' y onChange llama a handleUsernameChange. */}
          <input value={username} onChange={handleUsernameChange} />
        </div>

        {/* Contenedor del campo de contraseña */}
        <div>
          password
          {/* Input controlado para la contraseña.
              type="password" oculta el texto; value y onChange funcionan igual que en username. */}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Botón para enviar el formulario.
            Al pulsarlo se dispara el evento submit del form, que llama a handleSubmit. */}
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

// Exporta el componente por defecto para poder importarlo desde otros archivos
export default LoginForm;
