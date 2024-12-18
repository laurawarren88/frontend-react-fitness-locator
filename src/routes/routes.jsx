import { Route, createRoutesFromElements } from 'react-router-dom';
import Boilerplate from '../layouts/Boilerplate';
import Home from '../pages/Home';
import Gyms from '../pages/gyms/Gyms';
import ShowGym from '../pages/gyms/ShowGym';
import CreateGym from '../pages/gyms/CreateGym';
import UpdateGym from '../pages/gyms/UpdateGym';

import Profile from '../pages/users/Profile'
import Register from '../pages/users/Register';
import Login from '../pages/users/Login';
import Logout from '../pages/users/Logout';
import NotFoundPage from '../pages/errors/NotFoundPage';
import ForgotPassword from '../pages/users/ForgotPassword';

const routes = createRoutesFromElements(
  <Route path="/" element={<Boilerplate />}>
    {/* Home page */}
    <Route index element={<Home />} />

    {/* Gym routes */}
    <Route path="/gyms" element={<Gyms />} />
    <Route path="/gyms/new" element={<CreateGym />} />
    <Route path="/gyms/:id/edit" element={<UpdateGym />} />
    <Route path="/gyms/:id" element={<ShowGym />} />

    {/* user routes */}
    <Route path="/users/profile/:id" element={<Profile />} />
    <Route path="/users/register" element={<Register />} />
    <Route path="/users/login" element={<Login />} />
    <Route path="/users/logout" element={<Logout />} />
    <Route path="/users/forgot_password" element={<ForgotPassword />} />

    {/* Error */}
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export default routes;