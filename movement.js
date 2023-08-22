function dropping(){
    var flag = 0;
    for(var i = min(board.row, r + 2); i >= max(1, r - 2); i--){
        for(var j = max(1, c - 2); j <= min(board.col, c + 2); j++){
            if(state[i][j] >= 8){
                flag = 1;
                // console.log(i, j);
                if(i + 1 <= board.row && !ok(state[i + 1][j])) continue;
                else{    
                    if(dropable == false) movement = false; 
                    else movement = true;
                    board.current_gravity = board.delay;
                    return false;
                }
            }
        }
    }
    if(!flag){
        movement = true;
        board.current_gravity = board.delay;
        return false;
    }
    for(var i = min(board.row, r + 2); i >= max(1, r - 2); i--){
        for(var j = max(1, c - 2); j <= min(board.col, c + 2); j++){
            if(state[i][j] >= 8){
                // console.log(i, j);
                state[i + 1][j] = state[i][j]; 
                state[i][j] = 0;
            }
        }
    }
    r++;
    return true;
}

function move_left(){
    // console.log("LEFT: ", r, c);
    if(moveable == false) return;
    for(var i = max(1, r - 2); i <= min(board.row, r + 2); i++){
        for(var j = max(1, c - 2); j <= min(board.col, c + 2); j++){
            if(state[i][j] >= 8){
                if(j > 1 && !ok(state[i][j - 1])) continue;
                else return;
            }
        }
    }
    for(var i = max(1, r - 2); i <= min(board.row, r + 2); i++){
        for(var j = max(1, c - 2); j <= min(board.col, c + 2); j++){
            if(state[i][j] >= 8){
                state[i][j - 1] = state[i][j];
                state[i][j] = 0;
            }
        }
    }
    c--;
    update_color();

}

function move_right(){
    // console.log("RIGHT: ", r, c);
    if(moveable == false) return;
    for(var i = max(1, r - 2); i <= min(board.row, r + 2); i++){
        for(var j = min(board.col, c + 2); j >= max(1, c - 2); j--){
            if(state[i][j] >= 8){
                if(j < board.col && !ok(state[i][j + 1])) continue;
                else return;
            }
        }
    }
    for(var i = max(1, r - 2); i <= min(board.row, r + 2); i++){
        for(var j = min(board.col, c + 2); j >= max(1, c - 2); j--){
            if(state[i][j] >= 8){
                state[i][j + 1] = state[i][j];
                state[i][j] = 0;
            }
        }
    }
    c++;
    update_color();
}

function soft_drop(type){
    if(type == 1) movement = false, dropable = false;
    while(dropping() == true);
    update_color();
    if(type == 1) fill();
}

function hard_drop(){
    if(moveable == false) return;
    moveable = false;
    soft_drop(1); board.current_gravity = board.gravity;
}

