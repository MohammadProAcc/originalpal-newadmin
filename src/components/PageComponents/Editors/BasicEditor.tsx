import React from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import { Editor } from '@tinymce/tinymce-react';

export function BasicEditor({
  callback,
  initialValue,
  title,
}: {
  callback: Function;
  initialValue?: string;
  title?: string;
}) {
  const handleEditorChange = (content: any, _editor: any) => {
    callback(content);
  };
  return (
    <Card>
      <header>{title ?? 'ویرایشگر'}</header>
      <CardBody>
        <Editor
          initialValue={initialValue}
          init={{
            height: 500,
            menubar: false,

            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
      </CardBody>
    </Card>
  );
}
