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
        // console.log(num_lap);
        if(num_lap % (board.current_gravity / board.reset) == 0){
            if(dropping(0) == true){
                moveable = dropable = true, board.current_gravity = board.gravity;
                update_color();
            }
            else{
                // console.log("FAKE STOP: ", r, c);
                if(dropable == false){ 
                    // console.log("REAL STOP: ", r, c);
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