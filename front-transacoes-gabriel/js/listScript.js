var data;
const link = "https://transacoesapi.herokuapp.com"
window.addEventListener("load", () => {
  //Todos os elementos do DOM e scripts estão disponiveis
  //http://localhost:3000/users
  axios.get(link + "/users").then((resposta) => {
    //console.log(resposta.data.User);
    //data vai carregar o dados para outras functions
    data = resposta.data.User;
    listLoad(data);
    //datas(data)
  });
});


var list = document.getElementById("list");
//função load a lista sempre q necessario
function listLoad(data) {
  //GET /users
  list.innerHTML = "";
  //<td id="num${prop}"><strong>${prop}</strong></td> class="col-7"
  let novoConteudo = "";
  data.forEach((user) => {
    //Linha de um Usuario
    novoConteudo += `<tr>
                <td>${user.name}</td>
                <td>${user.cpf}</td>
                <td>${user.age} </td>
                <td>${user.email}</td>
                <td>
                    <button onclick="transactionsUser(${user.id})" id="trans-${user.id}" 
                    type="button" class="btn btn-success"
                    data-toggle="modal" data-target="#exampleModal">
                    Trans.
                    </button>
                    <button onclick="editUser(${user.id})" id="edit-${user.id}" 
                    type="button" class="btn btn-info"
                    data-toggle="modal" data-target="#exampleModal">
                    Editar
                    </button>
                    <button onclick="delUser(${user.id},'${user.cpf}')" id="del-${user.id}" 
                    type="button" class="btn btn-danger"
                    data-toggle="modal" data-target="#exampleModal">
                    Excluir
                    </button>
                </td>
                </tr>`;
  });

  list.innerHTML = novoConteudo;
}

//console.log("2",data)

var tituloModal = document.getElementById("tituloModal");
var bodyModal = document.getElementById("bodyModal");
var footerModal = document.getElementById("footerModal");
function editUser(editId) {
  //deleteId = obj.id.split("-")[1];
  //console.log(editId);
  tituloModal.innerHTML = `Editar <strong>Cliente</strong>`;
  //console.log(data);
  user = data.find((f) => {
    return f.id === editId;
  });
  editbodyModal = `<section class="container">
                    <div id="forms">
                      <div class="col-md-8">
                        <label for="name" class="form-label">Nome</label>
                        <input type="text" id="name" class="form-control" value="${user.name}"/>
                      </div>
                      <div class="col-md-8">
                        <label for="age" class="form-label">Idade</label>
                        <input type="text" id="age" class="form-control" value="${user.age}"/>
                      </div>
                      <div class="col-md-8">
                        <label for="cpf" class="form-label">CPF</label>
                        <input type="text" id="cpf" class="form-control" value="${user.cpf}"/>
                      </div>
                      <div class="col-md-8">
                        <label for="email" class="form-label">email</label>
                        <input type="text" id="email" class="form-control"value="${user.email}" />
                      </div>
                    </div>
                  </section> `;  

  editFooterModal = `<button type="button" 
                    onclick="btnEditUser(${user.id})" 
                    class="btn btn-info">
                      Editar Usuario
                    </button>
                    <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    >
                    Close
                    </button>`;

  //cria outro file e criar outro function e button edit com axios.PUT
  bodyModal.innerHTML = editbodyModal;
  footerModal.innerHTML = editFooterModal
}

