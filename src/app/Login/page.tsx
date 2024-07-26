'use client'
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from "../firebase/Config";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import Link from 'next/link';
import Image from 'next/image';
import { PiEnvelopeSimpleFill, PiLockKeyFill } from 'react-icons/pi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        router.push('Dashboard');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in Successfully: ", userCredential.user);
      router.push('Dashboard');
    } catch (e) {
      console.error(e);
      alert("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

 
  
  return (
    <div className="min-h-screen grid items-center justify-center bg-white ">
        <div className="flex flex-row items-center justify-center mt-12 -mb-8">
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="w-8 h-8 mt-4 mr-2 " />
        <h1 className="text-2xl font-bold mt-4 text-center">devlinks</h1>
      </div>
      
      <div className="bg-white p-9 px-12 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-2 text-left">Login</h2>
        <p className="text-sm font-light mb-10 text-left mt-2  text-customGray">Add your details below to get back into the app</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative">
              <PiEnvelopeSimpleFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder='e.g. alex@email.com'
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                width={100}
                className="mt-1 pl-10 px-3 w-100 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 "
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
             Password
            </label>
            <div className="relative">
              <PiLockKeyFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder='Enter your password'
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                width={100}
                className="mt-1 pl-10 px-3 w-100 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 "
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-customPurple text-white px-4 py-2 rounded-lg shadow hover:bg-customPurple transition-colors"
          >
         Login
          </button>
         
          
        
          <span className='block text-sm font-light mt-6 text-center text-customGray'>
          Don’t have an account? 
          <Link href="Sign-up">
          <span className='text-purple-500'>Create account</span> 
          </Link>
         
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
