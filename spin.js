function is_cw_rotateable(id, deg){
    if(id == 2){
        if(deg == 1){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r - 1, c + 1, r - 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 9);
                fill_segment(r - 1, c + 1, r - 1, c + 1, 9);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 2){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 9);
                fill_segment(r + 1, c + 1, r + 1, c + 1, 9);
                update_color(); deg++; degree = deg;
            }
            else return false; 
        }
        else if(deg == 3){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r + 1, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 9);
                fill_segment(r + 1, c - 1, r + 1, c - 1, 9);
                update_color(); deg = 0; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c - 1, r - 1, c - 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 9);
                fill_segment(r - 1, c - 1, r - 1, c - 1, 9);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
    }
    if(id == 3){
        if(deg == 1){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r + 1, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 10);
                fill_segment(r + 1, c + 1, r + 1, c + 1, 10);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 2){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 10);
                fill_segment(r + 1, c - 1, r + 1, c - 1, 10);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 3){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r - 1, c - 1, r - 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 10);
                fill_segment(r - 1, c - 1, r - 1, c - 1, 10);
                update_color(); deg = 0; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c + 1, r - 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 10);
                fill_segment(r - 1, c + 1, r - 1, c + 1, 10);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
    }
    if(id == 5){
        if(deg == 1){
            if(check_segment(r, c, r + 1, c) && check_segment(r - 1, c + 1, r, c + 1)){
                erase();
                fill_segment(r, c, r + 1, c, 12);
                fill_segment(r - 1, c + 1, r, c + 1, 12);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 2){
            if(check_segment(r, c - 1, r, c) && check_segment(r + 1, c, r + 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c, 12);
                fill_segment(r + 1, c, r + 1, c + 1, 12);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 3){
            if(check_segment(r - 1, c, r, c) && check_segment(r, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r, c, 12);
                fill_segment(r, c - 1, r + 1, c - 1, 12);
                update_color(); deg = 0; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r - 1, c - 1, r - 1, c) && check_segment(r, c, r, c + 1)){
                erase();
                fill_segment(r - 1, c - 1, r - 1, c, 12);
                fill_segment(r, c, r, c + 1, 12);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
    }
    if(id == 6){
        if(deg == 1){
            if(check_segment(r - 1, c, r, c) && check_segment(r, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r, c, 13);
                fill_segment(r, c + 1, r + 1, c + 1, 13);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 2){
            if(check_segment(r, c, r, c + 1) && check_segment(r + 1, c - 1, r + 1, c)){
                erase();
                fill_segment(r, c, r, c + 1, 13);
                fill_segment(r + 1, c - 1, r + 1, c, 13);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 3){
            if(check_segment(r - 1, c - 1, r, c - 1) && check_segment(r, c, r + 1, c)){
                erase();
                fill_segment(r - 1, c - 1, r, c - 1, 13);
                fill_segment(r, c, r + 1, c, 13);
                update_color(); deg = 0; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r - 1, c, r - 1, c + 1) && check_segment(r, c - 1, r, c)){
                erase();
                fill_segment(r - 1, c, r - 1, c + 1, 13);
                fill_segment(r, c - 1, r, c, 13);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
    }
    if(id == 7){
        if(deg == 1){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r, c + 1, r, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 14);
                fill_segment(r, c + 1, r, c + 1, 14);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 2){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c, r + 1, c)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 14);
                fill_segment(r + 1, c, r + 1, c, 14);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 3){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r, c - 1, r, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 14);
                fill_segment(r, c - 1, r, c - 1, 14);
                update_color(); deg = 0; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c, r - 1, c)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 14);
                fill_segment(r - 1, c, r - 1, c, 14);
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
    }
    if(id == 1){
        if(deg == 1){
            if(check_segment(r - 1, c, r + 2, c)){
                erase();
                fill_segment(r - 1, c, r + 2, c, 8);
                r++;
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 2){
            if(check_segment(r, c - 1, r, c + 2)){
                erase();
                fill_segment(r, c - 1, r, c + 2, 8);
                c++;
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
        else if(deg == 3){
            if(check_segment(r - 2, c, r + 1, c)){
                erase();
                fill_segment(r - 2, c, r + 1, c, 8);
                r--;
                update_color(); deg = 0; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 2, r, c + 1)){
                erase();
                fill_segment(r, c - 2, r, c + 1, 8);
                c--;
                update_color(); deg++; degree = deg;
            }
            else return false;
        }
    }
    return true;
}

function is_ccw_rotateable(id, deg){
    if(id == 2){
        if(deg == 3){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r - 1, c + 1, r - 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 9);
                fill_segment(r - 1, c + 1, r - 1, c + 1, 9);
                update_color(); deg -= 1; degree = deg;
            }
            else return false;
        }
        else if(deg == 0){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 9);
                fill_segment(r + 1, c + 1, r + 1, c + 1, 9);
                update_color(); deg = 3; degree = deg;
            }
            else return false; 
        }
        else if(deg == 1){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r + 1, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 9);
                fill_segment(r + 1, c - 1, r + 1, c - 1, 9);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c - 1, r - 1, c - 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 9);
                fill_segment(r - 1, c - 1, r - 1, c - 1, 9);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
    }
    if(id == 3){
        if(deg == 3){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r + 1, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 10);
                fill_segment(r + 1, c + 1, r + 1, c + 1, 10);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else if(deg == 0){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 10);
                fill_segment(r + 1, c - 1, r + 1, c - 1, 10);
                update_color(); deg = 3; degree = deg;
            }
            else return false;
        }
        else if(deg == 1){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r - 1, c - 1, r - 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 10);
                fill_segment(r - 1, c - 1, r - 1, c - 1, 10);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c + 1, r - 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 10);
                fill_segment(r - 1, c + 1, r - 1, c + 1, 10);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
    }
    if(id == 5){
        if(deg == 3){
            if(check_segment(r, c, r + 1, c) && check_segment(r - 1, c + 1, r, c + 1)){
                erase();
                fill_segment(r, c, r + 1, c, 12);
                fill_segment(r - 1, c + 1, r, c + 1, 12);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else if(deg == 0){
            if(check_segment(r, c - 1, r, c) && check_segment(r + 1, c, r + 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c, 12);
                fill_segment(r + 1, c, r + 1, c + 1, 12);
                update_color(); deg = 3; degree = deg;
            }
            else return false;
        }
        else if(deg == 1){
            if(check_segment(r - 1, c, r, c) && check_segment(r, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r, c, 12);
                fill_segment(r, c - 1, r + 1, c - 1, 12);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r - 1, c - 1, r - 1, c) && check_segment(r, c, r, c + 1)){
                erase();
                fill_segment(r - 1, c - 1, r - 1, c, 12);
                fill_segment(r, c, r, c + 1, 12);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
    }
    if(id == 6){
        if(deg == 3){
            if(check_segment(r - 1, c, r, c) && check_segment(r, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r, c, 13);
                fill_segment(r, c + 1, r + 1, c + 1, 13);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else if(deg == 0){
            if(check_segment(r, c, r, c + 1) && check_segment(r + 1, c - 1, r + 1, c)){
                erase();
                fill_segment(r, c, r, c + 1, 13);
                fill_segment(r + 1, c - 1, r + 1, c, 13);
                update_color(); deg = 3; degree = deg;
            }
            else return false;
        }
        else if(deg == 1){
            if(check_segment(r - 1, c - 1, r, c - 1) && check_segment(r, c, r + 1, c)){
                erase();
                fill_segment(r - 1, c - 1, r, c - 1, 13);
                fill_segment(r, c, r + 1, c, 13);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r - 1, c, r - 1, c + 1) && check_segment(r, c - 1, r, c)){
                erase();
                fill_segment(r - 1, c, r - 1, c + 1, 13);
                fill_segment(r, c - 1, r, c, 13);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
    }
    if(id == 7){
        if(deg == 3){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r, c + 1, r, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 14);
                fill_segment(r, c + 1, r, c + 1, 14);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else if(deg == 0){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c, r + 1, c)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 14);
                fill_segment(r + 1, c, r + 1, c, 14);
                update_color(); deg = 3; degree = deg;
            }
            else return false;
        }
        else if(deg == 1){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r, c - 1, r, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 14);
                fill_segment(r, c - 1, r, c - 1, 14);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c, r - 1, c)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 14);
                fill_segment(r - 1, c, r - 1, c, 14);
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
    }
    if(id == 1){
        if(deg == 3){
            if(check_segment(r - 1, c, r + 2, c)){
                erase();
                fill_segment(r - 1, c, r + 2, c, 8);
                r++;
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else if(deg == 0){
            if(check_segment(r, c - 1, r, c + 2)){
                erase();
                fill_segment(r, c - 1, r, c + 2, 8);
                c++;
                update_color(); deg = 3; degree = deg;
            }
            else return false;
        }
        else if(deg == 1){
            if(check_segment(r - 2, c, r + 1, c)){
                erase();
                fill_segment(r - 2, c, r + 1, c, 8);
                r--;
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 2, r, c + 1)){
                erase();
                fill_segment(r, c - 2, r, c + 1, 8);
                c--;
                update_color(); deg--; degree = deg;
            }
            else return false;
        }
    }
    return true;
}
function counterclockwise(){
    if(moveable == false) return;
    if(dropable == false) num_lap = -50;
    for(var i = 0; i <= 4; i++){
        if(index != 1){
            r += priority_other[degree + 5][i][0];
            c += priority_other[degree + 5][i][1];
            if(is_ccw_rotateable(index, degree)){
                begin_state();
                shadow_piece();
                return true;
            }
            r -= priority_other[degree + 5][i][0];
            c -= priority_other[degree + 5][i][1];
        }
        else{
            r += priority_I[degree + 5][i][0];
            c += priority_I[degree + 5][i][1];
            if(is_ccw_rotateable(index, degree)){
                begin_state();
                shadow_piece();
                return true;
            }
            r -= priority_I[degree + 5][i][0];
            c -= priority_I[degree + 5][i][1];
        }
    }
    return false;
}
function clockwise(){
    if(moveable == false) return false;
    if(dropable == false) num_lap = -50;
    for(var i = 0; i <= 4; i++){
        if(index != 1){
            r += priority_other[degree + 1][i][0];
            c += priority_other[degree + 1][i][1];
            if(is_cw_rotateable(index, degree)){  
                begin_state();
                shadow_piece();
                return true;
            }
            r -= priority_other[degree + 1][i][0];
            c -= priority_other[degree + 1][i][1];
        }
        else{
            r += priority_I[degree + 1][i][0];
            c += priority_I[degree + 1][i][1];
            if(is_cw_rotateable(index, degree)){
                begin_state();
                shadow_piece();
                return true;
            }
            r -= priority_I[degree + 1][i][0];
            c -= priority_I[degree + 1][i][1];
        }
    }
    return false;
}
function rotate_180(){
    if(moveable == false) return false;
    if(dropable == false) num_lap = -50;
    degree++;
    if(degree == 4) degree = 0;
    if(clockwise() == false){
        degree--;
        if(degree == -1) degree = 3;
    }
}