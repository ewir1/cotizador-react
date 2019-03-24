import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './Resumen';


class App extends Component {

  state = {
    resultado : '',
    datos: {}
  }


  cotizarSeguro = (datos) => {
    // console.log(datos);
    const {marca, plan, year} = datos;

    // Agregar una base de 2000
    let resultado = 2000;



    // Obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);
    

    // Por cada año restar el 3% al valor del seguro
    resultado -= ((diferencia * 3) * resultado) / 100;
    // console.log(resultado);
    
    // Amerciano 15%, Asiatico 5% y Europeo 30% de incremento al valor actual
    resultado = calcularMarca(marca) * resultado;
    // console.log(resultado);

    // El plan del auto, el basico increementa el valor 20% y el cobertura completa 50%
    let incrementoPlan = obtenerPlan(plan);
    console.log(incrementoPlan);


    // Dependiendo del plan incrementar
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    console.log(resultado);
    
    // Crear objeto para el resumen
    const datosAuto = {
      marca : marca,
      plan : plan,
      year : year
    }

    
    // Ya tenemos el costo
    this.setState({
      resultado : resultado,
      datos : datosAuto
    })
    
  }

  render() {
    return (
      <div className="contenedor">
          <Header 
            titulo = 'Cotizador de seguro de Auto'
          />

        <div className="contenedor-formulario">
          <Formulario
            cotizarSeguro={this.cotizarSeguro}
          />

           <Resumen
            datos={this.state.datos}
            resultado={this.state.resultado}
           />
        </div>

      </div>
    );
  }
}

export default App;
