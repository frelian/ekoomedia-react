import { ActionType } from "../constants/general";


const initialState = {
    title: "Carro",
    isLightbox: false,
    responseMessage: "",
    bgColorMessage: "error"
};

function main(state = initialState, action) {
    if (action.type === ActionType.TITLE_STATUS) {
        return Object.assign({}, state, {
            title: action.payload
        });
    }
    else if(action.type === ActionType.LIGHTBOX_STATUS) {
        return Object.assign({}, state, {
            isLightbox: action.payload
        });
    }
    else if (action.type === ActionType.MESSAGE_STATUS) {
        return Object.assign({}, state, {
            responseMessage: action.payload
        });
    }
    else if (action.type === ActionType.MESSAGE_BGCOLOR) {
        return Object.assign({}, state, {
            bgColorMessage: action.payload
        });
    }
    else {
        return state;
    }
};

export default main;