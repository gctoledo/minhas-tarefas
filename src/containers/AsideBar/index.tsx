import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardFilter from '../../components/CardFilter'
import * as S from './styles'
import { RootReducer } from '../../store'
import { handleSearch } from '../../store/reducers/filter'
import * as enums from '../../utils/enums/Task'
import { Button, Input } from '../../styles'

type Props = {
  showFilter: boolean
}

const AsideBar = ({ showFilter }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useSelector((state: RootReducer) => state.filter)

  return (
    <S.Aside>
      <div>
        {showFilter ? (
          <>
            <Input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => dispatch(handleSearch(e.target.value))}
            />
            <S.Filter>
              <CardFilter
                value={enums.Status.PENDENTE}
                subtitle="pendentes"
                criterion="status"
              />
              <CardFilter
                value={enums.Status.CONCLUIDA}
                subtitle="concluida"
                criterion="status"
              />
              <CardFilter
                value={enums.Priority.URGENTE}
                subtitle="urgentes"
                criterion="prioridade"
              />
              <CardFilter
                value={enums.Priority.IMPORTANTE}
                subtitle="importantes"
                criterion="prioridade"
              />
              <CardFilter
                value={enums.Priority.NORMAL}
                subtitle="normal"
                criterion="prioridade"
              />
              <CardFilter subtitle="todas" criterion="todas" />
            </S.Filter>
          </>
        ) : (
          <Button onClick={() => navigate('/')}>
            Voltar a lista de tarefas
          </Button>
        )}
      </div>
    </S.Aside>
  )
}

export default AsideBar
