1.micro task queue always executes first if it has anything in it so promise chained .then will be added to queue immediately so it will be executed also immediately

2- .then expects two functions onfullfilled,onrejected so if we pass .then(2) so 2 gets passed as onfullfilled function but as 2 is not a function , the prev value gets passed untouched ,same with .then(Promise.resolve(4)), .then expects a function not promise , since fulfilled promise is getting passed out , it will pass down the prev value untouched, but it would have been .then(()=>Promise.resolve(4)) then it would have passed 4

3. .then will return 7 

4. a .finally() never receives any value
 It has no parameters, so it cannot read the value from .then() or the error from .catch(). ; 
 b .finally() always passes down the original value/error
Anything you return inside .finally() is ignored.
The value (or error) from before .finally() continues to the next .then() or .catch().
c. .finally() only overrides the chain if:
It throws an error
OR returns a rejected promise

5.detached

6.no Arrow functions do not get their this from call-site; they use the captured this (which is obj). So inside the arrow function this === obj.

7.prefix inc first increase then return , postfix increment first returns then increment

8.ans
a. '3' + 1 = 31:  + with a string triggers concat
b. '3' - 1 = 2 : - forces nummeric conversion
c.'3' - ' 02 ' = 1 : * forces nummeric conversion 
d.'3' * ' 02 ' = 6 
e.null - 1 = -1  null is coerced to 0 in coercion
f.false * 1 = 0
g.null - '1' = -1
h.null + 1 = 1 
i.null + '2' = null2
e.Number(null) = 0