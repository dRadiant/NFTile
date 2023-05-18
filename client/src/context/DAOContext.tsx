import { createContext, useContext, useState } from 'react';

type DaoContextType = {
  daoAddress: string;
  setDaoAddress: React.Dispatch<React.SetStateAction<string>>;
};

const DaoContext = createContext<DaoContextType | undefined>(undefined);

export const useDao = () => {
  const context = useContext(DaoContext);
  if (!context) {
    throw new Error('useDao must be used within a DaoProvider');
  }
  return context;
};

export const DaoProvider = ({ children }) => {
  const [daoAddress, setDaoAddress] = useState(
    '0xD533a949740bb3306d119CC777fa900bA034cd52'
  );

  return (
    <DaoContext.Provider value={{ daoAddress, setDaoAddress }}>
      {children}
    </DaoContext.Provider>
  );
};
