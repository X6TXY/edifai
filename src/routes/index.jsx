import { Route, Routes } from "react-router-dom";

import { Auth } from "../сomponents/auth ";
import { Help } from '../сomponents/content/help';
import { History } from '../сomponents/content/history';
import { Home } from '../сomponents/content/home';
import { Info } from '../сomponents/content/info';
import { Storybot } from '../сomponents/content/storybot';
import { Study } from '../сomponents/content/study';
import { Writing } from '../сomponents/content/study/writing';
import { Task1 } from '../сomponents/content/study/writing/task1';
import { Task2 } from '../сomponents/content/study/writing/task2';
import { Landing } from '../сomponents/landing';
import { Sidebar } from '../сomponents/sidebar';
import { Test } from '../сomponents/test';



export const RouteList = () => {
    return (
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path='/sidebar' element={<Sidebar/>} />
        <Route path='/test' element={<Test/>}/>
        <Route path="/login" element={<Auth/>} />
        <Route path='/' element={<Landing/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/about" element={<Info/>} />
        <Route path="/study" element={<Study/>} />
        <Route path='/storybot' element={<Storybot/>}/>
        <Route path='/assistant' element={<Help/>}/>
        <Route path='/study/writing' element={<Writing/>}/>
        <Route path='/study/writing/task2' element={<Task2/>}/>
        <Route path='/study/writing/task1' element={<Task1/>}/>
      </Routes>
    )
  };