import React from "react";
type masterProps = {
  masterPlayers: masterTeam[];
  add: (id: number) => void;
  del: (id: number) => void;
};

const MasterTeam: React.FC<masterProps> = ({ masterPlayers, del, add }) => {
  const MasterTeamComp = function () {
    if (!masterPlayers.length) return <></>;
    return (
      <div>
        <h5>Master Team</h5>
        <ul style={{ margin: 0, padding: 10 }}>
          {masterPlayers.map(player => {
            return (
              <li>
                <span>{player.memberName}</span>
                <button onClick={() => add(player.id)}>add</button>
                <button onClick={() => del(player.id)}>delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div>
      <MasterTeamComp />
    </div>
  );
};
export default MasterTeam;
