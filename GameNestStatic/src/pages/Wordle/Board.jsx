import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../../styles/WordleStyle.css'
import Letter from './Letter'


const WordleBoard = () => {

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} attempt = {0} /></Col>
                <Col><Letter pos={1} attempt = {0} /></Col>
                <Col><Letter pos={2} attempt = {0} /></Col>
                <Col><Letter pos={3} attempt = {0} /></Col>
                <Col><Letter pos={4} attempt = {0} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} attempt = {1} /></Col>
                <Col><Letter pos={1} attempt = {1} /></Col>
                <Col><Letter pos={2} attempt = {1} /></Col>
                <Col><Letter pos={3} attempt = {1} /></Col>
                <Col><Letter pos={4} attempt = {1} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} attempt = {2} /></Col>
                <Col><Letter pos={1} attempt = {2} /></Col>
                <Col><Letter pos={2} attempt = {2} /></Col>
                <Col><Letter pos={3} attempt = {2} /></Col>
                <Col><Letter pos={4} attempt = {2} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>  
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} attempt = {3} /></Col>
                <Col><Letter pos={1} attempt = {3} /></Col>
                <Col><Letter pos={2} attempt = {3} /></Col>
                <Col><Letter pos={3} attempt = {3} /></Col>
                <Col><Letter pos={4} attempt = {3} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>    
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} attempt = {4} /></Col>
                <Col><Letter pos={1} attempt = {4} /></Col>
                <Col><Letter pos={2} attempt = {4} /></Col>
                <Col><Letter pos={3} attempt = {4} /></Col>
                <Col><Letter pos={4} attempt = {4} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>    
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} attempt = {5} /></Col>
                <Col><Letter pos={1} attempt = {5} /></Col>
                <Col><Letter pos={2} attempt = {5} /></Col>
                <Col><Letter pos={3} attempt = {5} /></Col>
                <Col><Letter pos={4} attempt = {5} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default WordleBoard