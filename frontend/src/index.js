import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './pages/App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <App/>
    </div>  
);

reportWebVitals();
