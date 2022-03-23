import React, { useState, useEffect, useRef } from "react";
import FlashCardList from './FlashCardList/FlashCardList';
import './app.css'
import axios from 'axios'

function App() {
    const [flashCards, setFlashCards] = useState([])
    const [categories, setCategories] = useState([])

    const categoryEl = useRef();
    const amountEl = useRef();
    // Category
    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then(res => {
                setCategories(res.data.trivia_categories)
            })
    } ,[])
    // useEffect(() =>{

    // ,[])
    const decodeString = (str) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = str
        return textArea.value
    }
    const handleSubmit  = (e) => {
        e.preventDefault();
        axios.get('https://opentdb.com/api.php', {
            params: {
                amount: amountEl.current.value,
                category: categoryEl.current.value,
            }
        })
        .then(response => {
            setFlashCards(response.data.results.map((questionItem, index) => {
                const answer = decodeString(questionItem.correct_answer);
                let options = [
                    ...questionItem.incorrect_answers.map(ans => decodeString(ans)),
                    answer
                ]
                return {
                    id: `${index}-${Date.now()}`,
                    question: decodeString(questionItem.question),
                    answer: answer,
                    options: options.sort(() => Math.random() - 0.5)
                }
            }))
        })}

    return (
        <>
            <form action="" className="header" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select name="" id="" ref={categoryEl}>
                        {categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Number of Questions</label>
                    <input type="number" id="amount" min='1' step="1" defaultValue={10} ref={amountEl}/>
                </div>
                <div className="form-group">
                    <button className="btn">Generate</button>
                </div>
            </form>
            <div className="container">
                {
                    flashCards.length !== 0 ?
                    <FlashCardList flashCards={flashCards} /> :
                    <div className="loading">
                        <p>Please select <b>Category</b> then click on <b>Generate</b> button</p>
                    </div>
                }
            </div>
        </>
    );
}

export default App;
