"use client"

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { FaUser, FaLink } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import Image from 'next/image';
import IMAGE from 'next/image';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase/Config'

// Define types
type Website = 'github' | 'gitlab' | 'bitbucket';

interface LinkData {
  url: string;
  website: Website;
}

// LinkForm component
const LinkForm: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [link, setLink] = useState<string>('');
  const [website, setWebsite] = useState<Website | ''>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!website) return;

    const db = getFirestore(app);
    try {
      await addDoc(collection(db, 'links'), {
        url: link,
        website: website,
        createdAt: new Date()
      });
      setLink('');
      setWebsite('');
      alert('Link added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding link. Please try again.');
    }
  };

  if (!isVisible) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-md mt-4">
      <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
        Link One
      </label>
      <input
        type="url"
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-2 mb-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Enter your link"
        required
      />
      <select
        value={website}
        onChange={(e) => setWebsite(e.target.value as Website)}
        className="w-full p-2 mb-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        required
      >
        <option value="">Select a website</option>
        <option value="github">GitHub</option>
        <option value="gitlab">GitLab</option>
        <option value="bitbucket">Bitbucket</option>
      </select>
      <button
        type="submit"
        className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

const Dashboard: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-light-purple p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center ">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10" />
          <h4 className="ml-2 text-3xl font-extrabold">devlinks</h4>
        </div>
        <div className="flex flex-row items-center justify-center space-x-12">

          

        <Link href="/links"className="flex items-center -ml-12 space-x-12 mr-12 border-none bgc-purple-500  text-purple-500 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            
            <FaLink className="mr-2 flex" /> Links
         
        </Link>
          <Link href="/profile"  className="flex items-center  text-black px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            
              <FaUser className="mr-2" /> Profile Details
           
          </Link>
         
          <Link href="/preview" className="border border-purple-500  ml-12 bg-light-purple text-purple-500 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
         
               Preview
           
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Customize your links</h1>
        <p className="text-lg mb-6">Add/edit/remove links below and then share all your profiles with the world!</p>
        <button 
          onClick={toggleFormVisibility}
          className="border border-purple-500 flex flex-row items-center justify-center w-11/12 text-purple-500 px-12 py-2 rounded-lg shadow hover:bg-purple-50 transition-colors"
        >
          <GoPlus/>
          {isFormVisible ? 'Hide form' : 'Add new link'}
        </button>

        {isFormVisible ? (
          <LinkForm isVisible={true} />
        ) : (

        <div className="mt-12 bg-purple-50 justify-center items-center w-full h-full py-12">

        <div className="relative bottom-12 flex left-84  top-14 w-40 h-40">
      {/* Gray background rectangle */}
      <div className="absolute bottom-24 -mt-62 left-0 right-0 h-3/4 w-full px-12 bg-gray-300"></div>
      
      {/* Phone component */}
      <div className="relative  -mt-20 w-24 h-40 mx-auto bg-black border-2 border-black">
        {/* Phone screen */}
        <div className="absolute top-2 left-1/2 w-20 h-32 bg-gray-200 -translate-x-1/2"></div>
        
        {/* Home button */}
        <div className="absolute bottom-1 left-1/2 w-4 h-4 border border-black rounded-full -translate-x-1/2"></div>
      </div>
      
      {/* Hand/finger icon */}

      <IMAGE src="/Vector.png" alt='hand' width={50} height={50} className="absolute bottom-32 right-12 w-13 h-16  rounded-full transform rotate-12"
        // <div className="absolute top-0 left-1/2 w-3 h-6 bg-yellow-600 rounded-full -translate-x-1/2 -translate-y-1/2">
        //   </div> 
      />
    <div className='absolute bottom-18 mt-7 left-16 ml-4  w-2 h-20  transform rotate-12  bg-shadePuple'>
    </div>
    <div className='absolute bottom-18 mt-6 left-12  w-10 h-20 rounded-t-md transform rotate-12  bg-shadePuple'>
    </div>
    </div>


    <div className='mt-20'>
    <h3 className="text-3xl text-center font-extrabold mb-2">Let’s get you started</h3>
    <p className="text-center ml-40 w-2/3">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
    </div>
        
        </div>
          )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-light-purple text-center">
      <div className="max-w-4xl mx-auto flex justify-end">
          <button className="bg-gray-400 mt-62 text-white px-4
           py-2 rounded-lg shadow hover:bg-purple-600 transition-colors">
            Save
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
