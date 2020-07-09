/**
 * Normalize port value for server to listen on to something understandable by `http`
 *
 * @param {any} portVal Value of port for HTTP server to listen on
 * @return {void|number|boolean}
 */
export const normalizedPort = (portVal: any) => {
  const port = parseInt(portVal, 10);
  if (isNaN(port)) {
      // named pipe
      return;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
};