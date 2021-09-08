import React, {useState} from 'react'

import InputField from './InputField';
import CheckedField from './CheckedField';

const PacienteModal = ({handleClose}) => {
  const [inputValue, setInputValue] = useState({ nombre: '', apellidos: '', fecha: '', clinica: ''});
  const { nombre, apellidos, fecha, clinica, } = inputValue;
  
  const [sexo, setSexo] = useState({
    value: '-', label: '-'
  })
  const options = [
    { value: "-", label: "-" },
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" }
  ];
  const [alineadores, setAlineadores] = useState(false)
  const [secretRetainer, setsecretRetainer] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
    setSexo({
      value: e.target.value
    })
    console.log(inputValue);
    console.log(e.target.value);
  };

  const handleSelect = (value) => {
    setSexo(value);
  };

  const cleanForm = (e) => {
    e.preventDefault()
    setInputValue(prev => ({
      ...prev,
      nombre: '',
      apellidos: '',
      fecha: '',
      clinica: '',
    }))
    setSexo({
      value: '-',
      label: "-"
    })
  }

  return (
    <div className="modal display-block">
      <section className="modal-main">
      
        <div className="modal-body">
          <form action="" className="modal-formulario">
            <InputField
              type="text"
              value={nombre}
              placeholder="Nombre"
              label="Nombre"
              name="nombre"
              onChange={handleChange}
            />
            <InputField
              type="text"
              value={apellidos}
              placeholder="Apellidos"
              label="Apellidos"
              name="apellidos"
              onChange={handleChange}
            />
            <InputField
              type="date"
              value={fecha}
              placeholder="Fecha de Nacimiento"
              label="Fecha de Nacimiento"
              name="fecha"
              onChange={handleChange}
            />
            <InputField
              type="text"
              value={clinica}
              placeholder="Clinica"
              label="Clinica"
              name="clinica"
              onChange={handleChange}
            />
            <label>Sexo</label>
            <select name="sexo" onChange={handleChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <CheckedField
              type="checkbox"
              value={alineadores}
              label="Recorte Alineadores"
              checked={alineadores}
              name="alineadores"
              onChange={(e) => setAlineadores(e.target.checked)}
            />

            <CheckedField
              type="checkbox"
              value={secretRetainer}
              label="Secret Retainer?"
              checked={secretRetainer}
              name="secretRetainer"
              onChange={(e) => setsecretRetainer(e.target.checked)}
            />
           
          </form>
          <div className="modal-buttons">
            <button className="boton">Guardar</button>
            <button className="boton">Cancelar</button>
            <button onClick={cleanForm} className="boton">Limpiar</button>
            <button className="boton" onClick={handleClose}>Cerrar</button>
          </div>
          {/* <button className="modal-closebtn" >Close</button> */}
        </div>
        
      </section>
    </div>
  )
}

export default PacienteModal