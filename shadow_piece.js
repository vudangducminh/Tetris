var cur_r = r, cur_c = c;
function begin_state(){
    if(cur_gamemode == "Blindfold mode") return;
    clear_shadow();
    for(var i = max(1, cur_r - 2); i <= min(board.row, cur_r + 2); i++){
        for(var j = max(1, cur_c - 2); j <= min(board.col, cur_c + 2); j++){
            if(state[i][j] >= 8) shadow_state[i][j] = 1;
        }
    }
}
function shadow_drop(){
    if(cur_gamemode == "Blindfold mode") return;
    var flag = 0;
    for(var i = min(board.row, cur_r + 2); i >= max(1, cur_r - 2); i--){
        for(var j = max(1, cur_c - 2); j <= min(board.col, cur_c + 2); j++){
            if(shadow_state[i][j] == 1){
                flag = 1;
                if(i + 1 <= board.row && !ok(state[i + 1][j])) continue;
                else return false;
            }
        }
    }
    if(!flag) return false;
    for(var i = min(board.row, cur_r + 2); i >= max(1, cur_r - 2); i--){
        for(var j = max(1, cur_c - 2); j <= min(board.col, cur_c + 2); j++){
            if(shadow_state[i][j] == 1){
                shadow_state[i + 1][j] = 1; 
                shadow_state[i][j] = 0;
            }
        }
    }
    cur_r++;
    // console.log("success: ", r, c);
    return true;
}

function clear_shadow(){
    if(cur_gamemode == "Blindfold mode") return;
    for(var i = min(board.row, cur_r + 2); i >= max(1, cur_r - 2); i--){
        for(var j = max(1, cur_c - 2); j <= min(board.col, cur_c + 2); j++){
            shadow_state[i][j] = 0;
        }
    }
    cur_r = r; cur_c = c;
}

function shadow_piece(){
    if(cur_gamemode == "Blindfold mode") return;
    // console.log("start: ", r, c);
    cur_r = r, cur_c = c;
    while(shadow_drop() == true);
    for(var i = max(1, cur_r - 2); i <= min(board.row, cur_r + 2); i++){
        for(var j = max(1, cur_c - 2); j <= min(board.col, cur_c + 2); j++){
            let cell = document.getElementById(hash(i, j));
            if(shadow_state[i][j] == 1){
                // console.log("??: ", i, j, r, c, "  ", state[i][j]);
                if(state[i][j]) continue;
                cell.style.backgroundColor = "gray";
            }
        }
    }
}