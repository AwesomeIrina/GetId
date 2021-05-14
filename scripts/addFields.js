function addFields()
{
    var firstNameField = document.createElement("input");
    var lastNameField = document.createElement("input");
    var idField = document.createElement("input");

    firstNameField.setAttribute("class", "inputField");
    firstNameField.setAttribute("type", "text");
    firstNameField.setAttribute("name", "first_name");
    firstNameField.setAttribute("placeholder", "Имя");

    lastNameField.setAttribute("class", "inputField");
    lastNameField.setAttribute("type", "text");
    lastNameField.setAttribute("name", "last_name");
    lastNameField.setAttribute("placeholder", "Фамилия");

    idField.setAttribute("class", "inputField");
    idField.setAttribute("type", "text");
    idField.setAttribute("name", "profile_id");
    idField.setAttribute("placeholder", "id страницы");



   

    document.getElementById("forAddNewField").appendChild(firstNameField);
    document.getElementById("forAddNewField").appendChild(lastNameField);
    document.getElementById("forAddNewField").appendChild(idField);
    


}