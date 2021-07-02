import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Container, TodosExames } from './styles'

//Interface com as informações do cadastro
interface CadastroExames {
  id: string;
  nome: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
  laboratorio: string;
  like: number;
}

//Pagina Principal
const Dashboard: React.FC = () => {

  const [exames, setExames] = useState<CadastroExames[]>([])
  const [nome, setNome] = useState('')
  const [tipoexame, setTipoExame] = useState('')
  const [nomeexame, setNomeExame] = useState('')
  const [mesanoexame, setMesanoExame] = useState('')
  const [laboratorio, setLaboratorio] = useState('')
  // const history = useHistory()

  useEffect(() => {
    buscarExames()
  }, [])



  async function apagarExames(id: string) {
    await api.delete(`/exames/${id}`)
    buscarExames()
  }


  async function buscarExames() {
    const todosExames = await api.get('/exames')
    setExames(todosExames.data)
  }


  async function adicionarExames(event: any) {
    event.preventDefault()

    if (!nome.trim() || !tipoexame.trim() || !nomeexame.trim() || !mesanoexame.trim()
    || !laboratorio.trim()) {
      return
    }


    //Chama o metodo post no node pra gravar no banco de dados
    const novoEvento = await api.post('/exames', {
      nome,
      tipoexame,
      nomeexame,
      mesanoexame,
      laboratorio
    })

    const { data } = novoEvento

    setExames([...exames, data])
    setNome('')
    setTipoExame('')
    setNomeExame('')
    setMesanoExame('')
    setLaboratorio('')

  }

  return (
    //Container -> Estilização do formulario
    <Container>

    <form onSubmit={adicionarExames}>

      <input
      type='text'
      name='nome'
      value={nome}
      onChange={event => setNome(event.target.value)}
      placeholder='Nome' />

      <input
      type='text'
      name='tipoexame'
      value={tipoexame}
      onChange={event => setTipoExame(event.target.value)}
      placeholder='Tipos de Exame' />


      <input
      type='text'
      name='nomeexame'
      value={nomeexame}
      onChange={event => setNomeExame(event.target.value)}
      placeholder='Nome do Exame' />


      <input
      type='text'
      name='mesanoexame'
      value={mesanoexame}
      onChange={event => setMesanoExame(event.target.value)}
      placeholder='Mês e Ano' />

      <input
      type='text'
      name='laboratorio'
      value={laboratorio}
      onChange={event => setLaboratorio(event.target.value)}
      placeholder='Laboratório' />

      <button type="submit">Incluir</button>

    </form>

    <TodosExames>
        {exames.map(event => {
            return (
              <div key={event.id}>
                <div>
                  <span>{`Nome: ${event.nome}`}</span>
                  <span>{`Tipos de Exame: ${event.tipoexame}`}</span>
                  <span>{`Nome do Exame: ${event.nomeexame}`}</span>
                  <span>{`Mês e Ano: ${event.mesanoexame}`}</span>
                  <span>{`Laboratório: ${event.laboratorio}`}</span>
                </div>
                <div>
                <Link to={`/exames/${event.laboratorio}`}><button>
                Relatorio
                </button>
                </Link>
                  <button onClick={() => {
                    apagarExames(event.id)
                  }}>Deletar</button>
                </div>
              </div>
            )
        })}
      </TodosExames>
    </Container>
  )
}

export default Dashboard
