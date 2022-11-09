import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

export const CodeEditor = ({...props}) => {
  return (
    <CodeMirror
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
      {...props}
    />
  )
}