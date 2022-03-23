import React, { useState, useRef, useEffect } from "react";

function FlashCard({ flashCard }) {
	const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('init');
    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight () {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }
    useEffect(setMaxHeight, [flashCard.question, flashCard.answer, flashCard.options])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return window.removeEventListener('resize', setMaxHeight)
    },[])
	return (
		<div
			className={`card ${flip ? "flip" : ""}`}
            style={{height: height}}
			onClick={() => setFlip(!flip)}
        >
            <div className="front" ref={frontEl}>
                {flashCard.question}
                <div className="flashcard-options">
                    {flashCard?.options.map(option =>
                        <div className="flashcard-option" key={option}>{option}</div>
                    )}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashCard.answer}</div>
		</div>
	);
}

export default FlashCard;
