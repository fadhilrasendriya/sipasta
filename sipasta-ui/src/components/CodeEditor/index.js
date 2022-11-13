import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubDark, githubLight } from 'src/components/CodeEditor/Themes';

export const CodeEditor = ({viewMode, ...props}) => {
  return (
    <CodeMirror
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
      theme={viewMode === "light" ? githubLight : githubDark}
      {...props}
    />
  )
}