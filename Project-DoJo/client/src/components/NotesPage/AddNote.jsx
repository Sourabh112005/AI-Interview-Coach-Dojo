import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <div className="m-4">
      <textarea 
        className="w-full p-2 border rounded" 
        rows="3" 
        placeholder="Add a new note..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button 
        onClick={handleAdd} 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>
    </div>
  );
};

export default AddNote;
