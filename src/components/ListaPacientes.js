import React, {useState} from 'react'
import iamge from '../assets/1.png'
import pacientes from '../assets/pacientes.json'
//component
import PacienteModal from './PacienteModal'
//react-csv
import { CSVLink } from 'react-csv'
import FichaPacienteModal from './FichaPacienteModal'

const ListaPacientes = () => {
  const [lista, setLista] = useState(true)
  const [buscador, setBuscardor] = useState('')
  const [show, setShow] = useState(false)
  const [showFichaModal, setShowFichaModal] = useState(false)
  const [accion, setAccion] = useState('')
  const [pacienteSel, setPacienteSel] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [pacientesPorPagina, setPacientesPorPagina] = useState(5)
  const [display, setDisplay] = useState(pacientesPorPagina)
  const [currentDisplay, setCurrentDisplay] = useState(0)
  const datos_pacientes = []
  pacientes.forEach(paciente => {
    const keys = Object.keys(paciente)
    keys.forEach(key=> {
      paciente[key].datos_paciente.id = key
      paciente[key].datos_paciente.ficha_dental = paciente[key].ficha_dental
      datos_pacientes.push(paciente[key].datos_paciente)
    })
  
  })
   // Logic for displaying todos
   const indexOfLastTodo = currentPage * pacientesPorPagina;
   const indexOfFirstTodo = indexOfLastTodo - pacientesPorPagina;
   const currentTodos = datos_pacientes.slice(0, pacientesPorPagina);
   console.log('asdasd',currentTodos)



console.log(datos_pacientes)

//csv stuff
const headers = [
  {label: "Nombre", key: 'nombre'},
  {label: "Apellidos", key: 'apellidos'},
  {label: "Fecha de Nacimiento", key: 'fecha_nacimiento'},
  {label: "Clinica", key: 'ficha_dental.clinica'},
  {label: "Objetivo Tratamiento", key: "ficha_dental.objetivo_tratamiento"},
  {label: "Estado", key: "ficha_dental.estado"}
]

const csvReport = {
  data: datos_pacientes,
  headers: headers,
  filename: 'lista.csv'
};
 


  //filtro paciente
  let pacientesFiltrados = datos_pacientes.filter(
    paciente => {
      if (paciente.nombre.toLowerCase().indexOf(buscador.toLowerCase()) !== -1) {
        return paciente.nombre.toLowerCase().indexOf(buscador.toLowerCase()) !== -1 ;
      } else {
        return paciente.apellidos.toLowerCase().indexOf(buscador.toLowerCase()) !== -1 ;
      }
    }

    
  )

  //pagination
  let numberOfPages = pacientesFiltrados.length / pacientesPorPagina
  if (numberOfPages % 2 != 0) {
    numberOfPages = numberOfPages+1
  }

  const pages = [];
  for (let i = 1; i <= Math.floor(numberOfPages); i++) {
    pages.push(i);
  }

 const changePage = ( selectedPage) => {
   console.log(currentPage, selectedPage, pacientesPorPagina)
 
    let helper = selectedPage-1
    console.log(helper)
    setCurrentDisplay(helper * pacientesPorPagina)
    setDisplay((helper * pacientesPorPagina)+pacientesPorPagina)

 } 

   //modal config

   const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
    setShowFichaModal(false)
  }

  const handleClose = () => {
    hideModal()
  }

  const nuevoPaciente = (e) => {
    e.preventDefault()
    showModal()
  }


  const showFicha = () => {
    setShowFichaModal(true)
  }
  const getFicha = (paciente) => {
    
    setPacienteSel(paciente)
    showFicha()
  }

  //opciones boton
  const options = [
    {label: 'Acciones', value: ""},
    {label: 'Editar', value: "editar"},
    {label: 'Finalizar', value: "finalizar"},
    {label: 'Borrar', value: "borrar"},
  ]
  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  

  return (
    <div className="pacientes">

      <div className="titulo-y-buscador">
        <div className="titulo">
          <h2>Listado de Pacientes</h2>
          <p>visualizacion de pacientes</p>
        </div>
        <div className="buscador">
          <input 
            type="text" 
            placeholder="buscar" 
            onChange={e => setBuscardor(e.target.value)}
            value={buscador}/>
        </div>
      </div>
      <button className="boton" onClick={e => nuevoPaciente(e)}>+ Nuevo Paciente</button>
      {show ? <PacienteModal handleClose={handleClose}/> : null}
      <button className="boton"><CSVLink {...csvReport}>Descargar CSV</ CSVLink></button>
      <div className="modo-y-elementos">
        <div className="modo">
          <button className="boton" onClick={() => setLista(true)}>lista</button>
          <button className="boton" onClick={() => setLista(false)}>cards</button>
        </div>
        <div className="elementos">
          <button className="boton" onClick={() => setPacientesPorPagina(5)}>5</button>
          <button className="boton" onClick={() => setPacientesPorPagina(10)}>10</button>
          <button className="boton" onClick={() => setPacientesPorPagina(15)}>15</button>
        </div>
        
      </div>
      {lista ? 
      <table className="tabla">
          <thead>
            <tr>
              <th className="name-and-pic">Nombre y Apellidos</th>
              <th className="tabla-clinica">Clinica</th>
              <th>Objetivo Tratamiento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>

            {pacientesFiltrados.slice(currentDisplay, display).map(paciente => (
              <tr key={paciente.id} >
                
              <td className="name-and-pic">
                <img src={iamge} alt="" className="pic" />
                <div className="nombre-y-fecha" >

                  <p className="nombre" onClick={() => getFicha(paciente)}>{paciente.nombre} {paciente.apellidos}</p>
                  {showFichaModal ? <FichaPacienteModal handleClose={handleClose} paciente={pacienteSel} /> : null}
                  <p className="fecha">{paciente.fecha_nacimiento}</p>
                </div>
              </td>
              <td className="tabla-clinica">{paciente.ficha_dental.clinica}</td>
              <td>{paciente.ficha_dental.objetivo_tratamiento}</td>
              <td>{paciente.ficha_dental.estado}</td>
              <td><select className="boton" onChange={handleChange}>{options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}</select></td> 
            
              </tr>
            )) }
          </tbody>
        </table>
        : 
        <div className="cards">
          {/* vista tarjetas */}
            {pacientesFiltrados.slice(currentDisplay, display).map(paciente => (
              <div className="card" key={paciente.id}>
                <p>{paciente.nombre} {paciente.apellidos}</p>
                <img src={iamge} alt="" />
                <div className="card-text">
                <p><b>Clinica:</b> {paciente.ficha_dental.clinica}</p>
                <p><b>Objetivo y Tratamiento:</b> {paciente.ficha_dental.objetivo_tratamiento}</p>
                <p><b>Estado:</b> {paciente.ficha_dental.estado}</p>
                </div>
                
                
                  <div className="botones-acciones">
                    <p className="botones-acciones-titulo">Acciones: </p>
                    <div className="botones-acciones-botones">
                    <button className="boton">Editar</button>
                    <button className="boton">Finalizar</button>
                    <button className="boton">Borrar</button>
                    </div>
                  </div>
              </div>
            ))}

        </div>
    
        }
        <div className="paginacion">
          {pages.map(page => (
            <li key={page} onClick={() => changePage(page)}>
              {page}
            </li>
          ))}
        </div>
    </div>
      
  )
}

export default ListaPacientes
