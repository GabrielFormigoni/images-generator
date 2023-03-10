import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://image-generator-q7ai.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })

        await response.json(form);
        navigate('/')
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please enter a promp and generate an image')
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)

    setForm({ ...form, prompt: randomPrompt })
  };

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://image-generator-q7ai.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt})
        })

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt')
    }
  };

  return (
    <section className="max-w-7xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="font-extrabold text-3xl text-[#222328]">Create</h1>
        <p className="mt-3 text-[16px] text-[#666e75] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share with your friends and colleagues
        </p>
      </div>

      {/* Form com nome e prompt, que retorna uma imagem de acordo com o prompt */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Joe Stone"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A bear with a mustache and two ice creams"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        {/* Mostra a imagem que voc?? pesquisou ou um preview padr??o */}
        <div className="relative w-64 h-64 bg-gray-50 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 flex justify-center items-center mt-5">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-contain opacity-40"
            />
          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-5">
          <button type="button" onClick={generateImage} className='text-white bg-green-700 font-medium rounded-md text-sm w-full px-5 py-2 text-center'>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            You can now share the image you created with your family and friends and see if they like it !!!
          </p>
          <button type="submit" className="mt-3 px-5 py-2 bg-[#6469ff] text-white font-medium text-sm rounded-lg w-full text-center">
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
