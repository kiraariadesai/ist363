const students = [{suid: 123456, name: 'Sue Flay', year: 'senior', major: 'Applied Data Analytics'},
    {suid: 234567, name: 'Ella Vader', year: 'junior', major: 'Information Management and Technology'},
    {suid: 345678, name: 'Chris P Bacon', year: 'junior', major: 'Innovation Society and Technology'},
];


/*Question 1*/
function App() {
    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map((item) => (
                <li> {item.name} | {item.year} | {item.major}</li> ))}
            </ul>
        </div>
    );
}

/*Question 2*/
function App ()
{
    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map((item)=> (
                    <li key={item.suid}> {item.name} | {item.year} | {item.major} </li> ))}
            </ul>
        </div>
    );
}


/*Qestion 3*/

function Students() {
    return (
        <ul>
            {students.map ((item) => (
                 <li key={item.suid}> {item.name} | {item.year} | {item.major} </li> ))}
        </ul>
    );
}

function App () {
    return(
        <div>
            <h1>Students</h1>
            <Students />
        </div>
    );
}


/*Question 4 */
function handleClick(message) {
    console.log(message);
}

function App() {
    return (
        <div>
            <button onClick={ () => handleClick("Hello from the button!")}>
                Click Me
            </button>
        </div>
    );
}


/*Question 5 */

function Students() {
  const filtered = students.filter((item) => item.name === 'Sue Flay');

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item.suid}>
          {item.name} | {item.year} | {item.major}
        </li>
      ))}
    </ul>
  );
}


/* Written Questions

1. They are stand alone reusable bits of code created in jsx files 
and the developer creates their meaning. They can be buttons, nav bars, etc. 
They are important because they make the coding process more efficient and clean
by being able to reuse, customize, and test functions.

2. They use capital letters so that the code editor interface can differentiate 
between what is an HTML tag and what is a react name/component. 

3. It is an extension similar to Javascript but written in an HTML format using
camelCase and self closing tags have a slash.

4. Class is already a resrved keyword (pre-defined) in Javascript.

5. You wrap the JavaScript expression in curly braces {} inside the JSX
and will output the value associated with the expression.

6. Smaller components are better because they are more readable, easier to debug, 
and break up functionality in a balanced fashion. 

7. You should split up a component when it is too hard to read or understand by skimming it.
Other cases to split could be when part of the component gets repeated in different places, when 
there is a specific use for the component (header, list, etc.), or of it is a form.

8. Yes. You take its tag and place it where needed on the page. It looks like this: <Students />.

9. React does exactly what the input tells it to. . So every time someone types a character, 
React updates a variable, and that variable tells the input what to display. React is always in the loop.

*/

