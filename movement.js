function dropping(type){
    if(type == 0){
        if(moveable == false) return false;
        if(dropable == false) return false;
    }
    for(var i = board.row; i >= 1; i--){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                // console.log(i, j);
                if(i + 1 <= board.row && !ok(state[i + 1][j])) continue;
                else return false;
            }
        }
    }
    for(var i = board.row; i >= 1; i--){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                // console.log(i, j);
                state[i + 1][j] = state[i][j]; 
                state[i][j] = 0;
            }
        }
    }
    update_color(); r++;
    return true;
}

function move_left(){
    if(moveable == false) return;
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                if(j > 1 && !ok(state[i][j - 1])) continue;
                else return;
            }
        }
    }
    c--;
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                state[i][j - 1] = state[i][j];
                state[i][j] = 0;
            }
        }
    }
    update_color();

}

function move_right(){
    if(moveable == false) return;
    for(var i = 1; i <= board.row; i++){
        for(var j = board.col; j >= 1; j--){
            if(state[i][j] >= 8){
                if(j < board.col && !ok(state[i][j + 1])) continue;
                else return;
            }
        }
    }
    c++;
    for(var i = 1; i <= board.row; i++){
        for(var j = board.col; j >= 1; j--){
            if(state[i][j] >= 8){
                state[i][j + 1] = state[i][j];
                state[i][j] = 0;
            }
        }
    }
    update_color();
}

function soft_drop(type){
    if(moveable == false) return;
    if(type == 1) movement = false, dropable = false;
    while(dropping(1) == true) update_color();
    if(type == 1) fill();
}

function hard_drop(){
    if(moveable == false) return;
    soft_drop(1);
}

