function update_color(){
    clear_lines();
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(state[i][j] == 0){
                if(!shadow_state[i][j]) cell.style.backgroundColor = "black";
            }
            if(state[i][j] == 1) cell.style.backgroundColor = "lightblue";
            if(state[i][j] == 2) cell.style.backgroundColor = "blue";
            if(state[i][j] == 3) cell.style.backgroundColor = "orange";
            if(state[i][j] == 4) cell.style.backgroundColor = "yellow";
            if(state[i][j] == 5) cell.style.backgroundColor = "red";
            if(state[i][j] == 6) cell.style.backgroundColor = "green";
            if(state[i][j] == 7) cell.style.backgroundColor = "purple";
            if(state[i][j] == 8) cell.style.backgroundColor = "lightblue";
            if(state[i][j] == 9) cell.style.backgroundColor = "blue";
            if(state[i][j] == 10) cell.style.backgroundColor = "orange";
            if(state[i][j] == 11) cell.style.backgroundColor = "yellow";
            if(state[i][j] == 12) cell.style.backgroundColor = "red";
            if(state[i][j] == 13) cell.style.backgroundColor = "green";
            if(state[i][j] == 14) cell.style.backgroundColor = "purple";
        }
    }
}

function color_holding_piece(){
    for(var i = 1; i <= board.hold_row; i++){
        for(var j = 1; j <= board.hold_col; j++){
            let cell = document.getElementById(hash(i + board.row, j));
            if(holding_state[i][j] == 0) cell.style.backgroundColor = "black";
            if(holding_state[i][j] == 1) cell.style.backgroundColor = "lightblue";
            if(holding_state[i][j] == 2) cell.style.backgroundColor = "blue";
            if(holding_state[i][j] == 3) cell.style.backgroundColor = "orange";
            if(holding_state[i][j] == 4) cell.style.backgroundColor = "yellow";
            if(holding_state[i][j] == 5) cell.style.backgroundColor = "red";
            if(holding_state[i][j] == 6) cell.style.backgroundColor = "green";
            if(holding_state[i][j] == 7) cell.style.backgroundColor = "purple";
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