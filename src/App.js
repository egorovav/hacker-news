import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NewsListPage} from "./pages/NewsListPage/NewsListPage";
import {CommentsPage} from "./pages/CommentsPage/CommentsPage";
import {Layout} from "./components/Layout/Layout";


function App() {

  return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NewsListPage/>}/>
            <Route path='comments/:id' element={<CommentsPage/>}/>
          </Routes>
        </BrowserRouter>
      </Layout>
  )
}

export default App;
