document.onkeydown = (e) => {
    e = e || window.event;
    if(moveable == true){
        // console.log(e.key);
        if(e.key == ',') move_left();
        if(e.key == '/') move_right();              
        if(e.key == '.' && dropable == true) soft_drop(); 
        if(e.key == 'x') var x = clockwise();
        if(e.key == 'z') counterclockwise();
        if(e.key == ' ') hard_drop();
    }
}
