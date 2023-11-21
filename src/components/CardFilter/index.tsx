import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { handleFilter } from '../../store/reducers/filter'
import * as enums from '../../utils/enums/Task'
import { RootReducer } from '../../store'

export type Props = {
  subtitle: string
  criterion: 'prioridade' | 'status' | 'todas'
  value?: enums.Priority | enums.Status
}

const CardFilter = ({ subtitle, criterion, value }: Props) => {
  const dispatch = useDispatch()

  const { filter: actFilter, tasks } = useSelector(
    (state: RootReducer) => state
  )

  const activeFilter = () => {
    const sameCriterion = actFilter.criterion === criterion
    const sameValue = actFilter.value === value

    return sameCriterion && sameValue
  }

  const countingTasks = () => {
    if (criterion === 'todas') return tasks.itens.length
    if (criterion === 'prioridade') {
      return tasks.itens.filter((item) => item.priority === value).length
    }
    if (criterion === 'status') {
      return tasks.itens.filter((item) => item.status === value).length
    }
  }

  const filter = () => {
    dispatch(
      handleFilter({
        criterion,
        value
      })
    )
  }

  const active = activeFilter()
  const counter = countingTasks()

  return (
    <S.Card $active={active} onClick={filter}>
      <S.Counter>{counter}</S.Counter>
      <S.Label>{subtitle}</S.Label>
    </S.Card>
  )
}

export default CardFilter
