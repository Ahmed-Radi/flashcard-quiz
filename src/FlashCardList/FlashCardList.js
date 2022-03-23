import React from 'react'
import FlashCard from '../FlashCard/FlashCard'

function FlashCardList({ flashCards }) {
    return (
        <div className="card-grid">
            {flashCards?.map(flashCard => (<FlashCard flashCard={flashCard} key={flashCard.id} />))}
        </div>
    )
}

export default FlashCardList