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


#Cart

Funciones de la clase Cart

|      Funcion      |       Valores Recibidos  |  Valor Retornado  |  Descripcion |      
| ----------------- | ------------------------ | ------------------|--------------|
| addProduct() | id,name,price,url_image | ninguno | Se obtine el valor del carro de compras desde el localstorage para posteriormente realizar una busqueda por la id del producto, si encuentra esa id en el carro de compras solo suma una unidad del producto, en caso de que no exista el producto en el carro se agrega el producto al array y se actualiza el precio total y la cantidad de productos del carro para posteriormente actualizar el localstorage |
| removeProduct()| id,price | ninguno | Se recibe el id y el precio del producto removido y se genera un objeto, luego se obtiene el carro de compras del localstorage, se realiza una busqueda para ver si existe el producto, luego se valida la cantidad si es mayor que un producto solo se reduce la cantidad y se actualiza el precio total del carro, en caso de que exista solo un producto este se vuelve a filtra el carro de compra pero por los id que sean distintos para asi obtener el nuevo array sin el producto y posteriormente descontar el total de productos y el precio del total|