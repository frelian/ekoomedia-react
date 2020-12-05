import React, { useState } from 'react'
import { setLightbox } from "../reducers/Actions";
import { connect } from "react-redux";

const ColorMessage = {
    success: "success",
    error: "error",
    warning: "warning"
}

const LightboxHook = props => {

    const [isFirst, setIsFirst] = useState(true);

    const getClassBgColor = () => {
        let bgColor = "";

        switch (props.bgColor) {
            default:
                bgColor = "message-success";
                break;
            case ColorMessage.error:
                bgColor = "message-error";
                break;
            case ColorMessage.warning:
                bgColor = "message-warning";
        }

        return bgColor;
    }


    if (props.show) {
        if (isFirst) {
            setTimeout(
                () => {
                    props.setLightbox(false)
                    setIsFirst(true)
                },
                5000
            );
            setIsFirst(false)
        }
    }

    const handleClic = (e) => {
        e.preventDefault();
        props.setLightbox(false);
    }

    return (
        props.show ?
            <div className="background-lightbox">
                <div className="container-lightbox">
                    <div className={`lightbox ${getClassBgColor()}`}>
                        <span className="close-lightbox" onClick={handleClic}>X</span>
                        <span className="message-lightbox">{props.msgLightbox}</span>
                    </div >
                </div >
            </div>
            : null
    )
}

// connect conecta con Redux
export default connect(null, { setLightbox })(LightboxHook);