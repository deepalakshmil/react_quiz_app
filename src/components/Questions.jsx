import { useState } from "react";
import styles from './Questions.module.css'

function Questions({ quizConsolData }) {
   const [error, setError] = useState(null);
   const [selectedValue, setSelectedValue] = useState('');
   const [result, setResult] = useState('');

   const handleChange = (event) => {
      setSelectedValue(event.target.value);
   };

   const validateForm = () => {
      if (!selectedValue) {
         setError('You must select the answer are required')
         return false;
      }
      setError('');
      return true;
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      try {
         if (!validateForm()) {
            return;
         }
      } catch (e) {
         console.error(e.message);
      }
      const correctAnswer = quizConsolData.questionsData.map((element) => (
         element.correct_answer));

      if (selectedValue == correctAnswer) {
         setResult(`Congratulations, ${quizConsolData.inputData.userName}!!  your answer is correct`);
      } else {
         setResult(`Sorry, ${quizConsolData.inputData.userName},  your answer is incorrect try again and the correct answer is "${correctAnswer[0]}"`);
      }
   }

   const handleRefresh = () => {
      window.location.reload();
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className={styles.questioncontainer}>
               <h2>Answer the Question</h2>

               {quizConsolData.questionsData.map((element, id) => (
                  <div key={id}>
                     <p className={styles.alignment}><b>{element.question}</b></p>
                     <div className={styles.alignment}>
                        <p> <input type="radio" id="option" name="group1" value={element.correct_answer} onChange={handleChange} />
                            <label htmlFor="correct">{element.correct_answer}</label></p>
                     </div>
                     <div className={styles.alignment}>
                        {element.incorrect_answers.map((options, index) => {
                           return (<p key={index}><input type="radio" id="options" name="group1" value={options}
                              onChange={handleChange} /><label htmlFor="inCorrect">{options}</label></p>);
                        })}
                     </div>
                  </div>
               )
               )}
               <button>Submit</button>

               {error && <div style={{ color: 'red' }}>{error}</div>}

            </div>
            {result && result.startsWith("Congratulations") && <div style={{ color: 'green' }}><h1>{result} </h1></div>}
            {result && !result.startsWith("Congratulations") && <div style={{ color: 'red' }}><h1>{result}  </h1></div>}

            {<button onClick={handleRefresh}> Next Question </button>}

         </form>
      </div>
   );
}

export default Questions;
