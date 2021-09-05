// import { firebaseContext } from '../firebase/context'
import { auth } from '../firebase/firebase'
import { useHistory } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { Box, Container } from '@material-ui/core'
import axios from 'axios'
import {AuthContext} from "../firebase/context"
import { DisplayToDoList } from '../components/DisplayToDoList'
import PlusTodoButton from '../components/PlusTodoButton'

// import chara from '../img/character.png'



const Home = () => {
  console.log("home rendered")
  const history = useHistory()
  const [todoList, setTodoList] = useState<any[]>([])
  const [points, setPoints] = useState<number>(0)
  const [charaState,setCharaState]=useState<any>()
  const {currentUser} = useContext(AuthContext)

  useEffect(() => { //ログアウト状態ならサインイン画面へ
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/signin')
      }
    })
  },[history])

  useEffect(() => {
    axios.get("http://localhost:8000/todos/" + currentUser?.uid).then((res) =>{ 
      setTodoList(res.data)
    }).catch((error) => console.error(error));
  }, [currentUser?.uid])

  useEffect(() => {
    axios.get("http://localhost:8000/todos/completed_num/" + currentUser?.uid).then((res) => {
      setPoints(res.data)
    })
  }, [])

  
  return (
    <Container maxWidth='lg'>
      <Box display='flex' justifyContent='space-around'  >
        <Box width={800}> 
          <Box display='flex'  >
            <h2>ToDoList</h2>
            <PlusTodoButton todoList={todoList} setTodoList={setTodoList} />
          </Box>
          {todoList.map((todo: any,i:number) => {
            if (!todo.isCompleted) {
              return <DisplayToDoList key={i} todo={todo} todoList={todoList} setTodoList={setTodoList} />}
            }
          )}
        </Box>
        <Box width={800}>
          <h2>Completed</h2>
          {todoList.map((todo: any,i:number) => {
          if (todo.isCompleted) {
            return <DisplayToDoList key={i} todo={todo} todoList={todoList} setTodoList={setTodoList} setPoints={setPoints} />}
          } 
        )}
        </Box>
        <div>
          {/* <img src={chara} alt='icon' /> */}
          character is here
          <div>所有ポイント : {points}</div>
        </div>
      </Box>
      
    </Container>
  )
}

export default Home
