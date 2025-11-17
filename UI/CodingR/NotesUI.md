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