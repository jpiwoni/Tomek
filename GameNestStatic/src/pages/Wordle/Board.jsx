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
                <Col><Letter pos={0} wordNum = {0} /></Col>
                <Col><Letter pos={1} wordNum = {0} /></Col>
                <Col><Letter pos={2} wordNum = {0} /></Col>
                <Col><Letter pos={3} wordNum = {0} /></Col>
                <Col><Letter pos={4} wordNum = {0} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} wordNum = {1} /></Col>
                <Col><Letter pos={1} wordNum = {1} /></Col>
                <Col><Letter pos={2} wordNum = {1} /></Col>
                <Col><Letter pos={3} wordNum = {1} /></Col>
                <Col><Letter pos={4} wordNum = {1} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} wordNum = {2} /></Col>
                <Col><Letter pos={1} wordNum = {2} /></Col>
                <Col><Letter pos={2} wordNum = {2} /></Col>
                <Col><Letter pos={3} wordNum = {2} /></Col>
                <Col><Letter pos={4} wordNum = {2} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>  
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} wordNum = {3} /></Col>
                <Col><Letter pos={1} wordNum = {3} /></Col>
                <Col><Letter pos={2} wordNum = {3} /></Col>
                <Col><Letter pos={3} wordNum = {3} /></Col>
                <Col><Letter pos={4} wordNum = {3} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>    
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} wordNum = {4} /></Col>
                <Col><Letter pos={1} wordNum = {4} /></Col>
                <Col><Letter pos={2} wordNum = {4} /></Col>
                <Col><Letter pos={3} wordNum = {4} /></Col>
                <Col><Letter pos={4} wordNum = {4} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>    
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><Letter pos={0} wordNum = {5} /></Col>
                <Col><Letter pos={1} wordNum = {5} /></Col>
                <Col><Letter pos={2} wordNum = {5} /></Col>
                <Col><Letter pos={3} wordNum = {5} /></Col>
                <Col><Letter pos={4} wordNum = {5} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default WordleBoard