import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const Quillian = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <button>press</button>
            <div className="">{value}</div>
        </>
    );
}
