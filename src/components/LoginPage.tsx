"use client"

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email === 'alisikander757@gmail.com' && formData.password === '12345678') {
      router.push('/chat1');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-[800px]">
      {/* Left Section with Image */}
      <div className="hidden lg:flex lg:w-1/2 p-8 flex-col justify-between relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/herobg.png"
          alt="Background Pattern"
          fill
          className="object-cover"
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-40 left-20 w-32 h-32 bg-emerald-400 rounded-full opacity-20" />
        <div className="absolute bottom-60 right-20 w-24 h-24 bg-emerald-400 rounded-full opacity-20" />
        <div className="absolute top-60 right-40 w-16 h-16 bg-emerald-400 rounded-full opacity-20" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-start">
  <div className="flex items-center gap-2 mb-2">
    <Image
      src="/logo.png"
      alt="RozMarrah Logo"
      width={35}
      height={35}
      className="h-auto"
      priority
    />
    <span className="text-white text-2xl font-medium">RozMarrah</span>
  </div>
  <h2 className="text-white text-lg font-medium">
    Your Gateway to the best platform for freelancing
  </h2>
</div>

        <div className="relative z-10">
          {/* Placeholder circles for profile icons */}
          <div className="absolute left-16 top-64 w-28 h-28 flex items-center justify-center z-20">
          <Image
            src="/profile2.png"
            alt="Freelancer"
            width={1200}
            height={1200}
            className="relative z-10"
          />
          </div>
          <div className="absolute right-48 top-44 w-20 h-20 flex items-center justify-center z-20">
            <Image
            src="/profile1.png"
            alt="Freelancer"
            width={1200}
            height={1200}
            className="relative z-10"
          />
          </div>
          <div className="absolute left-40 top-14 w-14 h-14 flex items-center justify-center">
          <Image
            src="/profile3.png"
            alt="Freelancer"
            width={1200}
            height={1200}
            className="relative z-10"
          />
          </div>
          <div className="absolute right-36 top-80 w-48 h-48 flex items-center justify-center z-20">
          <Image
            src="/frame2.png"
            alt="Freelancer"
            width={1200}
            height={1200}
            className="relative z-10"
          />
          </div>
          <Image
            src="/login_girl.png"
            alt="Freelancer"
            width={600}
            height={600}
            className="relative z-10"
          />
          <div className="absolute inset-0 z-20" />
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center mb-40">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">LOGIN</h1>
          <p className="text-gray-600 text-center mb-6">Welcome back to RozMarrah, where your needs are our priority!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Your Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Login Now
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mb-3">Login with Others</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Image
                  src="/googlelogo.png"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span>Login with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Image
                  src="/fblogo.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                <span>Login with Facebook</span>
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-emerald-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;