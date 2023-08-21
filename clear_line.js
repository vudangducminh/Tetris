function clear_lines(){
    var num_lines = 0;
    for(var i = board.row; i >= 1; i--){
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
    for(var i = board.row; i >= 1; i--){
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
}
