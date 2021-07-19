var alert = document.getElementById("alert");
function addUser() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;

  let ageInt = parseInt(age);

  //console.log(name)
  //console.log(name,ageInt,cpf,email)

  axios
    .post("https://transacoesapi.herokuapp.com/users",
    {
      name: name,
      cpf: cpf,
      email: email,
      age: ageInt,
    }
    )
    .then((response) => {
      console.log(response.data.msg);
      if (response.status === 200){
        alert.style.display = "block";
        setTimeout(() => 
        { alert.style.display = "none"; }, 4000)
      }
    })
    .catch((error) => {
      console.log(error.response.data.msg);
    });

  //return json;
}
