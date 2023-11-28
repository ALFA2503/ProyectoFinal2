const users = [];

let ntfs = [];


function addUser() {
  let form = document.forms["miFormulario"];
  let email = form["correo"].value;
  let password = form["contrasena"].value;
  let name = form["nombre"].value;
  let confirmarContrasena = form["confirmarContrasena"].value;
  const storedUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
  const userInstances = storedUsers.map(
    (userData) => new Users(userData._name,userData._email, userData._password)
  );
  
  if (
    email.trim() === "" ||
    password.trim() === "" ||
    confirmarContrasena.trim() === ""||
    name.trim() === ""
  ) {
    alert("Por favor, complete todos los campos.");
  } else if (password !== confirmarContrasena) {
    alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
  } else if (userInstances.length < 1) {
    const newUser = new Users(name,email, password);
    users.push(newUser);
    localStorage.setItem("listUsers", JSON.stringify(users));
    alert("Usuario registrado exitosamente.");
    window.location.href = "../Login Page/login.html";
  } else {
    const newUser = new Users(name,email, password);
    userInstances.push(newUser);
    localStorage.setItem("listUsers", JSON.stringify(userInstances));
    
    alert("Usuario registrado exitosamente.");
   window.location.href = "../Login Page/login.html";
  }
}


function validUser() {
  
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const email = emailInput.value;
  const password = passwordInput.value;
  const storedUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
  const userInstances = storedUsers.map(
    (userData) => new Users(userData._name , userData._email, userData._password )
  );

  if (!userInstances || userInstances.length === 0) {
    alert("No hay usuarios registrados.");
    return;
  } 
  const foundUserIndex = userInstances.findIndex(
    (user) => user.email === email
  );

  if (foundUserIndex !== -1) {
    if (userInstances[foundUserIndex].password === password) {
      alert("Inicio de sesión exitoso.");
      userInstances[foundUserIndex].isActive = true;
      localStorage.setItem("listUsers", JSON.stringify(userInstances));
      window.location.href = " ../Main Page/main.html";
    } else {
      alert("Contraseña incorrecta. Por favor, inténtelo de nuevo.");
    }
  } else {
    alert("Usuario no encontrado. Por favor, regístrese.");
  }
}


function agregarNtfsAlContenedor(ntfs, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  ntfs.forEach((pelicula) => {
    const div = document.createElement("div");
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar a favoritos";
    const botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Detalles";
    
    botonAgregar.style.marginRight = "10px"; 
    botonDetalles.style.marginRight = "10px"; 

    botonDetalles.addEventListener("click", () => {
      detallesNtf(pelicula);
    });

    botonAgregar.addEventListener("click", () => {
      agregarNtfsAlUsuario(pelicula);
    });
    div.innerHTML = `
      <img src="${pelicula.imagenSrc}" width="300" height="400" alt="NFT" href="${pelicula.enlace}" target="_blank">
      <div class="estrellas">
        <img src="${pelicula.estrellas}" width="32" alt="">
        <h3 style="color:white">${pelicula.nombre}</h3>
      </div>
    `;

    div.appendChild(botonAgregar);
    div.appendChild(botonDetalles);
    contenedor.appendChild(div);
  });
}
function detallesNtf(pelicula){
window.location.href = " ../Main Page/nft.html";
localStorage.setItem("details", JSON.stringify(pelicula));
}
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.endsWith("nft.html")) {
    const storedNft = JSON.parse(localStorage.getItem("details"));
   console.log(storedNft)
   document.getElementById("nameNtft").innerHTML = ` Nombre Nft :  ${  storedNft.nombre}`;
   document.getElementById("ubication").innerHTML = ` Ubicacion Imagen :  ${  storedNft.imagenSrc}`;
   document.getElementById("imageNft").src = storedNft.imagenSrc;
   

  }
});

function agregarNtfsAlUsuario(addNetfs) {
  const storedUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
  const userInstances = storedUsers.map((userData) => {
      const user = new Users(userData._name,userData._email, userData._password);
      user._ntfs = userData._ntfs; 
      user._isActive = userData._isActive; 
      return user;
    }
  );
  const foundUserIndex = userInstances.findIndex(
    (user) => user.isActive === true
  );
  
  if (foundUserIndex !== -1) {
    let found = false;
    const userNtfs = userInstances[foundUserIndex].obtenerNtfs();
    for (const ntf of userNtfs) {
      if(ntf.nombre === addNetfs.nombre){
          found = true;
          break;
      }
    }   
    if(!found){
      userInstances[foundUserIndex].agregarNtf(addNetfs); 
      localStorage.setItem("listUsers", JSON.stringify(userInstances));
      agregarNtfsFavoritos("favoritas");
    }else {
      alert("ya agregaste este nft a tus favoritos ");
    }

    
  } 
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.endsWith("favs.html")) {
    agregarNtfsFavoritos("estreno");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.endsWith("profile.html")) {
    const storedUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
    const userInstances = storedUsers.map((userData) => {
      const user = new Users(userData._name,userData._email, userData._password);
      user._ntfs = userData._ntfs; 
      user._isActive = userData._isActive; 
      return user;
    });
    const foundUserIndex = userInstances.findIndex(
      (user) => user.isActive === true
    );
    document.getElementById("nombre").innerHTML = `Nombre de Usuario :  ${  userInstances[foundUserIndex].name}`;
    document.getElementById("email").innerHTML = `Correo Electronico :  ${  userInstances[foundUserIndex].email}`;
  }
});


document.addEventListener("DOMContentLoaded", async function () {
  if (window.location.href.endsWith("main.html")) {
    await utilizarGetNtfs();
    agregarNtfsAlContenedor(ntfs, "populares");
    agregarNtfsFavoritos("favoritas");
  }
});


const getNtfs = async () => {
  try {
      const response = await fetch('https://raw.githubusercontent.com/ALFA2503/ProyectoFinal/main/datos.json?token=GHSAT0AAAAAACK3Z5JPHUSL6ET77OLOVJDAZLFL2PA');
      const ntfsData = await response.json();

      const ntfsList = ntfsData.map(ntfs => {
          return new Ntfs(
              ntfs.imagePath,
              ntfs.name,
              ntfs.iconPath,
              ntfs.pageUrl
          );
      });

      return ntfsList;
  } catch (error) {
      console.error('Error al obtener los NFTs:', error);
      return []; 
  }
};

async function utilizarGetNtfs() {
  try {
      const ntfsList = await getNtfs();
      ntfs = ntfs.concat(ntfsList);
      console.log(ntfs);
  } catch (error) {
      console.error('Error al obtener los NFTs:', error);
  }
}




function agregarNtfsFavoritos(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  const storedUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
  const userInstances = storedUsers.map((userData) => {
    const user = new Users(userData._name,userData._email, userData._password);
    user._ntfs = userData._ntfs; 
    user._isActive = userData._isActive; 
    return user;
  });
  const foundUserIndex = userInstances.findIndex(
    (user) => user.isActive === true
  );
  userInstances[foundUserIndex].obtenerNtfs().forEach((pelicula) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${pelicula.imagenSrc}" width="300" height="400" alt="NFT" href="${pelicula.enlace}" target="_blank">
      <div class="estrellas">
        <img src="${pelicula.estrellas}" width="32" alt="">
        <h3 style="color:white">${pelicula.nombre}</h3>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

