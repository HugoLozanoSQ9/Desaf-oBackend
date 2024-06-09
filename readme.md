# User's / Post APIv1
Hola esta es la API funcional para postear y crear usuarios 
 
 ## Pasos para usar la API 

 ### Descarga de repositorio 

1. Primero que nada descargar el repo, te ubicas en una carpeta que desees y escribes la siguiente linea de ćodigo dentro de tu terminal 

```
$ git clone https://github.com/HugoLozanoSQ9/Desaf-oBackend ; cd Desaf-oBackend
```
Después la siguiente linea de código para abrir el studio code e instalar las dependencias 
```
$ npm i  ; touch .env ; code
```

2. Ingresar tus credenciales de tu base de datos .

Debes tener creada una base de datos de mongo desde atlas, y debes tener el link de conección


3. Ya que tienes los datos necesarios vas a ingresar a example.env y vas a copiar todas las variables de entorno, para después pegarlas en el archivo .env.

4. Vas a asignarle los valores correspondientes a las variables de entorno dentro de tu archivo .env correspondientes a tu link de conexion de atlas

### Ejecución de la API

1. Para comenzar a usar la api primero que nada deberás ejecutar el server, esto se hace ejecutando la siguiente linea de código.
```
$ npm run dev
```

2. Hecho esto tu servidor estará corriendo en: 
```
http://localhost:8080/
```

### Uso de la API para los usuarios

#### Crear usuarios

1. Para poder comenzar a usar la api debemos tener un sistema de peticiones HTTP, para el cual yo de momento estaré ocupando el Thunder Client.

2. Para poder crear un usuario debemos ingresar al método POST  y complementar con un /user  quedando de la siguiente manera.

```
http://localhost:8080/user
```

3. Hecho esto ahora debemos crear un archivo json en el body de la request teniendo el siguiente formato 

Es importante recalcar que todos los datos deberán ser de tipo de dato string
```
{
    "name":"nombre_deseado",
    "profilePic":"link_de_imagen_deseada",
    "email":"correode@ejemplo.com.mx",
    "password":"contraseña_de_ejemplo"
}
```

4. Como respuesta se proporcionará el id del usuario así como los datos que fueron llenados por parte de la solicitud HTTP

#### Obtener usuario por ID

1. Para poder obtener un usuario por ID, primero que nada debemos tener la id del usuario, y dado que en el paso anterior ya creamos un usuario y nos proporcionarón su Id ya solo sería cuestión de hacer uso de el.

2. Debemos complmentar al link del sever con /ID de la siguiente forma:


```
http://localhost:8080/user/894huif782oijfuhfer8u28934
```

3. Hecho esto ahora nos va a devolver el usuario completo, es importante destacar que la contraseña está cifrada, por lo que no es posible consultarla.

### Uso de la API en el Log-in 

1. Es importante tener una sesión activa o estar "logueados" para que podamos realizar / consltar / actualizar o eliminar los posts.

2. Para poder realizar nosotros un log-in debemos ingresar a: 

```
http://localhost:8080/auth/login
```
3. Establecer un método POST en nuestro Thunder Client y en el body de la solicitud HTTP escribir un JSON con la siguiente estructura:

```
{
    "email":"email_del_usuario@ejemplo.com",
    "password":"contraseña_del_usuario"
}
```

Es importante tomar en cuenta de que los usuarios deben poner un email y un password que existan dentro de la base de datos, dado que si no existen o si están incorrectos entonces no les proporcionará un token.

4. Una vez la solicitud halla sido correcta con un estatus de 200, entonces vamos a guardar este token proporcionado por que este token va a ser nuestra credencial de que ya nos hemos autenticado.

### Uso de la API para los posts 

#### Obtener todos los Posts

1. Para poder obtener todos los posts basta con ingresar la  siguiente URL

```
http://localhost:8080/posts
```
2. Hecho esto ahora solo hace falta hplicar el método GET y nos va a devolver un JSON con todos los Posts creados anteriormente.

3. Puedes hacer la busqueda de posts en específicos con el query param search que es solo agregarle un ?search=texto_a_buscar por ejemplo:

```
http://localhost:8080/posts?search=corru
```

Dado que el filtro está hecho con incluldes puedes poner solo parte de una palabra y si existe en base de datos te va a mostrar ese resultado

4. Para esta operación NO se require autenticación

#### Crear un Post

1. Para poder crear posts dentro de la API ahora debemos cambiar a la siguiente URL en el Thunder Client

```
http://localhost:8080/posts
```
2. Hecho esto ahora debemos de colocar el header de Authorization, y en el valor colocar el token proporcionado en el Log-in.

3. Ahora si podemos proceder con el body de la solicitud HTTP, debemos recordar que el método deberá ser de tipo POST. 

El body de la solicitud debe tener las siguientes caracterísitcas: 

```
{
    "title":"Titulo de ejemplo",
    "image":"Link de la imagen seleccionada por el usuario",
    "body":"Cuerpo del post deseado por el usuario",
    "user":"Id del usuario que lo creó" 
}
```

#### Actualizar un Post

1. Para poder Actualizar un Post debemos tener el ID 

2. Una vez tengamos el ID ahora si procedemos a ingresar a la sig. URL  agregandole un /id por ejemplo: 

```
http://localhost:8080/posts/5894794234dfdshfdih45
```

3. Ahora si podemos proceder con el body de la solicitud HTTP, debemos recordar que el método deberá ser de tipo PATCH. 

```
{
    "title":"Titulo modificado",
    "image":"Link de la imagen modificada",
    "body":"Cuerpo del post modificado",
}
```
4. Debemos recordar que por ser el método PATCH, tenemos la opción de modificar desde 1 elemento por ejemeplo, si solo quiero modificar el titulo se deberá mandar el JSON de esta forma. 

```
{
    "title":"Titulo modificado"
}
```
Es importante mencionar que no se deberá de modificar el usuario, pero en caso de que se intente entonces mostrará un error 409 

#### Eliminar algún post

1. Para poder eliminar algún post debemos de tener el ID del post 

2. Una vez tengamos el ID ahora si procedemos a ingresar a la sig. URL agregandole un  /id por ejemplo: 

```
http://localhost:8080/posts/5894794234dfdshfdih45
```
3. Colocamos el método DELETE y va a proceder a eliminar el post, en caso de que no exista el Post va a mandar un error 404 Post not Found

4. En caso de que se ejecute 2 veces el DELETE, es normal que muestre el error 404

