const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");
const btnSubmit = document.getElementById("btnSubmit");

const divVillanos = document.getElementById("villanos");
const aVillanos = document.getElementById("aVillanos");

btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  let email = inputEmail.value;
  let password = inputPass.value;
  if (!email || !password) {
    alert("Complete datos...!!!");
    return;
  }
  console.log(email, password);
  const body = { email, password };

  let respuesta = await fetch("/api/sessions/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (respuesta.status >= 400) {
    let { error } = await respuesta.json();
    alert(error);
    return;
  } else {
    let datos = await respuesta.json();
    console.log(datos);
    alert(datos.payload);
 
  }
});

aVillanos.addEventListener("click", async (e) => {
  e.preventDefault();
  divVillanos.textContent = ``;

  let respuesta = await fetch("/api/villanos", {

  });
  if (respuesta.status >= 400) {
  
    divVillanos.textContent = respuesta.statusText;
  } else {
    let { villanos } = await respuesta.json();
    console.log(villanos);
    let ulVillanos = document.createElement("ul");
    villanos.forEach((villano) => {
      let li = document.createElement("li");
      li.textContent = villano.name;
      ulVillanos.append(li);
    });
    divVillanos.append(ulVillanos);
  }
});
