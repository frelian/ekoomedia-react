import React from 'react';
import Menu from "./components/Menu";
import Formulario from "./components/Formulario";
import { connect } from "react-redux";
// import Lightbox from "./components/Lightbox";
import LightboxHook from "./components/LightboxHook";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {
    return (
        <div className="App">
            <header className="App-header">
                <Menu />
            </header>
            <div className="content">
              <Formulario titulo={this.props.titleRedux} />
            </div>

        <LightboxHook show={this.props.isLightboxRedux} msgLightbox={this.props.messageRedux} bgColor={this.props.bgcolorRedux} />
        </div>
    );
  }
}

// mapeo los estados de redux a props
const mapStateToProps = (state) => {
  return { 
      // declaro variables redux
      titleRedux: state.title,
      isLightboxRedux: state.isLightbox,
      messageRedux: state.responseMessage,
      bgcolorRedux: state.bgColorMessage
  };
};

// connect conecta con Redux
// convertir el estado redux a propiedades (props)
export default connect(mapStateToProps)(App);
