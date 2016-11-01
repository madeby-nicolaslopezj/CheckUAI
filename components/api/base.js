import { getSetting } from './settings'
import sleep from './sleep'

const UAI = {}

UAI.loginTeacher = async function ({ email, password }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/LoginProfesor',
    params: {
      email: email,
      password: password
    },
    addToken: true
  })
  if (response.token) {
    return response.token
  } else {
    var message = 'Error desconocido'
    if (response.respuesta) {
      message = response.respuesta
    }

    throw new Error(message)
  }
}

UAI.loginColaborator = async function ({ rut, password }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/LoginColaborador',
    params: {
      rut,
      password
    },
    addToken: true
  })
  if (response.token) {
    return response.token
  } else {
    var message = 'Error desconocido'
    if (response.respuesta) {
      message = response.respuesta
    }

    throw new Error(message)
  }
}

UAI.getTeacherSessions = async function ({ token }) {
  const academicUnit = await getSetting('academicUnit')
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/AsignaturasProfesor',
    params: {
      token,
      idUnidadAcademica: academicUnit
    }
  })
  return response.Asignaturas
}

UAI.getColaboratorSessions = async function ({ token, rut }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/AsignaturasColaborador',
    params: {
      token: token,
      rut: rut
    }
  })
  return response.Asignaturas
}

UAI.getSessionStudents = async function ({ token, sessionId }) {
  const response = await makeCall({
    method: 'POST',
    path: 'Asistencia/AlumnosSeccion',
    params: {
      token: token,
      idSeccion: sessionId
    }
  })
  return response.Alumnos
}

UAI.getSessionAssistance = async function ({ token, sessionId }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/ListaAsistentes',
    params: {
      token: token,
      idSeccion: sessionId
    }
  })
  return response
}

UAI.startSession = async function ({ token, sessionId }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/InicioSesionAsistencia',
    params: {
      token: token,
      idseccion: sessionId
    }
  })
  return response
}

UAI.endSession = async function ({ token, sessionId }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/FinSesionAsistencia',
    params: {
      token: token,
      idseccion: sessionId
    }
  })
  return response
}

UAI.markStudentAssistance = async function ({ assist, token, studentId, activityType, sessionId, module }) {
  var response = await makeCall({
    method: 'POST',
    path: 'Asistencia/CheckAlumno',
    params: {
      token: token,
      idExpediente: Number(studentId),
      tipoAsistencia: String(activityType),
      asistencia: assist,
      seccionId: Number(sessionId),
      modulo: module
    }
  })
  return response
}

UAI.markManualStudentAssistance = async function ({ assist, token, activityType, sessionId, email, password, photo, module }) {
  var response = await makeCall({
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
      modulo: module
    }
  })
  return response
}

const makeCall = async function ({ method, path, params, addToken }) {
  var response = await fetchRequest({ method, path, params, addToken })
  return await getJSON(response)
}

const fetchRequest = async function({ method, path, params, addToken }) {
  const appToken = await getSetting('token')
  const baseUrl = await getSetting('apiUrl')

  if (addToken) {
    params.tokenApp = appToken
  }

  var url = `${baseUrl}${path}`
  console.log(`Making request to: ${url}`, params, JSON.stringify(params))

  await sleep(1000)
  console.log('will make request')
  const result = await global.fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  console.log('did made request')

  return result
}

const getJSON = async function(response) {
  let body = await response.json()
  console.log(body)
  return body
}

module.exports = UAI
