import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes/routes.jsx';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

const router = createBrowserRouter(routes);

export default App;