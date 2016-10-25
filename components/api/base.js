import React from 'react'
import { getSetting } from './settings';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

UAI.loginColaborator = async function({ rut, password }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/LoginColaborador',
    params: {
      rut,
      password,
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

UAI.getTeacherSessions = async function({ token }) {
  const academicUnit = await getSetting('academicUnit');
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/AsignaturasProfesor',
    params: {
      token,
      idUnidadAcademica: academicUnit,
    },
  });
  return response.Asignaturas;
};

UAI.getColaboratorSessions = async function({ token, rut }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/AsignaturasColaborador',
    params: {
      token: token,
      rut: rut,
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

UAI.getSessionAssistance = async function({ token, sessionId }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/ListaAsistentes',
    params: {
      token: token,
      idSeccion: sessionId,
    },
  });
  return response;
};

UAI.startSession = async function({ token, sessionId }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/InicioSesionAsistencia',
    params: {
      token: token,
      idseccion: sessionId,
    },
  });
  return response;
};

UAI.endSession = async function({ token, sessionId }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/FinSesionAsistencia',
    params: {
      token: token,
      idseccion: sessionId,
    },
  });
  return response;
};

UAI.markStudentAssistance = async function({ assist, token, studentId, activityType, sessionId }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/CheckAlumno',
    params: {
      token: token,
      idExpediente: Number(studentId),
      tipoAsistencia: String(activityType),
      asistencia: assist,
      seccionId: Number(sessionId),
    },
  });
  return response;
};

UAI.markManualStudentAssistance = async function({ assist, token, activityType, sessionId, email, password, photo }) {
  var response = await this._makeCall({
    method: 'POST',
    path: 'Asistencia/CheckManualAlumno',
    params: {
      token: token,
      tipoAsistencia: String(activityType),
      asistencia: assist,
      seccionId: Number(sessionId),
      email: email,
      password: password,
      foto: photo,
    },
  });
  return response;
};

UAI._makeCall = async function({ method, path, params, addToken }) {
  var response = await this._fetch({ method, path, params, addToken });
  return await this._getJSON(response);
};

UAI._fetch = async function({ method, path, params, addToken }) {
  //Await sleep(1000);
  //
  const appToken = await getSetting('token');
  const baseUrl = await getSetting('apiUrl');

  if (addToken) {
    params.tokenApp = appToken;
  }

  var url = `${baseUrl}${path}`;
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
