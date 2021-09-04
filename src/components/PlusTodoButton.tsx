import { useContext, useState, VFC } from "react"
import Button from '@material-ui/core/Button'
import Modal from "@material-ui/core/Modal"
import { Input } from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../firebase/context";

// type Props = {
//   todoList: any[]
//   setTodoList: () => void
// }

const PlusTodoButton = (props: any) => {
  const {todoList, setTodoList} = props
  const {currentUser} = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTodo = async () => {
    let params = new URLSearchParams();
    params.append("title", title);
    params.append("description", description);
    params.append("userId", `${currentUser?.uid}`);

    let newTodo = await axios.post("http://localhost:8000/todos/add", params)
    newTodo = newTodo.data
    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList)
    
    setOpen(false);
  }

  return (
    <>
      <Button onClick={handleOpen} >+</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div>
          <Input type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }} />
          <Input type="text" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
          }} />
          <Button onClick={addTodo} >追加する</Button>
        </div>
      </Modal>
    </>
  )
}

export default PlusTodoButton