const gameBoard = document.getElementById('BoardTetris');

var board = {
    row: 20,
    col: 10,
    gravity: 2000,
    reset: 50,
    num_bag: 1000,
    delay: 4000
};

// import {generate_bag} from "pieces.js";
function shuffle(array){
    var size = array.length
    for(var i = 0; i < size - 1; i++){
        var id = rng(i + 1, size - 1);
        var tmp = array[i];
        array[i] = array[id];
        array[id] = tmp;
    }
    return array;
}
function generate_bag(){
    let bag = [];
    for(var i = 1; i <= 7; i++) bag.push(i);
    bag = shuffle(bag);
    return bag;
}
var cur_time, end_game, start_time;
// 0 -> blank
// 1 -> I (light blue)
// 2 -> L (blue)
// 3 -> L (orange)
// 4 -> O (yellow)
// 5 -> Z (red)
// 6 -> Z (green)
// 7 -> T (purple)

let piece = [];
let state = new Array(board.row + 1);
var moveable = false, osu, cur_time, cur_piece = 0, r = 0, c = 0, index = 0, degree = 90;

function time_elapsed(){
    osu = setInterval(function() {
        cur_time = Date.now();
        // console.log(cur_time);
    }, board.gravity);
}

function reset_all(){
    clearInterval(osu); moveable = false; end_game = 0; cur_piece = 0; board.gravity = 1000;
    piece = [];
    for(var i = 1; i <= board.row; i++){
        state[i] = new Array(board.col + 1).fill(0);
    }
}
function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function hash(i, j){
    return (i - 1) * board.col + j;
}

function clear_lines(){
    for(var i = board.row; i >= 1; i--){
        var flag = 0;
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] == 0 || state[i][j] >= 8){
                flag = 1; break;
            }
        }
        if(!flag){
            for(var j = 1; j <= board.col; j++) state[i][j] = 0;
            var cnt = i;
            for(var l = i; l >= 1; l--){
                var check = 0;
                for(var r = 1; r <= board.col; r++){
                    if(state[l][r] > 0 && state[l][r] < 8){
                        check = 1; break;
                    }
                }
                if(check){
                    for(var j = 1; j <= board.col; j++){
                        state[cnt][j] = state[l][j];
                        state[l][j] = 0;
                    }
                    cnt--;
                }
            }
        }
    }
}

function update_color(){
    clear_lines();
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(state[i][j] == 0) cell.style.backgroundColor = "black";
            if(state[i][j] == 1) cell.style.backgroundColor = "lightblue";
            if(state[i][j] == 2) cell.style.backgroundColor = "blue";
            if(state[i][j] == 3) cell.style.backgroundColor = "orange";
            if(state[i][j] == 4) cell.style.backgroundColor = "yellow";
            if(state[i][j] == 5) cell.style.backgroundColor = "red";
            if(state[i][j] == 6) cell.style.backgroundColor = "green";
            if(state[i][j] == 7) cell.style.backgroundColor = "purple";
            if(state[i][j] == 8) cell.style.backgroundColor = "lightblue";
            if(state[i][j] == 9) cell.style.backgroundColor = "blue";
            if(state[i][j] == 10) cell.style.backgroundColor = "orange";
            if(state[i][j] == 11) cell.style.backgroundColor = "yellow";
            if(state[i][j] == 12) cell.style.backgroundColor = "red";
            if(state[i][j] == 13) cell.style.backgroundColor = "green";
            if(state[i][j] == 14) cell.style.backgroundColor = "purple";
        }
    }
}

function ok(a){
    // console.log(a);
    if(a && a < 8) return true;
    else return false;
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
        
    }
    return true;
}

function counterclockwise(){
    degree += 180;
    if(degree >= 360) degree -= 360;
    if(clockwise() == false){
        degree -= 180;
        if(degree < 0) degree += 360;
    }
}
function dropping(){
    for(var i = board.row; i >= 1; i--){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                // console.log(i, j);
                if(i + 1 <= board.row && !ok(state[i + 1][j])) continue;
                else return false;
            }
        }
    }
    for(var i = board.row; i >= 1; i--){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                // console.log(i, j);
                state[i + 1][j] = state[i][j]; 
                state[i][j] = 0;
            }
        }
    }
    update_color(); r++;
    return true;
}

function erase(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8) state[i][j] = 0;
        }
    }
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
function current_piece(id){
    moveable = true; degree = 90;
    r = 1, c = 4, index = id;
    if(check(index, r, c) == false){
        moveable = false;
        game_over(); return;
    }
    add(index, r, c); update_color();
    if(index == 1) r = 1, c = 5;
    else r = 2, c = 5;
    var lap = setInterval(function(){
        if(dropping() == true);
        else{
            fill(); 
            // board.gravity--;
            if(cur_piece + 1 == board.num_bag * 7) clearInterval(lap);
            current_piece(piece[++cur_piece]);
            clearInterval(lap);
        }
    }, board.gravity);
}

function fill(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8) state[i][j] -= 7;
        }
    }
    update_color();
}

function move_left(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                if(j > 1 && !ok(state[i][j - 1])) continue;
                else return;
            }
        }
    }
    c--;
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8){
                state[i][j - 1] = state[i][j];
                state[i][j] = 0;
            }
        }
    }
    update_color();

}

function move_right(){
    for(var i = 1; i <= board.row; i++){
        for(var j = board.col; j >= 1; j--){
            if(state[i][j] >= 8){
                if(j < board.col && !ok(state[i][j + 1])) continue;
                else return;
            }
        }
    }
    c++;
    for(var i = 1; i <= board.row; i++){
        for(var j = board.col; j >= 1; j--){
            if(state[i][j] >= 8){
                state[i][j + 1] = state[i][j];
                state[i][j] = 0;
            }
        }
    }
    update_color();
}

function move_down(){
    while(dropping() == true) update_color();
}

function init(){
    init1();
    init2();
}

function init1(){
    time_elapsed();
    // console.log(cur_time);
    reset_all();
    gameBoard.innerHTML = '';
    var table = document.createElement('table');
    for(var i = 1; i <= board.row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i, j);
            cell.backgroundColor = "black";
            row.appendChild(cell);
        }
        table.appendChild(row);
    } 
    gameBoard.appendChild(table);
}


function init2(){ 
    for(var i = 1; i <= board.num_bag; i++){
        let bag = generate_bag();
        for(var j = 0; j < 7; j++) piece.push(bag[j]);
    }
    moveable = true;
    current_piece(piece[cur_piece]);
}


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

function game_over(){
   end_game = 1; return; 
}
window.addEventListener('load', function(){
    init();
});
function New_game(){
    reset_all();
	window.location.reload();
}
