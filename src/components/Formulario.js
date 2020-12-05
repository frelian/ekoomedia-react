import React from 'react';

import { setLightbox, setResponseMessage, setBgColorMessage } from "../reducers/Actions";
import { connect } from "react-redux";

class Formulario extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            names: "",
            email: "",
            phone: "",
            age:   ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);

        // al metodo handleSubmit, para usar el this dentro del metodo
        this.handleSubmit = this.handleSubmit.bind(this);
        // conecto el metodo con el objeto this

    }

    // atrapo los datos del formulario
    handleInputChange(e) {
        e.preventDefault();
        const { name, value } = e.target; // saco lo que este en los atributos en ese momento (name, value que son la propiedad de input HTML)
        this.setState({ [name]: value }); // busque lo que esta definido arriba (this.state) y se lo asigne

        console.log(value);
    }

    handleSubmit(e) {
        e.preventDefault();

        // Abrevio el llamado al estado 
        const { names, email, phone, age } = this.state;
        
        // valido _isMounted en true cuando el componente ya este montado
        if (this._isMounted) {

            if (this.validateFields()) {

                fetch("https://ekoomedia-laravel.herokuapp.com/api/users/store", {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "names": names,
                        "email": email,
                        "phone": phone,
                        "age": age
                    }),

                })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });

                        this.props.setLightbox(true);
                        this.props.setResponseMessage(result.message);
                        
                        if (result.status) {
                            this.props.setBgColorMessage("success");
                        } else {
                            this.props.setBgColorMessage("error");
                        }

                        this.setState({ names: "", email: "", phone: "", age: "" });

                        console.log(result);
                    },
                    // Nota: es importante manejar errores aquí y no en
                    // un bloque catch() para que no interceptemos errores
                    // de errores reales en los componentes.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                        console.log(error);

                        this.props.setLightbox(true);
                        this.props.setResponseMessage("Ocurro un error en el EndPoint.");
                        this.props.setBgColorMessage("error");

                        this.setState({ names: "", email: "", phone: "", age: "" });
                    }
                )
            }            
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    validateNumber(value) {
        if (/^[0-9]+$/.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    validateFields(){

        const { names, email, phone, age } = this.state;
        var valid = false;

        if (names !== "" && email !== "" && phone !== "" && age !== "") {

            if (!this.validateNumber(phone)) {

                this.props.setLightbox(true);
                this.props.setResponseMessage("Sólo se permiten digitar números en el campo teléfono.");
                this.props.setBgColorMessage("warning");

            } else if (!this.validateNumber(age)) {

                this.props.setLightbox(true);
                this.props.setResponseMessage("Sólo se permiten digitar números en el campo de edad.");
                this.props.setBgColorMessage("warning");

            } else if (age < 18 || age > 100) {

                this.props.setLightbox(true);
                this.props.setResponseMessage("El rango permitido de edad es desde los 18 a los 100 años.");
                this.props.setBgColorMessage("warning");
            
            } else {
                valid = true;
            }
        } else {
            this.props.setLightbox(true);
            this.props.setResponseMessage("Existen campos vacios, por favor diligencie todos los campos.");
            this.props.setBgColorMessage("warning");
        }

        return valid;
    }

    render() {
        // Abrevio el llamado al estado 
        const { names, email, phone, age } = this.state;
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h3>
                    Hola, bienvenido sabemos que quieres viajar en un <span className="title-form">{this.props.titulo}</span> por favor diligencia el siguiente formulario:
                </h3>

                <div className="form-fields">

                    <label className="control-label">Nombres:</label>
                    <input 
                        type="text" 
                        onChange={this.handleInputChange} 
                        className="control-input" 
                        name="names" 
                        value={names} 
                        placeholder="Nombres y apellidos"/>

                    <br/>
                    <label className="control-label">Email:</label>
                    <input
                        type="email" 
                        onChange={this.handleInputChange} 
                        name="email" 
                        value={email} 
                        className="control-input"
                        placeholder="Email"/>
                    <br/>
                    <label className="control-label">Celular:</label>
                    <input 
                        type="text" minLength="7" maxLength="10" 
                        onChange={this.handleInputChange} 
                        name="phone" 
                        value={phone} 
                        className="control-input"
                        placeholder="Celular"/>
                    <br />
                    <label className="control-label">Edad:</label>
                    <input 
                        type="text" minLength="1" maxLength="3" 
                        onChange={this.handleInputChange} 
                        name="age" value={age} 
                        className="control-input"
                        placeholder="Edad"/>
                    <br />
                    <input type="submit" name="btn-procesar" value="Procesar" className="button form-submit" />
                </div>
            </form>
        );
    }
}

// connect conecta con Redux
export default connect(null, { setLightbox, setResponseMessage, setBgColorMessage })(Formulario);
