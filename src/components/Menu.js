import React from 'react';
import { setTitle } from "../reducers/Actions";
import { connect } from "react-redux";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                'Carro',
                'Avion',
                'Tren',
                'Barco',
                'Autobus'
            ]
        };

        this.handleClic = this.handleClic.bind(this);
    }

    handleClic(e) {
        e.preventDefault();
        const { id } = e.target;

        console.log(id);

        this.props.setTitle(id);
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        const { items } = this.state;
        return (

            <ul className="menu-container">
                {
                    items.map((item) =>
                        <li className="menu-item" key={item} id={item} onClick={this.handleClic} >{item}</li>
                    )
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return { title: state.title };
};

// connect conecta con Redux
export default connect(mapStateToProps, { setTitle })(Menu);