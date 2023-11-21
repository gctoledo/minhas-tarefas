import { useSelector } from 'react-redux'
import Task from '../../components/Task'
import { MainContainer, Title } from '../../styles'
import { RootReducer } from '../../store'

const Tasks = () => {
  const tasks = useSelector((state: RootReducer) => state.tasks.itens)
  const { search, criterion, value } = useSelector(
    (state: RootReducer) => state.filter
  )

  const filterTasks = () => {
    let filtredTasks = tasks
    if (search !== undefined) {
      filtredTasks = filtredTasks.filter(
        (item) => item.title.toLowerCase().search(search.toLowerCase()) >= 0
      )

      if (criterion === 'prioridade') {
        filtredTasks = filtredTasks.filter((item) => item.priority === value)
      } else if (criterion === 'status') {
        filtredTasks = filtredTasks.filter((item) => item.status === value)
      }

      return filtredTasks
    } else {
      return tasks
    }
  }

  const showResultFilter = (quantity: number) => {
    let message = ''
    const searchMessage =
      search !== undefined && search.length > 0 ? `e "${search}"` : ''

    if (criterion === 'todas') {
      message = `${quantity} tarefa(s) encontrada(s) como: todas ${searchMessage}`
    } else {
      message = `${quantity} tarefa(s) encontrada(s) como: "${`${criterion}=${value}`}" ${searchMessage}`
    }

    return message
  }

  const filteredTasks = filterTasks()
  const message = showResultFilter(filterTasks().length)

  return (
    <MainContainer>
      <Title as="p">{message}</Title>
      <ul>
        {filteredTasks.map((t) => (
          <li key={t.title}>
            <Task
              id={t.id}
              description={t.description}
              title={t.title}
              priority={t.priority}
              status={t.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default Tasks
