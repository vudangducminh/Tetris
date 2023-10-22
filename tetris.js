const gameBoard = document.getElementById('BoardTetris');
const heldBoard = document.getElementById('Held_piece');
const queueBoard = document.getElementById('Queue');
const score = document.getElementById("ScoreTetris");
const lines = document.getElementById("Lines");
const text = document.getElementById("Text");
const lv = document.getElementById("Level");
const text2 = document.getElementById("Text2");
var board = {
    row: 20,
    col: 10,
    hold_row: 12,
    hold_col: 18,
    gravity: 750,    
    queue_row: 52,
    queue_col: 18,
    reset: 15,
    movement_reset: 5,
    num_bag: 1000,
    pc_score: 1000,
    coefficient: 60000,
    visible: 5,
    maxtime: 2000,
};

var erased = false, cur_time, end_game, start_time, dropable, lap, cur_score, total_lines, cur_piece, is_pc = 0;
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
let cur_gamemode = new Map();
cur_gamemode.set("Flashlight mode", 0);
cur_gamemode.set("Blindfold mode", 0);
cur_gamemode.set("Hidden mode", 0);
cur_gamemode.set("Hard-rock mode", 0);
cur_gamemode.set("Double-time mode", 0);
cur_gamemode.set("Classic mode", 0);
cur_gamemode.set("Reverse mode", 0);

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
let level = [[5, 750], [15, 720], [25, 690], [35, 660], [50, 615], [65, 585], [75, 540], [90, 495], [100, 465], [120, 405], [130, 375], [145, 345], [160, 285], [170, 255], [185, 210], [200, 180], [210, 150], [220, 120], [240, 90], [270, 60], [300, 30], [350, 15], [9999, 0]];
let holding_state = new Array(board.hold_row + 1);
let queue_state = new Array(board.queue_row + 1);
let state = new Array(board.row + 1);
let shadow_state = new Array(board.row + 1);
var pressed = {};
var moveable = false, tp, crr, osu, cur_time, num_piece = 0, r = 0, c = 0, index = 0, degree = 1, num_lap = 0, num_osu = 0, num_tp = 0, hold = -1, cur_level = 0, holdable = false;

function time_elapsed(){
    return Date.now() - start_time;
}
function min(a, b){
    return a > b ? b : a;
}
function max(a, b){
    return a < b ? b : a;
}
function reset_all(){
    lv.textContent = 1;
    clearInterval(osu); clearInterval(tp); clearInterval(lap); clear();
    board.coefficient = 60000; board.visible = 5; board.row = 20, board.col = 10, board.gravity = 750;
    if(cur_gamemode.get("Flash_light mode") == 1) board.coefficient /= 1.3;
    if(cur_gamemode.get("Blindfold mode") == 1) board.coefficient /= 2;
    if(cur_gamemode.get("Hidden mode") == 1) board.coefficient /= 1.2;
    if(cur_gamemode.get("Hard-rock mode") == 1) lv.textContent = 4, board.col = 12, board.gravity = min(board.gravity, level[3][1]), board.coefficient /= 1.2;
    if(cur_gamemode.get("Double-time mode") == 1) lv.textContent = 11, board.row = 10, board.gravity = min(board.gravity, level[10][1]), board.coefficient /= 1.5;
    if(cur_gamemode.get("Classic mode") == 1) board.coefficient /= 1.3;
    if(cur_gamemode.get("Reverse mode") == 1) board.coefficient /= 2;
    moveable = false; end_game = false; dropable = true;  
    num_piece = 0; cur_score = 0; is_pc = 0; cur_level = 0;
    total_lines = 0;
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
    teleport();
}

function abs(a, b){
    if(a > b) return a - b;
    else return b - a;
}

function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function hash(i, j){
    return (i - 1) * 100 + j;
}
function min(i, j){
    return i > j ? j : i;
}
function max(i, j){
    return i < j ? j : i;
}

function init(){
    if(erased == false){
        erased = true;
        remove_button();
    }
    reset_all(); 
    create_board();
    create_bag();
}

function game_over(){
    end_game = true; 
    end_state(); return;
}

function remove_button(){
    let element = document.getElementById('mode1');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode2');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode3');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode4');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode5');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode6');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode7');
    element.parentNode.removeChild(element);
    element = document.getElementById('mode8');
    element.parentNode.removeChild(element);
}
function Flashlight(){
    let element = document.getElementById('mode1');
    if(element.style.backgroundColor == "red"){
        element.style.backgroundColor = "green";
        cur_gamemode.set("Flashlight mode", 1);
        let element2 = document.getElementById('mode2');
        if(element2.style.backgroundColor == "green"){
            element2.style.backgroundColor = "red";
            cur_gamemode.set("Blindfold mode", 0);
        }
    }
    else{
        element.style.backgroundColor = "red";
        cur_gamemode.set("Flashlight mode", 0);
    }
}

function Blindfold(){
    let element = document.getElementById('mode2');
    if(element.style.backgroundColor == "red"){
        element.style.backgroundColor = "green";
        cur_gamemode.set("Blindfold mode", 1);
        let element2 = document.getElementById('mode1');
        if(element2.style.backgroundColor == "green"){
            element2.style.backgroundColor = "red";
            cur_gamemode.set("Flashlight mode", 0);
        }
    }
    else{
        element.style.backgroundColor = "red";
        cur_gamemode.set("Blindfold mode", 0);
    }
}
function Hidden(){
    let element = document.getElementById('mode3');
    if(element.style.backgroundColor == "red"){
        cur_gamemode.set("Hidden mode", 1);
        element.style.backgroundColor = "green";
    }
    else{
        cur_gamemode.set("Hidden mode", 0);
        element.style.backgroundColor = "red";
    }
}
function Hard_rock(){
    let element = document.getElementById('mode4');
    if(element.style.backgroundColor == "red"){
        cur_gamemode.set("Hard-rock mode", 1);
        element.style.backgroundColor = "green";
    }
    else{
        cur_gamemode.set("Hard-rock mode", 0);
        element.style.backgroundColor = "red";
    }
}
function Double_time(){
    let element = document.getElementById('mode5');
    if(element.style.backgroundColor == "red"){
        cur_gamemode.set("Double-time mode", 1);
        element.style.backgroundColor = "green";
    }
    else{
        cur_gamemode.set("Double-time mode", 0);
        element.style.backgroundColor = "red";
    }
}

function Classic(){
    let element = document.getElementById('mode6');
    if(element.style.backgroundColor == "red"){
        cur_gamemode.set("Classic mode", 1);
        element.style.backgroundColor = "green";
    }
    else{
        cur_gamemode.set("Classic mode", 0);
        element.style.backgroundColor = "red";
    }
}
function Reverse(){
    let element = document.getElementById('mode7');
    if(element.style.backgroundColor == "red"){
        cur_gamemode.set("Reverse mode", 1);
        element.style.backgroundColor = "green";
    }
    else{
        cur_gamemode.set("Reverse mode", 0);
        element.style.backgroundColor = "red";
    }
}
function Start_game(){
    init();
}
