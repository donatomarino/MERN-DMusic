// import { Header } from './components/GeneralComponents/Header.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPages/LoginPage.js';
import { RecoveryPassPage } from './pages/LoginPages/RecoveryPassPage.js';
import { ConfirmRecoveryPage } from './pages/LoginPages/ConfirmRecoveryPage.js';
import { RegisterPage } from './pages/LoginPages/Registration/RegisterPage.js';
import { RegisterProvider } from './utils/contexto/RegisterContext.js';
import { MessageProvider } from "./utils/contexto/MessageContext.js";
import { DataProvider } from './utils/contexto/DataContext.js'
import './styles/general/General.css';

function App() {
  return (
    <Router>
      <RegisterProvider>
        <MessageProvider>
          <DataProvider>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/user/forgot-password' element={<RecoveryPassPage />} />
              <Route path='/user/confirm-recovery/:token' element={<ConfirmRecoveryPage />} />
              <Route path='/user/register' element={<RegisterPage />} />
            </Routes>
          </DataProvider>
        </MessageProvider>
      </RegisterProvider>
    </Router>
  );
}

export default App;
