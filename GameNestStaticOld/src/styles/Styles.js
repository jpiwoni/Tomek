import { Link } from "react-router-dom";
import styled from "styled-components";

export const GameBox = styled(Link)`
  width: 300px;
  height: 300px;
  border-radius: 0.375rem;
  position: relative;
  overflow: hidden;
  font-size: 2.5em;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  text-align: center;
  box-shadow:
    0 0 1px rgb(0 0 0 / 13%),
    0 1px 3px rgb(0 0 0 / 20%);
  border: 5px solid #11111199;

  margin: 15px;

  &:hover {
    font-size: 3em;
  }

  @media only screen and (max-width: 700px) {
    flex-basis: 100%;
  }
`;

export const GameBoxBackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  background-image: url(${(p) => p.$url});
  background-size: cover;
  background-position: center;
  transition: all 0.2s !important;
  filter: blur(0) brightness(${(p) => (p.$darken ? "45%" : "90%")});
  &:hover {
    filter: blur(5px) brightness(${(p) => (p.$darken ? "35%" : "85%")});
  }
`;

export const GameBoxLabel = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-shadow: 2px 2px rgb(0 0 0 / 20%);
`;