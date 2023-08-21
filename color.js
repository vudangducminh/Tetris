function update_color(){
    clear_lines();
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(state[i][j] == 0) cell.style.backgroundColor = "black";
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

function erase(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8) state[i][j] = 0;
        }
    }
}

function fill_segment(x1, y1, x2, y2, color){
    for(var i = x1; i <= x2; i++){
        for(var j = y1; j <= y2; j++){
            state[i][j] = color;
        }
    }
}

function check_segment(x1, y1, x2, y2){
    if(x1 < 1 || y1 < 1 || x2 > board.row || y2 > board.col) return false;
    for(var i = x1; i <= x2; i++){
        for(var j = y1; j <= y2; j++){
            if(ok(state[i][j])) return false;
        }
    }
    return true;
}
function add(index, r, c){
    if(index == 1){
        fill_segment(r, c, r, c + 3, 8);
    }
    if(index == 2){
        fill_segment(r + 1, c, r + 1, c + 2, 9);
        fill_segment(r, c, r, c, 9);
    }
    if(index == 3){
        fill_segment(r + 1, c, r + 1, c + 2, 10);
        fill_segment(r, c + 2, r, c + 2, 10);
    }
    if(index == 4){
        fill_segment(r + 1, c, r + 1, c + 1, 11);
        fill_segment(r, c, r, c + 1, 11);
        state[r][c] = state[r][c + 1] = state[r + 1][c] = state[r + 1][c + 1] = 11; 
    }
    if(index == 5){
        fill_segment(r, c, r, c + 1, 12);
        fill_segment(r + 1, c + 1, r + 1, c + 2, 12);
    }
    if(index == 6){
        fill_segment(r, c + 1, r, c + 2, 13);
        fill_segment(r + 1, c, r + 1, c + 1, 13);
    }
    if(index == 7){
        fill_segment(r, c + 1, r, c + 1, 14);
        fill_segment(r + 1, c, r + 1, c + 2, 14);
    }
    return true;
}

function fill(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8) state[i][j] -= 7;
        }
    }
    update_color();
}