import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FormPlanesEstudios from '../components/FormPlanesEstudios';
 
const PlanesEstudios = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Planes de Estudios por Carrera</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Planes de Estudios por Carrera</IonTitle>
          </IonToolbar>
        </IonHeader>
         <FormPlanesEstudios name = {"formPlanes"}/>
      </IonContent>
    </IonPage>
  );
};

export default PlanesEstudios;
