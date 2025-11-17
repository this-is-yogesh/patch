import React from "react";
type masterProps = {
  members: masterTeam[];
};

const MasterTeam: React.FC<masterProps> = ({ members }) => {
  const MasterTeamComp = function () {
    return (
      <div>
        {members.map(player => {
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
      <h5>Playing Eleven</h5>
      <MasterTeamComp />
    </div>
  );
};
export default MasterTeam;
