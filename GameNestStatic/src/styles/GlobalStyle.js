import { createGlobalStyle } from "styled-components";
import "./imports.css";

const GlobalStyle = createGlobalStyle`
    .square {
        border: 1px solid #BBB;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding-left: 0;
        padding-right: 0;
        background-color: #668cff;
    }

    .square:before{
        content: "";
        display: block;
        padding-top: 100%;
    }

    .highlighted {
        background-color: #ffeb3b !important;
    }

    .sunk {
        background-color: #000;
    }

    .ship-select {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-bottom: 0.5rem;
    }
`;

export default GlobalStyle;
