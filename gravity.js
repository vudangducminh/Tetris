function current_piece(id){
    if(cur_piece + 1 == board.num_bag * 7) return;
    if(total_lines >= level[cur_level][0]){
        cur_level++; 
        if(cur_gamemode.get("Double-time mode") == 1){
            board.gravity = level[min(cur_level + 10, level.length)][1];
        }
        else if(cur_gamemode.get("Hard-rock mode") == 1){
            board.gravity = level[min(cur_level + 3, level.length)][1];
        }
        else{
            board.gravity = level[cur_level][1];
        }
    }
    if(cur_level == 2) board.visible -= 1;
    else if(cur_level == 5) board.visible -= 1;
    else if(cur_level == 10) board.visible -= 1;
    pressed[67] = 0;
    if(pressed[190]) pressed[190] = 2;
    if(cur_piece > 0 && is_pc == 0){
        cur_score += board.pc_score * (1 + time_elapsed() / board.coefficient); update_score();
    }
    // console.log(id);
    moveable = true; degree = 1;
    r = 1, c = 4, index = piece[id];
    if(check(index, r, c) == false){
        moveable = dropable = false;
        game_over(); return;
    }
    add(index, r, c); 
    r = 2, c = 5;
    update_color();
    dropable = true;
    num_lap = 0;
    crr = 0;
    var begin_time = Date.now();
    begin_state(); shadow_piece();
    lap = setInterval(function(){ 
        num_lap++;
        var is_need = true;
        if(Date.now() - begin_time > board.gravity * board.row + board.maxtime){
            hard_drop();
            fill();
            is_pc += 4;
            num_lap = -2;
            holdable = false;
            is_need = false;
            clearInterval(lap);
            add_queue(++cur_piece);
            current_piece(cur_piece);
        }
        else{
            if(num_lap >= 0 && num_lap % (board.gravity / board.reset) == 0){
                // console.log("BEGIN ", r, c);
                begin_state(); shadow_piece();
                moveable = false;
                if(dropping(0) == true){
                    moveable = true;
                    crr = 0; update_color();
                }
                else{
                    // console.log("FAKE STOP: ", r, c);
                    if(dropable == false){ 
                        // console.log("REAL STOP: ", r, c);
                        if(!crr){
                            moveable = true;
                            crr = 1, num_lap = -30;
                        }
                        else{
                            moveable = false; 
                            fill();
                            is_pc += 4;
                            num_lap = -2;
                            holdable = false;
                            is_need = false;
                            clearInterval(lap);
                            add_queue(++cur_piece);
                            current_piece(cur_piece);
                        }
                    }
                    else{
                        moveable = true; crr = 0;
                    }
                } 
            }   
        }
        if(is_need == true) update_color();
    }, board.reset);
}