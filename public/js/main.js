function onSubmit(e){
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.getElementById("image").src = '';

    const prompt = document.getElementById("prompt").value;
    const size = document.getElementById("size").value;

    if(prompt === ''){
        alert("Please add some text");
        return;
    }

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt,size){
    try{
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt,
              size,
            })
        });

        if(!response.ok){
            hideSpinner();
            throw new Error("That image could not be generated");
        }

        const data = await response.json();
        //console.log(data);

        const imageUrl = data.url;

        document.getElementById("image").src = imageUrl;

        hideSpinner();
    } catch(err) {
        document.querySelector('.msg').textContent = err;
    }

}

function showSpinner(){
    document.querySelector('.spinner').classList.add("show");
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove("show");
}

document.getElementById("image-form").addEventListener("submit", onSubmit);