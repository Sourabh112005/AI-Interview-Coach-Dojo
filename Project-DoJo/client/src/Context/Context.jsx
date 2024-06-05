import React, { createContext, useState } from 'react';
import runChat from "../config/gemini.js"

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const onSent = async (message) => {
    const res = await runChat(message);
    setResponse(res);
  };

  return (
    <Context.Provider value={{ onSent, input, setInput, response }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;