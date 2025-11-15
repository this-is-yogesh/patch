import { useState, useRef } from "react";
import "./App.css";
import Playingeleven from "./components/PlayingEleven";
import MasterTeam from "./components/MasterTeam";

function App() {
  const [textMember, setTextMember] = useState("");
  const [masterTeam, setMasterTeam] = useState<masterTeam[]>([]);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  /**
   *
   * lets keep the text field yahi par, aise i will move the data to first component and then use callback also yahi par and i will move the data to second component
   *
   * so both the component will receive data as well get the data from one single parent file rather than having multiple files
   */

  function addMasterMember(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    let presentMembers = [...masterTeam];
    presentMembers.push({
      id: masterTeam.length + 1,
      memberName: textMember,
      playing: false,
    });
    setMasterTeam(presentMembers);
    setTextMember("");
    textInputRef.current?.focus();
  }
  return (
    <div>
      <div className="app_input">
        <form onSubmit={addMasterMember}>
          <input
            ref={textInputRef}
            onChange={e => setTextMember(e.target.value)}
            value={textMember}
          />
          <button type="submit">Add member</button>
        </form>
      </div>
      <Playingeleven />
      <MasterTeam masterPlayers={masterTeam} />
    </div>
  );
}

export default App;
