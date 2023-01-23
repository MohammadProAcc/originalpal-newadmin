import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

interface IEditorProps {
  title?: ReactNode
  content: string
  callback: (content: string) => void
}
export const Editor = (props: IEditorProps) => {
  return (
    <div>
      {props.title}
      <SunEditor
        setDefaultStyle="height: 75vh;"
        defaultValue={props.content}
        onChange={props.callback}
        setOptions={{
          imageFileInput: true,
          buttonList: [
            ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
            ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save'],
          ],
        }}
        setAllPlugins
      />
    </div>
  )
}
