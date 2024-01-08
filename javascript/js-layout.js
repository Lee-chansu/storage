let question = document.getElementsByClassName('question');
let after = document.get

for(let i of question){
    i.addEventListener('click', function(){
        let answer = this.nextElementSibling;

        for(let j of question){
            if(i != j){
                j.nextElementSibling.style.maxHeight = null;
            }
        }

        if(answer.style.maxHeight){
            answer.style.maxHeight = null;
        }
        else{
            
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

    });
}