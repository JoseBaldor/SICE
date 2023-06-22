import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FormPlanesMaterias from '../components/FormPlanesMaterias';
 
const PlanesMaterias = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Materias por Plan de Estudio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Materias por Plan de Estudio</IonTitle>
          </IonToolbar>
        </IonHeader>
         <FormPlanesMaterias name = {"formPlanesMaterias"}/>
      </IonContent>
    </IonPage>
  );
};

export default PlanesMaterias;
