1. useEffect runs after  paint, and it will only run things inside useEffect after paint, if things inside useEffect triggers component re-render like state changes then component re-renders,Strict Mode renders everything twice on purpose to help you catch bugs.so useEffect triggers one more render cycle, which also gets double-rendered. exmaple normal Render with useeeffect is App A App A but in strict mode is  App App A A then second render cuz of useeffect also App App A A 

2.if a function is wrapped with memo from react, the function will render once during initial paint ( non strict mode ) but will not render again untils its prop changes , not render meaning, the control will not even go inside the function , nothing inside function will run

4.no react does not re-render children when returning children direclty, meaning a state change re-render with [return children]  will not re-render the children component but [return <B/>] will re-render component B , React reuses cached children and does NOT call B() or C() again ,this is called child element identity preservation


5.react state functional updates setState(prev=>prev+1), take latest value , so react batch runs in order with functional updates

6.thumb rule - if a component is context consumer meaning it is using 
useContext(ContextName) , then it will hundred percent re-render if value changes - value={state} , even if component is wrapped with memo and has child who is context consumer, the parent will not re-render but child will re-render, that is the power of usecontext

7.syntax of suspense component is <Suspense fallback={<Loading/>} > </Suspense> and throw promise; immediately stops the function. React catches the thrown value and only resumes the component's execution ('A2' line) when it detects the promise has resolved and it attempts the re-render. 
EVEN IF THERE WAS NO SUSPENSE , throwing a promise would have halted the execution and line A2 would have reached only after resolving the promise

10.useEffect is aysnc or deferred meaning it doesnt block the dom, it calculates the dom changes in the background and udpates the dom after the dom paint but useLayout effect is sync meaning it runs synchronously immediately after the DOM mutations, but before the browser paints. 
 useEffect will run the changes after the dom is rendered meaning a position set of an element in useEffect will first show at inital positon and then at set place , but using useLayout effect , the element shows directly at the set place first because useLayout runs before the dom is painted

 clean up functions run just before second re-render, if no re-render then no clean up function will run 

 11.the comparison fails because Because JavaScript functions are objects, a function defined inline during a render is a new object reference every time. The memoization check performs a shallow comparison: prevProps.onClick !== nextProps.onClick is true because the references are different, the fix for this is wrapping the function inside useCallback so that its refernece doesnt change with rerender if deps have not changed


 12.React will only re-render the page when it has called all the useEffects, then it will update the value of state (in the real DOM), the task in macro task queue usually waits for the re-render to complete and then gets executed once call stack is empty and the settimeout is pushed from callback queue by event loop

 13.no it doesnt

 15.yes , In React, the children prop is created as a new object reference (React Element) on every single render of the parent component (App), so even if memoized the component will re-render

 17.so react batch updates multiple states meaning if we have a function that is doing two state updates like increasing count and toggling to false, ideally react should render the component twice for each state change, but this is not done by react, it renders the component only once for two state changes done back to back ,this is batch update but when we use flush sync and put the state function inside it, for that state change the component is immediately rendered and then the following state function outside the flush sync renders the comp again