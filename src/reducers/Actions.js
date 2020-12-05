import { ActionType } from "../constants/general";

export function setTitle(payload) {
    return { type: ActionType.TITLE_STATUS, payload };
}

export function setLightbox(payload) {
    return { type: ActionType.LIGHTBOX_STATUS, payload };
}

export function setResponseMessage(payload) {
    return { type: ActionType.MESSAGE_STATUS, payload };
}

export function setBgColorMessage(payload) {
    return { type: ActionType.MESSAGE_BGCOLOR, payload };
}