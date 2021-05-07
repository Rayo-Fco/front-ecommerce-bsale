var category = ''

let pagination = {
    totalItem: '',
    currentPage: '',
    nextPage: '',
    previousPage: '',
    totalPage: ''
}


//obtener los queryparams
const params = new URLSearchParams(window.location.search)
const categoria = params.get('categoria')
document.getElementById('search').value = ""
//obtener el los productos
const getProduct = () => {
    //gestionar la respuesta al backend
    fetch(`https://api.zarapito.xyz`)
        .then(res => res.json())
        .then(({ data, totalItem, totalPage, currentPage, nextPage, previousPage }) => {
            //cargar los datos de la respuesta y llamar a las funciones de productos y paginacion
            pagination = {
                totalItem,
                totalPage,
                currentPage,
                nextPage,
                previousPage
            }
            loadPagination(pagination, data.length)
            loadProducts(data)
        })
        .catch(err => {
            alert("Tenemos problemas disculpa", err)
            console.log(err)
        })
}

const getSearch = (search)=>{
    category = ''
     //gestionar la respuesta al backend
     fetch(`https://api.zarapito.xyz?search=${search}`)
     .then(res => res.json())
     .then(({ data, totalItem, totalPage, currentPage, nextPage, previousPage }) => {
         //cargar los datos de la respuesta y llamar a las funciones de productos y paginacion
         pagination = {
             totalItem,
             totalPage,
             currentPage,
             nextPage,
             previousPage
         }
         loadPagination(pagination, data.length)
         loadProducts(data)


     })
     .catch(err => {
         alert("Tenemos problemas disculpa", err)
         console.log(err)
     })
}

const setOrderBy = (order_by)=>{
    const search = document.getElementById('search').value
    //gestionar la respuesta al backend
    fetch(`https://api.zarapito.xyz${category.length > 0? `/category/${category}?`:'?'}${search.trim() && search.length > 2? `&search=${search} `:''}&order_by=${order_by}`)
    .then(res => res.json())
    .then(({ data, totalItem, totalPage, currentPage, nextPage, previousPage }) => {
        //cargar los datos de la respuesta y llamar a las funciones de productos y paginacion
        pagination = {
            totalItem,
            totalPage,
            currentPage,
            nextPage,
            previousPage
        }
        loadPagination(pagination, data.length)
        loadProducts(data)


    })
    .catch(err => {
        alert("Tenemos problemas disculpa", err)
        console.log(err)
    })
    

}

const setOrderDirection = ()=>{
    const direction_desc = document.getElementsByClassName('fas fa-sort-amount-down-alt').length === 1
    const search = document.getElementById('search').value
    const order_by = document.getElementById('select_orden').value

    //gestionar la respuesta al backend
    fetch(`https://api.zarapito.xyz${category.length > 0? `/category/${category}?`:'?'}${search.trim() && search.length > 2? `&search=${search.trim()}`:'' }&order_by=${order_by.trim()}&order_direction=${direction_desc? 'desc': 'asc'}`)
    .then(res => res.json())
    .then(({ data, totalItem, totalPage, currentPage, nextPage, previousPage }) => {
        //cargar los datos de la respuesta y llamar a las funciones de productos y paginacion
        pagination = {
            totalItem,
            totalPage,
            currentPage,
            nextPage,
            previousPage
        }
        loadPagination(pagination, data.length)
        loadProducts(data)
        if(direction_desc){
            document.getElementById('icon').className= 'fas fa-sort-amount-up-alt'
        }
        else{
            document.getElementById('icon').className= 'fas fa-sort-amount-down-alt'
        }

    })
    .catch(err => {
        alert("Tenemos problemas disculpa", err)
        console.log(err)
    })

   
    

}

