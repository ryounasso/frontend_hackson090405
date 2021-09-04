import { useContext, useState } from 'react'
import Modal from "@material-ui/core/Modal"
import { Button, Checkbox, FormControlLabel, Input, InputLabel} from '@material-ui/core'
import { Create, Delete } from '@material-ui/icons'
import axios from 'axios'
import { AuthContext } from '../firebase/context'

export const DisplayToDoList = (props : any) => {
  const { todo, todoList, setTodoList } = props
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(todo.title)
  const [description, setDescription] = useState<string>(todo.description)

  const handleEditOpen = () => {
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }
  const editTodo = async () => {
    let params = new URLSearchParams();
    params.append("title", title);
    params.append("description", description);
    let editedTodo = await axios.post(`http://localhost:8000/todos/edit/${todo.ID}`, params)
    editedTodo = editedTodo.data

    const newTodoList =todoList.map((value: any, i: number) => {
      console.log(value)
      console.log(value.ID === todo.ID)
      return value.ID === todo.ID ? editedTodo : value
    })  

    setTodoList(newTodoList)
    setEditOpen(false)
  }
  const deleteTodo = async () => {
    await axios.delete(`http://localhost:8000/todos/delete/${todo.ID}`)
    const newTodoList = todoList.filter((t: any) => {
      return t.ID !== todo.ID
    })
    setTodoList(newTodoList)
  }
  return (
    <div>
      <FormControlLabel
      value="end"
      control={<Checkbox color="primary" />}
      label={todo?.title}
      labelPlacement="end"//checkboxの右にlabelの文字を配置
      />
      <Button onClick={handleEditOpen} >
        <Create />
      </Button>
      <Button onClick={deleteTodo} >
        <Delete />
      </Button>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
      >
        <div>
        <InputLabel>タイトル</InputLabel>
          <Input type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }} />
          <InputLabel>説明</InputLabel>
          <Input type="text" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
          }} />
          <Button onClick={editTodo} disabled={title === ''} >編集する</Button>
          </div>
      </Modal>
      <br />
    </div>
  )
} 


/*


export const UseFirebase = () => {
  const [initilize, setInitilize] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)
  
  useEffect(() => {
    //userがサインインしているか
    auth.onAuthStateChanged((user) => {
      //user情報の確認が取れたらinitilizeをfalseにする
      setCurrentUser(user)
      setInitilize(false)
    })
  }, [])

  return {
    initilize,
    currentUser
  }
}


*/
