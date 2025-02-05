// import { Header } from './components/GeneralComponents/Header.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPages/LoginPage.js';
import { RecoveryPassPage } from './pages/LoginPages/RecoveryPassPage.js';
import { ConfirmRecoveryPage } from './pages/LoginPages/ConfirmRecoveryPage.js';
import { RegisterPage } from "./pages/LoginPages/RegisterPage.js";
import { RegisterProvider } from './utils/contexto/RegisterContext.js';
import { MessageProvider } from "./utils/contexto/MessageContext.js";
import { DataProvider } from './utils/contexto/DataContext.js'
import { LopdProvider } from "./utils/contexto/LopdContext.js";
import Lopd from "./pages/LoginPages/LopdPage.js";
import './styles/general/General.css';

function App() {
  return (
    <Router>
      <RegisterProvider>
        <MessageProvider>
          <DataProvider>
            <LopdProvider>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/user/forgot-password' element={<RecoveryPassPage />} />
              <Route path='/user/confirm-recovery/:token' element={<ConfirmRecoveryPage />} />
              <Route path='/user/register' element={<RegisterPage />} />
              <Route path='/user/lopd' element={<Lopd />} />
            </Routes>
            </LopdProvider>
          </DataProvider>
        </MessageProvider>
      </RegisterProvider>
    </Router>
  );
}

export default App;
