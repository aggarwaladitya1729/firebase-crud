
const cafeList = document.getElementById('cafe-list') ;
const form = document.getElementById('add-cafe-form') ;


function renderCafe(doc){
    let li = document.createElement('li') ;
    let name = document.createElement('span') ;
    let city = document.createElement('span') ;
    let cross = document.createElement('div') ;

    li.setAttribute('data-id' , doc.id) ;
    name.textContent = doc.data().name ;
    city.textContent = doc.data().city ;
    cross.textContent = 'x' ;

    li.appendChild(name) ;
    li.appendChild(city) ;
    li.appendChild(cross) ;
    
    cafeList.appendChild(li) ;

    // Delete Data
    cross.addEventListener('click' , (e) => {
        e.stopPropagation() ;
        let id = e.target.parentElement.getAttribute('data-id') ;
        db.collection('cafes').doc(id).delete() ;
    })
}

// Getting data
db.collection('cafes').get()  // it will get all the documents of the collection specified
.then((snapshot) => {         // returns a promise i.e. jab data aa jayega tab kya karna hai jab tak data nahi aata tab tak yahin ruka rahega
    //console.log(snapshot.docs) ;
    snapshot.docs.forEach(doc => {
        console.log(doc , doc.data()) ; // .data() will get all fields of the document
        renderCafe(doc) ;
    });
})

// Sending or Adding Data
form.addEventListener('submit' , (e) => {
    e.preventDefault() ; // prevents loading page which is default 
    db.collection('cafes').add({
        name  : form.name.value ,
        city : form.city.value ,
    })
    form.name.value = "" ;
    form.city.value = "" ;
})

