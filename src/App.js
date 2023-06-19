import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NewsList} from "./pages/NewsList/NewsList";
import {Comments} from "./pages/Comments/Comments";
import {Layout} from "./components/Layout/Layout";


function App() {

  return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NewsList/>}/>
            <Route path='comments/:id' element={<Comments/>}/>
          </Routes>
        </BrowserRouter>
      </Layout>
  )
}

export default App;
