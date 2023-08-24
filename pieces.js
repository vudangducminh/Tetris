function ok(a){
    // console.log(a);
    if(a && a < 8) return true;
    else return false;
}

function check(index, r, c){
    if(index == 1){
        if(c + 3 > board.col || r > board.row || ok(state[r][c]) || ok(state[r][c + 1]) || ok(state[r][c + 2]) || ok(state[r][c + 3])) return false;
    }
    if(index == 2){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2]) || ok(state[r][c])) return false;
    }
    if(index == 3){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2]) || ok(state[r][c + 2])) return false;
    }
    if(index == 4){
        if(c + 1 > board.col || r + 1 > board.row || ok(state[r][c]) || ok(state[r][c + 1]) || ok(state[r + 1][c]) || ok(state[r + 1][c + 1])) return false;
    }
    if(index == 5){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r][c]) || ok(state[r][c + 1]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2])) return false; 
    }
    if(index == 6){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r][c + 1]) || ok(state[r][c + 2])) return false;
    }
    if(index == 7){
        if(c + 2 > board.col || r + 1 > board.row || ok(state[r + 1][c]) || ok(state[r + 1][c + 1]) || ok(state[r + 1][c + 2]) || ok(state[r][c + 1])) return false;
    }
    return true;
}

function fill_segment(x1, y1, x2, y2, color){
    for(var i = x1; i <= x2; i++){
        for(var j = y1; j <= y2; j++){
            state[i][j] = color;
        }
    }
}

function check_segment(x1, y1, x2, y2){
    if(x1 < 1 || y1 < 1 || x2 > board.row || y2 > board.col) return false;
    for(var i = x1; i <= x2; i++){
        for(var j = y1; j <= y2; j++){
            if(ok(state[i][j])) return false;
        }
    }
    return true;
}
function add(index, r, c){
    if(index == 1){
        fill_segment(r, c, r, c + 3, 8);
    }
    if(index == 2){
        fill_segment(r + 1, c, r + 1, c + 2, 9);
        fill_segment(r, c, r, c, 9);
    }
    if(index == 3){
        fill_segment(r + 1, c, r + 1, c + 2, 10);
        fill_segment(r, c + 2, r, c + 2, 10);
    }
    if(index == 4){
        fill_segment(r + 1, c, r + 1, c + 1, 11);
        fill_segment(r, c, r, c + 1, 11);
        state[r][c] = state[r][c + 1] = state[r + 1][c] = state[r + 1][c + 1] = 11; 
    }
    if(index == 5){
        fill_segment(r, c, r, c + 1, 12);
        fill_segment(r + 1, c + 1, r + 1, c + 2, 12);
    }
    if(index == 6){
        fill_segment(r, c + 1, r, c + 2, 13);
        fill_segment(r + 1, c, r + 1, c + 1, 13);
    }
    if(index == 7){
        fill_segment(r, c + 1, r, c + 1, 14);
        fill_segment(r + 1, c, r + 1, c + 2, 14);
    }
    return true;
}
