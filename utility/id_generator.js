module.exports = function generate_id(col){
    let id = '0451';
    const maxId = 10000;
    if (col.has(id)){
        do{
            id = Math.floor(Math.random() * maxId);
        } while (col.has(id))      
    }
    if (id == '0451'){
        return id.toString();
    }
    if (id < 10){
        id = '000' + id.toString();
        return id;
    }
    if (id < 100){
        id = '00' + id.toString();
        return id;
    }
    if (id < 1000){
        id = '0' + id.toString();
        return id;
    }
    return id.toString();
}