import { api } from '@/infra/axios';
import { useState } from 'react';

export default function Teste() {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>();
  const [file, setFile] = useState<File | undefined>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();

    if (file) form.append('image', file);
    form.append(
      'data',
      JSON.stringify({
        name,
      })
    );

    api
      .post('/api/hello', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
          id='nome'
        />
        <input
          type='file'
          name='avatar'
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              const result = file ? URL.createObjectURL(file) : null;
              setSelectedFile(result);
              setFile(file);
            }
          }}
        />
        <button type='submit'>enviar</button>
      </form>
      {selectedFile && (
        <img
          src={selectedFile}
          alt='teste'
        />
      )}
    </div>
  );
}
