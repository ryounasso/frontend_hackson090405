import { useContext, useState } from 'react'
import Modal from "@material-ui/core/Modal"
import { Button, Checkbox, FormControlLabel, Input, InputLabel, makeStyles, Theme} from '@material-ui/core'
import { Create, Delete } from '@material-ui/icons'
import axios from 'axios'
import { AuthContext } from '../firebase/context'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const DisplayToDoList = (props : any) => {
  const { todo, todoList, setTodoList, setPoints } = props
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(todo.title)
  const [description, setDescription] = useState<string>(todo.description)
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const {currentUser} = useContext(AuthContext)

  const handleChange = async (isCompleted: any) => {
      await axios.post(`http://localhost:8000/todos/toggle_todo/${todo.ID}`)
    
    const newTodoList = todoList.map((t: any, i: number) => {
      if (t.ID === todo.ID) {
        t.isCompleted = !t.isCompleted
        return t
      } else {
        return t
      }
    })  
    console.log(newTodoList)
    setTodoList(newTodoList)
  }

  const handleEditOpen = () => {
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const updatePoints = () => {
    axios.get("http://localhost:8000/todos/completed_num/" + currentUser?.uid).then((res) => {
      setPoints(res.data)
    })
  }

  const editTodo = async () => {
    let params = new URLSearchParams();
    params.append("title", title);
    params.append("description", description);
    let editedTodo = await axios.post(`http://localhost:8000/todos/edit/${todo.ID}`, params)
    editedTodo = editedTodo.data

    const newTodoList =todoList.map((value: any, i: number) => {
      return value.ID === todo.ID ? editedTodo : value
    })  

    setTodoList(newTodoList)
    updatePoints()
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
      checked={todo.isCompleted}
      control={<Checkbox color="primary" />}
      label={todo?.title}
      onChange={() => handleChange(todo.isCompleted)}
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
        <div style={modalStyle} className={classes.paper}>
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
