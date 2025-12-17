import {fileExplorerData} from "./contants/data" 
import './App.css'
import FileExplorerComponent from './components/FileExplorerComponent';

function App() {

  return (
    <>
      <FileExplorerComponent data={fileExplorerData} />
    </>
  );
}

export default App
