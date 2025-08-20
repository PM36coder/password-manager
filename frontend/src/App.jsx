
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'



import { Layout } from './Layout/Layout'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Manager from './components/Manager'



function App() {
 
const router = createBrowserRouter([
  {
    path : "/", element : <Layout/>,
children : [
{  path : "/" , element : <HomePage/>},
{path: "/about"  , element: <AboutPage/>},
{path : "/contact" , element : <ContactPage/>},
{path : "/login", element : <Login/>},
{path : "/signup", element : <SignUp/>},
{path : "/passwords", element: <Manager/>}
]
  }
])
  return (
    <>
   <RouterProvider router={router} />
    </>
  )
}

export default App
