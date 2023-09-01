function clear_lines(){
    var num_lines = 0;
    for(var i = max(1, r - 2); i <= min(board.row, r + 2); i++){
        var flag = 0;
        for(var j = 1; j <= board.col; j++){
            if(!ok(state[i][j])){
                flag = 1; break;
            }
        }
        if(!flag){
            num_lines++;
            for(var j = 1; j <= board.col; j++) state[i][j] = 0;
        }
    }
    cur_score += add_score(num_lines);
    is_pc -= num_lines * 10;
    for(var i = min(board.row, r + 2); i >= 1; i--){
        var flag = 0;
        for(var j = 1; j <= board.col; j++){
            if(state[i][j]){
                flag = 1; break;
            }
        }
        if(!flag){
            var cnt = i;
            for(var l = i - 1; l >= 1; l--){
                var check = 0;
                for(var r = 1; r <= board.col; r++){
                    if(state[l][r] >= 8) continue;
                    if(ok(state[l][r])) state[cnt][r] = state[l][r], check = 1;
                    else state[cnt][r] = 0;
                    state[l][r] = 0;
                }
                if(check) cnt--;
            }
            break;
        }
    }
    total_lines += num_lines;
    update_score();
    update_lines();
}

function update_lines(){
    let cell = document.getElementById(hash(200, 200));
    cell.textContent = "Lines cleared: " + total_lines;
}