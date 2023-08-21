function clear_lines(){
    for(var i = board.row; i >= 1; i--){
        var flag = 0;
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] == 0 || state[i][j] >= 8){
                flag = 1; break;
            }
        }
        if(!flag){
            for(var j = 1; j <= board.col; j++) state[i][j] = 0;
            var cnt = i;
            for(var l = i; l >= 1; l--){
                var check = 0;
                for(var r = 1; r <= board.col; r++){
                    if(state[l][r] > 0 && state[l][r] < 8){
                        check = 1; break;
                    }
                }
                if(check){
                    for(var j = 1; j <= board.col; j++){
                        state[cnt][j] = state[l][j];
                        state[l][j] = 0;
                    }
                    cnt--;
                }
            }
        }
    }
}
