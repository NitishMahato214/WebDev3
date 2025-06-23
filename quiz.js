// https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple//




const _question=document.getElementById('question');
const _options=document.querySelector('.quiz-options');
const _correctScore=document.getElementById('correct-score');
const _totalQuestion=document.getElementById('total-question');
const _checkBtn=document.getElementById('check-answer');
const _playAgainBtn=document.getElementById('play-again');
const _result=document.getElementById('result');

let correctAnswer='',correctScore=0,askedCount=0,totalQuestion=10;

function eventListners(){
    _checkBtn.addEventListener('click',checkAnswer);
    _playAgainBtn.addEventListener('click',restartQuiz);
}

document.addEventListener('DOMContentLoaded',()=>{
    loadQuestion();
    eventListners();
    _totalQuestion.textContent=totalQuestion;
    _correctScore.textContent=correctScore;

})




async function loadQuestion() {
    const APIurl='https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple';
    const result=await fetch(`${APIurl}`);

    const  data=await result.json();
    console.log(result);
    _result.innerHTML='';
    showQuestion(data.results[0]);
    
}

//display question and option

function showQuestion(data){
    _checkBtn.ariaDisabled=false;
    correctAnswer=data.correct_answer;
    let incorrectAnswer=data.incorrect_answers;
    let optionsList=incorrectAnswer;
    optionsList.splice(Math.floor(Math.random()*(incorrectAnswer.length+1)),0,correctAnswer);


    _question.innerHTML=`${data.question} <br> <span class="category">${data.category}</span>`;
    _options.innerHTML=`
    ${optionsList.map((option,index)=> `<li> ${index
        +1}.<span> ${option}</span> </li>`).join('')}
    `;

    selectOption();



}
//option selection

function selectOption(){
    _options.querySelectorAll('li').forEach((option)=>{
        option.addEventListener('click',()=>{
            if(_options.querySelector('.selected')){
                const activeOption=_options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
    console.log(correctAnswer);


};

//answer checking

function checkAnswer(){
    _checkBtn.ariaDisabled=true;
    if(_options.querySelector('.selected')){//disable
        let selectedAnswer=_options.querySelector('.selected span').textContent;
        if(selectedAnswer.trim()==HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML=`<p> <i class="fas fa-check"></i>Correct Answer!</p>`;
        }else{
            _result.innerHTML=`<p> <i class="fas fa-times"></i>Incorrect Answer!</p> <p> <small> <b> Correct Answer: </b> ${correctAnswer}</small></p>`;
        }
        checkCount();
    }else{
        _result.innerHTML=`<p><i class="fas fa-question"></i>Please select an option! </p>`;
        _checkBtn.ariaDisabled=false;
    };

};



function HTMLDecode(textString){
    let doc=new DOMParser().parseFromString(textString,"text/html");
    return doc.documentElement.textContent;
};
function checkCount(){
    askedCount++;
    setCount();
    if(askedCount==totalQuestion){
        _result.innerHTML+=`<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display="block";
        _checkBtn.style.display="none";

    }else{
        setTimeout(()=>{
            loadQuestion()
        },300);
    };
};
function setCount(){
    _totalQuestion.textContent=totalQuestion;
    _correctScore.textContent=correctScore;
};


function restartQuiz(){
    correctScore=askedCount=0;
    _playAgainBtn.style.display="none";
    _checkBtn.style.display="block";
    _checkBtn.ariaDisabled=false;
    setCount();
    loadQuestion();

}

