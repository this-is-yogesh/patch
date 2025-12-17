import { useState } from 'react'
import {fileExplorerData} from "./contants/data" 
import './App.css'
import FileExplorerComponent from './components/FileExplorerComponent';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <FileExplorerComponent data={fileExplorerData} />
    </>
  );
}

export default App
