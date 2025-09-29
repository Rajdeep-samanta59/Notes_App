
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useToast } from './Toast'
import NotebookIcon from './icons/NotebookIcon'

export default function Login(){
  const [email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const Handlesubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const API = import.meta.env.VITE_API_URL;
      if (!API) {
        throw new Error('Server URL not configured. Please set VITE_API_URL in environment variables.');
      }
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Unable to connect to server at ${API}. Please check if the server is running and VITE_API_URL is correct.`);
      }

      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Login failed');
      
      // backend returns { accessToken, refreshToken, name, email }
      if (!body.accessToken || !body.refreshToken) {
        throw new Error('Invalid response from server: missing tokens');
      }
      
      login({ 
        accessToken: body.accessToken, 
        refreshToken: body.refreshToken, 
        user: { name: body.name, email: body.email } 
      });
      navigate('/');
    }catch(err){
      console.error('Login failed:', err);
      addToast(err.message || 'Unable to connect to server. Please try again later.', 'error');
    }finally{ 
      setLoading(false); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center justify-center">
            <NotebookIcon width={48} height={48} />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to access your notes</p>
        </div>

        <form onSubmit={Handlesubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@company.com"
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Remember me</span>
            </label>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : null}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Not a member? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

