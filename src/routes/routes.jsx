import { Route, createRoutesFromElements } from 'react-router-dom';
import Boilerplate from '../layouts/Boilerplate';
import Home from '../pages/Home';

import ShowMap from '../pages/ShowMap.jsx'; 
import Tester from '../pages/Tester';

import Activities from '../pages/activities/Activities';
import CreateActivity from '../pages/activities/CreateActivity';
import Locator from '../pages/activities/Locator';
import ShowActivity from '../pages/activities/ShowActivity';
import UpdateActivity from '../pages/activities/UpdateActivity';

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

    {/* map page */}
    <Route path="/map" element={<ShowMap />} />
    <Route path="/tester" element={<Tester />} />

    {/* Activities routes */}
    <Route path="/activities" element={<Activities />} />
    <Route path="/activities/new" element={<CreateActivity />} />
    <Route path="/activities/locator" element={<Locator />} />
    <Route path="/activities/:id/edit" element={<UpdateActivity />} />
    <Route path="/activities/:id" element={<ShowActivity />} />

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