import { useState } from 'react';
import About from './About';

const students = [
  {suid: 123456, name: 'Sue Flay', year: 'senior', major: 'Applied Data Analytics'},
  {suid: 234567, name: 'Ella Vader', year: 'junior', major: 'Information Management and Technology'},
  {suid: 345678, name: 'Chris P Bacon', year: 'junior', major: 'Innovation, Society and Technology'}
];

function Home () {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

function App() {
    const [page, setPage] = useState ('home');
    return (
    <>
        <Search onSearch ={handlechange} />
        <List list = {filteredStudents} />
            <button onClick {...()=> setPage ('home')} >Home </button>
            <button onClick {...()=> setPage ('about')} >About </button>

        {page === 'home' && <Home/>} 
        {page === 'about' && <About/>}
    </>
    );
}

function Search({ onSearch }) {
  return <input type="text" onChange={onSearch} placeholder="Search..." />;
}

function List({ list }) {
  return (
    <ul>
      {list.map(item => (
        <li key={item.suid}>{item.name} - {item.year} - {item.major}</li>
      ))}
    </ul>
  );
}

function About () {
    return (
        <div>
            <h1>About Page</h1>
        </div>
    );
}

export default About;