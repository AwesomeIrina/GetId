function addFields()
{
    var firstNameField = document.createElement("input");
    var lastNameField = document.createElement("input");
    var idField = document.createElement("input");
    var deleteButton = document.createElement("BUTTON");

    firstNameField.setAttribute("class", "inputField");
    firstNameField.setAttribute("type", "text");
    firstNameField.setAttribute("name", "first_name");

    lastNameField.setAttribute("class", "inputField");
    lastNameField.setAttribute("type", "text");
    lastNameField.setAttribute("name", "last_name");

    idField.setAttribute("class", "inputField");
    idField.setAttribute("type", "text");
    idField.setAttribute("name", "profile_id");


   

    document.getElementById("forAddNewField").appendChild(firstNameField);
    document.getElementById("forAddNewField").appendChild(lastNameField);
    document.getElementById("forAddNewField").appendChild(idField);
    


}