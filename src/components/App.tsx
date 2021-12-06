import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminTemplate from "./Routes/AdminTemplate";
import Demo from "./Routes/Demo";
import Login from "./Routes/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminTemplate />}>
          <Route path="demo" element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
