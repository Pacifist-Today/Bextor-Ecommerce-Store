import CatalogPage from "./components/catalogue/CatalogPage";
import AppCss from "./App.css"
import MainMenu from "./components/MainMenu";
import {CssBaseline} from "@mui/material";
import {BrowserRouter, createHashRouter} from "react-router-dom";
import {Routes} from "react-router";

const App = props => {
  return (
      <BrowserRouter>
        {/*<CatalogPage />*/}
        <CssBaseline />
        <MainMenu />
      </BrowserRouter>
  );

    // const router = createHashRouter(BrowserRouter)
    //
    // return (
    //     <div>
    //         <RouterProvider router={router} />
    //     </div>
    // );
}

export default App;
