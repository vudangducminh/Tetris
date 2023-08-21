function counterclockwise(){
    degree += 180;
    if(degree >= 360) degree -= 360;
    if(clockwise() == false){
        degree -= 180;
        if(degree < 0) degree += 360;
    }
}
function clockwise(){
    if(index == 2){
        if(degree == 90){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r - 1, c + 1, r - 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 9);
                fill_segment(r - 1, c + 1, r - 1, c + 1, 9);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 180){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 9);
                fill_segment(r + 1, c + 1, r + 1, c + 1, 9);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 270){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r + 1, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 9);
                fill_segment(r + 1, c - 1, r + 1, c - 1, 9);
                update_color(); degree = 0;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c - 1, r - 1, c - 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 9);
                fill_segment(r - 1, c - 1, r - 1, c - 1, 9);
                update_color(); degree += 90;
            }
            else return false;
        }
    }
    if(index == 3){
        if(degree == 90){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r + 1, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 10);
                fill_segment(r + 1, c + 1, r + 1, c + 1, 10);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 180){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 10);
                fill_segment(r + 1, c - 1, r + 1, c - 1, 10);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 270){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r - 1, c - 1, r - 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 10);
                fill_segment(r - 1, c - 1, r - 1, c - 1, 10);
                update_color(); degree = 0;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c + 1, r - 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 10);
                fill_segment(r - 1, c + 1, r - 1, c + 1, 10);
                update_color(); degree += 90;
            }
            else return false;
        }
    }
    if(index == 5){
        if(degree == 90){
            if(check_segment(r, c, r + 1, c) && check_segment(r - 1, c + 1, r, c + 1)){
                erase();
                fill_segment(r, c, r + 1, c, 12);
                fill_segment(r - 1, c + 1, r, c + 1, 12);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 180){
            if(check_segment(r, c - 1, r, c) && check_segment(r + 1, c, r + 1, c + 1)){
                erase();
                fill_segment(r, c - 1, r, c, 12);
                fill_segment(r + 1, c, r + 1, c + 1, 12);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 270){
            if(check_segment(r - 1, c, r, c) && check_segment(r, c - 1, r + 1, c - 1)){
                erase();
                fill_segment(r - 1, c, r, c, 12);
                fill_segment(r, c - 1, r + 1, c - 1, 12);
                update_color(); degree = 0;
            }
            else return false;
        }
        else{
            if(check_segment(r - 1, c - 1, r - 1, c) && check_segment(r, c, r, c + 1)){
                erase();
                fill_segment(r - 1, c - 1, r - 1, c, 12);
                fill_segment(r, c, r, c + 1, 12);
                update_color(); degree += 90;
            }
            else return false;
        }
    }
    if(index == 6){
        if(degree == 90){
            if(check_segment(r - 1, c, r, c) && check_segment(r, c + 1, r + 1, c + 1)){
                erase();
                fill_segment(r - 1, c, r, c, 13);
                fill_segment(r, c + 1, r + 1, c + 1, 13);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 180){
            if(check_segment(r, c, r, c + 1) && check_segment(r + 1, c - 1, r + 1, c)){
                erase();
                fill_segment(r, c, r, c + 1, 13);
                fill_segment(r + 1, c - 1, r + 1, c, 13);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 270){
            if(check_segment(r - 1, c - 1, r, c - 1) && check_segment(r, c, r + 1, c)){
                erase();
                fill_segment(r - 1, c - 1, r, c - 1, 13);
                fill_segment(r, c, r + 1, c, 13);
                update_color(); degree = 0;
            }
            else return false;
        }
        else{
            if(check_segment(r - 1, c, r - 1, c + 1) && check_segment(r, c - 1, r, c)){
                erase();
                fill_segment(r - 1, c, r - 1, c + 1, 13);
                fill_segment(r, c - 1, r, c, 13);
                update_color(); degree += 90;
            }
            else return false;
        }
    }
    if(index == 7){
        if(degree == 90){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r, c + 1, r, c + 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 14);
                fill_segment(r, c + 1, r, c + 1, 14);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 180){
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r + 1, c, r + 1, c)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 14);
                fill_segment(r + 1, c, r + 1, c, 14);
                update_color(); degree += 90;
            }
            else return false;
        }
        else if(degree == 270){
            if(check_segment(r - 1, c, r + 1, c) && check_segment(r, c - 1, r, c - 1)){
                erase();
                fill_segment(r - 1, c, r + 1, c, 14);
                fill_segment(r, c - 1, r, c - 1, 14);
                update_color(); degree = 0;
            }
            else return false;
        }
        else{
            if(check_segment(r, c - 1, r, c + 1) && check_segment(r - 1, c, r - 1, c)){
                erase();
                fill_segment(r, c - 1, r, c + 1, 14);
                fill_segment(r - 1, c, r - 1, c, 14);
                update_color(); degree += 90;
            }
            else return false;
        }
    }
    return true;
}