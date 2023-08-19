const gameBoard = document.getElementById('BoardTetris');

var board = {
    row: 20,
    col: 10,
    gravity: 1000,
    reset: 50,
    num_bag: 2
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
var moveable = false, osu, cur_time, cur_piece = 0, r = 0, c = 0, index = 0;

function time_elapsed(){
    osu = setInterval(function() {
        cur_time = Date.now();
        // console.log(cur_time);
    }, board.gravity);
}

function reset_all(){
    moveable = false; end_game = 0; clearInterval(osu); cur_piece = 0;
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

function update_color(){
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

function add(index, r, c){
    if(index == 1){
        state[r][c] = state[r][c + 1] = state[r][c + 2] = state[r][c + 3] = 8; 
    }
    if(index == 2){
        state[r + 1][c] = state[r + 1][c + 1] = state[r + 1][c + 2] = state[r][c] = 9; 
    }
    if(index == 3){
        state[r + 1][c] = state[r + 1][c + 1] = state[r + 1][c + 2] = state[r][c + 2] = 10; 
    }
    if(index == 4){
        state[r][c] = state[r][c + 1] = state[r + 1][c] = state[r + 1][c + 1] = 11; 
    }
    if(index == 5){
        state[r][c] = state[r][c + 1] = state[r + 1][c + 1] = state[r + 1][c + 2] = 12; 
    }
    if(index == 6){
        state[r + 1][c] = state[r + 1][c + 1] = state[r][c + 1] = state[r][c + 2] = 13; 
    }
    if(index == 7){
        state[r + 1][c] = state[r + 1][c + 1] = state[r + 1][c + 2] = state[r][c + 1] = 14;
    }
    return true;
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

function erase(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(state[i][j] >= 8) state[i][j] = 0;
        }
    }
}

function current_piece(id){
    moveable = true;
    r = 1, c = 4, index = id;
    // console.log(index, id);
    // console.log(index, r, c, state[r][c]);
    if(check(index, r, c) == false){
        moveable = false;
        game_over(); return;
    }
    add(index, r, c); update_color();
    var lap = setInterval(function(){
        erase(); 
        update_color(); 
        r++;
        // end_game = 1; return;
        if(check(index, r, c) == true){
            add(index, r, c);
            update_color();
        }
        else{
            console.log("FALSE");
            console.log(index, r - 1, c);
            add(index, r - 1, c);
            fill(); board.gravity--;
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
    if(c > 1){
        c--; erase();
        if(check(index, r, c) == false) c++;
        add(index, r, c);
        update_color();
    }
}

function move_right(){
    if(c < board.col){
        c++; erase();
        if(check(index, r, c) == false) c--;
        add(index, r, c);
        update_color();
    }
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
        // console.log(e.keyCode);
        if(e.keyCode == 188) move_left();
        if(e.keyCode == 191) move_right();              
        if(e.keyCode == 190) move_down(); 
    }
}

function game_over(){
   end_game = 1; return; 
}
window.addEventListener('load', function(){
    time_elapsed();
    init();
});
function New_game(){
    time_elapsed();
	window.location.reload();
}
