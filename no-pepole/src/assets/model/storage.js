var storage = {
    set:function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get:function(key){
        return JSON.parse(localStorage.getItem(key));
    },
    remove:function(){
        localStorage.removeItem(key);
    }
}

export default storage ;