import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';
import MapContainer from "./MapComponent";
import './index.css';

class Page extends Component {

	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			cep: '',
			address: {},
			message: ''
		}
	}

	handleChange = (e) => {
		this.setState({
            [e.target.name]: e.target.value
        })
    }

	clear(){
		this.setState({
			address: {},
			cep: '',
			message: ''
		});
	}

	getResult() {
		if(this.state.cep.length === 9){
			this.setState({
				isLoading: true,
				message: ''
			});

			fetch('https://viacep.com.br/ws/'+this.state.cep+'/json')
			.then(response  => {
				if(response.status === 200){
					return response;
				}else{
					this.setState({
						address: {},
						isLoading: false,
						message: 'Localização não encontrada'
					});
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data !== undefined && !data.erro){
					let address = data;

					fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.cep+'&key=AIzaSyBjl812Fui3CRQ6fAUNRPgJL7zkAL0GXTU')
					.then(geoResponse => geoResponse.json())
					.then(geoData => {
						address.lat = geoData.results[0].geometry.location.lat;
						address.lng = geoData.results[0].geometry.location.lng;
						
						this.setState({
							address: address,
							isLoading: false
						});

					});
				}else{
					this.setState({
						address: {},
						isLoading: false,
						message: 'Localização não encontrada.'
					});
				}
			})
			.catch(error => {
				this.setState({
					address: {},
					isLoading: false,
					message: 'Ocorreu um erro ao buscar esta localidade.'
				});
			});
		}
	}

	render() {
		const {isLoading, address, message} = this.state;
		return (
			<div className="page">
		        <div className="page-search">
					<h1>Consultar</h1>
					<label>CEP</label>
					<InputMask name="cep" value={this.state.cep} onChange={e => this.handleChange(e)} mask="99999-999" />
					<button onClick={() => this.getResult()}>Buscar</button>
				</div>
				<div className="page-address">
	        	{Object.keys(address).length > 0 && !isLoading ?
	        		<div>
	        		    <span className="clear" onClick={() => this.clear()}>x</span>
		        		<div className="address-logradouro">{address.logradouro}</div>
		        		<div className="address-bairro">{address.bairro}</div>
		        		<div className="address-localidade">{address.localidade} - {address.uf}</div>
		        		<div className="address-cep">{address.cep}</div>
		        		{!isLoading ? 
		        			<div className="map">
		        				<MapContainer lat={address.lat} lng={address.lng} />
		        			</div>
		        		: null }
					</div>
	        	: null }

	        	{isLoading ? 
        			<div className="is-loading">
	        			<div className="address-logradouro-placeholder-right masker"></div>
		        		<div className="address-logradouro-placeholder-bottom masker"></div>
		        		<div className="address-bairro-placeholder-right masker"></div>
		        		<div className="address-bairro-placeholder-bottom masker"></div>
		        		<div className="address-localidade-placeholder-right masker"></div>
		        		<div className="address-localidade-placeholder-bottom masker"></div>
		        		<div className="address-cep-placeholder-right masker"></div>
		        		<div className="address-cep-placeholder-bottom masker"></div>
		        		<div className="address-map-placeholder-right masker"></div>
		        		<div className="address-map-placeholder-bottom masker"></div>			        		
        			</div>
	        	: null }

	        	{message ?
        			<div className="alert alert-warning">{message}</div>
        		: null }

        		</div>

	      	</div>);
	}
}


ReactDOM.render(
  <Page />,
  document.getElementById('root')
);


