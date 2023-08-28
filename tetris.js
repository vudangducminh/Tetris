const gameBoard = document.getElementById('BoardTetris');
const heldBoard = document.getElementById('Held_piece');
const queueBoard = document.getElementById('Queue');
const score = document.getElementById("ScoreTetris");
var board = {
    row: 20,
    col: 10,
    hold_row: 12,
    hold_col: 18,
    gravity: 750,
    queue_row: 52,
    queue_col: 18,
    reset: 15,
    movement_reset: 25,
    num_bag: 1000,
    pc_score: 1000,
    coefficient: 45000,
    visible: 5,
};

var cur_gamemode;

var cur_time, end_game, start_time, dropable, lap, cur_score, is_pc = 0;
// 0 -> blank
// 1 -> I (light blue)
// 2 -> L (blue)
// 3 -> L (orange)
// 4 -> O (yellow)
// 5 -> Z (red)
// 6 -> Z (green)
// 7 -> T (purple)

let priority_other = new Array(9), priority_I = new Array(9);
let color = ["black", "lightblue", "blue", "orange", "yellow", "red", "green", "purple", "lightblue", "blue", "orange", "yellow", "red", "green", "purple"];
for(var i = 1; i <= 8; i++){    
    priority_other[i] = new Array(5).fill([0, 0]);
    priority_I[i] = new Array(5).fill([0, 0]);
}
// cw
priority_other[1] = [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]]; // 0 -> 1
priority_other[2] = [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]];  // 1 -> 2
priority_other[3] = [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]]; // 2 -> 3
priority_other[4] = [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]]; // 3 -> 0
priority_I[1] = [[0, 0], [0, -2], [0, 1], [-1, -2], [2, 1]]; // 0 -> 1
priority_I[2] = [[0, 0], [0, -2], [0, 1], [-2, 1], [1, -2]];  // 1 -> 2
priority_I[3] = [[0, 0], [0, -1], [0, 2], [-2, -1], [1, 2]]; // 2 -> 3
priority_I[4] = [[0, 0], [0, 2], [0, -1], [-1, 2], [1, -1]]; // 3 -> 0
// ccw
priority_other[5] = [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]]; // 0 -> 3
priority_other[6] = [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]]; // 1 -> 0
priority_other[7] = [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]]; // 2 -> 1
priority_other[8] = [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]]; // 3 -> 2
priority_I[5] = [[0, 0], [0, 1], [0, -2], [-2, 1], [1, -2]]; // 0 -> 3
priority_I[6] = [[0, 0], [0, 2], [0, -1], [-2, -1], [1, 2]];  // 1 -> 0
priority_I[7] = [[0, 0], [0, 2], [0, -1], [-1, 2], [2, -1]]; // 2 -> 1
priority_I[8] = [[0, 0], [0, -2], [0, 1], [-1, -2], [1, 1]]; // 3 -> 2

let piece = [];
let holding_state = new Array(board.hold_row + 1);
let queue_state = new Array(board.queue_row + 1);
let state = new Array(board.row + 1);
let shadow_state = new Array(board.row + 1);
var pressed = {};
var moveable = false, tp, crr, osu, cur_time, cur_piece = 0, r = 0, c = 0, index = 0, degree = 1, num_lap = 0, num_osu = 0, num_tp = 0, hold = -1, holdable = false;

function time_elapsed(){
    return Date.now() - start_time;
}

function reset_all(){
    clearInterval(osu); clearInterval(tp); clearInterval(lap); clear();
    board.gravity = 750;
    moveable = false; end_game = false; dropable = true;  
    cur_piece = 0; cur_score = 0; is_pc = 0;
    hold = -1; holdable = false;
    piece = [];  
    for(var i = 1; i <= board.row; i++){
        state[i] = new Array(board.col + 1).fill(0);
        shadow_state[i] = new Array(board.col + 1).fill(0);
    }
    for(var i = 1; i <= board.hold_row; i++){
        holding_state[i] = new Array(board.hold_col + 1).fill(0);
    }
    for(var i = 1; i <= board.queue_row; i++){
        queue_state[i] = new Array(board.queue_col + 1).fill(0);
    }
    start_time = Date.now();
    check_multiple_keys();
}
function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function hash(i, j){
    return (i - 1) * board.row + j;
}
function min(i, j){
    return i > j ? j : i;
}
function max(i, j){
    return i < j ? j : i;
}

function init(){
    reset_all(); 
    create_board();
    create_bag();
}

function game_over(){
    end_game = true; 
    end_state(); return;
}
function Classic_tetris(){
    cur_gamemode = "Classic tetris";
    init();
}

function Flashlight(){
    cur_gamemode = "Flashlight mode";
    init();
}

function Blindfold(){
    cur_gamemode = "Blindfold mode";
    init();
}
