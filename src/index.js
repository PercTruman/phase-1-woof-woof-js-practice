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
                dogSpan.addEventListener('click', ()=>getDogInfo())
                dogBar.append(dogSpan)
            })
        }
        
        


        function getDogInfo(e){
            console.log('hi')
        }