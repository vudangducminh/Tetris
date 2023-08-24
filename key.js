function clear(){
    pressed[32] = pressed[65] = pressed[67] = pressed[88] = pressed[90] = pressed[188] = pressed[190] = pressed[191] = 0;
}

function check_multiple_keys(){
    var flag = true;
    while(flag == true){
        flag = false;
        if(pressed[188]) move_left();
        if(pressed[191]) move_right();              
        if(pressed[190] == 1 && dropable == true) soft_drop(0); 
        if(pressed[65] == 1){
            pressed[65] = 2;
            rotate_180();
        }
        if(pressed[67] == 1){
            pressed[67] = 2; 
            if(hold == -1){
                hold = cur_piece;
                holdable = true;
                erase(); clearInterval(lap);
                if(cur_piece + 1 > 0 && is_pc == 0) cur_score -= board.pc_score;
                current_piece(++cur_piece);
            }
            else{
                if(!holdable){
                    holdable = true;
                    erase(); clearInterval(lap);
                    if(hold > 0 && is_pc == 0) cur_score -= board.pc_score;
                    current_piece(hold);
                    hold = cur_piece;
                }
            }
        }
        if(pressed[88] == 1){
            pressed[88] = 2; 
            var x = clockwise();
        }
        if(pressed[90] == 1) pressed[90] = 2, counterclockwise();
        for(var i = 0; i < pressed.length; i++){
            if(pressed[i]){
                if(i == 32) continue;
                flag = true; break;
            }
        }
        if(pressed[32]){
            hard_drop(); clear(); return;
        }
    }
}

document.onkeydown = (e) => {
    e = e || window.event;
    if(moveable == false) return;
    if(!pressed[e.keyCode]) pressed[e.keyCode] = 1;
    // console.log(e.keyCode);
    check_multiple_keys();
}
document.onkeyup = (e) => {
    e = e || window.event;
    // console.log(e.key);
    if(e.keyCode != 67) pressed[e.keyCode] = 0;
    // check_multiple_keys();
}
