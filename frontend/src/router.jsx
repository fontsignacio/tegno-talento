import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profiles from './pages/Profiles/Profiles';
import ProfileDetail from './pages/ProfileDetail/ProfileDetail';
import Vacancies from './pages/Vacancies/Vacancies';
import VacancyForm from './pages/VacancyForm/VacancyForm';
import VacancyDetail from './pages/VacancyDetail/VacancyDetail';
import CandidateDetail from './pages/CandidateDetail/CandidateDetail';
import Chatbot from './pages/Chatbot/Chatbot';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfiles" element={<Profiles />} />
        <Route path="/perfiles/:id" element={<ProfileDetail />} />
        <Route path="/vacantes" element={<Vacancies />} />
        <Route path="/vacantes/nueva" element={<VacancyForm />} />
        <Route path="/vacantes/:id" element={<VacancyDetail />} />
        <Route path="/candidatos/:id" element={<CandidateDetail />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
