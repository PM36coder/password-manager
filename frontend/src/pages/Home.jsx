import React from 'react';
import { ShieldCheck, Lock, Cloud, Star } from 'lucide-react'; // Icons from lucide-react
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const {token} = useAuth()
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Simplify Your Digital Life
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          PassVault protects your passwords, so you can focus on what matters most.
        </p>
        {/* Conditional rendering based on token existence */}
        {token ? (
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Welcome Back!</p>
            <Link to="/manager">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:cursor-pointer">
                Go to your Vault
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-purple-400 to-pink-600 hover:cursor-pointer">
              Get Started - It's Free
            </button>
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-700 rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105">
              <ShieldCheck className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Unbreakable Security</h3>
              <p className="text-gray-300">
                End-to-end encryption to keep your data safe from any threats.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-gray-700 rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105">
              <Cloud className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sync Across Devices</h3>
              <p className="text-gray-300">
                Access your passwords from any device, anywhere, anytime.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-gray-700 rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105">
              <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-300">
                A simple interface that makes managing passwords effortless.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
