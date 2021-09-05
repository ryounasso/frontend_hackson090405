import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { Input, InputLabel } from '@material-ui/core'
import axios from 'axios'
import { AuthContext } from '../firebase/context'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 300,
    position: 'absolute',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const PlusTodoButton = (props: any) => {
  const classes = useStyles()
  const { todoList, setTodoList } = props
  const { currentUser } = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addTodo = async () => {
    let params = new URLSearchParams()
    params.append('title', title)
    params.append('description', description)
    params.append('userId', `${currentUser?.uid}`)

    let newTodo = await axios.post('https://whispering-bayou-86182.herokuapp.com/todos/add', params)
    newTodo = newTodo.data
    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList)
    setTitle('')
    setDescription('')
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleOpen}>+</Button>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          <InputLabel>内容</InputLabel>
          <Input
            type='text'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value)
            }}
            fullWidth={true}
          />
          <InputLabel>詳細</InputLabel>
          <Input
            type='text'
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value)
            }}
            fullWidth={true}
          />
          <Button onClick={addTodo} disabled={title === ''}>
            追加する
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default PlusTodoButton
