var board = {
    row: 20,
    col: 10
};

function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}
function shuffle(array){
    var size = array.length
    for(var i = 0; i < size - 1; i++){
        var index = rng(i + 1, size - 1);
        var tmp = array[i];
        array[i] = array[index];
        array[index] = tmp;
    }
    return array;
}

export function generate_bag(){
    let bag = [];
    for(var i = 1; i <= 7; i++) bag.push(i);
    bag = shuffle(bag);
    return bag;
}
