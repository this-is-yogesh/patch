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
  function addPlayer(id: number) {
    if (playingEleven?.length) {
      const selectedPlayer = playingEleven.find(p => p.id === id);
      if (selectedPlayer) return;
    }
    const currentMembers = [...playingEleven];
    const selectedPlayer = masterTeam.find(p => p.id === id);
    if (selectedPlayer) {
      currentMembers.push({
        id: selectedPlayer.id,
        memberName: selectedPlayer.memberName,
        playing: true,
      });
    }
    setPlayingEleven(currentMembers);
  }

  function deletePlayer(id: number) {
    // if (playingEleven?.length) {
    //   const selectedPlayer = playingEleven.find(p => p.id === id);
    //   if (selectedPlayer) return;
    // }
    const currentMembers = [...playingEleven];
    const filteredPlayers = currentMembers.filter(p => p.id !== id);
    setPlayingEleven(filteredPlayers);
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
