
//Clase Carro de comprar
class Cart {
    constructor() {
        // Se llama al loadinitcart para mostrar el carro cada vez que cargue el usuario
        this.loadInitCart()
    }

    //agrega el producto, con su id, name,price, url_image
    addProduct(id, name, price, url_image) {
        //paso los atributos a un objeto product
        const product = {
            id,
            name,
            price,
            url_image
        }
        //obtengo el carro del localstorage
        const cart = this.getLocalStorage()
        //busco el producto si ya se encuentra en el array del carro
        const find = cart.products.find((item) => item.id === product.id)
        if (find) {
            //si existe se le suma la cantidad
            ++find.quantity
        } else {
            //si no existe se agrega al carro el producto
            product['quantity'] = 1
            cart.products.push(product)
        }
        //se actualiza el total del carro de compra
        cart.total = cart.total + product.price
        //se aumenta el total de producto sumando uno en uno
        ++cart.totalProducts
        //se Actualiza el update del localstorage
        this.updateLocalStorage(cart)
    }

    //se remueve el producto por su id y el precio
    removeProduct(id, price) {
        const product = {
            id,
            price
        }
        const cart = this.getLocalStorage()
        const find = cart.products.find((item) => item.id === product.id)
        if (find) {
            if (find.quantity > 1) {
                //si la cantidad es mayor a 1 baja la cantidad del producto del carro
                --find.quantity
                //actualiza el total
                cart.total = cart.total - product.price
            }
            else {
                //si tiene un producto en la cantidad se elimina el producto por completo del array 
                cart.products = cart.products.filter((item) => item.id != product.id)
                //actualizacion del total precio
                cart.total = cart.total - product.price
            }
            //actualizacion del total de producto
            --cart.totalProducts
        }
        //actualizar el localstorage
        this.updateLocalStorage(cart)
    }

    //remover todos los productos de la misma id
    removeItem(id, price, quantity) {
        const product = {
            id,
            price,
            quantity
        }
        const cart = this.getLocalStorage()
        const find = cart.products.find((item) => item.id === product.id)
        if (find) {
            //se obtienene todos los productos distintos al array
            cart.products = cart.products.filter((item) => item.id != product.id)
            //se descuenta el total de precio del carrito de compra
            cart.total = cart.total - (product.price * product.quantity)
            //se descuenta la cantidad del total del carro de compra
            cart.totalProducts = cart.totalProducts - product.quantity
        }
        this.updateLocalStorage(cart)
    }

    //Se limpia el carro de compra
    cleanCart() {
        //se actualiza el carro de compra para eliminar y dejar en cero los productos
        this.updateLocalStorage({
            total: 0,
            totalProducts: 0,
            products: []
        })
    }

    //actualizacion del storage
    updateLocalStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.loadCart(cart)
    }

    //obtener el localstorage y si es nulo crea un elemento de carro
    getLocalStorage() {
        let cart = {};
        if (localStorage.getItem('cart') === null) {
            cart = {
                total: 0,
                totalProducts: 0,
                products: []
            };
        }
        else {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        return cart;
    }

    //cargar el carro al iniciar 
    loadCart(cart) {
        //obtener el html para modificarlo con el id
        var content_cart = document.querySelector('#content_cart')
        var quantity_cart = document.querySelector('#quantity-cart')

        let data = ''
        //de recorre el array del carro 
        cart.products.map((product) => {
            data = data + `  <div class="card mb-3" >
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img class="img_product_cart" src="${product.url_image}" alt="${product.name}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                    <h5 class="card-title name-cart">${product.name}</h5>
                                    <p class="card-text">Total: $${(product.quantity * product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                    <p class="card-text">Cantidad: <i class="far fa-minus-square icon-pointer" id="btn-minus" onclick="new Cart().removeProduct(${product.id},${product.price})" ></i><span class="number-quantity" >${product.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span> <i class="far fa-plus-square icon-pointer" id="btn-plus" onclick="new Cart().addProduct(${product.id},'${product.name}',${product.price},'${product.url_image}')" ></i></p>
                                    <p class="card-text" onclick="new Cart().removeItem(${product.id},${product.price},${product.quantity})" ><span class="text-delete">Eliminar</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>`
        })

        content_cart.innerHTML = ` <div class="offcanvas-header">
                                    <h5 id="offcanvasRightLabel">Carrito de Compras</h5><span class="text-clean" onclick="new Cart().cleanCart()">${cart.totalProducts > 0 ? 'Vaciar Carro' : ''}</span>
                                    <button type="button" class="btn-close text-reset" onclick="closedCart()"></button>
                                </div>
                                <div class="offcanvas-body">
                                    ${data}
                                    <div class="position-absolute bottom-0 end-0" id="footer-cart" > Total a Pagar $ ${cart.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </div>
                                </div>`

        quantity_cart.innerHTML = `${cart.totalProducts > 0 ? cart.totalProducts : '&nbsp'}`
    }

    loadInitCart() {
        //cargar el carro
        const cart = this.getLocalStorage()
        this.loadCart(cart)
    }

}

new Cart()






