import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubDark, githubLight } from 'src/components/CodeEditor/Themes';
import { useCodeEditorContext } from 'src/contexts/CodeEditorContext';
import { useEffect } from 'react';

export const CodeEditor = ({viewMode, data, ...props}) => {
  const { value, setValue } = useCodeEditorContext();

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <CodeMirror
      value={value}
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
      theme={viewMode === "light" ? githubLight : githubDark}
      onChange={(value) => setValue(value)}
      {...props}
    />
  )
}