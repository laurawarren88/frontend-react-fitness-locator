import { Route, createRoutesFromElements } from 'react-router-dom';
import Boilerplate from '../layouts/Boilerplate';
import Home from '../pages/Home';

import Locator from '../pages/Locator/Locator';

import CreateActivity from '../pages/activities/CreateActivity';
import ShowActivity from '../pages/activities/ShowActivity';
import UpdateActivity from '../pages/activities/UpdateActivity';
import DeleteActivity from '../pages/activities/DeleteActivity';

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

    {/* places routes */}
    <Route path="/activities/locator" element={<Locator />} />

    {/* Activities routes */}
    <Route path="/activities/new" element={<CreateActivity />} />
    <Route path="/activities/:id/edit" element={<UpdateActivity />} />
    <Route path="/activities/:id/delete" element={<DeleteActivity />} />
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