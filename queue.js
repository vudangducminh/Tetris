function fill_queue(type, r, c){
    if(type == 1){
        for(var i = r + 5; i <= r + 7; i++){
            for(var j = c + 3; j <= c + 14; j++){
                queue_state[i][j] = type;
            }
        }
    }
    if(type == 2){
        for(var i = r + 3; i <= r + 5; i++){
            for(var j = c + 5; j <= c + 7; j++){
                queue_state[i][j] = type;
            }
        }
        for(var i = r + 6; i <= r + 8; i++){
            for(var j = c + 5; j <= c + 13; j++){
                queue_state[i][j] = type;
            }
        }
    }
    if(type == 3){
        for(var i = r + 3; i <= r + 5; i++){
            for(var j = c + 11; j <= c + 13; j++){
                queue_state[i][j] = type;
            }
        }
        for(var i = r + 6; i <= r + 8; i++){
            for(var j = c + 5; j <= c + 13; j++){
                queue_state[i][j] = type;
            }
        }
    }
    if(type == 4){
        for(var i = r + 3; i <= r + 8; i++){
            for(var j = c + 6; j <= c + 11; j++){
                queue_state[i][j] = type;
            }
        }
    }
    if(type == 5){
        for(var i = r + 3; i <= r + 5; i++){
            for(var j = c + 5; j <= c + 10; j++){
                queue_state[i][j] = type;
            }
        }
        for(var i = r + 6; i <= r + 8; i++){
            for(var j = c + 8; j <= c + 13; j++){
                queue_state[i][j] = type;
            }
        }
    }
    if(type == 6){
        for(var i = r + 3; i <= r + 5; i++){
            for(var j = c + 8; j <= c + 13; j++){
                queue_state[i][j] = type;
            }
        }
        for(var i = r + 6; i <= r + 8; i++){
            for(var j = c + 5; j <= c + 10; j++){
                queue_state[i][j] = type;
            }
        }
    }
    if(type == 7){
        for(var i = r + 3; i <= r + 5; i++){
            for(var j = c + 8; j <= c + 10; j++){
                queue_state[i][j] = type;
            }
        }
        for(var i = r + 6; i <= r + 8; i++){
            for(var j = c + 5; j <= c + 13; j++){
                queue_state[i][j] = type;
            }
        }
    }
    color_queue();
}

function add_queue(cur_index){
    if(cur_gamemode == "Hidden mode") return;
    erase_queue();
    fill_queue(piece[cur_index + 1], 1, 1);
    fill_queue(piece[cur_index + 2], 11, 1);
    fill_queue(piece[cur_index + 3], 21, 1);
    fill_queue(piece[cur_index + 4], 31, 1);
    fill_queue(piece[cur_index + 5], 41, 1);
}