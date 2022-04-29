document.addEventListener('DOMContentLoaded',
    fetch('http://localhost:3000/pups') 
        .then(res=>res.json())
        .then(dogObjectsArray=>makeDogSpans(dogObjectsArray))
        )

        function makeDogSpans(dogObjectsArray){
            console.log(dogObjectsArray)
            dogObjectsArray.forEach(object=>{
                let dogBar =document.getElementById('dog-bar')
                let dogSpan =document.createElement('span')
                dogSpan.innerText=object.name
                dogSpan.addEventListener('click', ()=>showDogInfo(object))
                dogBar.append(dogSpan)
            })
        }
        
        


        function showDogInfo(dogInfo){
            let dogImage = document.createElement('img')
                dogImage.src =`${dogInfo.image}`
            let dogName = dogInfo.name
            let goodBadBtn = document.createElement('button')
                goodBadBtn.innerText = dogInfo.isGoodDog? 'Good Dog!': 'Bad Dog!'
                goodBadBtn.dataset.id = dogInfo.id
            let infoDiv = document.getElementById('dog-info')

            infoDiv.append(dogImage, dogName, goodBadBtn)
           
            goodBadBtn.addEventListener('click', (e)=>handleClick(e, dogInfo))
        }

       function handleClick(e, dogInfo){
          
            if(e.target.innerText==='Good Dog!'){
                e.target.innerText='Bad Dog!'
                dogInfo.isGoodDog = false
            }else{
                e.target.innerText='Good Dog!'
                dogInfo.isGoodDog = true
            }
           updateDogEntry(dogInfo)
        }

        function updateDogEntry(dogInfo){
        fetch(`http://localhost:3000/pups/${dogInfo.id}`,
            {
                method: 'PATCH',
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  isGoodDog:dogInfo.isGoodDog
                })
            } )} 
        

        
        