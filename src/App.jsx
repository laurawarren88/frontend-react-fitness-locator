import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Boilerplate from './layouts/Boilerplate';
import Home from './pages/Home';
import Register from './pages/users/Register';
import NotFoundPage from './pages/errors/NotFoundPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Boilerplate />} >
      <Route index element={<Home />} />
      <Route path="/users/register" element={<Register />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (<RouterProvider router={router} />)
};

export default App;