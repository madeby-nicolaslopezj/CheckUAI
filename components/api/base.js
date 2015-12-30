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
  return response.Asignaturas;
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
  return response.Alumnos;
};

UAI.markStudentAssistance = async function({ token, studentId, activityId }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/CheckAlumno',
    params: {
      token: token,
      idExpediente: studentId,
      tipoAsistencia: activityId,
    },
  });
  return response;
};

UAI._makeCall = async function({ method, path, params, addToken }) {
  var response = await this._fetch({ method, path, params, addToken });
  return await this._getJSON(response);
};

UAI._fetch = async function({ method, path, params, addToken }) {
  //await sleep(1000);

  if (addToken) {
    params.tokenApp = AppToken;
  }

  var url = `${BaseUrl}${path}`;
  console.log(`Making request to: ${url}`, params);

  return await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
};

UAI._getJSON = async function(response) {
  let body = await response.json();
  console.log(body);
  return body;
};

module.exports = UAI;
