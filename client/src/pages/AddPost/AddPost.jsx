import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost } from '../../redux/features/post/postSlice';

export const AddPost = memo(() => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async () => {
    const data = new FormData();
    data.append('title', title);
    data.append('text', text);
    data.append('image', image);

    const response = await dispatch(createPost(data));

    if (response.meta.requestStatus === 'fulfilled') {
      toast('Successfully added');
    }

    if (response.meta.requestStatus === 'rejected') {
      toast('Error');
    }

    navigate('/');
  };

  const clearFormHandler = () => {
    setText('');
    setTitle('');
  };

  return (
    <form className='w-1/3 mx-auto py-10' onSubmit={(e) => e.preventDefault()}>
      <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Pin picture:
        <input
          type='file'
          className='hidden'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      <div className='flex object-cover py-2'>
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
      </div>

      <label className='text-xs text-white opacity-70'>
        Title of Post:
        <input
          type='text'
          value={title}
          placeholder='Title'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className='text-xs text-white opacity-70'>
        Text of post:
        <textarea
          value={text}
          placeholder='Text of post'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button
          onClick={submitHandler}
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
        >
          Add
        </button>

        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
        >
          Clear
        </button>
      </div>
    </form>
  );
});