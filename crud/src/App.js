import './App.css';
import Links from './components/Links.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='container p-5'>
      <div className="row">
        <Links/>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
