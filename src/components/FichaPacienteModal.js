import React from 'react'
import GenericPdfDownloader from './GenericPDFDownloader'
import iamge from '../assets/1.png'
import maxilar from '../assets/maxilar.jpg'

const FichaPacienteModal = ({handleClose, paciente}) => {
  console.log('ficha', paciente)
  return (
    <div className="modal display-block" >
      <section className="modal-ficha">
      
        <div className="modal-ficha-body" id="testId">
          <div className="modal-card-1">
            <div className="paciente-imagen">
              <img src={iamge} alt="" className="modal-image" />
            </div>
            <div className="paciente-datos">
              <div className="modal-clinica"><p>
              {paciente.ficha_dental.clinica}</p></div>
              <div className="modal-paciente-nombre"><p>{paciente.nombre}</p></div>
              <div className="modal-paciente-apellidos"><p>{paciente.apellidos}</p></div>
              <div className="modal-sexo-fecha">
                <div className="modal-sexo"><p>{paciente.sexo}</p></div>
                <div className="modal-fecha"><p>{paciente.fecha_nacimiento}</p></div>
              </div>
            </div>
          </div>

          <div className="modal-card-2">
            <div className="card-2-titulo">
        
                <div>dientes no mover</div>
                <div className="titulo-helper"> helper</div>

            </div>
            <div className="imagen-y-detalles">
              <div className="card-2-imagen">
                <img src={maxilar} alt="" className="maxilar" />
              </div>
              <div className="card-2-detalles">
                <div className="estado-y-objetivo">
                <div>
                  <p>
                  {paciente.ficha_dental.estado}
                  </p>
                </div>
                <div><p>
                {paciente.ficha_dental.objetivo_tratamiento}</p></div>
                </div>
                <div className="grande">
                <div>
                  Recorte Alineadores
                  <br />
                    {paciente.ficha_dental.otros_datos.recorte_alineadores}
                   <br />
                </div>
                <div>

                  alineadores pasivos?
                  <br />
                    {paciente.ficha_dental.otros_datos.alineadores_pasivos ? 'si' : 'no'}
                    <br />
                </div>
                <div>
                  secret retainer al finalizar?
                  <br />
                    {paciente.ficha_dental.otros_datos.secretretainer ? 'si' : 'no'}
                </div>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="ficha-botones">
            <GenericPdfDownloader 
            downloadFileName="CustomPdf" 
            rootElementId="testId" 
          />
          <button  onClick={handleClose} className="boton">Close</button>
          </div>

          
        </div>
        
      </section>
    </div>
  )
}

export default FichaPacienteModal