import { atom } from "jotai";

// estados de la sesión
export const userDataAtom = atom(null);

export const authUserAtom = atom(null);
export const authUserLoadingAtom = atom(true);

// estados del menú
export const overlayAtom = atom(false);
export const modalAtom = atom(null);

// estados del formulario
export const userRegistradoAtom = atom(null);

// estados del modal de publicaciones
export const modalPublicacionAtom = atom(false);
export const textoPublicacionAtom = atom("");
export const imagenPublicacionAtom = atom([]);
export const imagenPublicacionPreviewAtom = atom([]);

// estados de las publicaciones perfil
export const postsAtom = atom([]);

// estados de las publicaciones de la página principal
export const postsPrincipalAtom = atom([]);