const loadProducts = (products) => {
    var content_product = document.querySelector('#content_product')
    content_product.innerHTML = ''
//mostrar los productos en pantalla
    if (products && products.length > 0) {
        products.map(product => {
            content_product.innerHTML += `
                        <div class="col w-400">
                        <div class="card">
                            <img src="${product.url_image && product.url_image.length > 5 ? product.url_image : 'https://zarapito.xyz/img/no-disponible.png'}" class="card-img-top img_product" alt="${product.name}">
                            <div class="card-body">
                            <h6 class="card-title"><b>${product.name}</b></h6>
                            <h6>${parseInt(product.discount) > 0 ? `Ahora  <span class='sale'>$${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${product.discount}% dto.</span>` : `${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}  </h6>
                            <h8>${parseInt(product.discount) > 0 ? `<span class='price_after'> Antes: $${Math.round((parseInt(product.price) * 100) / (100 - parseInt(product.discount))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </span>` : '&#160'}</h8></br>
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button type="button" class="btn btn-outline-primary" onclick="new Cart().addProduct(${product.id},'${product.name}',${product.price},'${product.url_image && product.url_image.length > 5 ? product.url_image : 'https://zarapito.xyz/img/no-disponible.png'}')">Añadir <i class="fas fa-cart-plus icon-pointer" ></i> </button>
                            </div>
                            </div>
                        </div>
                        </div>
                        `
        })
       
    } else {
        content_product.innerHTML += `<div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">Lo sentimos</h5>
                                            <p class="card-text">No se ha encontrado ningun producto</p>
                                            <a href="https://${window.location.hostname}" class="btn btn-primary">Volver al inicio</a>
                                        </div>
                                        </div>`
    }

}
//cargar paginacion dependiente de la respuesta de los productos
const loadPagination = (pagination, totalItem) => {
    const content_pagination = document.querySelector('#content_pagination')
    content_pagination.innerHTML = ''
    let page = ''
    for (let index = 1; index <= pagination.totalPage; index++) {

        if (index === pagination.currentPage) {
            page = page + ` <li class="page-item active" aria-current="page">
                                            <span class="page-link">${index}</span>
                                        </li>
                                            `
        } else {
            page = page + `<li class="page-item"><a class="page-link" onclick="setPage(${index})">${index}</a></li>`
        }
    }
    if (totalItem > 0) {
        content_pagination.innerHTML += `
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        ${!pagination.previousPage ? '' : `<li class="page-item ${!pagination.previousPage ? 'disabled' : ''}">
                                                            <a class="page-link" onclick="setPage(${pagination.previousPage})" tabindex="-1" aria-disabled="true">Anterior</a>
                                                        </li>`}
                        
                        ${page}
                        ${!pagination.nextPage ? '' : `<li class="page-item ${!pagination.nextPage ? 'disabled' : ''}">
                                                        <a class="page-link" onclick="setPage(${pagination.nextPage})">Siguiente</a>
                                                    </li>`}
                        
                    </ul>
                </nav>
                `
    }

}

const setPage = (page)=>{
    const direction_desc = document.getElementsByClassName('fas fa-sort-amount-down-alt').length === 1
    const search = document.getElementById('search').value
    const order_by = document.getElementById('select_orden').value
    //gestionar la respuesta al backend
    fetch(`https://api.zarapito.xyz${category.length > 0? `/category/${category}?`:'?'}${search.trim() && search.length > 2? `&search=${search} `:''}&order_by=${order_by}&direction_desc=${direction_desc? direction_desc : 'asc'}&page=${page}`)
    .then(res => res.json())
    .then(({ data, totalItem, totalPage, currentPage, nextPage, previousPage }) => {
        //cargar los datos de la respuesta y llamar a las funciones de productos y paginacion
        pagination = {
            totalItem,
            totalPage,
            currentPage,
            nextPage,
            previousPage
        }
        loadPagination(pagination, data.length)
        loadProducts(data)


    })
    .catch(err => {
        alert("Tenemos problemas disculpa", err)
        console.log(err)
    })
    

}

//funcion para cargar los filtros
const loadFilter = () => {
    const content_filter = document.querySelector('#content_filter')
    content_filter.innerHTML= ''
    content_filter.innerHTML += `
                <div class="d-flex filter">
                <span>Ordenar por</span>
                <select class="form-select form-select-sm select-class" aria-label=".form-select-sm example" id='select_orden' onchange='handleOnChange(this)'>
                    <option disabled>Seleccione el orden</option>
                    <option value="name" selected>Nombre</option>
                    ${category.length > 0? '': `<option value="category" >Categoria</option>`}
                    <option value="price" >Precio</option>
                    <option value="discount" >Descuento</option>
                </select>
               

                <span id='icon_order'>
                      <i id="icon" class="fas fa-sort-amount-down-alt" onclick="setOrderDirection()"></i>
                </span>
                </div>
                `

}

//redirigir hacia la pagina por filtro dependiendo del orden
const handleOnChange = ({ value }) => {
   setOrderBy(value)
}
 
//obtener categorias para mostrarlas en el menu
const getCategory = () => {
    fetch(`https://api.zarapito.xyz/categories/all`)
        .then(res => res.json())
        .then((data) => {
            loadMenu(data)
        })
        .catch(err => {
            alert("Problema en la conexion con la base de datos", err)
            console.log(err)
        })
}

//Cargar categorias en la cabezera 
const loadMenu = (data) => {
    const content_menu = document.querySelector('#content_menu')
    let menu = ''
    data.map(({ name }) => {
        menu = menu + `<li><a class="dropdown-item" onclick="handleCategory('${name}')" >${name}</a></li>`
    })

    content_menu.innerHTML += `<li class="nav-item dropdown" style="list-style: none;">
                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Categorias</a>
                                    <ul class="dropdown-menu">
                                     ${menu}
                                    </ul>
                                </li>`
}

const handleCategory = (name)=>{
    category = name
    //gestionar la respuesta al backend
    fetch(`https://api.zarapito.xyz/category/${name}`)
    .then(res => res.json())
    .then(({ data, totalItem, totalPage, currentPage, nextPage, previousPage }) => {
        //cargar los datos de la respuesta y llamar a las funciones de productos y paginacion
        pagination = {
            totalItem,
            totalPage,
            currentPage,
            nextPage,
            previousPage
        }
        loadPagination(pagination, data.length)
        loadProducts(data)
        loadFilter()


    })
    .catch(err => {
        alert("Tenemos problemas disculpa", err)
        console.log(err)
    })
}

//buscar los productos
const handleSearch = () => {
    const value = document.getElementById('search').value
    if(value.trim()){
        getSearch(value)
    }
    
}

//cada vez que se precione enter en la busqueda realice la busqueda
document.getElementById("search")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            handleSearch()
        }
 });


    // cerrar ventana del carro
const closedCart  = ()=>{
    document.getElementById("black-cart").className = "hide";
    document.getElementById("cart-shopping").className = "hide";
}

//abrir venta del carro

const openCart = ()=>{
    document.getElementById("black-cart").className = " show";
    document.getElementById("cart-shopping").className = " show";
}
getProduct()
getCategory()
loadFilter()