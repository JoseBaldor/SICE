import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";

import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect} from "react-router-dom";
import { Acordeon } from "./components/Acordeon";

import Home from "./pages/Home";
import PlanesEstudios from "./pages/PlanesEstudios";
import Configuracion from "./pages/Configuracion";
import FormLenguas from "./components/FormLenguas";
import FormSNI from "./components/FormSNI";
import FormPlazas from "./components/FormPlazas";
import FormCategorias from "./components/FormCategorias";
import FormModelos from "./components/FormModelos";
import FormFunciones from "./components/FormFunciones";
import FormEtnicos from "./components/FormEtnicos";
import FormEjes from "./components/FormEjes";
import FormSemestres from "./components/FormSemestres";
import FormEspecialidad from "./components/FormEspecialidad";
import FormAcademicas from "./components/FormAcademicas";

import Carreras from './pages/Carreras'
import Materias from './pages/Materias'
import Uacademicas from './pages/Uacademicas'
import PlanesMaterias from "./pages/PlanesMaterias";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App = () => {

  return (
    <IonApp>
      <IonReactRouter basename = {"/sice"}>
        <IonSplitPane contentId="main">
          <Acordeon/>
          <IonRouterOutlet id="main">
            <Route path = "/page/home">
              <Home/>
            </Route>
            <Route path="/page/planes">
              <PlanesEstudios/>
            </Route>
            <Route path="/page/materiasplan">
              <PlanesMaterias/>
            </Route>
            <Route path="/page/carreras">
              <Carreras/>
            </Route>
            <Route path="/page/materias">
              <Materias/>
            </Route>
            <Route path="/page/uacademicas">
              <Uacademicas/>
            </Route>
            <Route path="/page/lenguas">
              <Configuracion titulo={'Lenguas Indigenas'}><FormLenguas name = {"formLenguas"}/></Configuracion>
            </Route>
            <Route path="/page/investigadores">
              <Configuracion titulo={'Sistema Nacional de Investigadores'}><FormSNI name = {"formSni"}/></Configuracion>
            </Route>
            <Route path="/page/plazas">
              <Configuracion titulo={'Plazas'}><FormPlazas name = {"formPlazas"}/></Configuracion>
            </Route>
            <Route path="/page/categorias">
              <Configuracion titulo={'Categorías de Plazas'}><FormCategorias name = {"formCategorias"}/></Configuracion>
            </Route>
            <Route path="/page/modelos">
              <Configuracion titulo={"Modelos de Plazas"}><FormModelos name ={"formModelos"}/></Configuracion>
            </Route>
            <Route path="/page/funciones">
              <Configuracion titulo={"Funciones de la Plaza"}><FormFunciones name = {"formFunciones"}/></Configuracion>
            </Route>
            <Route path="/page/gpoetnicos">
              <Configuracion titulo={"Grupos Étnicos"}><FormEtnicos/> </Configuracion>
            </Route>
            <Route path="/page/ejes">
              <Configuracion titulo={"Ejes Formativos"}><FormEjes/> </Configuracion>
            </Route>
            <Route path="/page/semestres">
              <Configuracion titulo={"Semestres"}><FormSemestres name = {"formSemestres"}/></Configuracion>
            </Route>
            <Route path="/page/especialidad">
              <Configuracion titulo={'Áreas de Especialidad'}><FormEspecialidad name = {"formEspecialidad"}/></Configuracion>
            </Route>
            <Route path="/page/academicas">
              <Configuracion titulo={'Áreas Académicas'}><FormAcademicas name = {"formAcademicas"}/></Configuracion>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
