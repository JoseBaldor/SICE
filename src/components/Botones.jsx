import { saveOutline, save, trash, search, newspaper } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/react";
import s from './Botones.module.css'

const Botones = (props) =>{
    return(
        <div>
            <button className={s.button} type="submit" onClick={()=>props.list()}>
                <IonIcon size="large" icon={ newspaper } color={ "tertiary" } />
            </button>
            <button type="submit" form ={props.nameForm} className={s.button} >
                <IonIcon size="large" icon={ save } color={ "secondary" } />
            </button>
            <button type="submit" className={s.button} onClick={()=>props.delete()}>
                <IonIcon size="large" icon={ trash } color={ "danger" } />
            </button>
            {/* <button type="submit" className={s.button} >
                <IonIcon size="large" icon={ search } color={ "primary" } />
            </button> */}


            {/* <IonButton color={"primary"}> <IonIcon icon={ saveOutline }  color={ "danger" } /> Primary</IonButton>

            <IonButton color={"secondary"}> <IonIcon icon={ save } color={ "tertiary" } />  secondary</IonButton>
            <IonButton color={"tertiary"}>Tertiary</IonButton>
            <IonButton color={"success"}>Success</IonButton>
            <IonButton color={"warning"}>Warning</IonButton>
            <IonButton color={"danger"}>Danger</IonButton>
            <IonButton color={"light"}>Light</IonButton>
            <IonButton color={"medium"}>Medium</IonButton>
            <IonButton color={"dark"}>Dark</IonButton> */}
        </div>
    );
}

export default Botones;