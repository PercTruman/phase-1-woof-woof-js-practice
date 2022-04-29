document.addEventListener('DOMContentLoaded', (e)=>{
    let dogs=[]
    let goodDogFilter = false
    let dogObjectsArray =[]

    fetch('http://localhost:3000/pups') 
        .then(res=>res.json())
        .then(dogs=>{
             makeDogSpans(dogs)
            dogObjectsArray.push(dogs)
            })

        function makeDogSpans(dogObjectsArray)
        {
            
                   
            dogObjectsArray.forEach(object=>{
                let dogBar =document.getElementById('dog-bar')
                let dogSpan =document.createElement('span')
                dogSpan.innerText=object.name
                dogSpan.addEventListener('click', ()=>showDogInfo(object))
                dogBar.append(dogSpan)
                
                
            })
        }

        const filterBtn = document.getElementById('good-dog-filter')
            filterBtn.addEventListener('click', (e)=>{
                goodDogFilter=!goodDogFilter
                console.log(dogObjectsArray)
               if(goodDogFilter){
                filterDogs(e,dogObjectsArray)
                }
            })
        
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

        function filterDogs(e,dogs){
            let key="isGoodDog"
            console.log(dogs.filter(dog=>dog[key]==true))
            e.target.innerText==='Filter good dogs: OFF' ? e.target.innerText ='Filter good dogs: ON':e.target.innerText='Filter good dogs: OFF'
        }
            
        })
        

        
        