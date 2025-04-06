import { useState } from "react";
import Questions from "./Questions";
import styles from './LogInForm.module.css';

function LogInForm() {
    const [error, setError] = useState(null);
    const [quizData, setQuizData] = useState({ userName: '', category: '', difficulty: '', });
    const [quizConsolData, setQuizConsolData] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuizData((prevState) => ({
            ...prevState, // Keep the existing form data
            [name]: value, // Update the key corresponding to the input's name attribute
        }));
    };

    const validateForm = () => {
        const { userName, category, difficulty } = quizData;
        if (userName.trim() === '' || category.trim() === '' || difficulty.trim() === '' || category === '1' || difficulty === '1') {

            setError('You must fillup the all input fields are required')
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();       
        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${quizData.category}&difficulty=${quizData.difficulty}&type=multiple`)
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const data = await response.json();
            setQuizConsolData({ inputData: quizData, questionsData: data.results })
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.formcontainer}>
                <h2><O></O>Quiz Time</h2>
                <div>
                    <label htmlFor="name">Frist Name:</label>
                    <input type="text" id="name" name="userName" value={quizData.userName} onChange={handleChange}
                        placeholder="Enter Your Name here"></input>
                </div>
                <div>
                    <label>Select Category:</label>
                    <select name="category" onChange={handleChange}>
                        <option value="1">Select Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="21">Sports</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="18">Science: Computers</option>
                        <option value="25">Art</option>
                    </select>
                </div>
                <div>
                    <label>Select Difficulty:</label>
                    <select name="difficulty" onChange={handleChange}>
                        <option value="1">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {quizConsolData && <Questions quizConsolData={quizConsolData} />}

        </div>
    );
}

export default LogInForm;