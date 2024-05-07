import { createGlobalStyle } from "styled-components";
import "./imports.css";

const GlobalStyle = createGlobalStyle`
    .square {
        border: 1px solid #CCC;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding-left: 0;
        padding-right: 0;
    }

    .square:before{
        content: "";
        display: block;
        padding-top: 100%;
    }

    .highlighted {
        background-color: #6495ED !important;
    }

    .hit {
        background-color: #FF0000;
    }

    .miss {
        background-color: #D3D3D3;
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
