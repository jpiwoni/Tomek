import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./modules";
import {
  BattleshipGame,
  BattleshipLobby,
  BlackjackGame,
  ErrorPage,
  Forbidden,
  Home,
  PageNotFound,
  WordleGame
} from "./pages";
import { PublicRoute } from "./routes";
import { GlobalStyle } from "./styles";
import { addWindowClass } from "./utils";

function App() {
  useEffect(() => {
    addWindowClass("dark-mode");
    addWindowClass("layout-navbar-fixed");
  }, []);

  return (
    <>
      <GlobalStyle />
      <ErrorBoundary fallbackRender={ErrorPage}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/" element={<Main />}>
                <Route path="/battleship">
                  <Route path="/battleship/:lobbyId" element={<BattleshipGame />} />
                  <Route path="/battleship" element={<BattleshipLobby />} />
                </Route>
                <Route path="/blackjack">
                  <Route path="/blackjack" element={<BlackjackGame />} />
                </Route>
                <Route path="/wordle" element={<WordleGame />} />
                <Route path="/" element={<Home />} />
              </Route>
            </Route>
            <Route path="/403" element={<Forbidden />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
