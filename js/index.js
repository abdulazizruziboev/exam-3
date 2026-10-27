const box = document.querySelector("div");


function updateUi(array) {
    if(Array.isArray(array) && array.length > 0) {
        array.forEach(element=>{
            const title = document.createElement("h2");
            title.textContent = element?.title ?? "Noma'lum";   
            box.appendChild(title);
        })
    }
}

getItems();

async function getItems () {
    try{
        const response = await fetch("https://jsonbek.uz/api/posts?style=comedy");
        if(!response.ok) throw new Error("Ma'lumotni olsihda xatolik");
        const data = await response.json();
        updateUi(data);

    } catch(error) {
        console.log(error);
    }
}