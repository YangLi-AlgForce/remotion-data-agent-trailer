import React,{createContext,useContext} from 'react';
export const Frame=createContext(0);
export const useFrame=()=>useContext(Frame);
