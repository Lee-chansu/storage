let star = document.getElementsByClassName('star')[0];
        let star2 = document.getElementsByClassName('star2')[0];

        let lunch = document.getElementsByClassName('lunch')[0];
        let lunch2 = document.getElementsByClassName('lunch2')[0];
        
        setInterval(() => {
            star.classList.toggle('off');
            star2.classList.toggle('off');
            lunch.classList.toggle('off');
            lunch2.classList.toggle('off');
        }, 1000);