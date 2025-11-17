import React from "react";
type masterProps = {
  members: masterTeam[];
};

const MasterTeam: React.FC<masterProps> = ({ members }) => {
  const MasterTeamComp = function () {
    return (
      <ul style={{ margin: 0, padding: 10 }}>
        {members.map(player => {
          return (
            <li>
              <span>{player.memberName}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div>
      <h5>Playing Eleven</h5>
      <MasterTeamComp />
    </div>
  );
};
export default MasterTeam;
