import React from 'react';

    import { setLightbox } from "../reducers/Actions";
    import { connect } from "react-redux";

const ColorMessage = {
    success: "success",
    error:   "error",
    warning: "warning"
}

class Lightbox extends React.Component {

    isFirst = true;

    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleClic = this.handleClic.bind(this);
    }

    handleClic(e) {
        e.preventDefault();
        this.props.setLightbox(false);
    }

    componentDidMount() {
       
    }
    componentWillUnmount() {
        
    }

    getClassBgColor() {
        let bgColor = "";

        switch (this.props.bgColor) {
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

    render() {
        if (this.props.show) {
            if (this.isFirst) {
                this.timerID = setTimeout(
                    () => {
                        this.props.setLightbox(false)
                        this.isFirst = true
                    },
                    5000
                );
                this.isFirst = false;
            }
        }
        return (
            this.props.show  ? 
            <div className="background-lightbox">
                <div className="container-lightbox">
                        <div className={`lightbox ${this.getClassBgColor()}`}>
                        <span className="close-lightbox" onClick={this.handleClic}>X</span>
                        <span className="message-lightbox">{this.props.msgLightbox}</span>
                    </div >
                </div >
            </div>  
            : null
        );
    }
}

Lightbox.defaultProps = {
    show: false
}

// connect conecta con Redux
export default connect(null, { setLightbox })(Lightbox);