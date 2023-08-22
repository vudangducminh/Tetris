function current_piece(id){
    moveable = true; degree = 1;
    r = 1, c = 4, index = id;
    if(check(index, r, c) == false){
        moveable = false;
        game_over(); return;
    }
    add(index, r, c); update_color();
    if(index == 1) r = 1, c = 5;
    else r = 2, c = 5;
    dropable = true;
    num_lap = 0;
    lap = setInterval(function(){ 
        num_lap++;
        var crr = 0;
        // console.log(num_lap);
        if(num_lap % (board.current_gravity / board.reset) == 0){
            moveable = false;
            if(dropping(0) == true){
                moveable = dropable = true, board.current_gravity = board.gravity;
                crr = 0; update_color();
            }
            else{
                // console.log("FAKE STOP: ", r, c);
                if(dropable == false){ 
                    // console.log("REAL STOP: ", r, c);
                    cur_time = Date.now(); 
                    if(!crr) crr = 1, board.gravity = board.slight_delay;
                    else moveable = false;
                    fill();
                    board.current_gravity = board.gravity;  
                    if(cur_piece + 1 == board.num_bag * 7) clearInterval(lap);
                    current_piece(piece[++cur_piece]);
                    clearInterval(lap);
                }
                else{
                    moveable = true; dropable = false;
                }
            }
        }
        update_color();
    }, board.reset);
}