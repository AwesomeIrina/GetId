function deleteUser(){
    let li = document.querySelector('#edit-list-ul li');
    console.log(li);
    li.onclick = function() {
        console.log('parentNode', this.parentNode);
        console.log('element => this', this);
        this.parentNode.removeChild(this);
    };
}