async function transactionsUser(editId) {
  //deleteId = obj.id.split("-")[1];
  //console.log(editId);
  tituloModal.innerHTML = `Editar/Ver <strong>Transações</strong>`;
  //console.log(data);
  // encontrar o registro
  const indiceUser = data.findIndex((f) => {
    return f.id === editId;
  });

  //console.log(indiceUser);
  // user = data.find((f) => {
  //   return f.id === editId;
  // });

  const transactions = data[indiceUser].transactions;

  //console.log(transactions);

  let transbodyModal = "";
  transbodyModal += `<section class="container">
                    <div id="forms">
                      <div class="col-md-8">
                        <label for="title" class="form-label">Titulo</label>
                        <input type="text" id="title" class="form-control" value=""/>
                      </div>
                      <div class="col-md-8">
                        <label for="value" class="form-label">Valor</label>
                        <input type="text" id="value" class="form-control" value=""/>
                      </div>
                      <div class="col-md-8">
                        <label for="type" class="form-label">Tipo</label>
                        <input type="text" id="type" class="form-control" 
                        placeholder="income or outcome" value=""/>
                      </div>
                      <div class="row mt-2 mb-2 mx-2">
                        <button id="btnAddTrans" type="button" 
                        onclick="btnAddTrans(${data[indiceUser].id})" class="mx-3 btn btn-primary">
                          Salvar Trans.
                        </button>
                        <button id="btnEditTrans" type="button" 
                        onclick="btnEditTrans()" class="mx-3 btn btn-success">
                          Editar Trans.
                        </button>
                        <button id="btnDelTrans" type="button" 
                        onclick="btnDelTrans()" class="mx-3 btn btn-danger">
                          Deletar Trans.
                        </button>
                        <button id="btnCancelTrans" type="button" 
                        onclick="btnCancelTrans()" class="mx-3 btn btn-info">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </section> `;

    let transTable = "";
    transTable += `<table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Titulo</th>
                          <th>Valor</th>
                          <th>Tipo</th>
                          <th>Comandos</th>
                        </tr>
                      </thead>
                      <tbody>`;
    transactions.forEach((trans) => {
      //Linha de um Trans.
      transTable += `<tr>
                  <td id='title-${trans.id}'>${trans.title}</td>
                  <td id='value-${trans.id}'>${trans.value}</td>
                  <td id='type-${trans.id}'>${trans.type}</td>
                  <td>
                  <button type="button" 
                    onclick="btnToEditTrans('${data[indiceUser].id}-t-${trans.id}')" 
                    class="btn btn-info mx-1">
                      Editar
                  </button>
                  <button type="button" 
                    onclick="btnToDelTrans('${data[indiceUser].id}-t-${trans.id}')" 
                    class="btn btn-danger mx-1">
                      Deletar
                  </button>
                  </td>  
                  </tr>`;
    });
    // transTable += `</tbody>
    //                 </table>`;

    transbodyModal += transTable;

    let balance = [];
    try {
      const response = await axios.get(link + "/user/" + editId + "/transactions")
      balance = response.data.balance
    } catch (error) {
      console.log(error)
    }

    // console.log(balance)
    // console.log(balance.total)

    let totalBalance = "";
    
    totalBalance += `<tr>
                    <td colspan="2"></td>
                    <td><strong>Entrada:</strong></td>
                    <td>${balance.income}</td>
                    </tr>
                    <td colspan="2"></td>
                    <td><strong>Saida:</strong></td>
                    <td>${balance.outcome}</td>
                    <tr>
                    <td colspan="2"></td>
                    <td><strong>Total:</strong></td>
                    <td><strong>${balance.total}</strong></td>
                    </tr>`;
    totalBalance += `</tbody>
                    </table>`;

    transbodyModal += totalBalance;

    transFooterModal = `<button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    >
                    Close
                    </button>`; 

  bodyModal.innerHTML = transbodyModal;

  
  var btnDelTrans = document.getElementById("btnDelTrans");
  btnDelTrans.style.display = "none";
  var btnEditTrans = document.getElementById("btnEditTrans");
  btnEditTrans.style.display = "none";
  var btnCancelTrans = document.getElementById("btnCancelTrans");
  btnCancelTrans.style.display = "none";

  footerModal.innerHTML = transFooterModal
}

//var deleteId ='';
// Passar CPF ele faz conta de matematica antes de usar a variavel
function delUser(deleteId,cpf) {
  //console.log(deleteId);
  //cpfString = cpf.toString();
  // console.log(cpfString);

  tituloModal.innerHTML = `Confirmação de Exclusão do <strong>Item</strong>`;
  bodyModal.innerHTML = `Tem certeza ? Não poderá ser recupado o <strong>Usuario(a) CPF: ${cpf}</strong> no futuro.`;
  delFooterModal = `<button type="button" 
                    onclick="btnDeleteUser(${deleteId})" 
                    class="btn btn-danger">
                      Deletar Usuario
                    </button>
                    <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    >
                    Close
                    </button>`;
  footerModal.innerHTML = delFooterModal
  
}

