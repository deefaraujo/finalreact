import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import api from '../../services/api'
import { Container, Disciplinas } from './styles'

interface LabParametros {
  laboratorio: string
}

interface Cadastro {
  nome: string;
  laboratorio: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
}

const Relatorios: React.FC = () => {
  const { params } = useRouteMatch<LabParametros>()
  const [exames, setExames] = useState<Cadastro[]>([])

  useEffect(() => {
    api.get('/exames').then(response => setExames(response.data))
  }, [])


  let labFuncional = exames.filter(labs => labs.laboratorio === 'Lab Funcional').length
  let labMedicina = exames.filter(labs => labs.laboratorio === 'Lab Medicina').length
  let Admissao = exames.filter(labs => labs.tipoexame === 'Admissional').length
  let Periodico = exames.filter(labs => labs.tipoexame === 'Periódico').length
  let Demissional = exames.filter(labs => labs.tipoexame === 'Demissional').length
  let Hemograma = exames.filter(labs => labs.nomeexame === 'Hemograma Completo').length
  let Audiometria = exames.filter(labs => labs.nomeexame === 'Audiometria').length
  let Acuidade = exames.filter(labs => labs.nomeexame === 'Acuidade Visual').length
  return (
    <Container>
      <Disciplinas>
        <ul>
          <li>
            <span>{`Total de Exames no Lab Funcional: ${labFuncional}`}</span>
            <span>{`Total de Exames no Lab Medicina: ${labMedicina}`}</span>
            <span>{`Total de Exames de Admissão: ${Admissao}`}</span>
            <span>{`Total de Exames de Periódico: ${Periodico}`}</span>
            <span>{`Total de Exames de Demissional: ${Demissional}`}</span>
            <span>{`Total de Exames de Hemograma Completo: ${Hemograma}`}</span>
            <span>{`Total de Exames de Audiometria: ${Audiometria}`}</span>
              <span>{`Total de Exames de Acuidade Visual: ${Acuidade}`}</span>
          </li>
        </ul>
      </Disciplinas>
    </Container>
  )
}

export default Relatorios
