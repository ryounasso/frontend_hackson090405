import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import axios from 'axios'

export const DisplayToDoList = (props : any) => {
  const { todo, todoList, setTodoList } = props
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
      <Button onClick={deleteTodo} >
        <Delete />
      </Button>
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
