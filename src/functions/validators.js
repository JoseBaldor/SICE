import moment from "moment/moment";

export const semestreValidator = (value) =>{
    return value > 0;
}

export const ejeValidator = (value) =>{
    return value > 0;
}

export const especialidadValidator = (value) =>{
    return value > 0;
}

export const mayorQueCero = (value) =>{
    return value > 0;
}

export const creditoValidator = (value) =>{
    return value > 0;
}

export const fuacadValidator = (value) =>{
    const hoy = moment().format("DD-MM-YYYY");
    const fecha = moment(value).format("DD-MM-YYYY");
    console.log(hoy);
    console.log(fecha);
    return fecha <= hoy;
}