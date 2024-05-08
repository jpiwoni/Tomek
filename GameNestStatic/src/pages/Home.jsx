import { Container, Row } from 'react-bootstrap';
import * as S from "../styles/Styles";

function Home() {
  return (
    <Container>
      <Row>
        <S.GameBox to="/battleship">
          <S.GameBoxBackgroundImage $url="/img/battleship/battleship.png" $darken />
          <S.GameBoxLabel>Battleship</S.GameBoxLabel>
        </S.GameBox>
        <S.GameBox to="/blackjack">
          <S.GameBoxBackgroundImage $url="https://i.ibb.co/Dw9C9Sj/blackjack.png" $darken />
          <S.GameBoxLabel>Blackjack</S.GameBoxLabel>
        </S.GameBox>
        <S.GameBox to="/wordle">
          <S.GameBoxBackgroundImage $url="/img/wordle/wordle.png" $darken />
          <S.GameBoxLabel>Wordle</S.GameBoxLabel>
        </S.GameBox>
        <S.GameBox to="/dotsAndBoxes">
          <S.GameBoxBackgroundImage $url="https://placehold.co/300" $darken />
          <S.GameBoxLabel>Dots and Boxes</S.GameBoxLabel>
        </S.GameBox>
      </Row>
    </Container>
  )
}

export default Home;