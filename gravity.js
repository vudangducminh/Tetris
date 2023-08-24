function current_piece(id){
    if(pressed[190]) pressed[190] = 2;
    if(cur_piece > 0 && is_pc == 0){
        cur_score += board.pc_score; update_score();
    }
    console.log(id);
    moveable = true; degree = 1;
    r = 1, c = 4, index = piece[id];
    if(check(index, r, c) == false){
        moveable = false;
        game_over(); return;
    }
    add(index, r, c); 
    if(index == 1) r = 2, c = 5;
    else r = 2, c = 5;
    update_color();
    dropable = true;
    num_lap = 0;
    crr = 0;
    lap = setInterval(function(){ 
        num_lap++;
        // console.log(num_lap);
        if(num_lap % (board.gravity / board.reset) == 1){
            // console.log("BEGIN ", r, c);
            begin_state(); shadow_piece();
            moveable = false;
            if(dropping(0) == true){
                moveable = dropable = true;
                crr = 0; update_color();
            }
            else{
                // console.log("FAKE STOP: ", r, c);
                if(dropable == false){ 
                    // console.log("REAL STOP: ", r, c);
                    if(!crr) crr = 1, num_lap = 2;
                    else{
                        moveable = false; 
                        fill(); begin_state();
                        if(cur_piece + 1 == board.num_bag * 7) clearInterval(lap);
                        is_pc += 4;
                        num_lap = -1;
                        current_piece(++cur_piece);
                        clearInterval(lap);
                    }
                }
                else{
                    moveable = true; dropable = false; crr = 0;
                }
            }
        }
        update_color();
    }, board.reset);
}