import './TodoList.css';
import { useState, useEffect } from 'react';
import imagem from './assets/imagem-todo-list.png';

function TodoList() {
   // Lê os dados do localStorage e garante que são um JSON válido
   const getListaFromStorage = () => {
      try {
         const listaStorage = localStorage.getItem('Lista');
         return listaStorage ? JSON.parse(listaStorage) : [];
      } catch (error) {
         console.error('Erro ao ler do localStorage', error);
         return [];
      }
   };

   const [lista, setLista] = useState(getListaFromStorage);
   const [novoItem, setNovoItem] = useState('');

   // Atualiza o localStorage sempre que a lista mudar
   useEffect(() => {
      try {
         localStorage.setItem('Lista', JSON.stringify(lista));
      } catch (error) {
         console.error('Erro ao gravar no localStorage', error);
      }
   }, [lista]);

   const adicionaItem = (form) => {
      form.preventDefault();
      if (!novoItem) {
         return;
      }
      setLista([...lista, { text: novoItem, isCompleted: false }]);
      setNovoItem(''); // Limpa o input após adicionar um novo item
      document.getElementById('input-entrada').focus();
   }

   const tarefaRealizada = (index) => {
      const listaAux = [...lista];
      listaAux[index].isCompleted = !listaAux[index].isCompleted;
      setLista(listaAux);
   }

   const deletarTarefa = (index) => {
      const listaAux = [...lista];
      listaAux.splice(index, 1);
      setLista(listaAux);
   }

   const allDelete = () => {
      setLista([]);
   }

   return (
      <div className='container'>
         <h1> Lista de Tarefas</h1>
         <form onSubmit={adicionaItem}>
            <input
               id='input-entrada'
               type='text'
               placeholder='Digite a tarefa'
               value={novoItem} // Associando o valor do input ao estado novoItem
               onChange={(e) => { setNovoItem(e.target.value) }} // Atualiza o estado conforme o usuário digita
            />
            <button className='add btn btn-success'>Adicionar</button>
         </form>

         <div className='listaTarefas'>
            {lista.length < 1 ? (
               <img src={imagem} alt="Lista vazia" />
            ) : (
               lista.map((item, index) => (
                  <div className={item.isCompleted ? "item completo" : "item"} key={index}>
                     <span onClick={() => { tarefaRealizada(index) }}>{item.text}</span>
                     <button onClick={() => { deletarTarefa(index) }} className='del btn btn-danger'>
                        Deletar
                     </button>
                  </div>
               ))
            )}
            {lista.length > 0 && (
               <button onClick={allDelete} className='deleteAll btn btn-danger'>Deletar Todas</button>
            )}
         </div>
      </div>
   );
}

export default TodoList;
