function update_color(){
    clear_lines(r, c);
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(cur_gamemode.get("Reverse mode") == 1) cell = document.getElementById(hash(board.row - i + 1, board.col - j + 1));
            var dist = abs(i, r) + abs(j, c);
            if(state[i][j] == 0){
                if(!shadow_state[i][j]){
                    if(cur_gamemode.get("Flashlight mode") == 1){
                        if(dist <= board.visible){
                            // console.log(i, j, r, c);
                            cell.style.backgroundColor = color[state[i][j]];
                        }
                        else cell.style.backgroundColor = "rgb(24, 20, 20)";
                    }
                    else if(cur_gamemode.get("Blindfold mode") == 1) cell.style.backgroundColor = "rgb(24, 20, 20)";
                    else cell.style.backgroundColor = "black";
                }
            }
            else{
                if(cur_gamemode.get("Blindfold mode") == 1){
                    if(state[i][j] <= 7) cell.style.backgroundColor = "rgb(24, 20, 20)";
                    else cell.style.backgroundColor = color[state[i][j]];
                }
                else if(cur_gamemode.get("Flashlight mode") == 1){
                    if(dist <= board.visible){   
                        // console.log(i, j, r, c);
                        cell.style.backgroundColor = color[state[i][j]];
                    }
                    else cell.style.backgroundColor = "rgb(24, 20, 20)";
                }
                else{
                    // console.log(i, j, color[state[i][j]]);
                    cell.style.backgroundColor = color[state[i][j]];
                }
            }
        }
    }
}

function end_state(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(cur_gamemode.get("Reverse mode") == 1) cell = document.getElementById(hash(board.row - i + 1, board.col - j + 1));
            cell.style.backgroundColor = color[state[i][j]];
        }
    }
}
function color_holding_piece(){
    for(var i = 1; i <= board.hold_row; i++){
        for(var j = 1; j <= board.hold_col; j++){
            let cell = document.getElementById(hash(i + board.row, j));
            cell.style.backgroundColor = color[holding_state[i][j]];
        }
    }
}


function color_queue(){
    for(var i = 1; i <= board.queue_row; i++){
        for(var j = 1; j <= board.queue_col; j++){
            let cell = document.getElementById(hash(i + board.queue_row, j));
            cell.style.backgroundColor = color[queue_state[i][j]];
        }
    }
}

function erase_queue(){
    for(var i = 1; i <= board.queue_row; i++){
        for(var j = 1; j <= board.queue_col; j++){
            let cell = document.getElementById(hash(i + board.queue_row, j));
            queue_state[i][j] = 0;
            cell.style.backgroundColor = "black";
        }
    }
}

function erase_holding_piece(){
    for(var i = 1; i <= board.hold_row; i++){
        for(var j = 1; j <= board.hold_col; j++){
            let cell = document.getElementById(hash(i + board.row, j));
            holding_state[i][j] = 0;
            cell.style.backgroundColor = "black";
        }
    }
}

function erase(){
    for(var i = max(1, r - 5); i <= min(board.row, r + 5); i++){
        for(var j = max(1, c - 5); j <= min(board.col, c + 5); j++){
            if(state[i][j] >= 8) state[i][j] = 0;
        }
    }
}

function fill(){
    for(var i = max(1, r - 2); i <= min(board.row, r + 2); i++){
        for(var j = max(1, c - 2); j <= min(board.col, c + 2); j++){
            if(state[i][j] >= 8) state[i][j] -= 7;
        }
    }
    update_color();
}