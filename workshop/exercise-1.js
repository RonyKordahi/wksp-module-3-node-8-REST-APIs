//what the DB looks like

let stock = {
    food: {croissants: 10, fruit: 25, tea: 44, coffee: 75},
    tables: [{occupied: true/false /*occupied or not */, order: {/*whatever food the client order*/}}, 
        {occupied: true/false, order: {/*whatever food the client order*/}},
        {occupied: true/false, order: {/*whatever food the client order*/}},
        {occupied: true/false, order: {/*whatever food the client order*/}},
        {occupied: true/false, order: {/*whatever food the client order*/}}]
}
//exports the DB

//what the endpoints do

//determines where the clients will sit
endpoint "/seat" {
    //goes through the tables array with the forEach function to determine if the table is occupied or not
    //assigns the client an ID into the tables array
}

//determines what the client orders
endpoint "/order" {
    //takes the client's order through input
    //updates the food object through the patch method
}

//when the client leaves
endpoint "/exits" {
    //empties the table according to the client's ID
    //sets status to unnocupied and removes orders
}