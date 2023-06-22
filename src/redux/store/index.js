import ejesReducer from '../reducer/ejesFormativos';
import gruposReducer from '../reducer/gruposEtnicos'
import lenguasReducer from '../reducer/lenguasIndigenas';
import plazasReducer from '../reducer/plazas';
import plazasCategoriasReducer from '../reducer/plazasCategorias';
import plazasModelosReducer from '../reducer/plazasModelos';
import plazasFuncionesReducer from '../reducer/plazasFunciones';
import sniReducer from '../reducer/sni';
import areasEspecialidadesReducer from '../reducer/areasEspecialidades';
import semestresReducer from '../reducer/semestres';
import materiasReducer from '../reducer/materias';
import unidadesAcademicasReducer from '../reducer/unidadesAcademicas';
import empleadosReducer from '../reducer/empleados';
import areasAcademicasReducer from '../reducer/areasAcademicas';
import carrerasReducer from '../reducer/carreras';
import planesEstudiosReducer from '../reducer/planesEstudios';
import municipiosReducer from '../reducer/municipios';
import planesMateriasReducer from '../reducer/planesMaterias'
import { applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

const reducer = combineReducers({
  // here we will be adding reducers
  lenguasReducer,
  sniReducer,
  plazasReducer,
  plazasCategoriasReducer,
  plazasModelosReducer,
  plazasFuncionesReducer,
  gruposReducer,
  ejesReducer,
  areasEspecialidadesReducer,
  semestresReducer,
  materiasReducer,
  unidadesAcademicasReducer,
  empleadosReducer,
  areasAcademicasReducer, 
  carrerasReducer,
  planesEstudiosReducer,
  municipiosReducer,
  planesMateriasReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  {reducer},
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
