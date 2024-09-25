import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

const toggeleFinished = (e) => {
   setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)

    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handelDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()

  }
  return (
    <>
      <NavBar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-50 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-lg px-5 py-2" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-400 hover:bg-violet-700 p-2 py-1 disabled:bg-violet-600 text-white rounded-md  font-bold">Save</button>
        </div>
        <input className="my-4" onChange={toggeleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos ">
          {todos.length === 0 && <div className="m-5">no Todos</div>}
          {todos.map(item => {

            return (showFinished ||!item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className="flex gap-5">
                <input name={item.id} id="" onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-400 hover:bg-violet-700 p-2 py-1 text-white rounded-md mx-2 font-bold">Edit</button>
                <button onClick={(e) => { handelDelete(e, item.id) }} className="bg-violet-400 hover:bg-violet-700 p-2 py-1 text-white rounded-md mx-2 font-bold">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
