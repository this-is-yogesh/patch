import React from "react";
type masterProps = {
  masterPlayers: masterTeam[];
};

const MasterTeam: React.FC<masterProps> = ({ masterPlayers }) => {
  const MasterTeamComp = function () {
    return (
      <div>
        {masterPlayers.map(player => {
          return (
            <div>
              <span>{player.memberName}</span>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <h5>Master Team</h5>
      <MasterTeamComp />
    </div>
  );
};
export default MasterTeam;
