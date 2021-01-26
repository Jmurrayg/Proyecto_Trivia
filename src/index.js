import './styles/main.scss';
import axios from 'axios';


const urlBASE = 'https://opentdb.com/api.php?';
const categorysSelect = document.getElementById('Category');
const categorysList = [];
const allQuestionsAndAnswers = [];

const init = () =>{
    axios.get('https://opentdb.com/api_category.php')
    .then(function (response) {
        const triviaCategoryList = response.data;
        //console.log(triviaCategoryList);
        triviaCategoryList.trivia_categories.forEach(element => {
            categorysList.push(element);
            const option = document.createElement("option");
            option.innerText = element.name;
            categorysSelect.appendChild(option);
        });
    })
    .catch(function (error){
        console.log(error);

    });
}
init();

//Se pasan los parametros para le peticion a la api de la trivia
const getURLAPI = () => {
    document.getElementById("init").style.display = "none"
    const questionContainer = document.getElementById("question");
    questionContainer.innerHTML = "";
    //console.log(document.getElementById("Category").value);
    //console.log(categorysList);
    const option = document.getElementById("Category").value;
    const difficulty = document.getElementById("Difficulty").value;
    const type = document.getElementById("Type").value;
    let idCategory
    let lvldifficulty
    let quiztype
    if(option !== "Any Enemy"){
        const fund = categorysList.find(element => element.name == document.getElementById("Category").value);
        const id = fund.id;
        idCategory = `&category=${id}`;
    }else{
        idCategory= "";
    };
    if(difficulty !== "Any Difficulty"){
        let lower = difficulty.toLowerCase();
        lvldifficulty = `&difficulty=${lower}`;
    }else{
        lvldifficulty = "";
    };
    if(type !== "Any Type"){
        if(type == "Multiple Choise"){
            quiztype = `&type=multiple`;
        }else{
            quiztype = `&type=boolean`;
        };
    }else{
        quiztype = "";
    };

    
const allQuestions = axios.get(`${urlBASE}amount=10${idCategory}${lvldifficulty}${quiztype}`)
    .then(function (response){
/*         console.log(response.data);
 */        //console.log(response.data.results);
            const trivia = response.data.results;
            //createQuestions(trivia[0]);
            return trivia;
/*             return trivia.forEach(element => {
                //console.log(element);
                createQuestions(element);
            });  */
})
    .catch(function (error) {
        console.log(error);
    });
    const promise1 = Promise.resolve(allQuestions);
    promise1.then((value) =>{
        //debugger;
        
        createQuestions(value[0]);
        allQuestionsAndAnswers.push(value);
    });
}


//Evento onclick para generacion con boton
document.getElementById("initButton").onclick = getURLAPI;
/* https://opentdb.com/api.php?amount=10&category=9 */

