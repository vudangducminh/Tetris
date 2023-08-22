function clear(){
    pressed[32] = pressed[65] = pressed[88] = pressed[90] = pressed[188] = pressed[190] = pressed[191] = 0;
}
document.onkeydown = (e) => {
    e = e || window.event;
    if(moveable == false) return;
    if(!pressed[e.keyCode]) pressed[e.keyCode] = 1;
    // console.log(e.keyCode);
    var flag = true;
    while(flag == true){
        flag = false;
        if(pressed[188]) move_left();
        if(pressed[191]) move_right();              
        if(pressed[190] == 1 && dropable == true) pressed[190] = 2, soft_drop(0); 
        if(pressed[65] == 1){
            pressed[65] = 2;
            rotate_180();
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
document.onkeyup = (e) => {
    e = e || window.event;
    // console.log(e.key);
    pressed[e.keyCode] = 0;
}
