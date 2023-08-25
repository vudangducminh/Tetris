function create_board(){
    time_elapsed();
    reset_all();
    gameBoard.innerHTML = '';
    holdedBoard.innerHTML = '';
    var table = document.createElement('table');
    for(var i = 1; i <= board.row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i, j);
            cell.backgroundColor = "black";
            row.appendChild(cell);
        }
        table.appendChild(row);
    } 
    gameBoard.appendChild(table);
    var holded_table = document.createElement('table');
    for(var i = 1; i <= board.hold_row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.hold_col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i + board.row, j);
            cell.backgroundColor = "black";
            row.appendChild(cell);
        }
        holded_table.appendChild(row);
    } 
    holdedBoard.appendChild(holded_table);
}

function shuffle(array){
    var size = array.length;
    for(var i = 0; i < size - 1; i++){
        var id = rng(i + 1, size - 1);
        var tmp = array[i];
        array[i] = array[id];
        array[id] = tmp;
    }
    return array;
}

function generate_bag(){
    let bag = [];
    for(var i = 1; i <= 7; i++) bag.push(i);
    bag = shuffle(bag);
    return bag;
}

function create_bag(){ 
    for(var i = 1; i <= board.num_bag; i++){
        let bag = generate_bag();
        for(var j = 0; j < 7; j++) piece.push(bag[j]);
    }
    moveable = true;
    current_piece(cur_piece);
}
