import React, { useState, useEffect } from "react";
import "./TodoList.css"
import Icone from "./assets/icone.svg"



function TodoList(){
  const listStorage = localStorage.getItem('list');

  const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
  const [newItem, setNewItem] = useState("");

  useEffect(()=> {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  function addItem(form){
    form.preventDefault();
    // se tiver vazio nao vai retornar nada
    if(!newItem){
      return;
    }
    // copiar o que já tem na lista e o que quer acrescentar
    setList([...list, {text: newItem, isComplete: false}])
    setNewItem("");
    document.getElementById('input-enter').focus()
  }

  function clicked(index){
    const listAux = [...list];
    listAux[index].isComplete = !listAux[index].isComplete;
    setList(listAux);
  }

  function delet(index){
    const listAux = [...list];
    listAux.splice(index,1);
    setList(listAux);

  }

  function deletAll(){
    setList([]);
  }

  return(
   
    <div>
      <h1>List to do</h1>
      <form onSubmit={addItem}>
        <input 
          id="input-enter"
          type="text"
          value={newItem}
          onChange={(e)=>{ setNewItem(e.target.value)  }}
          placeholder="Adicione uma nova tarefa"
        />
        <button className="add" type="submit">Add</button>
      </form>
      <div className="listtodo">
        <div style={{ textAlign: 'center'}}>
          {
            list.length < 1
            ?
            <img className="icon-center" src = {Icone} /> 
            : 
             list.map((item,index)=>(
              <div 
              key={index}
              className={item.isComplete ? "item complete" : "item"}
              >
                <span onClick={()=>clicked(index)}> {item.text} </span>
                <button onClick={()=>delet(index)} className="delete" >Deletar</button>
              </div>
             ))

          }
          
          {
            // se for verdadeira mostrar o botão de deletar todas
            list.length > 0 
            && 
            <button onClick={()=>deletAll()} className="deleteAll">Deletar todas</button>
          }

        </div>
         
      </div>

    </div>
    
  );
}

export default TodoList;