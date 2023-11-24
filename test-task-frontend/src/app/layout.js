"use client"

import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Provider, useSelector } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({ children }) {
  const router = useRouter();
  useEffect(() => {

    if (!localStorage?.getItem('accessToken')) {
      router.push('/');
    }
    else {
      router.push('/employee');
    }
  }, [router]);
  return (
    <html lang="en">
      <body >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
