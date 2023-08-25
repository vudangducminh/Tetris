function add_holding_piece(type){
    erase_holding_piece();
    if(type == 1){
        holding_state[3][2] = type;
        holding_state[3][3] = type;
        holding_state[3][4] = type;
        holding_state[3][5] = type;
    }
    if(type == 2){
        holding_state[2][2] = type;
        holding_state[3][2] = type;
        holding_state[3][3] = type;
        holding_state[3][4] = type;
    }
    if(type == 3){
        holding_state[2][4] = type;
        holding_state[3][2] = type;
        holding_state[3][3] = type;
        holding_state[3][4] = type;
    }
    if(type == 4){
        holding_state[2][3] = type;
        holding_state[2][4] = type;
        holding_state[3][3] = type;
        holding_state[3][4] = type;
    }
    if(type == 5){
        holding_state[2][2] = type;
        holding_state[2][3] = type;
        holding_state[3][3] = type;
        holding_state[3][4] = type;
    }
    if(type == 6){
        holding_state[2][3] = type;
        holding_state[2][4] = type;
        holding_state[3][2] = type;
        holding_state[3][3] = type;
    }
    if(type == 7){
        holding_state[2][3] = type;
        holding_state[3][2] = type;
        holding_state[3][3] = type;
        holding_state[3][4] = type;
    }
    color_holding_piece();
}