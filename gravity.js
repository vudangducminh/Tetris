function current_piece(id){
    moveable = true; degree = 90;
    r = 1, c = 4, index = id;
    if(check(index, r, c) == false){
        moveable = false;
        game_over(); return;
    }
    add(index, r, c); update_color();
    if(index == 1) r = 2, c = 5; // r = 1, c = 5 soon
    else r = 2, c = 5;
    dropable = 1;
    num_lap = 0;
    lap = setInterval(function(){ 
        num_lap++;
        // console.log(num_lap);
        if(num_lap % (board.gravity / board.reset) == 0){   
            if(dropping(0) == true) dropable = 1, board.gravity = 500;
            else{
                if(dropable == 0){
                    board.gravity = 500; 
                    fill();
                    if(cur_piece + 1 == board.num_bag * 7) clearInterval(lap);
                    current_piece(piece[++cur_piece]);
                    clearInterval(lap);
                }
                else{
                    dropable = 0; 
                    board.gravity = board.delay;
                }
            }
        }
    }, board.reset);
}