function btnEditUser(id) {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;

  let ageInt = parseInt(age);

  //console.log(name);

  axios
    .put(link + "/users/" + id, {
      name: name,
      cpf: cpf,
      email: email,
      age: ageInt,
    })
    .then((response) => {
      console.log(response.data.msg);
      location.reload();
    })
    .catch((error) => {
      console.log(error.response.data.msg);
      //location.reload();
    });
}

function btnDeleteUser(id) {
  axios
    .delete(link + "/users/" + id )
    .then((response) => {
      console.log(response.data.msg);
      location.reload();
    })
    .catch((error) => {
      console.log(error.response.data.msg);
      //location.reload();
    });
}

function btnAddTrans(userId) {
  let title = document.getElementById("title").value;
  let value = document.getElementById("value").value;
  let type = document.getElementById("type").value;
  let valueInt = parseInt(value);

  //console.log(title);

  axios
    .post(link + "/user/" + userId + "/transactions", {
      title: title,
      value: valueInt,
      type: type,
    })
    .then((response) => {
      console.log(response.data.msg);
      setTimeout(() => 
        { location.reload(); }, 1000);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
      // setTimeout(() => 
      //   { location.reload(); }, 1000);
    });
}

var userIdPlusTransId = [];

function btnToEditTrans(ids) {
  userIdPlusTransId = ids.split("-t-")
  var btnAddTrans = document.getElementById("btnAddTrans");
  btnAddTrans.style.display = "none";
  var btnDelTrans = document.getElementById("btnDelTrans");
  btnDelTrans.style.display = "none";
  var btnEditTrans = document.getElementById("btnEditTrans");
  btnEditTrans.style.display = "block";
  var btnCancelTrans = document.getElementById("btnCancelTrans");
  btnCancelTrans.style.display = "block";
  //console.log(userIdPlusTransId)
  var titleValue = document.getElementById(`title-${userIdPlusTransId[1]}`).innerText;
  var valueValue = document.getElementById(`value-${userIdPlusTransId[1]}`).innerText;
  var typeValue = document.getElementById(`type-${userIdPlusTransId[1]}`).innerText;

  document.getElementById("title").value = titleValue;
  document.getElementById("value").value = valueValue;
  document.getElementById("type").value = typeValue;
}

function btnToDelTrans(ids) {
  userIdPlusTransId = ids.split("-t-");
  bodyModal.innerHTML = `<div class="col-md-8">
                          <p> Tem certeza de apagar que gostaria de apagara Transação nº: ${userIdPlusTransId[1]}?</p>
                        </div>
                        <div class="row mt-2 mb-2 mx-2">
                          <button id="btnDelTrans" type="button" 
                          onclick="btnDelTrans()" class="mx-3 btn btn-danger">
                            Deletar Trans.
                          </button>`;
}



function btnEditTrans() {
  let userId = userIdPlusTransId[0];
  let id = userIdPlusTransId[1];
  let title = document.getElementById("title").value;
  let value = document.getElementById("value").value;
  let type = document.getElementById("type").value;
  let valueInt = parseInt(value);

  axios
    .put(link + "/user/" + userId + "/transactions/" + id, {
      title: title,
      value: valueInt,
      type: type,
    })
    .then((response) => {
      console.log(response.data.msg);
      setTimeout(() => 
        { location.reload(); }, 2000);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
      // setTimeout(() => 
      //   { location.reload(); }, 20000);
    });
}

function btnDelTrans() {
  let userId = userIdPlusTransId[0];
  let id = userIdPlusTransId[1];

  axios
    .delete(link + "/user/" + userId + "/transactions/" + id)
    .then((response) => {
      console.log(response.data.msg);
      setTimeout(() => 
        { location.reload(); }, 2000);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
      // setTimeout(() => 
      //   { location.reload(); }, 20000);
    });
}

function btnCancelTrans() {
  var btnAddTrans = document.getElementById("btnAddTrans");
  btnAddTrans.style.display = "block";
  var btnEditTrans = document.getElementById("btnEditTrans");
  btnEditTrans.style.display = "none";
  var btnCancelTrans = document.getElementById("btnCancelTrans");
  btnCancelTrans.style.display = "none";
  document.getElementById("title").value = '';
  document.getElementById("value").value = '';
  document.getElementById("type").value = '';
}