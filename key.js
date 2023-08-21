document.onkeydown = (e) => {
    e = e || window.event;
    if(moveable == true){
        console.log(e.keyCode);
        if(e.keyCode == 188) move_left();
        if(e.keyCode == 191) move_right();              
        if(e.keyCode == 190) move_down(); 
        if(e.keyCode == 88) var x = clockwise();
        if(e.keyCode == 90) counterclockwise();
    }
}
