
"use client"

import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  [key: string]: any; // Allow other props
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link'
];

export const RichTextEditor = forwardRef<typeof ReactQuill, RichTextEditorProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <div className="bg-background rounded-md border border-input">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="[&_.ql-container]:min-h-[250px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-input [&_.ql-container]:border-input"
          {...props}
          // The ref from react-hook-form isn't directly compatible, 
          // but we don't need it as onChange handles the value.
          // This component will be controlled by the form state.
        />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
