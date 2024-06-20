function knightMoves(start,end){
  // valid moves of a knight chess piece in terms of coordinates
  const moves = [
    [1,2],[2,1],[1,-2],[-2,1],
    [2,-1],[-1,2],[-1,-2],[-2,-1],
  ];

  /*
    validates whether or not the given coordinates are 
    in the chess board
  */
  function isValid([x,y]){
    if(x >= 0 && x < 8 && y >= 0 && y < 8){
      return true;
    }
    return false;
  }

  /*
    searches for the end coordinates starting from the 
    coordinates of start parameter using breadth first search
    (bfs) algorithm
  */
  function bfs(start,end){
    const queue = [
      [start,[start]],
    ];
    const visitedSquares = new Set(start.toString());

    while(queue.length > 0){
      const [[x,y],path] = queue.shift();

      // checks to see if we have reached the end square
      if(x === end[0] && y === end[1]){
        return path;
      }
      
      /* 
        runs 8 times and if the new coord is a valid 
        chess board square and is not visited already 
        adds the square to the queue so that it can be 
        checked later (bfs algorithm) and also adds the
        stringified version to the visitedSquares set 
        so that we don't add the previous move again in 
        the next iteration to the queue
      */
      for(const [dx,dy] of moves){
        const newX = x + dx;
        const newY = y + dy;

        if(
          isValid([newX,newY])
          && !visitedSquares.has([newX,newY].toString())
        ){
          queue.push([[newX,newY],[...path,[newX,newY]]]);
          visitedSquares.add([newX,newY].toString());
        }
      }

    }
  }

  // return the path that goes from start to the end square
  return bfs(start,end);
}

console.log(knightMoves([0,0],[7,7]));