1.what is the order of exectuion of useeffect and initial paint, what happens in strict mode

2.what happens if a function is wrapped with memo from React

4.does react re-render children when returning children directly like 
return children 

5.how does react batching works 

6.usecontext, if the component1 is a context consumer and its parent component who is memoized with memo but not a context consume, what is the behaviour of component1

7.give syntax of suspense component and tell why throw was necessary here

9.attempt question 9

10.what is the diff between useEffect and useLayoutEffect, also when does clean up functions run

11.how does React.memo re-render even if onClick={()=>{}} is passed

12.if i have an setTimeout in one of the useEffect and i am re-rendering comp inside another useEffect, will the opeartion inside that timeout run after the re-rendering or before the re-rendering, and also how does react call useEffects

13.does useRef change its value on re-render

15.will memoized component with React.memo re-render if it is receiving a children prop

17.what is flush sync and how does it help us 