//Creacion de las preguntas y sus respuestas
let contador = 1;
let lifes = 5;
let hiScore = 0;
const createQuestions = (element) => { 
    let answerCheck = 0;
    let answers = element.incorrect_answers
    answers.push(element.correct_answer);
    answers = answers.sort(() => Math.random() - 0.5);
    //console.log(element.correct_answer);
    //console.log(answers);
    const ScorePoints = document.createElement("p");
    ScorePoints.classList = "Score";
    ScorePoints.innerHTML = `Hihg Score ${hiScore}`;

    const questionContainer = document.getElementById("question");
    const questionBody = document.createElement("div");
    const questionCategory = document.createElement("h5");
    const question = document.createElement("p");
    const answersContainer = document.createElement("div");
    const timeCount = document.createElement("span");
    const iconSection = document.createElement("section");
    const heartFull = document.createElement("i");
    const heartFull1 = document.createElement("i");
    const heartFull2 = document.createElement("i");
    const heartFull3 = document.createElement("i");
    const heartFull4 = document.createElement("i");
    heartFull.classList = "nes-icon is-large heart";
    heartFull1.classList = "nes-icon is-large heart";
    heartFull2.classList = "nes-icon is-large heart";
    heartFull3.classList = "nes-icon is-large heart";
    heartFull4.classList = "nes-icon is-large heart";
    const heartLose = document.createElement("i");
    const heartLose1 = document.createElement("i");
    const heartLose2 = document.createElement("i");
    const heartLose3 = document.createElement("i");
    heartLose.classList = "nes-icon is-large is-transparent heart";
    heartLose1.classList = "nes-icon is-large is-transparent heart";
    heartLose2.classList = "nes-icon is-large is-transparent heart";
    heartLose3.classList = "nes-icon is-large is-transparent heart";
    iconSection.classList = "icon-list";
    questionBody.classList = "nes-container with-title is-centered"
    timeCount.id = "countDown";
    questionCategory.innerHTML = element.category;
    question.innerHTML = element.question;
    questionContainer.appendChild(ScorePoints);
    questionContainer.appendChild(questionBody);
    questionContainer.appendChild(iconSection);

    if(lifes == 5){
        iconSection.appendChild(heartFull);
        iconSection.appendChild(heartFull1);
        iconSection.appendChild(heartFull2);
        iconSection.appendChild(heartFull3);
        iconSection.appendChild(heartFull4);
    }else if(lifes == 4){
        iconSection.appendChild(heartFull);
        iconSection.appendChild(heartFull1);
        iconSection.appendChild(heartFull2);
        iconSection.appendChild(heartFull3);
        iconSection.appendChild(heartLose);
    }else if(lifes == 3){
        iconSection.appendChild(heartFull);
        iconSection.appendChild(heartFull1);
        iconSection.appendChild(heartFull2);
        iconSection.appendChild(heartLose);
        iconSection.appendChild(heartLose1);
    }else if(lifes == 2){
        iconSection.appendChild(heartFull);
        iconSection.appendChild(heartFull1);
        iconSection.appendChild(heartLose);
        iconSection.appendChild(heartLose1);
        iconSection.appendChild(heartLose2);
    }else if(lifes == 1){
        iconSection.appendChild(heartFull);
        iconSection.appendChild(heartLose);
        iconSection.appendChild(heartLose1);
        iconSection.appendChild(heartLose2);
        iconSection.appendChild(heartLose3);
    }else{
        contador = 1;
        lifes = 5;
        questionContainer.innerHTML = "";
        allQuestionsAndAnswers.splice(0,allQuestionsAndAnswers.length);
        document.getElementById("init").style.display = "block"
        hiScore = 0;
        return document.getElementById('dialog-dark-rounded').showModal();

    }
    questionBody.appendChild(timeCount);
    questionBody.appendChild(questionCategory);
    questionBody.appendChild(question);
    questionBody.appendChild(answersContainer);
    const answerList = document.createElement("ul");
    answerList.className = "List";
    answersContainer.classList = "answerContainer";
    answersContainer.appendChild(answerList);


    let i = 1;
    //console.log(answers);
    answers.forEach(element => {
        const answerText = document.createElement("li");
/*         const arrowSelect = document.createElement("img");
        arrowSelect.classList = "arrowSelect";
        arrowSelect.src = "4253e8b17653264b722daeb20910f204.png"; */
        answerText.id =`answer${i}`;
        answerText.className = "answerStyle"; 
        answerText.innerHTML = element;
        answerList.appendChild(answerText);
        i++;
    });

    if(element.type !== "multiple" ){
        const checkAnswer1 = () =>{
            let answer = document.getElementById("answer1").innerHTML
            answerCheck = 1;
            if(answer == element.correct_answer){
                document.getElementById("answer1").style.color = "#2ecc71";
                hiScore = hiScore + 100;
            }else{
                document.getElementById("answer1").style.color = "#e74c3c";
                lifes--;
            }
            console.log(element.correct_answer);
            console.log(answer);
        }
        const checkAnswer2 = () =>{
            let answer = document.getElementById("answer2").innerHTML
            answerCheck = 1;
            if(answer == element.correct_answer){
                document.getElementById("answer2").style.color = "#2ecc71";
                hiScore = hiScore + 100;
            }else{
                document.getElementById("answer2").style.color = "#e74c3c";
                lifes--;
            }
            console.log(element.correct_answer);
            console.log(answer);
        }
        document.getElementById("answer1").onclick = checkAnswer1;
        document.getElementById("answer2").onclick = checkAnswer2;
    }else{
    const checkAnswer1 = () =>{
        let answer = document.getElementById("answer1").innerHTML
        answerCheck = 1;
        if(answer == element.correct_answer){
            document.getElementById("answer1").style.color = "#2ecc71";
            hiScore = hiScore + 100;
        }else{
            document.getElementById("answer1").style.color = "#e74c3c";
            lifes--;
        }
        console.log(element.correct_answer);
        console.log(answer);
    }
    const checkAnswer2 = () =>{
        let answer = document.getElementById("answer2").innerHTML
        answerCheck = 1;
        if(answer == element.correct_answer){
            document.getElementById("answer2").style.color = "#2ecc71";
            hiScore = hiScore + 100;
        }else{
            document.getElementById("answer2").style.color = "#e74c3c";
            lifes--;
        }
        console.log(element.correct_answer);
        console.log(answer);
    }
    const checkAnswer3 = () =>{
        let answer = document.getElementById("answer3").innerHTML
        answerCheck = 1;
        if(answer == element.correct_answer){
            document.getElementById("answer3").style.color = "#2ecc71";
            hiScore = hiScore + 100;
        }else{
            document.getElementById("answer3").style.color = "#e74c3c";
            lifes--;
        }
        console.log(element.correct_answer);
        console.log(answer);
    
    }
    const checkAnswer4 = () =>{
        let answer = document.getElementById("answer4").innerHTML
        answerCheck = 1;
        if(answer == element.correct_answer){
            document.getElementById("answer4").style.color = "#2ecc71";
            hiScore = hiScore + 100;
        }else{
            document.getElementById("answer4").style.color = "#e74c3c";
            lifes--;
        }
        console.log(element.correct_answer);
        console.log(answer);
    }
    
    document.getElementById("answer1").onclick = checkAnswer1;
    document.getElementById("answer2").onclick = checkAnswer2;
    document.getElementById("answer3").onclick = checkAnswer3;
    document.getElementById("answer4").onclick = checkAnswer4;
    }

    let timeleft = document.getElementById("countDown");
    timeleft.innerHTML = "30000";
    let seconds = document.getElementById("countDown").textContent;
    //debugger;
    let countdown = setInterval(function(){
        seconds--;
        timeleft.innerHTML = seconds;
         //console.log(seconds);
         if(answerCheck !==0){
            clearInterval(countdown);
            if(contador < allQuestionsAndAnswers[0].length){
            questionContainer.innerHTML = "";
            //debugger;
            createQuestions(allQuestionsAndAnswers[0][contador]);
            console.log(allQuestionsAndAnswers[0][contador]);
            contador++;
            }
        }
        else if(seconds <= 0) {
            clearInterval(countdown);
            lifes--;
            if(contador < allQuestionsAndAnswers[0].length){
            questionContainer.innerHTML = "";
            //debugger;
            createQuestions(allQuestionsAndAnswers[0][contador]);
            console.log(allQuestionsAndAnswers[0][contador]);
            contador++;
        }else{

            contador = 1;
            lifes = 5;
            hiScore = 0;
            questionContainer.innerHTML = "";
            allQuestionsAndAnswers.splice(0,allQuestionsAndAnswers.length);
            document.getElementById("init").style.display = "block"
            return document.getElementById('dialog-rounded').showModal();

        }
        }
    }, 1000);
};



//Continuar despues con oop 
/* class Quiz {
    constructor( questions = [] ){
        this.questions = questions;

    }
    buildQuestion(question){
        const questionContainer = document.createElement("div");
        const questionBody = document.createElement("div");
        const questionCategory = document.createElement("h5");
        const question = document.createElement("p");

        questionContainer.appendChild(questionBody);
        questionContainer.appendChild(questionCategory);
        questionCategory.appendChild(question);
    }
    renderQuestion(question){

    }
} */
//Para hacer despues