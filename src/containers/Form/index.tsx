import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MainContainer, SaveButton, Title } from '../../styles'
import { Input } from '../../styles'
import { FormS, Options, Option } from './styles'
import * as enums from '../../utils/enums/Task'
import { add } from '../../store/reducers/task'

const Form = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const addTask = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      add({
        title,
        priority,
        description,
        status: enums.Status.PENDENTE
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Title>Nova tarefa</Title>
      <FormS onSubmit={addTask}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Título"
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Options>
          <p>Prioridade</p>
          {Object.values(enums.Priority).map((prioridade) => (
            <Option key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                type="radio"
                onChange={(e) => setPriority(e.target.value as enums.Priority)}
                id={prioridade}
                defaultChecked={priority === enums.Priority.NORMAL}
              />
              <label htmlFor={prioridade}>{prioridade}</label>
            </Option>
          ))}
        </Options>
        <SaveButton type="submit">Cadastrar</SaveButton>
      </FormS>
    </MainContainer>
  )
}

export default Form
