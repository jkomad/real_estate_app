//Users can add and remove objects from an array by creating input elements
//Practice creating an element on the page using input from the text input fields

//Each listing will be an instance of the listing class. Reusable code that allows me to render a new listing and display it on the DOM

//JS maintains an array of listings

const body = document.querySelector('body')
const imageSrcs = ['assets/images/house1.webp', 'assets/images/house2.webp', 'assets/images/house3.webp', 'assets/images/house4.webp', 'assets/images/house5.webp']
const listings = []

function randomImg(array) {
    return array[Math.floor(array.length * Math.random())]
}

class Listing {
    constructor(address, property, city, state) {
        //What am I going to need???
        //Going to need to add a delete button to each listing
        this.address = address
        this.property = property
        this.city = city
        this.state = state
        this.comment = ''
        //Where do we get these values? From user input once the button is clicked
    }
    //Need any functions?
    //We're going to need to render, but maybe, we'll have this be in a separate class???
}

class Render {
    constructor(obj) {
        this.obj = obj
        //Gonna need an object 
    }
    createEle() {
        // const testListings = document.querySelectorAll('.listing')
        //Create an overarching div and append to the body as a child element
        //Create subsequent divs that hold the listing info
        const listingsEle = document.querySelector('.listings')
        const listing = document.createElement('div')
        const image = document.createElement('img')
        const address = document.createElement('h1')
        const property = document.createElement('h2')
        const city = document.createElement('h2')
        const state = document.createElement('h2')
        const comment = document.createElement('input')
        const postBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')

        //Assign values
        listing.classList.add('listing')
        image.setAttribute('src', this.obj.imgSrc)
        address.innerText = this.obj.address
        property.innerText = this.obj.property
        city.innerText = this.obj.city
        state.innerText = this.obj.state
        comment.type = 'text'
        comment.classList.add('comment')
        comment.placeholder = 'Leave a comment...'
        comment.value = this.obj.comment
        postBtn.classList.add('post')
        postBtn.innerText = 'Post'
        deleteBtn.classList.add('deleteBtn')
        deleteBtn.innerText = 'Delete Listing'


        //Add event listener to post buttons so that the comment.innerText of any given listing is edited to the current value of the comment input box. Listing object will also be adjusted (add comment property)
        postBtn.addEventListener('click', () => {
            const listingsEleChildren = listingsEle.childNodes
            for (const entry of listingsEleChildren.entries()) {
                if (listing.innerHTML === entry[1].innerHTML) {
                    const listingEleChildren = listing.childNodes
                    for (const entry2 of listingEleChildren.entries()) {
                        if (entry2[0] === 5) {
                            //Edit the listing object
                            listings[entry[0]].comment = entry2[1].value
                            //Re-render entire DOM
                            listingsEle.innerHTML = ''
                            listings.map((listing) => {
                                new Render(listing).createEle()
                            })
                        }
                    }
                }
            }
        })
        //Add event listener to deleteBtn so that instance will run function if clicked
        //Deleting an element should re-render the entire array of listings 
        deleteBtn.addEventListener('click', () => {
            const listingsEleChildren = listingsEle.childNodes
            for (const entry of listingsEleChildren.entries()) {
                if (listing.innerHTML === entry[1].innerHTML) {
                    // Remove entry from array 
                    listings.splice(entry[0], 1)
                    //Remove element from DOM
                    listingsEle.removeChild(listingsEleChildren[entry[0]])
                    //Re-render entire DOM
                    listingsEle.innerHTML = ''
                    listings.map((listing) => {
                        new Render(listing).createEle()
                    })
                }
            }
        })

        //Append elements/Replace existing elements???
        listing.append(image,address,property,city,state,comment, postBtn,deleteBtn)
        listingsEle.appendChild(listing)
    }
}

//Render function should run for each element (object) within an array 

const add = document.querySelector('#add')
add.addEventListener('click', () => {
    const address = document.querySelector('#address').value
    const property = document.querySelector('#property').value
    const city = document.querySelector('#city').value
    const state = document.querySelector('#state').value
    
    //Call the class to create a new listing instance
    const listing = new Listing(address,property,city,state)
    listing.imgSrc = randomImg(imageSrcs)

    //Check if valid user input
    if (address === '' || property === '' || city === '' || state === '') {
        console.log('Invalid Entry!')
    }
    else {
        listings.push(listing)

        //Empty out the parent container prior to creating and adding elements
        const listingsEle = document.querySelector('.listings')
        listingsEle.innerHTML = ''

        //Run a map function, so that a new render of the screen runs the createEle function on every listing within the listings array
        listings.map((listing) => {
            new Render(listing).createEle()
        })
        //Clear input text fields
        document.querySelector('#address').value = ''
        document.querySelector('#property').value = ''
        document.querySelector('#city').value = ''
        document.querySelector('#state').value = ''
    }
})
