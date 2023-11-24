import React, {useContext, useState} from 'react';

const ConfettisContext = React.createContext();

export const useConfettisService = () => {
  return useContext(ConfettisContext);
};

export const ConfettisServiceProvider = ({children}) => {
  const [showConfettis, setShowConfettis] = useState(false);

  const throwConfettis = () => {
    setShowConfettis(true);

    setTimeout(() => {
      setShowConfettis(false);
    }, 5000);
  };

  return (
    <ConfettisContext.Provider value={{showConfettis, throwConfettis}}>
      {children}
    </ConfettisContext.Provider>
  );
};
