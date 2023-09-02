function create_board(){
    time_elapsed();
    reset_all();
    gameBoard.innerHTML = '';
    heldBoard.innerHTML = '';
    queueBoard.innerHTML = '';
    lines.innerHTML = '';
    score.innerHTML = '';
    text.textContent = "Lines";
    text2.textContent = "Level";
    var table = document.createElement('table');
    for(var i = 1; i <= board.row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i, j);
            // if(cur_gamemode.get("Reverse mode") == 1) cell.id = hash(board.row - i + 1, board.col - j + 1);
            cell.style.backgroundColor = "black";
            row.appendChild(cell);
        }
        table.appendChild(row);
    } 
    gameBoard.appendChild(table);
    table = document.createElement('table');
    for(var i = 1; i <= board.hold_row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.hold_col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i + board.row, j);
            if(cur_gamemode.get("Classic mode") == 1) cell.style.backgroundColor = "red";
            else cell.style.backgroundColor = "black";
            row.appendChild(cell);
        }
        table.appendChild(row);
    } 
    heldBoard.appendChild(table);
    table = document.createElement('table');
    for(var i = 1; i <= board.queue_row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.queue_col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i + board.queue_row, j);
            if(cur_gamemode.get("Hidden mode") == 1) cell.style.backgroundColor = "red";
            else cell.style.backgroundColor = "black";
            row.appendChild(cell);
        }
        table.appendChild(row);
    } 
    queueBoard.appendChild(table);
    table = document.createElement('table');
    for(var i = 1; i <= 1; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= 1; j++){
            var cell = document.createElement('td');
            cell.id = hash(200, 200);
            row.appendChild(cell);
        }
        table.appendChild(row);
    } 
    score.appendChild(table);
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
    add_queue(cur_piece);
    current_piece(cur_piece);
}
