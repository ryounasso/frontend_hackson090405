// import { firebaseContext } from '../firebase/context'
import { auth } from '../firebase/firebase'
import { useHistory } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { Box, Container } from '@material-ui/core'
import axios from 'axios'
import { AuthContext } from '../firebase/context'
import { DisplayToDoList } from '../components/DisplayToDoList'
import PlusTodoButton from '../components/PlusTodoButton'
import a from '../img/a.png'
import b from '../img/b.png'
import c from '../img/c.png'

const Home = () => {
  console.log('home rendered')
  const history = useHistory()
  const [todoList, setTodoList] = useState<any[]>([])
  const [points, setPoints] = useState<number>(0)
  const [toggle, setToggle] = useState<boolean>(false)
  const [charaState, setCharaState] = useState<any>(b)
  const [message, setMessage] = useState<string>('')
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    //ログアウト状態ならサインイン画面へ
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/signin')
      }
    })
  }, [history])

  useEffect(() => {
    axios
      .get('https://whispering-bayou-86182.herokuapp.com/todos/' + currentUser?.uid)
      .then((res) => {
        setTodoList(res.data)
      })
      .catch((error) => console.error(error))
  }, [currentUser?.uid])

  useEffect(() => {
    axios
      .get('https://whispering-bayou-86182.herokuapp.com/todos/completed_num/' + currentUser?.uid)
      .then((res) => {
        setPoints(res.data)
      })
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box display='flex' justifyContent='space-around'>
        <Box width={800}>
          <Box display='flex'>
            <h2>ToDoList</h2>
            <PlusTodoButton todoList={todoList} setTodoList={setTodoList} />
          </Box>
          {todoList.map((todo: any, i: number) => {
            if (!todo.isCompleted) {
              return (
                <DisplayToDoList
                  key={i}
                  todo={todo}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  setPoints={setPoints}
                  setCharaState={setCharaState}
                  setMessage={setMessage}
                />
              )
            }
          })}
        </Box>
        <Box width={800}>
          <h2>Completed</h2>
          {todoList.map((todo: any, i: number) => {
            if (todo.isCompleted) {
              return (
                <DisplayToDoList
                  key={i}
                  todo={todo}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  setPoints={setPoints}
                  setCharaState={setCharaState}
                  setMessage={setMessage}
                />
              )
            }
          })}
        </Box>
        <div>
          <h1>{message}</h1>
          <img src={charaState} alt='icon' />
          <div>所有ポイント : {points}</div>
        </div>
      </Box>
    </Container>
  )
}

export default Home
