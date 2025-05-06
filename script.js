let users = [];
let edit;
const userList = document.getElementById("user-data");

const apiUrl="https://jsonplaceholder.typicode.com/users"
 fetch(apiUrl)
.then(response => response.json())
.then(data=>{ 
    console.log(data)
    users=data;
    createUser(users)
})
const getName = (id) => {
  let inputName = document.getElementById("name").value;
  let inputEmail= document.getElementById("email").value;
  console.log(" name of user: ", inputName);
  console.log(" age of user: ", inputEmail);
  if (edit) {
    const user = users.find((element) => element.id === edit);
    user.name = inputName;
    user.email = inputEmail;
    edit=null;
  } else {
    fetch(apiUrl,{
      method:'POST',
      body: JSON.stringify({ name: inputName, email: inputEmail }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
    });
    users.push({ name: inputName, email: inputEmail, id: Date.now() });
    console.log(users);
  }
  createUser(users);
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
};
function createUser(users) {
  userList.innerHTML = users.map(
      (user) =>
        `<ul>
        <li>user data</li>
        <p>( Username: ${user.name} User-age:${user.email})
        <button id="edit-button" onclick="editHandler(${user.id})">Edit</button>
        <button id="del-button" onclick="deleteHandler(${user.id})">Delete</button>
    </ul>`
    )
    .join(" ");
}
function editHandler(id) {
  let inputName = document.getElementById("name").value;
  let inputEmail= document.getElementById("email").value;
  fetch(`${apiUrl}/${id}`,{
    method:'PUT',
    body: JSON.stringify({ name: inputName, email: inputEmail }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  });
  let editUsers = users.find(element=>element.id===id)
    document.getElementById("name").value = editUsers.name;
    document.getElementById("email").value = editUsers.email;
edit=id
};
function deleteHandler(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
   users= users.filter((element)=>element.id!==id)
  createUser(users);
}