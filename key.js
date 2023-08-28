function clear(){
    pressed[32] = pressed[65] = pressed[67] = pressed[88] = pressed[90] = pressed[188] = pressed[190] = pressed[191] = 0;
}

function is_right_key(x){
    if(x == 32 || x == 65 || x == 67 || x == 82 || x == 88 || x == 90 || x == 188 || x == 190 || x == 191) return true;
    return false;
}
function check_multiple_keys(){
    osu = setInterval(function(){
        if(pressed[190] == 1 && dropable == true) soft_drop(0); 
        if(pressed[65] == 1){
            pressed[65] = 2;
            rotate_180();
        }
        if(pressed[67] == 1){
            if(cur_gamemode.get("Hard-rock mode") == 0){
                pressed[67] = 2; 
                if(hold == -1){
                    hold = cur_piece;
                    holdable = true;
                    erase(); clearInterval(lap);
                    if(is_pc == 0) cur_score -= board.pc_score;
                    add_holding_piece(piece[hold]);
                    add_queue(++cur_piece);
                    current_piece(cur_piece);
                }
                else{
                    if(!holdable){
                        holdable = true;
                        erase(); clearInterval(lap);
                        if(is_pc == 0) cur_score -= board.pc_score;
                        add_holding_piece(piece[cur_piece]);
                        current_piece(hold);
                        hold = cur_piece;
                    }
                }
            }
        }
        if(pressed[88] == 1){
            pressed[88] = 2; 
            var x = clockwise();
        }
        if(pressed[90] == 1) pressed[90] = 2, counterclockwise();
    }, board.movement_reset);
}

function teleport(){
    num_tp = 0;
    tp = setInterval(function(){
        num_tp++;
        if(num_tp >= 16){
            if(pressed[188]){
                for(var i = 1; i <= 1; i++) move_left();
            }
            if(pressed[191]){
                for(var i = 1; i <= 1; i++)  move_right();
            }
        }
    }, board.movement_reset);
}

document.onkeydown = (e) => {
    e = e || window.event;
    if(!pressed[e.keyCode]) pressed[e.keyCode] = 1;   
    if(e.key == ',' || e.key == '/') num_tp = 0; 
    if(is_right_key(e.keyCode) == false) return;
    if(e.key == 'r') init();
    if(moveable == false) return;    
    if(e.keyCode == 32){
        hard_drop(); pressed[32] = pressed[67] = 0;
    }
    if(e.key == ',') move_left();
    if(e.key == '/') move_right();
}
document.onkeyup = (e) => {
    e = e || window.event;  
    if(e.key == ',' || e.key == '/') num_tp = 0; 
    if(is_right_key(e.keyCode) == false) return;
    if(e.keyCode != 67) pressed[e.keyCode] = 0;
}