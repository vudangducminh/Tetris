function clear_lines(row, col){
    var num_lines = 0;
    var is_tspin = detect_tspin(row, col);
    for(var i = max(1, row - 2); i <= min(board.row, row + 2); i++){
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
    if(is_tspin == true && num_lines > 0){
        tspin.textContent = "T-SPIN";
        tspin.style.color = "purple";
        setTimeout(() => {
            tspin.style.color = "black";
        }, 3000);
        cur_score += add_score(num_lines * 2);
    }
    else cur_score += add_score(num_lines);
    if(num_lines > 0){
        if(num_lines == 1) sent_type.textContent = "SINGLE";
        if(num_lines == 2) sent_type.textContent = "DOUBLE";
        if(num_lines == 3) sent_type.textContent = "TRIPLE";
        if(num_lines == 4) sent_type.textContent = "QUAD";
        sent_type.style.color = "white";
        setTimeout(() => {
            sent_type.style.color = "black";
        }, 3000);
    }
    is_pc -= num_lines * 10;
    for(var i = min(board.row, row + 2); i >= 1; i--){
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
    lines.textContent = total_lines;
}

function detect_tspin(row, col){
    if(piece[cur_piece] != 7) return false;
    if((col >= 2 && ok(state[row - 1][col - 1])) || (col < board.col && ok(state[row - 1][col + 1]))) return true;
    else return false;
}