# front-ecommerce-bsale

El frontend esta realizado por HTML, CSS y JAVASCRIPT, en donde se ocupo boostrap para el diseño.

El sistema se compone de siguiente estructura:

```
├── css
│   └── styles.css
├── js
│   ├── Cart.js
│   └── main.js 
├── img
│   └── no-disponible.png
├── index.html
└── README.md
```


|      Archivo      |       Descripcion        | 
| ----------------- | ------------------------ | 
|   styles.css      | Archivo donde se mantiene todos los estilos asociados al archivo index.html  | 
|    Cart.js        | Archivo donde se genero la Clase Cart en donde se gestionar todos los metodos del carro de compras, tanto agregar,eliminar,disminuir producto y ademas vaciar el carro de compras                       | 
|    main.js        | Archivo en donde se maneja todas las interacciones dentro de la pagina, como la busqueda, paginacion, filtros |
|   index.html      | Archivo principal realizado en html5 con bootstrap  |


#JavaScript

***Cart***



|      Funcion      |       Valores Recibidos  |  Valor Retornado  |  Descripcion |      
| ----------------- | ------------------------ | ------------------|--------------|
| addProduct() | id,name,price,url_image | ninguno | Se obtiene el valor del carro de compras desde el localstorage para posteriormente realizar una busqueda por la id del producto, si encuentra esa id en el carro de compras solo suma una unidad del producto, en caso de que no exista el producto en el carro se agrega el producto al array y se actualiza el precio total y la cantidad de productos del carro para posteriormente actualizar el localstorage |
| removeProduct()| id,price | ninguno | Se recibe el id y el precio del producto removido y se genera un objeto, luego se obtiene el carro de compras del localstorage, se realiza una busqueda para ver si existe el producto, luego se valida la cantidad si es mayor que un producto solo se reduce la cantidad y se actualiza el precio total del carro, en caso de que exista solo un producto este se vuelve a filtra el carro de compra pero por los id que sean distintos para asi obtener el nuevo array sin el producto y posteriormente descontar el total de productos y el precio del total|
| removeItem()  |   id,price,quantity  | ninguno |      Se obtiene el id, price y la quantity se genera un objeto luego se obtiene el carro guardado del localstorage, se realiza una busqueda del producto por su id posteriormente se filtra el nuevo array con el carro de comrpas sin el item del producto y se actualiza el precio y la cantidad del total del carro, para luego actualizar el carro del localstorage|
|cleanCart | ninguno | ninguno | Se hace llamar al metodo updateLocalStorage() y se pasa un objeto vacio |
|updateLocalStore()| cart(objecto) | ninguno| Se obtiene un objeto de tipo carro de compras y se guarda en el localstorage y luego se llama al metodo loadCart() con el carro adentro|
|getLocalStore| ninguno | cart(objeto) | Se valida si ya existe el objeto carro en el localStorage y de lo contrario lo generara y luego retorna el carro de compras|
|loadCart()| cart(objecto) | ninguno | Se recibe un objeto de tipo carro en donde se realiza un map() para mostrar los productos en los div correspondiente con junto el precio total del carro de compras|
|loadInitCart()| ninguno| ninguno| Se carga el carro de compras con el metodo getLocalStorage() para pasarlo en una variable y luego designarlo en el loadCart()


***Main***

|      Funcion      |       Valores Recibidos  |  Valor Retornado  |  Descripcion |      
| ----------------- | ------------------------ | ------------------|--------------|
|getProduct()|ninguno|ninguno|Se realiza una pedicion hacia el backend con los productos para la pagina principal, luego de carga los metodos loadPagination() y loadProducts(). En caso de que la peticion genere un error se mostrara en un alerta .|
|getSearch() | Search| ninguno | Se obtiene el valor string del search y se genera una pedicion hacia el backend con los productos para la busqueda, luego de carga los metodos loadPagination() y loadProducts(). En caso de que la peticion genere un error se mostrara en un alerta .|
|setOrderBy| order_by | ninguno | Se obtiene el valor del orden y se valida si se ha realizado una busqueda para obtener el orden de esa busqueda de lo contrario se omite la busqueda y luego realiza una pedicion hacia el backend con los productos , luego de carga los metodos loadPagination() y loadProducts(). En caso de que la peticion genere un error se mostrara en un alerta. |
|setOrderDirection|ninguno|ninguno|Se obtiene el valor del orden, busqueda de obtener un null se omiten, luego se obtiene el valor de la direccion del orden, para asi realizar el anverso en la peticion al backend, en donde se valida si existen las categorias para ordenar dependiente solo de las categorias asociadas de lo contrario basarse en todos los productos|
|loadProducts ()|products |ninguno|Se recibe el objeto de todos los productos y se genera un map() para mostrar los productos en pantalla|
|loadPagination()| pagination,totalItem| ninguno|Se reciben el objeto pagination y el totalitem en donde se cargar un for dependiente del numero de paginas total para mostrar los numeros y luego se selecciona la pagina actual que viene en el objeto pagination|
|setPage()|page|ninguno|Se obtiene los filtros y la busqueda si es null el valor se omiten para posteriormente realizar una peticion al backend en donde por medio de la pagina seleccionada se obtienen los productos junto con los filtros si el caso corresponde|
|loadFilter()|ninguno|ninguno|Se cargan los filtro de la pagina y si se encuentra en la pagina principal se muestran el filtro de categoria de lo contrario se omitiria|
|handleOnChange()|target.value| ninguno|Se obtiene el valor seleccionado al cambiar el filtro y se llama a la funcion setOrdenBy() pasando el target.value|
|getCategory()|ninguno|ninguno|Se obtiene todas las categorias que se generan desde el backend en la peticion y se llama a la funcion loadMenu() con la respuesta|
|loadMenu()| data|ninguno|Se obtiene un array con las categorias y se genera un map() para mostrarlas en el menu principal|
|handleCategory()|name|ninguno| se cargan los productos de la categoria seleccionada por el nombre de la categoria y en la respuesta se llaman a los metodos loadPagination(), loadProducts(), loadFilter()|
|handleSearch()|ninguno|ninguno| Se obtiene el valor del input search y se llama al metodo getSearh() |
|closedCar()|ninguno|ninguno| se agregan clases al div para cerrar el carro de compras|
|openCart()|ninguno|ninguno| se agregan clases al div para abrir el carro de compras|