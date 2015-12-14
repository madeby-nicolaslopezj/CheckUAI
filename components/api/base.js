var React = require('react-native');
var AppToken = '1234';
var BaseUrl = 'http://webapitest.uai.cl/';

var {
  StyleSheet,
  Text,
  View,
} = React;

var UAI = {};

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

UAI.loginTeacher = async function({ email, password }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/LoginProfesor',
    params: {
      email: email,
      password: password,
    },
    addToken: true,
  });
  if (response.token) {
    return response.token;
  } else {
    var message = 'Error desconocido';
    if (response.respuesta) {
      message = response.respuesta;
    }

    throw new Error(message);
  }
};

UAI.getTeacherSessions = async function({ token, academicUnit }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/AsignaturasProfesor',
    params: {
      token: token,
      idUnidadAcademica: academicUnit,
    },
  });
  return response;
};

UAI.getSessionStudents = async function({ token, sessionId }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/AlumnosSeccion',
    params: {
      token: token,
      idSeccion: sessionId,
    },
  });
  console.log(response);
  return response;
};

UAI._makeCall = async function({ method, path, params, addToken }) {
  await sleep(100);

  if (addToken) {
    params.tokenApp = AppToken;
  }

  var query = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&');

  var url = `${BaseUrl}${path}?${query}`;
  console.log(`Making request to: ${url}`);

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  let body = await response.json();
  return body;
};

module.exports = UAI;
