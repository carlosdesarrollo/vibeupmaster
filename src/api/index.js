import axios from "axios";

// nombre del host
const host = process.env.NEXT_PUBLIC_API_HOST

// controller de seguridad
const controller_seguridad = process.env.NEXT_PUBLIC_API_CONTROLLER_SEGURIDAD
// controller de publicaciones
const controller_publicaciones = process.env.NEXT_PUBLIC_API_CONTROLLER_PUBLICACIONES

export const seguridadApi = axios.create({
    baseURL: `${host}${controller_seguridad}`,
});

export const publicacionesApi = axios.create({
    baseURL: `${host}${controller_publicaciones}`,
});