📝.what i found difficulty in doing / what is important to be revised and used


typescript issues :

1. i was not able to use formeventhandler correctly with form to prevent its default behaviour
ans - code
  function addMasterMember(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault(); }

and also Inside a <form>, a <button> defaults to type="submit" so no need to add same function to button


2. i was not able to properly define ref with typescript 
ans - const textInputRef = useRef<HTMLInputElement | null>(null);
we have to use null not undefined

3. was thinking to use state update inside another state update function  
  function addMasterMember(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    setMasterTeam(prev => {
    setTextMember("");
    textInputRef.current?.focus();
      return [
        ...prev,
        { id: prev.length + 1, memberName: textMember, playing: false },
      ];
    });

  }
  but not recommended because React may in the future rerun these updater functions multiple times, especially in Strict Mode → causing multiple unwanted updates or focus calls.

  4. i wasnt able to recall to use li 
  ans - use ul / ol on top and then li tag
      return (
      <ul style={{ margin: 0, padding: 10 }}>
        {masterPlayers.map(player => {
          return (
            <li>
              <span>{player.memberName}</span>
            </li>
          );
        })}
      </ul>
    );