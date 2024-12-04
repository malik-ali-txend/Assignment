import './App.css';
import Todo from './component/Todo';
import TodoProvider from './Contexts/TodoProvider';


function App() {
  return(
    <TodoProvider>

      <Todo />
    </TodoProvider>

  );
}

export default App;