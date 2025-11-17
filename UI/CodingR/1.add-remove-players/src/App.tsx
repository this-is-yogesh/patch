import { useState, useRef } from "react";
import "./App.css";
import Playingeleven from "./components/PlayingEleven";
import MasterTeam from "./components/MasterTeam";

function App() {
  const [textMember, setTextMember] = useState("");
  const [masterTeam, setMasterTeam] = useState<masterTeam[]>([]);
  const [playingEleven, setPlayingEleven] = useState<masterTeam[]>([]);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  /**
   *
   * lets keep the text field here, aise i will move the data to first component and then use callback also here and i will move the data to second component
   *
   * so both the component will receive data as well get the data from one single parent file rather than having multiple files
   */

  function addMasterMember(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    setMasterTeam(prev => {
      return [
        ...prev,
        { id: prev.length + 1, memberName: textMember, playing: false },
      ];
    });
    setTextMember("");
    textInputRef.current?.focus();
  }
  function addPlayer(id: number) {
    setPlayingEleven(prev => {
      const selectedPlayer = masterTeam.find(p => p.id === id);
      const currentPlayer = prev.find(p => p.id === id);
      if (currentPlayer) return prev;
      if (!selectedPlayer) return prev;
      return [...prev, { ...selectedPlayer, playing: true }];
    });
  }

  function deletePlayer(id: number) {
    setPlayingEleven(prev => prev.filter(p => p.id !== id));
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
      <MasterTeam
        masterPlayers={masterTeam}
        add={addPlayer}
        del={deletePlayer}
      />
      <Playingeleven members={playingEleven} />
    </div>
  );
}

export default App;
