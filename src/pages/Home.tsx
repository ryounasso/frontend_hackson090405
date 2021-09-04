// import { firebaseContext } from '../firebase/context'
import { auth } from '../firebase/firebase'
import { useHistory } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios'
import {AuthContext} from "../firebase/context"
import { DisplayToDoList } from '../components/DisplayToDoList'
import PlusTodoButton from '../components/PlusTodoButton'

const Home = () => {
  console.log("home rendered")
  const history = useHistory()
  const [todoList, setTodoList] = useState<any[]>([])
  const {currentUser} = useContext(AuthContext)

  useEffect(() => { //ログアウト状態ならサインイン画面へ
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/signin')
      }
    })
  },[])

  useEffect(() => {
    axios.get("http://localhost:8000/todos/" + currentUser?.uid).then((res) =>{ 
      setTodoList(res.data)
    }).catch((error) => console.error(error));
  }, [currentUser?.uid])

  
  return (
    <Container maxWidth='lg'>
        <h1>ToDoList</h1>
        <PlusTodoButton todoList={todoList} setTodoList={setTodoList} />
        {todoList.map((todo: any,i:number) => <DisplayToDoList key={i} todo={todo} todoList={todoList} setTodoList={setTodoList} />)}
    </Container>
  )
}

export default Home
