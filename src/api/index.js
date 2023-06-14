import axios from "axios";
import urlJoin from 'url-join';

// nombre del host
const hostDes = process.env.NEXT_PUBLIC_API_HOST

// controller de seguridad
const controllerSeguridad = process.env.NEXT_PUBLIC_API_CONTROLLER_SEGURIDAD
// controller de publicaciones
const controllerPublicaciones = process.env.NEXT_PUBLIC_API_CONTROLLER_PUBLICACIONES
// controller de servicios
const controllerServicios = process.env.NEXT_PUBLIC_API_CONTROLLER_SERVICIOS

// funciones de la api de seguridad
export const seguridadApi = async (endpoint, data) => {
    try {
        const url = urlJoin(hostDes, controllerSeguridad, endpoint)
        const response = await axios.post(url, data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
// funciones de la api de publicaciones
export const publicacionesApi = async (endpoint, data) => {
    try {
        const url = urlJoin(hostDes, controllerPublicaciones, endpoint)
        const response = await axios.post(url, data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
// funciones de la api de servicios
export const serviciosApi = async (endpoint, data) => {
    try {
        const url = urlJoin(hostDes, controllerServicios, endpoint)
        const response = await axios.post(url, data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}