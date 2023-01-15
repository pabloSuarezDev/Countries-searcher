import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "../components/Detail";
import Landing from "../components/Landing";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />}></Route>
        <Route path="/detail/:name" element={<Detail />} />
        <Route path="*" element={<h1>Error 404</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;