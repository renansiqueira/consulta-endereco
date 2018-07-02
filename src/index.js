import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';
import './index.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class Page extends Component {

	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			address: {}
		}
	}

	clear(){
		this.setState({
			address: {}
		});
	}

	getResult() {
		fetch('https://viacep.com.br/ws/84020020/json')
		.then(response => response.json())
		.then(data => {
			let address = data
			this.setState({
				address: address,
				isLoading: false
			})
		})
		.catch(error => console.log('failed', error));
	}

	render() {
		const {isLoading, address} = this.state;
		const style = {
	      width: '100vw',
	      height: '100vh'
	    }
		return (
			<div className="page">
		        <div className="page-search">
					<h1>Consultar</h1>
					<label>CEP</label>
					<InputMask mask="99999-999" />
					<button onClick={() => this.getResult()}>Buscar</button>
				</div>
	        	{Object.keys(address).length > 0 ? 
	        		<div className="page-address">
	        			<span className="clear" onClick={() => this.clear()}>x</span>
		        		<div className="address-logradouro">{address.logradouro}</div>
		        		<div className="address-bairro">{address.bairro}</div>
		        		<div className="address-localidade">{address.localidade} - {address.uf}</div>
		        		<div className="address-cep">{address.cep}</div>

		        		<div style={style}>
			        		<Map google={this.props.google} zoom={14}>
					    	    <Marker onClick={this.onMarkerClick}
						                name={'Current location'} />
							</Map>
						</div>
		        	</div>
	        	: null}

	      	</div>);
	}
}



ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Page)
