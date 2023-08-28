function add_holding_piece(type){
    erase_holding_piece();
    if(type == 1){
        for(var i = 6; i <= 8; i++){
            for(var j = 4; j <= 15; j++){
                holding_state[i][j] = type;
            }
        }
    }
    if(type == 2){
        for(var i = 4; i <= 6; i++){
            for(var j = 6; j <= 8; j++){
                holding_state[i][j] = type;
            }
        }
        for(var i = 7; i <= 9; i++){
            for(var j = 6; j <= 14; j++){
                holding_state[i][j] = type;
            }
        }
    }
    if(type == 3){
        for(var i = 4; i <= 6; i++){
            for(var j = 12; j <= 14; j++){
                holding_state[i][j] = type;
            }
        }
        for(var i = 7; i <= 9; i++){
            for(var j = 6; j <= 14; j++){
                holding_state[i][j] = type;
            }
        }
    }
    if(type == 4){
        for(var i = 4; i <= 9; i++){
            for(var j = 7; j <= 12; j++){
                holding_state[i][j] = type;
            }
        }
    }
    if(type == 5){
        for(var i = 4; i <= 6; i++){
            for(var j = 6; j <= 11; j++){
                holding_state[i][j] = type;
            }
        }
        for(var i = 7; i <= 9; i++){
            for(var j = 9; j <= 14; j++){
                holding_state[i][j] = type;
            }
        }
    }
    if(type == 6){
        for(var i = 4; i <= 6; i++){
            for(var j = 9; j <= 14; j++){
                holding_state[i][j] = type;
            }
        }
        for(var i = 7; i <= 9; i++){
            for(var j = 6; j <= 11; j++){
                holding_state[i][j] = type;
            }
        }
    }
    if(type == 7){
        for(var i = 4; i <= 6; i++){
            for(var j = 9; j <= 11; j++){
                holding_state[i][j] = type;
            }
        }
        for(var i = 7; i <= 9; i++){
            for(var j = 6; j <= 14; j++){
                holding_state[i][j] = type;
            }
        }
    }
    color_holding_piece();
}