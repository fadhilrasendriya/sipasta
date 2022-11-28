import { createContext, useState, useContext } from "react";

export const CodeEditorContext = createContext();

export const CodeEditorProvider = ({ children }) => {
    const [ value, setValue ] = useState("");
    return (
        <CodeEditorContext.Provider value={{ value, setValue }}>
            {children}
        </CodeEditorContext.Provider>
    );
};

export const useCodeEditorContext = () => {
    return useContext(CodeEditorContext);
}