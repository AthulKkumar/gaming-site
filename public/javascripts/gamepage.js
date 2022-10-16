async function checkLvl(e){
     fetch('/snake')
    .then(res =>  res.status)
    .then(json => {
        console.log(json);
        

        let page = document.getElementById("page");
        page.innerHTML +=`<div class="alert alert-danger position-relative" role="alert">
        Need more points to play
    </div>`
    e.preventDefault();

        setTimeout(() => {
            page.innerHTML = ''
        }, 5000);
    
       
    });

    }