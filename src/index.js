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
			cep: '84020-020',
			address: {}
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
			cep: ''
		});
	}

	sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

	getResult() {
		this.setState({
			isLoading: true
		});

		fetch('https://viacep.com.br/ws/'+this.state.cep+'/json')
		.then(response => response.json())
		.then(data => {
			let address = data;

			fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.cep+'&key=AIzaSyBjl812Fui3CRQ6fAUNRPgJL7zkAL0GXTU')
			.then(geoResponse => geoResponse.json())
			.then(geoData => {
				address.lat = geoData.results[0].geometry.location.lat;
				address.lng = geoData.results[0].geometry.location.lng;

				this.sleep(2000); // REMOVE!!
				
				this.setState({
					address: address,
					isLoading: false
				});

			});
		})
		.catch(error => console.log('failed', error));
	}

	render() {
		const {isLoading, address} = this.state;
		return (
			<div className="page">
		        <div className="page-search">
					<h1>Consultar</h1>
					<label>CEP</label>
					<InputMask name="cep" value={this.state.cep} onChange={e => this.handleChange(e)} mask="99999-999" />
					<button onClick={() => this.getResult()}>Buscar</button>
				</div>
	        	{Object.keys(address).length > 0 && !isLoading ?
	        		<div className="page-address">
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
	        		<div className="page-address">
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
		    		</div>
	        	: null }

	      	</div>);
	}
}


ReactDOM.render(
  <Page />,
  document.getElementById('root')
);


