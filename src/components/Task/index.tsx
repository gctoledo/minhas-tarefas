import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import * as enums from '../../utils/enums/Task'

import { remove, edit, changeState } from '../../store/reducers/task'
import TaskClass from '../../models/Task'
import { Button, SaveButton } from '../../styles'

type Props = TaskClass

const Task = ({
  description: originalDescription,
  priority,
  status,
  title,
  id
}: Props) => {
  const dispatch = useDispatch()

  const [editing, setEditing] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (originalDescription.length > 0) {
      setDescription(originalDescription)
    }
  }, [originalDescription])

  const cancelEdition = () => {
    setEditing(false)
    setDescription(originalDescription)
  }

  const saveEdition = () => {
    dispatch(
      edit({
        description: description,
        id: id,
        priority: priority,
        title: title,
        status: status
      })
    )
    setEditing(false)
  }

  const changeStateTask = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeState({ id, status: event.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={title}>
        <input
          type="checkbox"
          id={title}
          checked={status === enums.Status.CONCLUIDA}
          onChange={changeStateTask}
        />
        <S.Title>
          {editing && <em>Editando: </em>}
          {title}
        </S.Title>
      </label>
      <S.Tag $parameter="prioridade" $priority={priority}>
        {priority}
      </S.Tag>
      <S.Tag $parameter="status" $status={status}>
        {status}
      </S.Tag>
      <S.Description
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={!editing}
      />
      <S.ActionBar>
        {editing ? (
          <>
            <SaveButton onClick={saveEdition}>Salvar</SaveButton>
            <S.CancelRemoveButton onClick={cancelEdition}>
              Cancelar
            </S.CancelRemoveButton>
          </>
        ) : (
          <>
            <Button onClick={() => setEditing(true)}>Editar</Button>
            <S.CancelRemoveButton onClick={() => dispatch(remove(id))}>
              Remover
            </S.CancelRemoveButton>
          </>
        )}
      </S.ActionBar>
    </S.Card>
  )
}

export default Task
