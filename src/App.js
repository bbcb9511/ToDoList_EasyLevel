import { useState } from 'react';
import style from './App.module.css'


function App() {

  const [todoList, setTodoList] = useState([])

  const [formData, setFormData] = useState({})

  // 新規ToDoに割り振るIDを格納するためのステート
  const [newTodoId, setNewTodoId] = useState(1)


  const insertTodo = (todo) => {
    const newTodoList = [...todoList, {id: newTodoId, ...formData}]
    setTodoList(newTodoList)
    setNewTodoId(val => val + 1)
  }

  const changedFromData = (event) => {
    const {name, value} = event.target;
    const newFormData = {...formData, [name]: value}
    setFormData(newFormData)
    console.log(newFormData)
  }

  const deleteTodo = (targetTodo) => {
    const newTodoList = todoList.filter(((todo) => todo.id !== targetTodo.id))
    setTodoList(newTodoList)
  }

  
  

  return (
    <>
      <div className={style["area-input"]}>
        <div className={style['title']}>新規ToDo入力</div>
        <div className={style['input-element']}>
          <label>タイトル</label>
          <input name='title' type='text' onChange={changedFromData} />
        </div>
        <div className={style['input-element']}>
          <label>ステータス</label>
          <select  name='status' onChange={changedFromData} >
            <option value='未着手'>未着手</option>
            <option value='進行中'>進行中</option>
            <option value='完了'>完了</option>
          </select>
        </div>
        <div className={style['input-element']}>
          <label>詳細</label>
          <input name='detail' type='text' onChange={changedFromData} />
        </div>
        <button onClick={insertTodo}>登録</button>
      </div>


      <div className={style["area-summary"]}>
        <div className={style['title']}>ToDo一覧</div>
        <ui>
          {todoList.map((todo,index) => {
            return(
              <div className={style['list']}>
                <div className={style['list-element']}>
                  <li key={todo.id}>{todo.title}</li>
                  <button onClick={() =>deleteTodo(todo)}>削除</button>
                </div>
                <div className={style['list-element-detail']}>
                  <label>【ステータス】</label>
                  <select>
                    <option value='未着手' selected={todo.status === '未着手'}>未着手</option>
                    <option value='進行中' selected={todo.status === '進行中'}>進行中</option>
                    <option value='完了' selected={todo.status === '完了'}>完了</option>
                  </select>
                  <br />
                  <label>【詳細】</label>
                  <label>{todo.detail}</label>
                </div>
              </div>
              )
          })}
        </ui>
      </div>

    </>
  );
}

export default App;
