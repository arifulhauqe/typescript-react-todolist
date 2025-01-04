import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import { MdDone } from "react-icons/md";

type Props =  {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}



const SingleTodo = ({todo, todos, setTodos}: Props) => {
  
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState(todo.todo);
  
    const handleDone = (id:number) => {
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, isDone:! todo.isDone } : todo))
          );
    }

    const handleDelete = (id: number) => {
        setTodos((todos) => todos.filter(todo => todo.id !== id));
        console.log(todos);
      };

    const handleEditTodo = (e:React.FormEvent<HTMLFormElement>, id:number) => {
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        ) 
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
     inputRef.current?.focus();
    },[edit]);

  return (
    <form className='todos__single' onSubmit={(e) => handleEditTodo(e, todo.id)}>

      {
        edit ? (
          <input 
          ref={inputRef}
          value={editTodo}  
          onChange={(e) => setEditTodo(e.target.value)}
          className='todos__single--text'
          />
        ):(
          
            todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ):(
                <span className="todos__single--text">{todo.todo}</span>
            )
        
        )
      }
      

      <div>
        <span className="icon">
            <AiFillEdit onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }} />
        </span>

        <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
        </span>
        
        <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
