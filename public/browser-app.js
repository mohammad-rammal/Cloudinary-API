const url = '/api/v1/products';
const fileFormDOM = document.querySelector('.file-form');

const nameInputDOM = document.querySelector('#name');
const priceInputDOM = document.querySelector('#price');
const imageInputDOM = document.querySelector('#image');

const containerDOM = document.querySelector('.container');
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })

// Get the popup element
const popup = document.getElementById('popup');
const openPopupButton = document.getElementById('open-popup');
const closePopupButton = document.getElementById('close-popup');

// Function to open the popup
const openPopup = () => {
    popup.style.display = 'block';
};

// Function to close the popup
const closePopup = () => {
    popup.style.display = 'none';
};

// Event listener for opening the popup
openPopupButton.addEventListener('click', openPopup);

// Event listener for closing the popup
closePopupButton.addEventListener('click', closePopup);

// Close the popup if the user clicks anywhere outside of the popup
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup();
    }
});

imageInputDOM.addEventListener('change', async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
        const {
            data: {
                image: {src},
            },
        } = await axios.post(`${url}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        imageValue = src;
    } catch (error) {
        imageValue = null;
        console.log(error);
    }
});

fileFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameValue = nameInputDOM.value;
    const priceValue = priceInputDOM.value;
    try {
        const product = {name: nameValue, price: priceValue, image: imageValue};

        await axios.post(url, product);
        fetchProducts();
    } catch (error) {
        console.log(error);
    }
});

async function fetchProducts() {
    try {
        const {
            data: {products},
        } = await axios.get(url);

        const productsDOM = products
            .map((product) => {
                return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`;
            })
            .join('');
        containerDOM.innerHTML = productsDOM;
    } catch (error) {
        console.log(error);
    }
}

fetchProducts();
