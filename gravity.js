function current_piece(id){
    if(cur_piece + 1 == board.num_bag * 7) return;
    if(cur_piece % 10 == 0 && cur_piece){
        board.gravity -= board.reset;
        if(board.gravity < board.reset * 3) board.gravity = board.reset * 3;
    }
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
    begin_state(); shadow_piece();
    lap = setInterval(function(){ 
        num_lap++;
        var is_need = true;
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
                    if(!crr) crr = 1, num_lap = -50;
                    else{
                        moveable = false; 
                        fill(); begin_state();
                        is_pc += 4;
                        num_lap = -1;
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
        if(is_need == true) update_color();
    }, board.reset);
}